# LinkHome

## Introduction
LinkHome is a full-stack web application designed to simplify the process of finding rental rooms and compatible flatmates across India. It focuses on **real Indian constraints** such as **Pure Veg preference**, **gender-based listings**, and **lifestyle compatibility**, making it especially useful for students and working professionals relocating to new cities.

## Project Type
Fullstack

## Deployed App
Frontend: [https://linkhome-client.vercel.app](https://linkhome-client.vercel.app)
Backend: [https://linkhome.onrender.com](https://linkhome.onrender.com)
Database: [Supabase PostgreSQL](https://supabase.com/)

## Directory Structure
```text
LinkHome/
├── client/                # Frontend application (React + Vite)
│   ├── src/
│   │   ├── components/    # Reusable UI components (Navbar, ListRoom, Auth)
│   │   ├── pages/         # Page-level components (Home, MessagingHub, PropertyView)
│   │   ├── utils/         # API hooks and utility functions
│   │   ├── App.jsx        # Routing and entry logic
│   │   └── index.css      # Styling (Tailwind CSS)
│   ├── public/            # Static assets (images, icons)
│   └── package.json       # Client-side dependencies
├── server/                # Backend application (Node.js + Express)
│   ├── prisma/            # Database schema & configuration
│   ├── index.js           # Server entry point & API routes
│   └── package.json       # Server-side dependencies
└── README.md              # Project documentation
```


## Features
List out the key features of your application.

- **Smart Cloud Media**: Direct image uploading via Cloudinary integration.
- **Real-Time Messaging**: Built-in messaging system for instant communication between owners and seekers.
- **Culture-First Filters**: Toggle "Pure Veg" and "Gender" tags tailored for the Indian market.
- **Multi-Auth System**: Secure login via JWT and Google OAuth integration.
- **Interactive Listings**: Detailed property views with lifestyle tags and amenities.

## Design Decisions or Assumptions
- **ORM Choice**: Using Prisma for type-safe database interactions and easy migrations.
- **Mobile First**: Designed with a responsive layout for mobile and desktop users.
- **Authentication**: Using JWT for protected routes and Google OAuth for seamless user boarding.
- **Image Hosting**: Cloudinary used to handle high-resolution image uploads efficiently.

## Installation & Getting Started
Detailed instructions on how to install, configure, and get the project running.

### 1. Server Configuration
```bash
cd server
npm install
# Set up .env with DATABASE_URL and JWT_SECRET
npx prisma generate
node index.js
```

### 2. Client Configuration
```bash
cd client
npm install
# Set up .env with VITE_API_URL and Cloudinary keys
npm run dev
```

## Usage
Provide instructions and examples on how to use your project.

```bash
# To start both services (manually)
# Terminal 1:
cd server && node index.js
# Terminal 2:
cd client && npm run dev
```

## Credentials
Provide user credentials for authenticated pages:
- Test Email: `test@example.com`
- Test Password: `password123`

## APIs Used
- **Google OAuth**: For third-party authentication.
- **Cloudinary API**: For image management and hosting.
- **OpenStreetMap/Leaflet**: (If used for maps).

## API Endpoints
### Auth
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Authenticate user & get token
- `POST /api/auth/google` - Google OAuth authentication

### Listings
- `GET /api/listings` - Retrieve all listings (with filters)
- `GET /api/listings/:id` - Get details of a single listing
- `POST /api/listings` - Create a new listing (Auth required)
- `PUT /api/listings/:id` - Update existing listing (Auth required)
- `DELETE /api/listings/:id` - Remove a listing (Auth required)

### Messaging
- `GET /api/conversations` - Fetch list of user conversations (Auth required)
- `POST /api/conversations` - Create a new chat session (Auth required)
- `GET /api/messages/:id` - Fetch messages for a specific chat (Auth required)
- `POST /api/messages` - Send a message (Auth required)

## Technology Stack
- **Frontend**: React.js, Vite, Tailwind CSS, Framer Motion, Lucide React
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL (via Supabase)
- **ORM**: Prisma
- **Auth**: JWT, bcrypt, Google Auth Library
- **Cloud**: Cloudinary (Media Streaming)
