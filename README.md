TMS API Sandbox

A full-stack logistics API demonstration built with FastAPI, SQLite, and vanilla JavaScript. This project simulates core Transportation Management System (TMS) workflows while demonstrating REST API development, relational database design, frontend integration, and cloud deployment.

⸻

🌐 Live Application

Application

https://tms-sandbox.claylanders.me

API Documentation (Swagger UI)

https://api.tms-sandbox.claylanders.me/docs

⸻

Project Overview

TMS API Sandbox was created as a portfolio project to demonstrate backend API development using technologies commonly found in modern logistics software.

Rather than attempting to recreate a production Transportation Management System, the application focuses on exposing a clean REST API backed by a relational database while providing an intuitive browser interface for interacting with and testing the API.

The project demonstrates:

* RESTful API design
* CRUD operations
* Relational database modeling
* Frontend/backend communication
* Logistics data relationships
* API documentation
* Cloud deployment
* Custom domain configuration

⸻

Technology Stack

Backend

* Python
* FastAPI
* SQLite

Frontend

* HTML5
* CSS3
* Vanilla JavaScript

Deployment

* Render Web Service
* Render Static Site
* GitHub
* Custom Domains

⸻

Features

Dashboard

* Open Load Count
* Booked Load Count
* In Transit Load Count
* Delivered Load Count

⸻

Load Management

* View all loads
* Individual load detail pages
* Shipment status tracking
* Pickup and delivery locations
* Customer relationships
* Carrier relationships
* Customer and carrier rates

⸻

Customer Management

* Customer directory
* Customer detail pages
* Create new customers
* Contact and location information

⸻

Carrier Management

* Carrier directory
* Carrier detail pages
* Create new carriers
* MC Number
* DOT Number
* Contact information

⸻

User Management

* User directory
* User detail pages
* Create new users
* Roles and contact information

⸻

Interactive API Explorer

The application includes a built-in API Explorer that allows users to interact directly with the REST API.

Features include:

* GET requests
* POST requests
* PATCH requests
* DELETE requests
* Custom endpoint entry
* JSON request body editor
* Formatted API responses
* One-click endpoint shortcuts
* Quick links to Swagger documentation

⸻

REST API

Customers

* GET /customers
* GET /customers/{id}
* POST /customers
* PATCH /customers/{id}
* DELETE /customers/{id}

Carriers

* GET /carriers
* GET /carriers/{id}
* POST /carriers
* PATCH /carriers/{id}
* DELETE /carriers/{id}

Users

* GET /users
* GET /users/{id}
* POST /users
* PATCH /users/{id}
* DELETE /users/{id}

Loads

* GET /loads
* GET /loads/{load_number}
* POST /loads
* PATCH /loads/{load_number}
* DELETE /loads/{load_number}

⸻

Database

The application models four primary entities commonly found in transportation management systems.

Customers

* Contact information
* Address information

Carriers

* MC Number
* DOT Number
* Contact information

Users

* Internal users
* Roles
* Contact information

Loads

* Auto-generated load numbers
* Customer relationships
* Carrier relationships
* Pickup and delivery information
* Customer and carrier rates
* Shipment status
* Audit timestamps

⸻

Project Structure

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
│   ├── api-explorer.html
│   ├── customers.html
│   ├── customer-details.html
│   ├── customer-create.html
│   ├── carriers.html
│   ├── carrier-details.html
│   ├── carrier-create.html
│   ├── users.html
│   ├── user-details.html
│   ├── user-create.html
│   ├── loads.html
│   ├── load-details.html
│   ├── load-create.html
│   ├── css/
│   ├── js/
│   └── images/
│
└── README.md

⸻

Future Enhancements

Planned improvements include:

* JWT Authentication
* Role-based permissions
* PostgreSQL migration
* Accounts Receivable module
* Accounts Payable module
* Invoice generation
* Proof of Delivery (POD) uploads
* CSV import/export
* Reporting dashboard
* Mock EDI integrations (204, 990, 214, 210)
* External API integrations

⸻

Purpose

This project was built to strengthen practical experience with:

* REST API development
* FastAPI
* SQL and relational databases
* Frontend/backend integration
* CRUD application architecture
* Logistics software concepts
* Git and GitHub workflows
* Cloud deployment
* Custom domains
* API documentation

Although inspired by Transportation Management Systems, the application is intentionally presented as an API Sandbox designed to demonstrate backend development, system design, and API integration concepts rather than serve as a production-ready TMS.