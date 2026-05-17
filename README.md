# Announcement API

REST API для роботи з оголошеннями. Сервер реалізований на Express та працює з базою даних SQLite через Prisma.

## Встановлення

1. Встановити залежності:
npm install

2. Згенерувати Prisma клієнт:
npx prisma generate

3. Виконати міграцію бази даних:
npx prisma migrate dev

4. Запустити сервер:
npm start

Сервер буде доступний за адресою:
http://localhost:3000

Swagger документація:
http://localhost:3000/api-docs

---

## Технології

- Node.js
- Express 5
- Prisma (SQLite)
- Celebrate + Joi (валідація)
- Swagger (документація API)

---

## Структура проєкту

```
announcement-api/
├── prisma/
│   ├── migrations/
│   ├── schema.prisma
│   └── client.js
├── src/
│   ├── controllers/
│   ├── routes/
│   └── validators/
├── app.js
├── requests.http
├── prisma.config.ts
├── package.json
└── package-lock.json
```

---

## API Маршрути

GET /announcements — список оголошень (search, sort, page)  
GET /announcements/:id — одне оголошення  
POST /announcements — створення  
PATCH /announcements/:id — оновлення  
DELETE /announcements/:id — видалення  

---

## Валідація

Використовується бібліотека celebrate.

Перевіряється:
- обов'язковість полів
- довжина рядків
- типи даних
- допустимі значення category
- позитивне значення price

---

## Функціонал

- Пошук по назві оголошення
- Сортування за датою створення
- Пагінація (10 записів на сторінку)
- Обробка помилок (400, 404, 500)
- Валідація запитів

---

## Тестування

Для тестування використовується файл requests.http.

Його можна запускати через REST Client у VS Code або перевіряти API через Swagger UI.
