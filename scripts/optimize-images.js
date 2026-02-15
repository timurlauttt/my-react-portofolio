import fs from 'fs/promises';
import path from 'path';

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (e) => {
    const res = path.resolve(dir, e.name);
    return e.isDirectory() ? walk(res) : res;
  }));
  return Array.prototype.concat(...files);
}

async function main() {
  let sharp;
  try {
    sharp = (await import('sharp')).default;
  } catch (err) {
    console.error('`sharp` is not installed. Run `npm install sharp --save-dev` and retry.');
    process.exitCode = 2;
    return;
  }

  const srcDir = path.resolve('public/images');
  const outDir = path.resolve('public/images/optimized');
  await fs.mkdir(outDir, { recursive: true });

  const all = await walk(srcDir);
  const images = all.filter(f => /\.(jpe?g|png|webp|avif)$/i.test(f));
  if (images.length === 0) {
    console.log('No images found in', srcDir);
    return;
  }

  console.log(`Found ${images.length} images — optimizing to ${outDir}`);

  await Promise.all(images.map(async (file) => {
    try {
      const rel = path.relative(srcDir, file);
      const base = path.join(outDir, rel);
      await fs.mkdir(path.dirname(base), { recursive: true });

      const ext = path.extname(file).toLowerCase();
      const outWebp = base.replace(ext, '.webp');

      await sharp(file)
        .webp({ quality: 80 })
        .toFile(outWebp);

      if (ext === '.png') {
        // also produce a compressed png fallback
        await sharp(file)
          .png({ quality: 80, compressionLevel: 9 })
          .toFile(base);
      } else {
        // produce optimized jpeg for jpg/jpeg
        await sharp(file)
          .jpeg({ quality: 80 })
          .toFile(base);
      }

      console.log('Optimized', rel);
    } catch (err) {
      console.error('Failed to process', file, err.message || err);
    }
  }));

  console.log('Image optimization complete. Outputs in public/images/optimized');
}

main();
