const http = require('http');
const fs = require('fs');
const path = require('path');

const viewsFilePath = path.join(__dirname, 'views.json');

let viewsData = {};

// Функция для загрузки данных из файла
function loadViewsData() {
  if (fs.existsSync(viewsFilePath)) {
    const data = fs.readFileSync(viewsFilePath);
    viewsData = JSON.parse(data);
  } else {
    viewsData = { '/': 0, '/about': 0 }; // Инициализация, если файл не существует
  }
}

// Функция для сохранения данных в файл
function saveViewsData() {
  fs.writeFileSync(viewsFilePath, JSON.stringify(viewsData, null, 2));
}

// Функция для генерации HTML-кода
function generatePage(title, content, viewCount) {
  return `<html>
                <head><title>${title}</title></head>
                <body>
                    <h1>${title}</h1>
                    <h1>Размеры экрана</h1>
                    <p id="dimensions"></p>
                    <p>Количество просмотров: ${viewCount}</p>
                    <a href="/">Перейти на главную страницу</a>
                    <script src="/dimensions.js"></script>
                </body>
            </html>`;
}

// Загрузка данных при старте сервера
loadViewsData();

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    viewsData['/']++;
    saveViewsData(); // Сохранение данных
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end(generatePage('Home Page', '', viewsData['/']));
  } else if (req.url === '/about') {
    viewsData['/about']++;
    saveViewsData(); // Сохранение данных
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end(generatePage('About Page', '', viewsData['/about']));
  } else if (req.url === '/dimensions.js') {
    fs.readFile(path.join(__dirname, 'dimensions.js'), (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end('Ошибка сервера');
        return;
      }
      res.setHeader('Content-Type', 'application/javascript');
      res.end(data);
    });
  } else {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end(`<html>
                    <head><title>404 Not Found</title></head>
                    <body>
                        <h1>404 - Страница не найдена</h1>
                        <h1>Размеры экрана</h1>
                        <p id="dimensions"></p>
                        <p>Извините, такая страница не существует.</p>
                        <a href="/">Вернуться на главную страницу</a>
                        <script src="/dimensions.js"></script>
                    </body>
                </html>`);
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
