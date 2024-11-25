const http = require('http');

let homePageViews = 0;
let aboutPageViews = 0;

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        homePageViews++;
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.end(`<html>
                <head><title>Home Page</title></head>
                <body>
                    <h1>Home Page</h1>
                    <h1>Размеры экрана</h1>
                    <p id="dimensions"></p>
                    <p>Количество просмотров: ${homePageViews}</p>
                    <a href="/about">Перейти на страницу About</a>
                    <script>
                    function updateDimensions() {
                        const width = window.innerWidth;
                        const height = window.innerHeight;
                        document.getElementById('dimensions').textContent = \`Ширина: \${width}px, Высота: \${height}px\`;}
                        updateDimensions();
                        window.addEventListener('resize', updateDimensions);
                    </script >
                </body></html>`);
    } else if (req.url === '/about') {
        aboutPageViews++;
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.end(`<html>
                <head><title>About Page</title></head>
                <body>
                    <h1>About Page</h1>
                    <h1>Размеры экрана</h1>
                    <p id="dimensions"></p>
                    <p>Количество просмотров: ${aboutPageViews}</p>
                    <a href="/">Перейти на главную страницу</a>
                    <script>
                    function updateDimensions() {
                        const width = window.innerWidth;
                        const height = window.innerHeight;
                        document.getElementById('dimensions').textContent = \`Ширина: \${width}px, Высота: \${height}px\`;}
                        updateDimensions();
                        window.addEventListener('resize', updateDimensions);
                    </script >
                </body></html>`);
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
                <script>
                    function updateDimensions() {
                        const width = window.innerWidth;
                        const height = window.innerHeight;
                        document.getElementById('dimensions').textContent = \`Ширина: \${width}px, Высота: \${height}px\`;}
                        updateDimensions();
                        window.addEventListener('resize', updateDimensions);
                </script >
                </body></html>`);
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
