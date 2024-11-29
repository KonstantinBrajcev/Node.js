# Kastett Quadratic

Библиотека для решения квадратных уравнений.

## Установка

```bash
npm install kastett-quadratic

## Пример использования

const { solveQuadratic } = require('kastett-quadratic');

const roots = solveQuadratic(1, -3, 2); // x^2 - 3x + 2 = 0
console.log(roots); // [2, 1]
