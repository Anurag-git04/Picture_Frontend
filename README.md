# Picture – Frontend 📸

A modern, responsive web frontend for the **Picture** image-sharing platform.

## Live Demo  
[https://picture-frontend.vercel.app/login](https://picture-frontend.vercel.app/login)

## Features  
- User authentication (sign up, login, logout)  
- Upload, view and manage images/photos  
- Responsive UI for desktop & mobile  
- Integration with the backend API  

## Tech Stack  
- React.js  
- TypeScript  
- Vite (for fast development build)  
- CSS / Tailwind CSS (or your styling framework)  
- Axios (or Fetch) for API calls  
- React Router for navigation  

## Folder Structure
```
Picture_Frontend/
├── public/                     # Public assets like index.html and icons
├── src/
│   ├── assets/                 # Images, icons, and static resources
│   ├── components/             # Reusable UI components (Navbar, ImageCard, etc.)
│   ├── pages/                  # Page-level components (Login, Register, Dashboard, etc.)
│   ├── features/               # Redux slices or feature-based state management
│   ├── store/                  # Redux store configuration (if used)
│   ├── services/               # API service files (Axios setup, API calls)
│   ├── types/                  # TypeScript interfaces and type definitions
│   ├── utils/                  # Helper functions and constants
│   ├── App.tsx                 # Main app component with route definitions
│   ├── main.tsx                # Application entry point
│   ├── index.css               # Global CSS or Tailwind base styles
│   └── vite-env.d.ts           # Vite environment type declarations
│
├── .env                        # Environment variables (API URL, etc.)
├── .eslintrc.cjs               # ESLint configuration for code linting
├── .gitignore                  # Ignored files and directories
├── index.html                  # Root HTML file for Vite
├── package.json                # Project metadata and dependencies
├── tsconfig.json               # TypeScript compiler configuration
├── vite.config.ts              # Vite configuration file
└── README.md                   # Project documentation
```

## 🧩 Core Functionalities

- **User Authentication** – Secure signup(google Auth) and login using JWT.  
- **Image Upload** – Upload photos directly to the backend or cloud storage.  
- **Albums Management** – Create, view, and delete albums.  
- **Dashboard** – Displays all uploaded images and album statistics.  
- **Responsive Design** – Optimized for mobile, tablet, and desktop devices.  
- **User-Friendly Interface** – Clean UI with instant feedback and smooth navigation.


## Getting Started  
### Prerequisites  
- Node.js (version 14+ recommended)  
- npm or yarn  

### Installation  
```bash
git clone https://github.com/Anurag-git04/Picture_Frontend.git  
cd Picture_Frontend  
npm install      # or yarn install  
npm run dev      # start the development server
```
## Login Page 
<img width="1891" height="975" alt="image" src="https://github.com/user-attachments/assets/9f0d9153-f1cc-4f23-82f6-e8d5da217de9" />

## Dashboard Page
<img width="1913" height="908" alt="image" src="https://github.com/user-attachments/assets/4a246ca1-913a-4081-b7c7-55214ceab71a" />

## Albums Page
<img width="1918" height="921" alt="image" src="https://github.com/user-attachments/assets/7409dd8b-8ff8-42d9-8373-25868cc202a8" />

## 🧑‍💻 Author
Anurag Shaw
💼 Full-Stack Developer | MERN & TypeScript | React Enthusiast


