# 🚴 Smart Cycle - Frontend

<img width="1192" height="631" alt="image" src="https://github.com/user-attachments/assets/35fdbee7-34a5-4db6-ab5f-a20d9f0d2124" />


<div align="center">
  <img src="https://img.shields.io/badge/React-19.1.1-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Vite-7.1.7-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/TailwindCSS-4.1.14-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="TailwindCSS" />
  <img src="https://img.shields.io/badge/React_Router-7.9.4-CA4245?style=for-the-badge&logo=react-router&logoColor=white" alt="React Router" />
</div>

<br />



A modern, responsive web application for Smart Cycle - an intelligent waste management and recycling system. Built with React and Vite, this frontend provides an intuitive interface for residents, drivers, personnel, and administrators to manage waste collection schedules and recycling operations efficiently.

## 📋 Table of Contents

- [🚴 Smart Cycle - Frontend](#-smart-cycle---frontend)
  - [📋 Table of Contents](#-table-of-contents)
  - [✨ Features](#-features)
  - [🛠 Tech Stack](#-tech-stack)
    - [Core Technologies](#core-technologies)
    - [Styling \& UI](#styling--ui)
    - [State \& Data Management](#state--data-management)
    - [Development Tools](#development-tools)
  - [📁 Project Structure](#-project-structure)
  - [🚀 Getting Started](#-getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Running the Application](#running-the-application)
      - [Development Mode](#development-mode)
      - [Production Build](#production-build)
      - [Preview Production Build](#preview-production-build)
  - [👤 User Roles \& Dashboards](#-user-roles--dashboards)
    - [🏠 Resident Dashboard](#-resident-dashboard)
    - [🚛 Driver Dashboard](#-driver-dashboard)
    - [👔 Personnel Dashboard](#-personnel-dashboard)
    - [🔑 Admin Dashboard](#-admin-dashboard)
    - [🌐 Public Pages](#-public-pages)
  - [📜 Available Scripts](#-available-scripts)
  - [⚙️ Environment Configuration](#️-environment-configuration)
  - [🔗 Backend Integration](#-backend-integration)
    - [API Communication](#api-communication)
  - [🤝 Contributing](#-contributing)
    - [Code Style Guidelines](#code-style-guidelines)
  - [👥 Team](#-team)
    - [Contributors](#contributors)
  - [📄 License](#-license)

## ✨ Features

- 🎨 **Modern UI/UX** - Clean and intuitive interface built with TailwindCSS
- 🔐 **Authentication System** - Secure login and registration for multiple user roles
- 📊 **Role-Based Dashboards** - Customized interfaces for Residents, Drivers, Personnel, and Admins
- 📅 **Schedule Management** - Efficient waste collection scheduling and tracking
- 🔔 **Real-time Notifications** - Toast notifications for user actions and updates
- 📱 **Responsive Design** - Fully responsive across all devices
- 🎯 **Profile Management** - User profile and request management capabilities
- 🚀 **Fast Performance** - Optimized with Vite for lightning-fast development and builds
- 🎠 **Hero Slider** - Engaging landing page with dynamic content
- 💚 **Donation System** - Integrated donation functionality for sustainability initiatives

## 🛠 Tech Stack

### Core Technologies
- **React 19.1.1** - Latest React with modern features and improved performance
- **Vite 7.1.7** - Next-generation frontend build tool
- **React Router DOM 7.9.4** - Declarative routing for React applications

### Styling & UI
- **TailwindCSS 4.1.14** - Utility-first CSS framework
- **Lucide React 0.546.0** - Beautiful & consistent icon library

### State & Data Management
- **Axios 1.12.2** - Promise-based HTTP client for API calls
- **React Toastify 11.0.5** - Toast notifications for better UX

### Development Tools
- **ESLint 9.36.0** - Code quality and consistency
- **Vite Plugin React 5.0.4** - Official React plugin with Fast Refresh

## 📁 Project Structure

```
smart-cycle-frontend/
├── public/                          # Static assets
├── src/
│   ├── assets/                      # Images, fonts, and other assets
│   ├── components/
│   │   ├── global.components/       # Shared components
│   │   │   ├── footer.jsx
│   │   │   ├── navbar.jsx
│   │   │   ├── hero.slider.jsx
│   │   │   ├── smart.cycle.section.jsx
│   │   │   ├── loading.component/
│   │   │   │   └── loading.component.jsx
│   │   │   └── notification.component/
│   │   │       └── notificationProvider.component.jsx
│   │   └── resident.component/      # Resident-specific components
│   │       ├── profile.component.jsx
│   │       └── request.component.jsx
│   ├── pages/
│   │   ├── admin.pages/             # Admin dashboard pages
│   │   │   └── admin.dashboard.jsx
│   │   ├── auth.pages/              # Authentication pages
│   │   │   ├── login.page.jsx
│   │   │   └── register.page.jsx
│   │   ├── driver.pages/            # Driver dashboard pages
│   │   │   └── driver.dashboard.jsx
│   │   ├── global.pages/            # Public pages
│   │   │   ├── landing.page.jsx
│   │   │   ├── about.page.jsx
│   │   │   ├── contact.page.jsx
│   │   │   └── donate.page.jsx
│   │   ├── personnel.pages/         # Personnel dashboard pages
│   │   │   └── PersonnelDashboard.jsx
│   │   ├── resident.pages/          # Resident dashboard pages
│   │   │   └── ResidentDashboard.jsx
│   │   └── ScheduleManagement.jsx   # Schedule management page
│   ├── routes/
│   │   └── global.routes.jsx        # Application routing configuration
│   ├── tools/
│   │   └── defaultRoot.tool.jsx     # Default route handler
│   ├── App.jsx                      # Root component
│   ├── App.css                      # Global styles
│   └── main.jsx                     # Application entry point
├── eslint.config.js                 # ESLint configuration
├── vite.config.js                   # Vite configuration
├── package.json                     # Dependencies and scripts
└── README.md                        # Project documentation
```

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher) or **yarn** (v1.22.0 or higher)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Eric-Devon/smart-cycle-frontend.git
   cd smart-cycle-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   or if you're using yarn:
   ```bash
   yarn install
   ```

3. **Configure environment variables**
   Create a `.env` file in the root directory and add your backend API URL:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

### Running the Application

#### Development Mode
Start the development server with hot module replacement:
```bash
npm run dev
```
The application will be available at `http://localhost:5173`

#### Production Build
Create an optimized production build:
```bash
npm run build
```

#### Preview Production Build
Preview the production build locally:
```bash
npm run preview
```

## 👤 User Roles & Dashboards

### 🏠 Resident Dashboard
- View and manage waste collection schedules
- Submit special collection requests
- Track recycling statistics
- Manage profile and preferences

### 🚛 Driver Dashboard
- View assigned collection routes
- Update collection status
- Report issues or delays
- Access route optimization tools

### 👔 Personnel Dashboard
- Monitor overall system operations
- Process resident requests
- Generate reports
- Coordinate with drivers and residents

### 🔑 Admin Dashboard
- Complete system management
- User management and role assignment
- Schedule creation and management
- System analytics and reporting

### 🌐 Public Pages
- **Landing Page** - Introduction to Smart Cycle services
- **About Page** - Information about the platform
- **Contact Page** - Get in touch with the team
- **Donate Page** - Support sustainability initiatives

## 📜 Available Scripts

| Command           | Description                        |
| ----------------- | ---------------------------------- |
| `npm run dev`     | Start development server with HMR  |
| `npm run build`   | Build for production               |
| `npm run preview` | Preview production build locally   |
| `npm run lint`    | Run ESLint for code quality checks |

## ⚙️ Environment Configuration

Create a `.env` file in the root directory with the following variables:

```env
# API Configuration
VITE_API_URL=your_backend_api_url

# Optional: Other environment-specific variables
VITE_APP_NAME=Smart Cycle
VITE_APP_VERSION=1.0.0
```

## 🔗 Backend Integration

This frontend application integrates with the Smart Cycle backend API.

**Backend Repository**: [smartcycle-backend](https://github.com/Eric-Devon/smartcycle-backend)

### API Communication
- All API calls are made using Axios
- Base URL configured through environment variables
- Interceptors for authentication and error handling
- RESTful API architecture

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Code Style Guidelines
- Follow the existing code style
- Run ESLint before committing: `npm run lint`
- Write meaningful commit messages
- Add comments for complex logic
- Ensure responsive design principles

## 👥 Team

**Project Lead**: [Sadeesha Sathsara](https://github.com/sadeeshasathsara)

### Contributors

| Name                  | GitHub                                                   | Role                                |
| --------------------- | -------------------------------------------------------- | ----------------------------------- |
| **Sadeesha Sathsara** | [@sadeeshasathsara](https://github.com/sadeeshasathsara) | Project Lead & Full Stack Developer |
| **Eric Devon**        | [@Eric-Devon](https://github.com/Eric-Devon)             | Full Stack Developer                |
| **Ehara Perera**      | [@EHARAPERERA](https://github.com/EHARAPERERA)           | Full Stack Developer                |
| **Vageesha Udawatta** | [@vageeshau](https://github.com/vageeshau)               | Full Stack Developer                |

## 📄 License

This project is part of an academic/educational initiative. Please contact the team for licensing information.

---

<div align="center">
  <p>Built with ❤️ by the Smart Cycle Team</p>
  <p>
    <a href="https://github.com/Eric-Devon/smart-cycle-frontend">Frontend Repository</a> •
    <a href="https://github.com/Eric-Devon/smartcycle-backend">Backend Repository</a>
  </p>
</div>
