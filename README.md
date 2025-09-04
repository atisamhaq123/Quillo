# BloggingApp 📝

A simple blogging application built with **Node.js, Express, MongoDB (remote)**, and the **MVC pattern**.  
It supports user roles, authentication, and blog management with a clean and minimalistic design.

---

## 🚀 Features
- **Authentication**
  - Register & Login
  - Secure password hashing (bcrypt)
  - JWT-based authentication (stored in cookies)
  - Logout functionality

- **User Roles**
  - **Admin** → can add, delete, and view all blogs
  - **Writer** → can add and view blogs, but cannot delete unless admin

- **Blogs**
  - Add new blogs ✍️
  - Get all blogs 📖
  - Delete blogs (admin only ❌)

- **Architecture**
  - Follows the **MVC pattern** (Models, Views, Controllers)
  - Minimalistic design with server-side rendered views (EJS / Pug / Handlebars)

---

## 🛠️ Tech Stack
- **Backend**: Node.js, Express
- **Database**: MongoDB (remote cluster)
- **Auth**: JWT, bcrypt using cookie storage
- **Views**: EJS (or whichever templating engine you chose)
- **Design**: Minimal and clean

---

## 📂 Project Structure
├── controllers/ # Route logic (blogController, authController)
├── models/ # Mongoose schemas (User, Blog)
├── routes/ # Express route definitions
├── views/ # EJS templates (minimalistic design)
├── middleware/ # Auth & role-based middleware
├── public/ # Static assets (CSS, JS, images)
├── utils/ # Helper utilities (token generator, formatters, etc.)
├── app.js # Main app entry
└── README.md

---

## ⚙️ Setup & Run

1. Clone the repo:
   ```bash
   git clone https://github.com/your-username/bloggingApp.git
   cd bloggingApp
2. npm install
3. npm start
4. Add .env file:
   MONGO_URI=your-mongodb-connection-string
   JWT_SECRET=your-secret-key
   PORT=3000

