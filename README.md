# Invoice
Project PT.Fiesto Informatika | Invoice


## Proses Instalasi Project
### Instalasi pada server
Untuk bagian server maka lakukan perintah :
1. cd server
2. npm install

### Instalasi pada client
Untuk bagian server maka lakukan perintah :
1. cd client
2. npm install

3. ### Database Setting
1. import openpo_db.sql pada software sql apapun (contoh: phpmyadmin)
2. Tambahkan settingan database berikut di file .env
   -DATABASE = ,
   -DATABASE_HOST = ,
   -DATABASE_USER = ,
   -DATABASE_PASSWORD = '',
   -DATABASE_DIALECT = ,

   tambahan pada file .env:
   ACCESS_TOKEN_SECRET=
   REFRESH_TOKEN_SECRET=

   PORT=

## Proses Development
### Untuk mengaktifkan Server maka yang perlu dilakukan adalah :
1. Nyalakan Laragon/Xampp
2. kemudian pergi ke folder server (cd server)
3. Lalu, buka terminal dan jalankan perintah `nodemon app`
4. Server sudah siap dieksekusi


### Untuk mengaktifkan Client maka yang perlu dilakukan adalah :
1. Pergi ke folder Client
2. Lalu, buka terminal dan jalankan perintah `npm run dev`
3. Lalu copy dan paste url `http://localhost:5173` pada browser
4. Client sudah siap digunakan

