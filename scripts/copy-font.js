const fs = require("fs");
const path = require("path");

const src = path.join(
  process.cwd(),
  "node_modules",
  "three",
  "examples",
  "fonts",
  "helvetiker_regular.typeface.json",
);
const dest = path.join(
  process.cwd(),
  "public",
  "helvetiker_regular.typeface.json",
);

console.log(`Copying from ${src} to ${dest}...`);

try {
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log("Success: Font file copied.");
  } else {
    console.error("Error: Source file not found at " + src);
  }
} catch (err) {
  console.error("Error copying file:", err);
}
