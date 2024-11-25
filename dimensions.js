function updateDimensions() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  document.getElementById('dimensions').textContent = `Ширина: ${width}px, Высота: ${height}px`;
}

// Обновляем размеры экрана при загрузке страницы
updateDimensions();

// Обновляем размеры экрана при изменении размера окна
window.addEventListener('resize', updateDimensions);