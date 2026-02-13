# LinkHome

**LinkHome** is a full-stack web application designed to simplify the process of finding rental rooms and compatible flatmates across India.  
It focuses on **real Indian constraints** such as **Pure Veg preference**, **gender-based listings**, and **lifestyle compatibility**, making it especially useful for students and working professionals relocating to new cities.

---

## ✨ Pro Features
- **Smart Cloud Media**: Direct image uploading via Cloudinary integration.
- **Real-Time Feedback**: Global toast notifications for seamless UX.
- **Culture-First Filters**: Toggle "Pure Veg" and "Gender" tags instantly.
- **Owner Authentication**: Secure JWT-based login/signup to manage your own listings.
- **Reset & Refine**: Instant search clearing and real-time location filtering.

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



## 📂 Recent Updates
- [x] Integrated **Cloudinary** for image hosting (No more manual URLs!)
- [x] Added **Protected Routes** for listing management
- [x] Implemented **Global Toast System** for better user feedback
- [x] Optimized **MySQL Schema** for lifestyle tags

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
