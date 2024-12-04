const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const FILE_PATH = path.join(__dirname, 'users.json');

app.use(bodyParser.json());

// Функция для чтения данных из файла
const readUsersFromFile = () => {
  if (!fs.existsSync(FILE_PATH)) {
    return [];
  }
  const data = fs.readFileSync(FILE_PATH);
  return JSON.parse(data);
};

// Функция для записи данных в файл
const writeUsersToFile = (users) => {
  fs.writeFileSync(FILE_PATH, JSON.stringify(users, null, 2));
};

// Получение всех пользователей
app.get('/users', (req, res) => {
  const users = readUsersFromFile();
  res.json(users);
});

// Получение пользователя по ID
app.get('/users/:id', (req, res) => {
  const users = readUsersFromFile();
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).send('Пользователь не найден');
  }
  res.json(user);
});

// Создание нового пользователя
app.post('/users', (req, res) => {
  const users = readUsersFromFile();
  const newUser = { id: users.length + 1, ...req.body };
  users.push(newUser);
  writeUsersToFile(users);
  res.status(201).json(newUser);
});

// Обновление пользователя
app.put('/users/:id', (req, res) => {
  const users = readUsersFromFile();
  const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
  if (userIndex === -1) {
    return res.status(404).send('Пользователь не найден');
  }
  users[userIndex] = { id: parseInt(req.params.id), ...req.body };
  writeUsersToFile(users);
  res.json(users[userIndex]);
});

// Удаление пользователя
app.delete('/users/:id', (req, res) => {
  const users = readUsersFromFile();
  const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
  if (userIndex === -1) {
    return res.status(404).send('Пользователь не найден');
  }
  users.splice(userIndex, 1);
  writeUsersToFile(users);
  res.status(204).send();
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
