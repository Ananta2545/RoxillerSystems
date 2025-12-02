# 🏪 Store Rating System

A comprehensive full-stack web application that enables users to rate and review stores. The platform features role-based access control with three distinct user types: System Administrators, Normal Users, and Store Owners.

## 📸 Screenshots

<!-- Add your screenshots here -->

---

## 🚀 Features

### 🔐 **Authentication & Authorization**
- Single unified login system for all user roles
- Role-based access control (RBAC)
- Secure JWT-based authentication
- Password update functionality for all users

### 👨‍💼 **System Administrator**
- **Dashboard Analytics**
  - Total number of users
  - Total number of stores
  - Total number of submitted ratings
- **User Management**
  - Add new admin users and normal users
  - View all users with filtering capabilities
  - Filter by: Name, Email, Address, Role
  - View store owner ratings alongside user details
- **Store Management**
  - Add new stores with store owner accounts
  - View all stores with ratings
  - Filter stores by: Name, Email, Address
  - Sortable tables (ascending/descending)

### 👤 **Normal User**
- **Account Management**
  - Self-registration through signup page
  - Update password after login
- **Store Discovery**
  - View all registered stores
  - Search stores by Name and Address
  - See detailed store information with ratings
- **Rating System**
  - Submit ratings (1-5 stars) for stores
  - Modify previously submitted ratings
  - View personal rating alongside overall store rating
  - Interactive star rating interface

### 🏬 **Store Owner**
- **Store Dashboard**
  - View average store rating
  - See total number of ratings received
- **Customer Insights**
  - View list of all users who rated the store
  - See individual ratings with timestamps
  - User details (Name, Email) for each rating

### ✨ **Additional Features**
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Loading States** - Professional loaders for all async operations
- **Form Validations** - Client-side and server-side validation
- **Error Handling** - User-friendly error messages
- **Sortable Tables** - Click column headers to sort
- **Filter System** - Real-time filtering on all list pages
- **Back Navigation** - Easy navigation with back buttons
- **Clean UI/UX** - Modern, intuitive interface with Tailwind CSS

---

## 🛠️ Tech Stack

### **Frontend**
- **Framework:** React.js 19.2.0
- **Routing:** React Router DOM 7.9.6
- **Styling:** Tailwind CSS 3.4.1
- **HTTP Client:** Axios 1.13.2
- **Build Tool:** Vite 7.2.4

### **Backend**
- **Framework:** Express.js 5.2.1
- **Database ORM:** Prisma 5.22.0
- **Database:** PostgreSQL
- **Authentication:** JWT (jsonwebtoken 9.0.2)
- **Password Hashing:** bcrypt 6.0.0
- **CORS:** cors 2.8.5

### **Development Tools**
- **Node.js** (v18+ recommended)
- **npm** or **yarn**
- **Nodemon** for development

---

## 📁 Project Structure

```
RoxillerSystems/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma          # Database schema definition
│   │   └── seed.js                # Database seeding script
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js              # Database configuration
│   │   ├── controllers/
│   │   │   ├── adminController.js # Admin functionality
│   │   │   ├── authController.js  # Authentication logic
│   │   │   ├── storeController.js # Store owner functionality
│   │   │   └── userController.js  # User functionality
│   │   ├── middleware/
│   │   │   └── authMiddleware.js  # JWT authentication middleware
│   │   ├── routes/
│   │   │   ├── adminRoutes.js     # Admin API routes
│   │   │   ├── authRoutes.js      # Auth API routes
│   │   │   ├── storeRoutes.js     # Store API routes
│   │   │   └── userRoutes.js      # User API routes
│   │   ├── utils/
│   │   │   └── validation.js      # Server-side validation
│   │   └── server.js              # Express app entry point
│   ├── .env                       # Environment variables
│   └── package.json               # Backend dependencies
│
├── frontend/
│   ├── public/                    # Static assets
│   ├── src/
│   │   ├── assets/                # Images, icons
│   │   ├── components/
│   │   │   ├── Navbar.jsx         # Navigation bar component
│   │   │   └── PrivateRoute.jsx   # Protected route wrapper
│   │   ├── context/
│   │   │   └── AuthContext.jsx    # Authentication context
│   │   ├── pages/
│   │   │   ├── admin/
│   │   │   │   ├── AdminDashboard.jsx
│   │   │   │   ├── AddStore.jsx
│   │   │   │   ├── AddUser.jsx
│   │   │   │   ├── StoresList.jsx
│   │   │   │   └── UsersList.jsx
│   │   │   ├── store/
│   │   │   │   └── StoreDashboard.jsx
│   │   │   ├── user/
│   │   │   │   └── UserStores.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   └── UpdatePassword.jsx
│   │   ├── utils/
│   │   │   ├── api.js             # Axios configuration
│   │   │   └── validation.js      # Client-side validation
│   │   ├── App.jsx                # Main app component
│   │   ├── main.jsx               # React entry point
│   │   └── index.css              # Global styles
│   ├── index.html                 # HTML template
│   ├── tailwind.config.js         # Tailwind configuration
│   ├── vite.config.js             # Vite configuration
│   └── package.json               # Frontend dependencies
│
├── .gitignore                     # Git ignore rules
└── README.md                      # Project documentation
```

---

## ⚙️ Installation & Setup

### **Prerequisites**
- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn package manager

### **1. Clone the Repository**
```bash
git clone <repository-url>
cd RoxillerSystems
```

### **2. Backend Setup**

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Configure environment variables
# Create a .env file with the following:
DATABASE_URL="your_postgresql_connection_string"
JWT_SECRET="your_jwt_secret_key"
PORT=5000

# Setup database (generate, push schema, and seed data)
npm run db:setup

# OR run commands individually:
# npm run db:generate  # Generate Prisma Client
# npm run db:push      # Push schema to database
# npm run db:seed      # Seed sample data

# Start the backend server
npm run dev
```

The backend server will start on `http://localhost:5000`

### **3. Frontend Setup**

Open a new terminal:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend application will start on `http://localhost:5173`

---

## 🔑 Default Login Credentials

After seeding the database, use these credentials to test different roles:

### **Administrator**
- **Email:** admin@storerating.com
- **Password:** Admin@123

### **Store Owners**
1. **Tech Electronics Store**
   - **Email:** techstore@example.com
   - **Password:** Store@123

2. **Fashion Boutique Store**
   - **Email:** fashionboutique@example.com
   - **Password:** Fashion@123

3. **Downtown Bookstore**
   - **Email:** bookstore@example.com
   - **Password:** Books@123

### **Normal Users**
1. **Email:** john.doe@example.com
   - **Password:** User@123

2. **Email:** jane.smith@example.com
   - **Password:** User@456

---

## 📋 Form Validation Rules

### **Name**
- Minimum: 20 characters
- Maximum: 60 characters

### **Email**
- Must follow standard email format
- Example: user@example.com

### **Password**
- Length: 8-16 characters
- Must contain at least one uppercase letter
- Must contain at least one special character
- Example: `Password@123`

### **Address**
- Maximum: 400 characters

---

## 🗄️ Database Schema

### **User Model**
```prisma
- id: String (UUID)
- name: String
- email: String (Unique)
- password: String (Hashed)
- address: String
- role: Enum (ADMIN, USER, STORE_OWNER)
- timestamps: createdAt, updatedAt
```

### **Store Model**
```prisma
- id: String (UUID)
- name: String
- email: String (Unique)
- address: String
- ownerId: String (Foreign Key -> User)
- timestamps: createdAt, updatedAt
```

### **Rating Model**
```prisma
- id: String (UUID)
- rating: Integer (1-5)
- userId: String (Foreign Key -> User)
- storeId: String (Foreign Key -> Store)
- timestamps: createdAt, updatedAt
- Unique constraint: [userId, storeId]
```

---

## 🎯 API Endpoints

### **Authentication**
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `PUT /api/auth/update-password` - Update password

### **Admin**
- `GET /api/admin/dashboard` - Get dashboard statistics
- `POST /api/admin/users` - Create new user
- `POST /api/admin/stores` - Create new store
- `GET /api/admin/users` - Get all users (with filters)
- `GET /api/admin/users/:id` - Get user by ID
- `GET /api/admin/stores` - Get all stores (with filters)

### **User**
- `GET /api/user/stores` - Get all stores (with filters)
- `POST /api/user/ratings` - Submit/update rating

### **Store Owner**
- `GET /api/store/dashboard` - Get store dashboard data

---

## 🚀 Available Scripts

### **Backend**
```bash
npm run dev         # Start development server with nodemon
npm start           # Start production server
npm run db:setup    # Complete database setup (generate + push + seed)
npm run db:generate # Generate Prisma Client
npm run db:push     # Push schema to database
npm run db:migrate  # Create and run migrations
npm run db:seed     # Seed database with sample data
```

### **Frontend**
```bash
npm run dev      # Start Vite development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

---

## 🎨 Design Features

- **Modern UI/UX** with Tailwind CSS
- **Responsive Grid Layouts** for all screen sizes
- **Interactive Star Rating System** for user ratings
- **Loading Spinners** for all asynchronous operations
- **Error States** with retry functionality
- **Toast Notifications** for user feedback
- **Hover Effects** and smooth transitions
- **Accessible Forms** with proper labels and validation feedback

---

## 🔒 Security Features

- **Password Hashing** using bcrypt
- **JWT Authentication** for secure sessions
- **Role-Based Access Control** (RBAC)
- **Protected API Routes** with middleware
- **Input Validation** on both client and server
- **SQL Injection Prevention** via Prisma ORM
- **CORS Configuration** for cross-origin requests

---

## 🧪 Testing the Application

1. **Start both servers** (backend and frontend)
2. **Access the application** at `http://localhost:5173`
3. **Test Admin Features:**
   - Login with admin credentials
   - View dashboard statistics
   - Add new users and stores
   - Apply filters and sorting
4. **Test User Features:**
   - Sign up as a new user or login with test credentials
   - Browse stores
   - Submit and modify ratings
5. **Test Store Owner Features:**
   - Login with store owner credentials
   - View store dashboard and ratings

---

## 🤝 Contributing

This project was built as part of a FullStack Intern Coding Challenge.

---

## 📝 License

This project is created for educational purposes as part of an internship coding challenge.

---

## 🙏 Acknowledgments

- Built with **Express.js**, **React**, **PostgreSQL**, and **Prisma**
- UI styled with **Tailwind CSS**
- Icons from **Heroicons** (SVG icons)

---

## 📧 Contact

For any queries or feedback, please reach out to the development team.

---

**Thank you for reviewing this Store Rating System!** 🎉

This application demonstrates proficiency in:
- Full-stack development with modern technologies
- RESTful API design and implementation
- Database design and relationships
- Authentication and authorization
- Responsive web design
- Form validation and error handling
- State management in React
- Role-based access control
- Clean code architecture and best practices

**Note:** Remember to run `npm run seed` in the backend to populate the database with sample data for testing!

---

*Developed as part of the FullStack Intern Coding Challenge*
