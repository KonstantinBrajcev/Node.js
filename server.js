const http = require('http');

let homePageViews = 0;
let aboutPageViews = 0;

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        homePageViews++;
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`<html>
                <head><title>Home Page</title></head>
                <body>
                    <h1>Home Page</h1>
                    <p>Количество просмотров: ${homePageViews}</p>  
                    <a href="/about">Перейти на страницу About</a>
                </body>
            </html>`);
    } else if (req.url === '/about') {
        aboutPageViews++;
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`<html>
                <head><title>About Page</title></head>
                <body>
                    <h1>About Page</h1>
                    <p>Количество просмотров: ${aboutPageViews}</p>
                    <a href="/">Перейти на главную страницу</a>
                </body>
            </html>`);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end(`<html>
                <head><title>404 Not Found</title></head>
                <body>
                    <h1>404 - Страница не найдена</h1>
                    <p>Извините, такая страница не существует.</p>
                    <a href="/">Вернуться на главную страницу</a>
                </body>
            </html>`);
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
