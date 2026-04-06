const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src');
const distDir = path.join(__dirname, '..', 'dist');

// Create dist directory
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Read source files
const variablesCSS = fs.readFileSync(path.join(srcDir, 'variables.css'), 'utf8');
const flintuiCSS = fs.readFileSync(path.join(srcDir, 'flintui.css'), 'utf8');
const flintuiJS = fs.readFileSync(path.join(srcDir, 'flintui.js'), 'utf8');

// Combine CSS (replace @import with actual content)
let combinedCSS = flintuiCSS.replace("@import 'variables.css';", variablesCSS);

// Write non-minified versions
fs.writeFileSync(path.join(distDir, 'flintui.css'), combinedCSS);
fs.writeFileSync(path.join(distDir, 'flintui.js'), flintuiJS);

// Simple minification for CSS
function minifyCSS(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
    .replace(/\s+/g, ' ')              // Collapse whitespace
    .replace(/\s*([{};:,>])\s*/g, '$1') // Remove spaces around symbols
    .replace(/;}/g, '}')               // Remove unnecessary semicolons
    .trim();
}

// Simple minification for JS
function minifyJS(js) {
  return js
    .replace(/\/\*[\s\S]*?\*\//g, '')  // Remove block comments
    .replace(/\/\/.*$/gm, '')           // Remove line comments (basic)
    .replace(/\n+/g, '\n')              // Collapse newlines
    .replace(/^\s+/gm, '')              // Remove leading whitespace
    .trim();
}

// Write minified versions
fs.writeFileSync(path.join(distDir, 'flintui.min.css'), minifyCSS(combinedCSS));
fs.writeFileSync(path.join(distDir, 'flintui.min.js'), minifyJS(flintuiJS));

console.log('Build complete!');
console.log('  dist/flintui.css');
console.log('  dist/flintui.min.css');
console.log('  dist/flintui.js');
console.log('  dist/flintui.min.js');
