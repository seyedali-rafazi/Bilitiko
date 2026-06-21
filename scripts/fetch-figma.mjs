#!/usr/bin/env node
/**
 * Fetch structure from Figma API using .env.local credentials.
 * Usage: node scripts/fetch-figma.mjs [output-dir]
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

function loadEnv() {
  const envPath = join(root, '.env.local');
  const lines = readFileSync(envPath, 'utf8').split('\n');
  const env = {};
  for (const line of lines) {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (m) env[m[1].trim()] = m[2].trim();
  }
  if (!env.FIGMA_ACCESS_TOKEN || !env.FIGMA_FILE_KEY) {
    throw new Error('Missing FIGMA_ACCESS_TOKEN or FIGMA_FILE_KEY in .env.local');
  }
  return env;
}

async function figmaGet(path, token) {
  const res = await fetch(`https://api.figma.com/v1${path}`, {
    headers: { 'X-Figma-Token': token },
  });
  if (!res.ok) throw new Error(`Figma API ${res.status}: ${await res.text()}`);
  return res.json();
}

function listTopScreens(nodeDoc) {
  return (nodeDoc.children || [])
    .filter((c) => c.type === 'FRAME')
    .map((c) => ({
      name: c.name,
      id: c.id,
      width: Math.round(c.absoluteBoundingBox?.width || 0),
      height: Math.round(c.absoluteBoundingBox?.height || 0),
      platform: (c.absoluteBoundingBox?.width || 0) >= 1200 ? 'desktop' : 'mobile',
    }));
}

const UI_PAGE_ID = '917:2572';
const STYLE_GUIDE_ID = '57:2';

const { FIGMA_ACCESS_TOKEN, FIGMA_FILE_KEY } = loadEnv();
const outDir = process.argv[2] || join(root, 'lib', 'figma');
mkdirSync(outDir, { recursive: true });

console.log('Fetching Figma file metadata...');
const file = await figmaGet(`/files/${FIGMA_FILE_KEY}?depth=1`, FIGMA_ACCESS_TOKEN);
const pages = file.document.children.map((c) => ({ id: c.id, name: c.name }));

console.log('Fetching UI screens...');
const ui = await figmaGet(
  `/files/${FIGMA_FILE_KEY}/nodes?ids=${encodeURIComponent(UI_PAGE_ID)}&depth=1`,
  FIGMA_ACCESS_TOKEN
);
const screens = listTopScreens(ui.nodes[UI_PAGE_ID].document);

console.log('Fetching style guide colors...');
const sg = await figmaGet(
  `/files/${FIGMA_FILE_KEY}/nodes?ids=${encodeURIComponent(STYLE_GUIDE_ID)}&depth=4`,
  FIGMA_ACCESS_TOKEN
);

function extractColors(node, out = []) {
  if (!node) return out;
  if (node.fills) {
    for (const f of node.fills) {
      if (f.type === 'SOLID' && f.color && node.name) {
        const { r, g, b } = f.color;
        out.push({
          name: node.name,
          hex: '#' + [r, g, b].map((x) => Math.round(x * 255).toString(16).padStart(2, '0')).join(''),
        });
      }
    }
  }
  for (const c of node.children || []) extractColors(c, out);
  return out;
}

const rawColors = extractColors(sg.nodes[STYLE_GUIDE_ID].document);
const colors = [...new Map(rawColors.map((c) => [c.hex, c])).values()];

const manifest = {
  fileKey: FIGMA_FILE_KEY,
  fileName: file.name,
  lastModified: file.lastModified,
  pages,
  uiPageId: UI_PAGE_ID,
  screenCount: screens.length,
  screens,
  colors,
  fetchedAt: new Date().toISOString(),
};

writeFileSync(join(outDir, 'manifest.json'), JSON.stringify(manifest, null, 2));
console.log(`Done. ${screens.length} screens, ${colors.length} colors → lib/figma/manifest.json`);
