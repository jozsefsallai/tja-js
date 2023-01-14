// This file is meant to be run on a directory containing several TJA files
// (such as ESE). It will try to parse every TJA file in the directory and its
// subdirectories, and will stop when it encounters an error. The goal is to
// find any edge cases that the parser might not handle correctly.

const fs = require('fs');
const path = require('path');

const iconv = require('iconv-lite');
const chardet = require('chardet');

const { TJAParser } = require('../dist');

const dir = process.argv[2] || process.cwd();

async function* walk(src) {
  for await (const d of await fs.promises.opendir(src)) {
    const entry = path.join(src, d.name);
    if (d.isDirectory()) {
      yield* walk(entry);
    } else if (d.isFile()) {
      yield entry;
    }
  }
}

function parseFile(file) {
  const buffer = fs.readFileSync(file);
  const encoding = chardet.detect(buffer);
  const text = iconv.decode(buffer, encoding);

  try {
    const song = TJAParser.parse(text);
    console.log(`Successfully parsed song ${song.title}.`);
  } catch (e) {
    console.error(`Failed to parse song ${file}.`);
    throw e;
  }
}

async function run() {
  for await (const file of walk(dir)) {
    if (path.extname(file) === '.tja') {
      parseFile(file);
    }
  }
}

run().catch(console.error);
