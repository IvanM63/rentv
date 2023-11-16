# rentv
RentV is a web application for vehicle management

## User List (Admin & Supervisor)
### Admin
email: ivan@gmail.com
password: ivan123

email: admin1@gmail.com
password: admin123

### Supervisor
email: supervisor1@gmail.com
password: supervisor123

email: supervisor2@gmail.com
password: supervisor123

email: supervisor3@gmail.com
password: supervisor123

email: supervisor4@gmail.com
password: supervisor123

## Version
- PHP version: PHP 8.2.0
- Database ver mysql 10.4.27:
- Framework/Library: - React 18.2.0 - Expressjs 4.18.2

## Petunjunk Penggunaan Pada Masing masing

### [Server]
1. Jalankan "npm install express" pada terminal
2. Untuk running server jalankan "nodemon server.js" pada terminal
3. Server akan berjalan pada "localhost:5000"

### [Client]
1. Jalankan "npm install" pada terminal
2. Untuk running server jalankan "npm run start" pada terminal
3. Website akan berjalan pada "localhost:3000"

### [Database]
1. Pindahkan folder rent_db ke "./XAMPP/mysql/data/"
2. Lalu jalankan XAMPP


## Other
- Bila ingin menambahkan user baru, gunakan request post ke "localhost:5000/users" dengan body sbb:

o- body :

    {
    "name": "Admin1",
    "email": "admin1@gmail.com",
    "password": "admin123",
    "confPassword": "admin123",
    "role": "admin" }
-o


