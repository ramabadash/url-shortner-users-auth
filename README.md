# Final 1 - URL shortner 📎

## A front-To-End solution to "URL shortner" web app.

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/2048px-Unofficial_JavaScript_logo_2.svg.png" height="50px" width="50px"> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/CSS3_logo_and_wordmark.svg/1200px-CSS3_logo_and_wordmark.svg.png" height="50px" width="50px"> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/1200px-HTML5_logo_and_wordmark.svg.png" height="50px" width="50px"> <img src="https://webpack.js.org/icon-pwa-512x512.d3dae4189855b3a72ff9.png" height="50px" width="50px"> <img src="https://assets.zabbix.com/img/brands/nodejs.svg" height="50px" width="50px"> <img src="https://global-uploads.webflow.com/5cf0336da4a8370fc7965c51/5e6db7ee0f8bc3eb22b340fe_3wgIDj3j.png" height="50px" width="50px"> <img src="https://assets-global.website-files.com/6130fa1501794e37c21867cf/6191a3901b4f74718ba3916a_613294646e81b85ff5c7a1ef_MongoDB.svg" height="50px" width="50px">

---

### Technologies in use - 👩‍💻👨‍💻

#### **Frontend - | HTML | JS | CSS | Webpack |**

#### **BackEnd - | Node JS | MongoDB |**

#### Packages - 📦

- **Backend: [nodemon](https://www.npmjs.com/package/nodemon), [express](https://www.npmjs.com/package/express), [moment](https://momentjs.com/), [mongoose](https://mongoosejs.com/), [jwt](https://jwt.io/), [cookie-parser](https://www.npmjs.com/package/cookie-parser).**

#### **Deployment**

- **Heroku**

---

## My app -

---

## Global use - 🌎

#### ✨ Visit my app! - https://vry-short.herokuapp.com ✨

---

## Features - 💫

### The app is designed to allow the customer to shorten a long and inelegant address and use a short / custom address instead.

#### 🔹 SignUp and Login to the site by entering a username, password and email and using your own database

### You can navigate with the help of the NAV-BAR at the top of the page between the functionality of the site like :

#### 🔹 Home page- 🏠

- **An address can be shortened by copying it to the input line and clicking a button. This service is also available to unregistered users.**

#### 🔹 Statistics- 📊

- **You can write a short link provided by the site to get the following information about it: the date it was created, the number of times it was used, the original link from which it was created and its identity card.**

#### 🔹 User Management- 👥

- **You are using a database that is customized for you.**
- **You can create a custom link - you must provide a link plus a custom word and it will be returned to you accordingly.**
- **Clicking on the history button will display the short links provided to you and the date they were created.**
- **You can delete links from your history**

#### 🔹 Special page for 404 error as a result of an incorrect shortcut, there are 2 options to return to the home page of the site or return to the user history.

---

## Special things about development 💻⚙

### 🔹 **Persistence DB 🗂 - Using MongoDB and mongoose functionality.**

### 🔹 **Users Authentication -**

- **Login and registration page with username, password and email address**
- **Use JWT to create a unique token that allows the user to log in to the site and use it only after it has been approved as valid.**

### 🔹 **Encrypted passwords - Using bcrypt package to save hash passwords**

### 🔹 **Generate Id for every url -** By using the simple code in order to produce a unique and yet not too long id. Based on a combination of numbers and letters with the sign "\_" - `'_' + Math.random().toString(36).substr(2, 9)`

### 🔹 **Using Webpack for the front part 🌐 - Use 3 html pages and 3 different js pages for: Login page, homepage and dedicated page for address not found**

### 🔹 **Unique users count by their IP address when they redirect to the original address**

---

## Screenshots 📸 -

<img src="./readme-img/home.png" width="100%" height="50%">
<img src="./readme-img/shortUrl.png" width="100%" height="50%">
<img src="./readme-img/stats.png" width="100%" height="50%">
<img src="./readme-img/userManagment.png" width="100%" height="70%">
<img src="./readme-img/not-found.png" width="100%" height="70%">
<img src="./readme-img/login.png" width="100%" height="70%">
<img src="./readme-img/signUp.png" width="100%" height="70%">
