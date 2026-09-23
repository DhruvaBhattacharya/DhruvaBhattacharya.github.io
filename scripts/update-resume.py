"""
scripts/update-resume.py
Adds Portfolio link to the top contact header in both public/resume.pdf
and Latest_resume-DhruvaBhattacharya .pdf using PyMuPDF.
Maintains exact embedded Bitstream Charter font, #004074 link color,
horizontal centering, and clickable hyperlinks.
"""

import sys
import os
import tempfile
import pymupdf

PDF_FILES = [
    os.path.join(os.path.dirname(__file__), '..', 'public', 'resume.pdf'),
    os.path.join(os.path.dirname(__file__), '..', 'Latest_resume-DhruvaBhattacharya .pdf')
]

ITEMS = [
    ("Portfolio", "https://dhruvabhattacharya.github.io/"),
    ("GitHub", "https://github.com/DhruvaBhattacharya"),
    ("LeetCode", "https://leetcode.com/u/dhruvabhattacharya130102/"),
    ("LinkedIn", "https://www.linkedin.com/in/dhruvabhattacharya/"),
    ("dhruvabhattacharya130102@gmail.com", "mailto:dhruvabhattacharya130102@gmail.com")
]

SEP = " | "
FONT_SIZE = 9.5641
LINK_COLOR = (0, 64/255, 116/255)  # #004074
SEP_COLOR = (0, 0, 0)              # Pure Black
Y_BASELINE = 39.4630126953125      # Exact original baseline

def update_pdf(pdf_path):
    if not os.path.exists(pdf_path):
        print(f"[Skip] File not found: {pdf_path}")
        return

    print(f"[Resume Engine] Processing: {pdf_path}")
    doc = pymupdf.open(pdf_path)
    page = doc[0]

    # 1. Extract embedded CharterBT-Roman font buffer and write to temp font file
    page_fonts = doc.get_page_fonts(0)
    charter_xref = None
    for f in page_fonts:
        if 'CharterBT-Roman' in f[3]:
            charter_xref = f[0]
            break

    if not charter_xref:
        charter_xref = 13

    font_data = doc.extract_font(charter_xref)
    font_buffer = font_data[3]
    
    tmp_font = tempfile.NamedTemporaryFile(suffix='.pfa', delete=False)
    tmp_font.write(font_buffer)
    tmp_font.close()
    font_file = tmp_font.name

    font = pymupdf.Font(fontfile=font_file)

    # 2. Calculate widths and centering
    item_widths = [font.text_length(item[0], fontsize=FONT_SIZE) for item in ITEMS]
    sep_width = font.text_length(SEP, fontsize=FONT_SIZE)
    total_line_width = sum(item_widths) + (len(ITEMS) - 1) * sep_width

    page_width = page.rect.width
    start_x = (page_width - total_line_width) / 2
    print(f"  Page Width: {page_width:.2f}, Line Width: {total_line_width:.2f}, Start X: {start_x:.2f}")

    # 3. Remove old header links in the top region (y < 50)
    for link in page.get_links():
        if link['from'].y0 < 50:
            page.delete_link(link)

    # 4. Redact the entire top contact line
    redact_rect = pymupdf.Rect(20, 29, page_width - 20, 45)
    page.add_redact_annot(redact_rect, fill=(1, 1, 1))
    page.apply_redactions()

    # 5. Insert text and clickable link annotations
    current_x = start_x
    for i, (text, url) in enumerate(ITEMS):
        w = item_widths[i]
        text_point = pymupdf.Point(current_x, Y_BASELINE)
        
        # Render link text
        page.insert_text(
            text_point,
            text,
            fontfile=font_file,
            fontsize=FONT_SIZE,
            color=LINK_COLOR
        )

        # Create clickable link annotation with a comfortable click target
        link_rect = pymupdf.Rect(current_x - 1, Y_BASELINE - FONT_SIZE + 1, current_x + w + 1, Y_BASELINE + 3)
        page.insert_link({
            'kind': pymupdf.LINK_URI,
            'from': link_rect,
            'uri': url
        })

        current_x += w

        # Render separator if not the last item
        if i < len(ITEMS) - 1:
            sep_point = pymupdf.Point(current_x, Y_BASELINE)
            page.insert_text(
                sep_point,
                SEP,
                fontfile=font_file,
                fontsize=FONT_SIZE,
                color=SEP_COLOR
            )
            current_x += sep_width

    # 6. Update role from 'Assistant System Engineer – Backend Developer' to 'System Engineer – Backend Developer'
    blocks = page.get_text('dict')['blocks']
    role_span = None
    for b in blocks:
        for line in b.get('lines', []):
            for span in line.get('spans', []):
                if 'Assistant System Engineer' in span.get('text', ''):
                    role_span = span
                    break
            if role_span:
                break
        if role_span:
            break

    italic_file = None
    if role_span:
        italic_xref = None
        for f in page_fonts:
            if 'CharterBT-Italic' in f[3]:
                italic_xref = f[0]
                break
        if italic_xref:
            italic_font_data = doc.extract_font(italic_xref)
            tmp_italic = tempfile.NamedTemporaryFile(suffix='.pfa', delete=False)
            tmp_italic.write(italic_font_data[3])
            tmp_italic.close()
            italic_file = tmp_italic.name

            # Redact existing span
            bbox = role_span['bbox']
            # Expand slightly to clean up rendering
            role_redact_rect = pymupdf.Rect(bbox[0] - 1, bbox[1] - 1, bbox[2] + 2, bbox[3] + 1)
            page.add_redact_annot(role_redact_rect, fill=(1, 1, 1))
            page.apply_redactions()

            # Insert updated role text
            new_role_text = "System Engineer \u2013 Backend Developer"
            origin = role_span['origin']
            page.insert_text(
                pymupdf.Point(origin[0], origin[1]),
                new_role_text,
                fontfile=italic_file,
                fontsize=role_span['size'],
                color=(0, 0, 0)
            )
            print(f"  [Success] Updated role to: '{new_role_text}'")

    # 7. Save updated PDF
    temp_path = pdf_path + ".tmp"
    doc.save(temp_path, garbage=4, deflate=True)
    doc.close()

    for cleanup_f in [font_file, italic_file]:
        if cleanup_f:
            try:
                os.remove(cleanup_f)
            except:
                pass

    os.replace(temp_path, pdf_path)
    print(f"  [Success] Saved updated PDF to: {pdf_path}")

def verify_pdf(pdf_path):
    print(f"[Verification] Verifying {pdf_path}:")
    doc = pymupdf.open(pdf_path)
    page = doc[0]
    text = page.get_text('text')
    lines = [line.strip() for line in text.split('\n') if line.strip()]
    print(f"  Top text lines: {lines[:8]}")
    
    header_links = [l for l in page.get_links() if l['from'].y0 < 50]
    print(f"  Header links ({len(header_links)}):")
    for l in header_links:
        print(f"    - {l['uri']} at {l['from']}")
    doc.close()

if __name__ == '__main__':
    for path_str in PDF_FILES:
        resolved = os.path.abspath(path_str)
        update_pdf(resolved)
        verify_pdf(resolved)
