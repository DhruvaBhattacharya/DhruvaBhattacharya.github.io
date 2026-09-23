/**
 * scripts/sync-github-contributions.cjs
 * GitHub Top Contributions & Repository Synchronization.
 * Targets: https://github.com/dhruvaop
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const GITHUB_USERNAME = 'dhruvaop';
const PAYLOAD_FILE = path.join(__dirname, '.github_payload.json');

function fetchJson(url, headers = {}) {
  return new Promise((resolve, reject) => {
    const defaultHeaders = {
      'User-Agent': 'Portfolio-Sync-Engine/2.0',
      'Accept': 'application/vnd.github.v3+json',
      ...headers
    };

    https.get(url, { headers: defaultHeaders }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(new Error('Failed to parse response JSON: ' + e.message));
          }
        } else {
          reject(new Error(`HTTP error ${res.statusCode}: ${data}`));
        }
      });
    }).on('error', reject);
  });
}

async function syncContributions() {
  console.log(`[GitHub Sync] Fetching repositories and contributions for: ${GITHUB_USERNAME}`);
  const token = process.env.GH_PAT || process.env.GITHUB_TOKEN;
  const headers = token ? { 'Authorization': `Bearer ${token}` } : {};

  try {
    const repos = await fetchJson(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=10`, headers);

    const formattedRepos = repos.map(r => ({
      name: r.name,
      description: r.description || "Open source contribution / engineering repository",
      url: r.html_url,
      stars: r.stargazers_count,
      forks: r.forks_count,
      language: r.language || "Code",
      updatedAt: r.updated_at
    }));

    const result = {
      username: GITHUB_USERNAME,
      syncedAt: new Date().toISOString(),
      totalRepos: repos.length,
      topRepositories: formattedRepos.slice(0, 6)
    };

    fs.writeFileSync(PAYLOAD_FILE, JSON.stringify(result, null, 2), 'utf-8');
    console.log(`[GitHub Sync] Successfully saved GitHub contributions to: ${PAYLOAD_FILE}`);
  } catch (err) {
    console.warn(`[GitHub Sync Notice] API call error or rate limit (${err.message}). Using local baseline.`);
    const fallback = {
      username: GITHUB_USERNAME,
      syncedAt: new Date().toISOString(),
      totalRepos: 12,
      topRepositories: [
        {
          name: "weather-forecast-",
          description: "Dynamic Weather Forecasting and time series analysis web application",
          url: `https://github.com/${GITHUB_USERNAME}/weather-forecast-`,
          stars: 1,
          forks: 0,
          language: "Python"
        },
        {
          name: "Portfolio-2.0",
          description: "Modern, dynamic Vite + React + Tailwind CSS portfolio with automated CI/CD synchronization",
          url: `https://github.com/${GITHUB_USERNAME}/DhruvaBhattacharya.github.io`,
          stars: 5,
          forks: 1,
          language: "JavaScript"
        }
      ]
    };
    fs.writeFileSync(PAYLOAD_FILE, JSON.stringify(fallback, null, 2), 'utf-8');
    console.log(`[GitHub Sync] Baseline recorded to: ${PAYLOAD_FILE}`);
  }
}

syncContributions();
