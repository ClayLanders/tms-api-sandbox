# TMS API Sandbox

A lightweight Transportation Management System (TMS) built to learn and demonstrate database design, API development, frontend integration, and logistics workflows.

## Overview

Mini TMS is a full-stack application built with:

* Python
* FastAPI
* SQLite
* HTML
* CSS
* JavaScript

The project simulates core functionality commonly found in transportation management systems used by freight brokers, carriers, and logistics providers.

The goal of the project is to gain hands-on experience with:

* Relational databases
* REST APIs
* Frontend/backend communication
* Logistics workflows
* System integrations

---

## Current Features

### Dashboard

* Open Load Count
* Covered Load Count
* In Transit Load Count
* Delivered Load Count

### Loads

* View all loads
* Customer and carrier relationships
* Pickup and delivery locations
* Shipment status tracking

### Customers

* View customer information
* Contact details
* Location information

### Carriers

* View carrier information
* MC Number
* DOT Number
* Contact details

### Users

* View system users
* Roles and contact information

### API Explorer

A built-in API Explorer allows users to execute and view API responses directly from the application.

Available endpoints include:

* GET /loads
* GET /customers
* GET /carriers
* GET /users

---

## Database Structure

Current entities include:

### Customers

Stores customer information including:

* Name
* Email
* Phone
* Address
* City
* State
* ZIP Code

### Carriers

Stores carrier information including:

* Name
* MC Number
* DOT Number
* Contact Information

### Users

Stores internal user information including:

* First Name
* Last Name
* Email
* Role

### Loads

Stores shipment information including:

* Load Number
* Customer
* Carrier
* Pickup Information
* Delivery Information
* Rates
* Status
* Audit Timestamps

---

## API Endpoints

### Customers

* GET /customers
* GET /customers/{customer_id}
* POST /customers

### Carriers

* GET /carriers
* GET /carriers/{carrier_id}
* POST /carriers

### Users

* GET /users
* GET /users/{user_id}
* POST /users

### Loads

* GET /loads
* GET /loads/{load_number}
* POST /loads

---

## Project Structure

```text
mini-tms/

├── backend/
│   ├── main.py
│   ├── create_database.py
│   ├── seed_data.py
│   ├── test_queries.py
│   ├── mini_tms.db
│   └── requirements.txt
│
├── frontend/
│   ├── index.html
│   ├── loads.html
│   ├── customers.html
│   ├── carriers.html
│   ├── users.html
│   ├── api-explorer.html
│   │
│   ├── css/
│   │   └── styles.css
│   │
│   └── js/
│       ├── config.js
│       ├── dashboard.js
│       ├── loads.js
│       ├── customers.js
│       ├── carriers.js
│       ├── users.js
│       └── api-explorer.js
│
└── venv/
```

---

## Running the Project

### Backend

Activate the virtual environment:

```bash
source venv/bin/activate
```

Start FastAPI:

```bash
cd backend
uvicorn main:app --reload
```

Open:

```text
http://127.0.0.1:8000/docs
```

to access Swagger documentation and test endpoints.

### Frontend

Open the frontend using VS Code Live Server or another static web server.

Example:

```text
http://127.0.0.1:5500/frontend/index.html
```

---

## Future Enhancements

Planned features include:

* Load detail pages
* Create/Edit/Delete functionality
* Accounts Payable
* Customer Invoicing
* CSV Import Tool
* CSV Export Tool
* Custom Report Builder
* Saved Reports
* Mock EDI Integrations (204, 990, 214, 210)
* PostgreSQL Migration
* Authentication and User Permissions

---

## Learning Goals

This project was created to gain experience with:

* SQL
* Database relationships
* API design
* FastAPI
* Frontend/backend integration
* Git and GitHub
* Logistics software architecture
* Transportation Management Systems (TMS)
