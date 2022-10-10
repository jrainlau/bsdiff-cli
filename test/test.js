const path = require('path')
const fs = require('fs')

const diff = require('../src/diff.js')
const patch = require('../src/patch.js')

test('Do diff', async () => {
  await diff('a.txt', 'b.txt')
  expect(fs.existsSync('./a.txt-b.txt.patch')).toBe(true);
});

test('Do patch', async () => {
  await patch('a.txt', 'b.new.txt', './a.txt-b.txt.patch')
  expect(fs.readFileSync('./b.new.txt', 'utf-8')).toBe('BBB');
});
