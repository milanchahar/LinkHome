# LinkHome

**LinkHome** is a full-stack web application designed to simplify the process of finding rental rooms and compatible flatmates across India.  
It focuses on **real Indian constraints** such as **Pure Veg preference**, **gender-based listings**, and **lifestyle compatibility**, making it especially useful for students and working professionals relocating to new cities.

---

## 🌟 Key Features

- List rooms/flats with detailed preferences
- Filter listings based on:
  - Dietary preference (Pure Veg)
  - Gender preference
  - Location
- Clean and responsive UI
- Persistent data storage with MySQL
- Scalable backend architecture

---

## 🛠️ Full-Stack Technical Architecture

### **Frontend (Client-Side)**
- **Framework**: React.js (Vite) for fast builds and optimized performance
- **API Communication**: Axios for asynchronous HTTP requests
- **Styling**: Custom CSS for responsive layouts and listing cards
- **Port**: `5173`

---

### **Backend & Database (Server-Side)**
- **Runtime**: Node.js
- **Framework**: Express.js (RESTful APIs)
- **Database**: MySQL (Relational Database)
- **ORM**: Prisma (type-safe queries & migrations)
- **Security**: CORS enabled for safe client-server communication
- **Port**: `5001`

---

## ⚙️ Installation & Setup

### **1. Server Configuration**
```bash
cd server
npm install
npx prisma generate
node index.js


### **2. Client Configuration**
```bash
cd client
npm install
npm run dev

### **3. Database Visualization**
npx prisma studio
