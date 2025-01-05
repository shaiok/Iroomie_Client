# **iRoommie**

A web-based application for finding roommates and apartments, featuring an intuitive user interface, responsive design, and robust backend logic. The project is fully converted to TypeScript for enhanced maintainability and type safety.

---

## **Table of Contents**

- [Technologies](#technologies)
- [Project Architecture and Structure](#project-architecture-and-structure)
- [How to Run the Project](#how-to-run-the-project)
- [Screenshots](#screenshots)

---

## **Technologies**

This project utilizes the following technologies:

- **React** (Frontend)
- **TypeScript** (Type Safety)
- **Tailwind CSS** (Styling)
- **Node.js** (Backend)
- **Express.js** (API Development)
- **React Query** (Data Fetching and State Management)
- **MongoDB** (Database)
- **Vite** (Frontend Development Server)
- **Git** (Version Control)

---

## **Project Architecture and Structure**

### **High-Level Architecture**

The project is designed as a **full-stack application** with a client-server architecture:

- **Frontend**: React + TypeScript for building a responsive UI.
- **Backend**: Node.js + Express.js for handling API requests.
- **Database**: MongoDB for storing user and application data.

### **Folder Structure**

```plaintext
iroomie/
│
├── server/            # Backend files
│   ├── controllers/   # API logic
│   ├── models/        # MongoDB schemas
│   ├── routes/        # API routes
│   ├── server.js      # Express server entry point
│   └── .env           # Environment variables
│
├── src/               # Frontend files
│   ├── components/    # Reusable UI components
│   ├── Pages/         # Application pages
│   ├── lib/           # Utility functions, configurations
│   ├── App.tsx        # Main React app entry point
│   ├── index.css      # Tailwind CSS styling
│   └── main.tsx       # React DOM rendering
│
├── tsconfig.json      # TypeScript configuration
├── tailwind.config.js # Tailwind CSS configuration
├── postcss.config.js  # PostCSS configuration
├── package.json       # Project dependencies
└── README.md          # Project documentation
