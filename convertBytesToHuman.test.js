/*
 * Необходимо покрыть все возможные
 * и невозможные кейсы. Например,
 * convertBytesToHuman(-1) === false,
 * convertBytesToHuman(-1) !== '1 B',
 * convertBytesToHuman('string') === false
 * convertBytesToHuman(5) === '5 B'
 */

import convertBytesToHuman from './convertBytesToHuman';

test('Возвращает false для неправильного типа данных', () => {
  expect(convertBytesToHuman('string')).toBe(false),
  expect(convertBytesToHuman(null)).toBe(false),
  expect(convertBytesToHuman(undefined)).toBe(false),
  expect(convertBytesToHuman(true)).toBe(false),
  expect(convertBytesToHuman(false)).toBe(false),
  expect(convertBytesToHuman([])).toBe(false),
  expect(convertBytesToHuman({})).toBe(false)
});

test('Возвращает false для отрицательных чисел', () => {
  expect(convertBytesToHuman(-1)).toBe(false)
});

test('Возвращает корректное значение для чисел', () => {
  expect(convertBytesToHuman(0)).toBe("0 B"),
  expect(convertBytesToHuman(123123123)).toBe("117.42 MB")
});

// другая группа проверок
