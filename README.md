# TMS API Sandbox

A full-stack logistics API demonstration built with **FastAPI**, **SQLite**, and **vanilla JavaScript**. TMS API Sandbox simulates core Transportation Management System (TMS) workflows while showcasing REST API development, relational database design, frontend integration, and cloud deployment.

---

## 🚀 Live Demo

**Application**  
https://tms-sandbox.claylanders.me

**Interactive API Documentation (Swagger UI)**  
https://api.tms-sandbox.claylanders.me/docs

---

## ✨ Highlights

- Full REST API built with FastAPI
- Interactive Swagger documentation
- Custom browser-based API Explorer
- SQLite relational database
- CRUD operations across multiple resources
- Realistic logistics seed data
- Responsive dashboard and detail pages
- Automatic deployments from GitHub
- Custom domains with HTTPS
- Cloud hosted on Render

---

# Overview

TMS API Sandbox was built as a portfolio project to demonstrate backend API development using technologies commonly found in modern logistics software.

Rather than attempting to recreate a production Transportation Management System, the application focuses on exposing a clean REST API backed by a relational database while providing an intuitive web interface for exploring and interacting with the API.

The project demonstrates practical experience with:

- REST API design
- CRUD operations
- Relational database modeling
- Frontend/backend communication
- Logistics software concepts
- API documentation
- Cloud deployment
- Custom domain configuration

---

# Technology Stack

## Backend

- Python
- FastAPI
- SQLite

## Frontend

- HTML5
- CSS3
- Vanilla JavaScript

## Deployment

- Render Web Service
- Render Static Site
- GitHub
- Custom Domains
- HTTPS (Let's Encrypt)

---

# Features

## Dashboard

Provides a high-level operational overview including:

- Open Loads
- Booked Loads
- In Transit Loads
- Delivered Loads

---

## Load Management

- View all loads
- Individual load detail pages
- Shipment status tracking
- Pickup and delivery locations
- Customer relationships
- Carrier relationships
- Customer and carrier rates

---

## Customer Management

- Customer directory
- Customer detail pages
- Create new customers
- Contact and address information

---

## Carrier Management

- Carrier directory
- Carrier detail pages
- Create new carriers
- MC Number
- DOT Number
- Contact information

---

## User Management

- User directory
- User detail pages
- Create new users
- User roles
- Contact information

---

## API Explorer

The application includes a built-in API Explorer that allows users to interact directly with the REST API without leaving the application.

Features include:

- GET requests
- POST requests
- PATCH requests
- DELETE requests
- Custom endpoint entry
- JSON request editor
- Formatted API responses
- Endpoint shortcut badges
- Quick links to Swagger documentation

---

# REST API

## Customers

- GET `/customers`
- GET `/customers/{id}`
- POST `/customers`
- PATCH `/customers/{id}`
- DELETE `/customers/{id}`

## Carriers

- GET `/carriers`
- GET `/carriers/{id}`
- POST `/carriers`
- PATCH `/carriers/{id}`
- DELETE `/carriers/{id}`

## Users

- GET `/users`
- GET `/users/{id}`
- POST `/users`
- PATCH `/users/{id}`
- DELETE `/users/{id}`

## Loads

- GET `/loads`
- GET `/loads/{load_number}`
- POST `/loads`
- PATCH `/loads/{load_number}`
- DELETE `/loads/{load_number}`

---

# Database Design

The application models four core entities commonly found within Transportation Management Systems.

## Customers

Stores:

- Company information
- Contact information
- Address information

---

## Carriers

Stores:

- Company information
- MC Number
- DOT Number
- Contact information

---

## Users

Stores:

- Employee information
- Roles
- Contact information

---

## Loads

Stores:

- Auto-generated load numbers
- Customer relationships
- Carrier relationships
- Pickup information
- Delivery information
- Customer rate
- Carrier rate
- Shipment status
- Audit timestamps

---

# Project Structure

```text
mini-tms/
│
├── backend/
│   ├── main.py
│   ├── create_database.py
│   ├── seed_data.py
│   ├── requirements.txt
│   └── mini_tms.db
│
├── frontend/
│   ├── index.html
│   ├── loads.html
│   ├── load-details.html
│   ├── load-create.html
│   ├── customers.html
│   ├── customer-details.html
│   ├── customer-create.html
│   ├── carriers.html
│   ├── carrier-details.html
│   ├── carrier-create.html
│   ├── users.html
│   ├── user-details.html
│   ├── user-create.html
│   ├── api-explorer.html
│   │
│   ├── css/
│   ├── js/
│   └── images/
│
└── README.md
```

---

# Roadmap

Planned enhancements include:

- JWT Authentication
- Role-based permissions
- PostgreSQL migration
- Accounts Receivable
- Accounts Payable
- Invoice generation
- Proof of Delivery (POD) uploads
- CSV import/export
- Reporting dashboard
- Mock EDI integrations
- External API integrations

---

# Purpose

Although inspired by Transportation Management Systems, **TMS API Sandbox** is intentionally designed as an API demonstration project rather than a production-ready TMS.

The project was created to strengthen practical experience with:

- FastAPI
- REST API development
- SQL and relational databases
- CRUD application architecture
- Frontend/backend integration
- JavaScript
- Git and GitHub
- Cloud deployment
- Custom domains
- Logistics software architecture
