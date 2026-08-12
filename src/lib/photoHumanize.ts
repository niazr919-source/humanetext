import sharp from "sharp";

const MAX_DIMENSION = 2400;

async function buildGrainLayer(width: number, height: number, strength: number) {
  const pixelCount = width * height;
  const noise = Buffer.alloc(pixelCount * 3);

  for (let i = 0; i < pixelCount; i++) {
    const value = 128 + (Math.random() - 0.5) * 2 * strength;
    const clamped = Math.max(0, Math.min(255, Math.round(value)));
    const offset = i * 3;
    noise[offset] = clamped;
    noise[offset + 1] = clamped;
    noise[offset + 2] = clamped;
  }

  return sharp(noise, { raw: { width, height, channels: 3 } })
    .blur(0.35)
    .png()
    .toBuffer();
}

export async function humanizePhoto(inputBuffer: Buffer): Promise<Buffer> {
  const image = sharp(inputBuffer, { failOn: "none" }).rotate();
  const metadata = await image.metadata();

  const width = metadata.width ?? MAX_DIMENSION;
  const height = metadata.height ?? MAX_DIMENSION;
  const scale = Math.min(1, MAX_DIMENSION / Math.max(width, height));
  const targetWidth = Math.round(width * scale);
  const targetHeight = Math.round(height * scale);

  const resized = image.resize(targetWidth, targetHeight, { fit: "inside" });

  const grain = await buildGrainLayer(targetWidth, targetHeight, 10);

  return resized
    .composite([{ input: grain, blend: "overlay" }])
    .sharpen({ sigma: 0.4 })
    .modulate({ saturation: 1.02 })
    .jpeg({ quality: 92, chromaSubsampling: "4:2:0", mozjpeg: true })
    .toBuffer();
}
