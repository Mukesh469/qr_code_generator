# QR Code Generator

Simple Node.js + Express app that generates QR code PNGs and serves them from `qr_images/`.

**Project files**:
- `server.js`: Express server that exposes the `/generate` endpoint and serves static files from `public/` and generated images from `qr_images/`.
- `public/`: static frontend (if present).
- `qr_images/`: generated PNG files are saved here.

**Prerequisites**:
- Node.js (v16+ recommended)
- npm

**Install**:

```bash
npm install
```

**Run**:

```bash
# If `package.json` has a start script:
npm start

# Or run the server directly (Node must support ES modules):
node server.js
```

Note: `server.js` uses ES module `import` syntax. Ensure your `package.json` contains `"type": "module"` or run with an appropriate Node flag.

**API**:

- `POST /generate`
  - Request body (JSON): `{ "url": "https://example.com" }` — `url` is required.
  - Behavior: generates a PNG QR code and saves it to `qr_images/{hostname}.png` (hostname stripped of `www.` and TLD — e.g. `example.png`).
  - Response example:

```json
{
  "message": "QR Code Generated",
  "file": "/qr/example.png"
}
```

- `GET /qr/<name>.png` serves generated images from `qr_images/`.
- Static files in `public/` are served at the site root.

**Example (curl)**:

```bash
curl -X POST http://localhost:3000/generate \
  -H "Content-Type: application/json" \
  -d '{"url":"example.com"}'
```

After a successful request, open the returned `file` URL in your browser, for example:

```
http://localhost:3000/qr/example.png
```

**Notes**:
- Generated images are written to disk immediately; ensure `qr_images/` is writable.
- The server listens on port `3000` by default (see `server.js`).

**License**: MIT — see `LICENSE` file
