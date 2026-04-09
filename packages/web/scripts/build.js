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
const cronixuiCSS = fs.readFileSync(path.join(srcDir, 'cronixui.css'), 'utf8');
const cronixuiJS = fs.readFileSync(path.join(srcDir, 'cronixui.js'), 'utf8');

// Combine CSS (replace @import with actual content)
let combinedCSS = cronixuiCSS.replace("@import 'variables.css';", variablesCSS);

// Write non-minified versions
fs.writeFileSync(path.join(distDir, 'cronixui.css'), combinedCSS);
fs.writeFileSync(path.join(distDir, 'cronixui.js'), cronixuiJS);

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
fs.writeFileSync(path.join(distDir, 'cronixui.min.css'), minifyCSS(combinedCSS));
fs.writeFileSync(path.join(distDir, 'cronixui.min.js'), minifyJS(cronixuiJS));

console.log('Build complete!');
console.log('  dist/cronixui.css');
console.log('  dist/cronixui.min.css');
console.log('  dist/cronixui.js');
console.log('  dist/cronixui.min.js');
