function solveQuadratic(a, b, c) {
  if (a === 0) {
    throw new Error("Коэффициент 'a' не может быть равен 0.");
  }
  const discriminant = b * b - 4 * a * c;
  if (discriminant < 0) {
    return null; // Нет действительных корней
  } else if (discriminant === 0) {
    const root = -b / (2 * a);
    return [root]; // Один корень
  } else {
    const root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
    const root2 = (-b - Math.sqrt(discriminant)) / (2 * a);
    return [root1, root2]; // Два корня
  }
}

module.exports = {
  solveQuadratic,
};
