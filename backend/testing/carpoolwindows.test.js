const validateWindow = require('./LoginWindow');
const isObjectEmpty = require('./CreatePoolWindow.js')

test('validate login', () => {
  expect(validateInput('input')).toBe(True);
});

test('validate login2', () => {
  expect(validateInput('')).toBe(False);
});

test('carpool object empty', () => {
  expect(isObjectEmpty('')).toBe(True);
});

test('empty carpool2', () => {
  expect(isObjectEmpty('carpool')).toBe(False);
});


