/**
 * scripts/sync-linkedin-experience.cjs
 * Synchronizes the LinkedIn "About" section and dynamically updates the Work Experience
 * section in src/data/experience.json and src/data/profile.json.
 *
 * Capabilities:
 * 1. Accepts manual override via LINKEDIN_ABOUT_TEXT (e.g. GitHub Actions workflow_dispatch).
 * 2. Scrapes public LinkedIn profile OpenGraph/meta tags automatically.
 * 3. Enriches the active System Engineer role at TCS with the live LinkedIn About section.
 * 4. Preserves all STAR details, metrics, and project structures without breaking build.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const TARGET_PROFILE = 'https://www.linkedin.com/in/dhruvabhattacharya';
const DATA_DIR = path.join(__dirname, '..', 'src', 'data');
const EXP_JSON_PATH = path.join(DATA_DIR, 'experience.json');
const PROFILE_JSON_PATH = path.join(DATA_DIR, 'profile.json');

function fetchWithRedirects(url, maxRedirects = 5) {
  return new Promise((resolve, reject) => {
    if (maxRedirects < 0) return reject(new Error('Exceeded maximum redirect depth'));

    const client = url.startsWith('https') ? https : http;
    const options = {
      headers: {
        'User-Agent': 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Connection': 'close'
      }
    };

    client.get(url, options, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let redirectUrl = res.headers.location;
        if (redirectUrl.startsWith('/')) {
          redirectUrl = new URL(url).origin + redirectUrl;
        }
        res.resume();
        return resolve(fetchWithRedirects(redirectUrl, maxRedirects - 1));
      }

      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(data);
        } else {
          reject(new Error(`HTTP Status ${res.statusCode}`));
        }
      });
    }).on('error', reject);
  });
}

function extractAboutFromHtml(html) {
  const ogDescMatch = html.match(/<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']*)["']/i);
  const metaDescMatch = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i);

  const raw = ogDescMatch ? ogDescMatch[1] : (metaDescMatch ? metaDescMatch[1] : null);
  if (!raw) return null;

  const cleaned = raw.replace(/&#39;/g, "'").replace(/&amp;/g, '&').replace(/&quot;/g, '"').trim();
  const segments = cleaned.split(/\s*Experience:|\s*Education:|\s*Location:|\s*500\+/i);
  const candidate = segments[0].replace(/[\r\n]+\s*(?:Currently|View).*$/is, '').replace(/[·•\s…\.-]+$/, '').trim();

  return candidate && candidate.length >= 15 ? candidate : null;
}

async function syncLinkedInAbout() {
  console.log('[LinkedIn Experience Sync] Starting LinkedIn About section synchronization...');
  
  let aboutText = null;

  // 1. Check for manual override from workflow_dispatch
  if (process.env.LINKEDIN_ABOUT_TEXT && process.env.LINKEDIN_ABOUT_TEXT.trim().length > 10) {
    aboutText = process.env.LINKEDIN_ABOUT_TEXT.trim();
    console.log('[LinkedIn Experience Sync] Using provided LINKEDIN_ABOUT_TEXT override.');
  } else {
    // 2. Fall back to automated public crawler
    try {
      console.log(`[LinkedIn Experience Sync] Crawling public profile: ${TARGET_PROFILE}`);
      const html = await fetchWithRedirects(TARGET_PROFILE);
      const extracted = extractAboutFromHtml(html);
      if (extracted) {
        aboutText = extracted;
        console.log(`[LinkedIn Experience Sync] Extracted live Bio/About: "${extracted}"`);
      }
    } catch (err) {
      console.warn(`[LinkedIn Experience Sync] Public crawl warning: ${err.message}`);
    }
  }

  const verifiedBase = "Backend Software Engineer architecting high-scale Java/Spring Boot microservices and enterprise Generative AI/RAG agent systems for global platforms at Tata Consultancy Services. Slashed API latency by 85% and boosted throughput by +40% in telecom OSS/BSS, backed by 900+ LeetCode problems and Rank 1 in Asia (Alibaba Cloud Low Code Development Contest 2022).";

  let finalAbout;
  if (aboutText) {
    if (aboutText.length > 150) {
      finalAbout = aboutText;
    } else {
      finalAbout = `${aboutText}. ${verifiedBase}`;
    }
  } else {
    finalAbout = verifiedBase;
  }

  // 3. Update src/data/experience.json
  if (fs.existsSync(EXP_JSON_PATH)) {
    try {
      const expData = JSON.parse(fs.readFileSync(EXP_JSON_PATH, 'utf-8'));
      if (Array.isArray(expData) && expData.length > 0) {
        expData[0].about = finalAbout;
        fs.writeFileSync(EXP_JSON_PATH, JSON.stringify(expData, null, 2) + '\n', 'utf-8');
        console.log('[LinkedIn Experience Sync] Successfully updated experience.json with synced About section.');
      }
    } catch (err) {
      console.error('[LinkedIn Experience Sync] Error updating experience.json:', err.message);
    }
  }

  // 4. Update src/data/profile.json
  if (fs.existsSync(PROFILE_JSON_PATH)) {
    try {
      const profile = JSON.parse(fs.readFileSync(PROFILE_JSON_PATH, 'utf-8'));
      profile.summary = finalAbout;
      if (aboutText && aboutText.length <= 150) {
        profile.tagline = aboutText;
      }
      profile.lastSyncedAt = new Date().toISOString();
      fs.writeFileSync(PROFILE_JSON_PATH, JSON.stringify(profile, null, 2) + '\n', 'utf-8');
      console.log('[LinkedIn Experience Sync] Successfully updated profile.json with synced summary.');
    } catch (err) {
      console.error('[LinkedIn Experience Sync] Error updating profile.json:', err.message);
    }
  }

  console.log('[LinkedIn Experience Sync] Synchronization completed successfully.');
}

syncLinkedInAbout();
