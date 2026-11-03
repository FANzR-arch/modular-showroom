"""Print catalogue.html to assets/catalogue/catalogue.pdf (same data as scents.html, from assets/parts.js).

Usage (with the site served on localhost, e.g. `python -m http.server 5330`):
    python tools/build-catalogue.py [--port 5330] [--browser "path/to/msedge-or-chrome"]
Needs Microsoft Edge or Google Chrome.
"""
import argparse, os, shutil, subprocess, sys, tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CANDIDATES = [
    r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe',
    r'C:\Program Files\Google\Chrome\Application\chrome.exe',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
    'google-chrome', 'chromium', 'chromium-browser', 'microsoft-edge',
]


def find_browser(given):
    for c in ([given] if given else []) + CANDIDATES:
        if c and (os.path.exists(c) or shutil.which(c)):
            return shutil.which(c) or c
    sys.exit('No Edge or Chrome found. Pass --browser "path/to/browser".')


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--port', default='5330')
    ap.add_argument('--browser')
    a = ap.parse_args()
    out = ROOT / 'assets' / 'catalogue' / 'catalogue.pdf'
    out.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory() as tmp:
        subprocess.run([find_browser(a.browser), '--headless=new', '--no-pdf-header-footer',
                        '--virtual-time-budget=10000', f'--user-data-dir={tmp}', f'--print-to-pdf={out}',
                        f'http://localhost:{a.port}/catalogue.html'], check=True, capture_output=True, timeout=120)
    print('ok', out.relative_to(ROOT))


if __name__ == '__main__':
    main()
