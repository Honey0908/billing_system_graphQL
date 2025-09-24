# Billing System - Project Description

## 📋 Project Overview

A comprehensive multi-tenant billing system that allows multiple firms to manage their own billing operations, products, staff, and customer transactions independently.

## 🏢 System Architecture

### Multi-Tenant Structure

- **Multiple Firms**: Each firm operates independently within the system
- **Firm Isolation**: Data and operations are isolated per firm
- **Scalable Design**: System supports unlimited number of firms

## 👥 User Roles & Permissions

### 1. **Firm Admin**

- **User Management**: Can add, edit, and manage staff members within their firm
- **Product Management**: Full CRUD operations on firm's product catalog
- **Billing Operations**: Can create, edit, and manage bills for firm customers
- **Firm Settings**: Can modify firm-specific configurations and settings
- **Reports & Analytics**: Access to firm's billing reports and analytics

### 2. **Staff Members**

- **Billing Operations**: Can create and manage bills for firm customers
- **Product Viewing**: Can view firm's product catalog (read-only)
- **Customer Management**: Can add and manage customer information
- **Limited Access**: Cannot manage other staff or modify products

## 🏗️ Core Entities

### 1. **Firm**

```
- Firm ID (Primary Key)
- Firm Name
- Address
- Contact Information
- Tax Details
- Created Date
- Status (Active/Inactive)
```

### 2. **User (Admin/Staff)**

```
- User ID (Primary Key)
- Firm ID (Foreign Key)
- Name
- Email
- Password (Hashed)
- Role (Admin/Staff)
- Phone Number
- Created Date
- Last Login
- Status (Active/Inactive)
```

### 3. **Product**

```
- Product ID (Primary Key)
- Firm ID (Foreign Key)
- Product Name
- Description
- SKU/Code
- Price
- Tax Rate
- Unit of Measurement
- Stock Quantity (Optional)
- Category
- Created Date
- Created By (User ID)
- Status (Active/Inactive)
```

### 4. **Customer**

```
- Customer ID (Primary Key)
- Firm ID (Foreign Key)
- Customer Name
- Contact Person
- Email
- Phone Number
- Address
- Tax Information (GST Number, etc.)
- Created Date
- Created By (User ID)
```

### 5. **Bill/Invoice**

```
- Bill ID (Primary Key)
- Firm ID (Foreign Key)
- Customer ID (Foreign Key)
- Bill Number (Auto-generated)
- Bill Date
- Due Date
- Subtotal
- Tax Amount
- Discount
- Total Amount
- Payment Status (Pending/Partial/Paid)
- Created By (User ID)
- Created Date
- Notes
```

### 6. **Bill Items**

```
- Bill Item ID (Primary Key)
- Bill ID (Foreign Key)
- Product ID (Foreign Key)
- Quantity
- Unit Price
- Line Total
- Tax Rate
- Tax Amount
```

## 🔐 Security & Access Control

### Authentication

- **JWT-based Authentication**: Secure token-based authentication
- **Role-based Access Control**: Different permissions for Admin vs Staff
- **Firm-level Isolation**: Users can only access their firm's data

### Data Security

- **Encrypted Passwords**: All passwords are hashed and salted
- **API Security**: Protected GraphQL endpoints with authentication middleware
- **Data Validation**: Input validation on both client and server side

## 🛠️ Technology Stack

### Backend

- **Node.js** with **TypeScript**
- **GraphQL** with **Apollo Server**
- **Prisma ORM** for database operations
- **PostgreSQL** database
- **JWT** for authentication

### Frontend

- **React** with **TypeScript**
- **Vite** for build tooling
- **Tailwind CSS v4** for styling
- **shadcn/ui** for UI components
- **Apollo Client** for GraphQL operations

## 📱 Core Features

### 1. **User Management**

- User registration and authentication
- Role-based dashboard access
- Profile management
- Password reset functionality

### 2. **Product Management** (Admin Only)

- Add new products with details
- Edit existing product information
- Manage product categories
- Set pricing and tax rates
- Product search and filtering

### 3. **Customer Management**

- Add customer information
- Manage customer profiles
- Customer search functionality
- Customer billing history

### 4. **Billing System**

- Create new bills/invoices
- Add multiple products to bills
- Calculate taxes automatically
- Apply discounts
- Generate printable invoices
- Track payment status

### 5. **Reporting & Analytics**

- Sales reports by date range
- Product-wise sales analysis
- Customer billing summaries
- Tax reports
- Outstanding payments tracking

## 🎯 User Workflows

### Admin Workflow

1. **Setup**: Create firm account and configure settings
2. **Product Management**: Add products to catalog with pricing
3. **Staff Management**: Add staff members and assign permissions
4. **Billing**: Create bills for customers using product catalog
5. **Monitoring**: Track sales, payments, and generate reports

### Staff Workflow

1. **Login**: Access firm dashboard with staff credentials
2. **Customer Management**: Add/edit customer information
3. **Billing**: Create bills by selecting products and customers
4. **Payment Tracking**: Update bill payment status
5. **Reports**: View basic sales and billing reports

## 📊 Database Schema Relationships

```
Firm (1) ──────── (Many) User
Firm (1) ──────── (Many) Product
Firm (1) ──────── (Many) Customer
Firm (1) ──────── (Many) Bill

User (1) ──────── (Many) Product (Created By)
User (1) ──────── (Many) Bill (Created By)
Customer (1) ───── (Many) Bill
Bill (1) ──────── (Many) Bill Items
Product (1) ────── (Many) Bill Items
```

## 🚀 Development Phases

### Phase 1: Core Setup ✅

- [x] Project structure setup
- [x] Database schema design
- [x] Authentication system
- [x] Basic GraphQL API

### Phase 2: User Management

- [ ] User registration/login
- [ ] Firm creation and management
- [ ] Role-based access control
- [ ] User dashboard

### Phase 3: Product Management

- [ ] Product CRUD operations
- [ ] Product categories
- [ ] Product search and filtering
- [ ] Product pricing management

### Phase 4: Customer Management

- [ ] Customer CRUD operations
- [ ] Customer profile management
- [ ] Customer search functionality

### Phase 5: Billing System

- [ ] Bill creation interface
- [ ] Product selection for bills
- [ ] Tax calculation
- [ ] Invoice generation
- [ ] Payment status tracking

### Phase 6: Reports & Analytics

- [ ] Sales reports
- [ ] Customer reports
- [ ] Tax reports
- [ ] Dashboard analytics

### Phase 7: Advanced Features

- [ ] Email notifications
- [ ] PDF invoice generation
- [ ] Data export functionality
- [ ] System backup and restore

## 📝 Notes

- All operations are firm-scoped (multi-tenant architecture)
- Admins have full control over their firm's data
- Staff members have limited permissions
- System ensures data isolation between different firms
- GraphQL API provides flexible data fetching
- Modern React frontend with responsive design

## 🔗 Related Files

- **Backend**: `/server/` - GraphQL API with Prisma ORM
- **Frontend**: `/client/` - React application with TypeScript
- **Database**: `/server/prisma/schema.prisma` - Database schema
- **Documentation**: `/docs/` - Additional documentation

---

**Last Updated**: September 24, 2025  
**Version**: 1.0  
**Status**: In Development
