const path = require('path')
const fs = require('fs')

const diff = require('../src/diff.js')
const patch = require('../src/patch.js')

try {
  fs.unlinkSync('./a-b.patch')
  fs.unlinkSync('./b.new.txt')
} catch (e) {}

test('Do diff', async () => {
  await diff('a.txt', 'b.txt')
  expect(fs.existsSync('./a-b.patch')).toBe(true);
});

test('Do patch', async () => {
  await patch('a.txt', 'b.new.txt', './a-b.patch')
  expect(fs.readFileSync('./b.new.txt', 'utf-8')).toBe('BBB');
});
