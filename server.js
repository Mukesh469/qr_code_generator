import express from 'express';
import qr from 'qr-image';
import fs from 'fs';

const PORT = 3000;

const app = express();
app.use(express.json());
app.use(express.static("public"));


app.post("/generate", (req, res) => {
    const { url } = req.body;

    if ( !url ) return res.status(400).json({ error: "URL required" });

    const parsedUrl = new URL(url.startsWith("http") ? url : `https://${url}`)
    const name = parsedUrl.hostname.replace("www.", "").split(".")[0];

    const qr_png = qr.image(url, { type: "png" });
    const filepath = `./qr_images/${name}.png`;

    qr_png.pipe(fs.createWriteStream(filepath));

    res.json({
        message: `QR Code Generated`,
        file: `/qr/${name}.png`
    });

});

app.use("/qr", express.static("qr_images"));

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})