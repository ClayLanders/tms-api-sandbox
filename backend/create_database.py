import sqlite3

# Create/connect to database
conn = sqlite3.connect("mini_tms.db")
c = conn.cursor()

# Enforce foreign key relationships
c.execute("PRAGMA foreign_keys = ON")

# -----------------------------
# CUSTOMERS
# -----------------------------
c.execute("""
CREATE TABLE IF NOT EXISTS customers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    name TEXT NOT NULL,
    email TEXT,
    phone TEXT,

    address TEXT,
    city TEXT,
    state TEXT,
    zip_code TEXT,

    created_at TEXT DEFAULT CURRENT_TIMESTAMP
)
""")

# -----------------------------
# CARRIERS
# -----------------------------
c.execute("""
CREATE TABLE IF NOT EXISTS carriers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    name TEXT NOT NULL,

    mc_number TEXT UNIQUE,
    dot_number TEXT,

    email TEXT,
    phone TEXT,

    address TEXT,
    city TEXT,
    state TEXT,
    zip_code TEXT,

    created_at TEXT DEFAULT CURRENT_TIMESTAMP
)
""")

# -----------------------------
# USERS
# -----------------------------
c.execute("""
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,

    email TEXT NOT NULL UNIQUE,

    role TEXT NOT NULL,

    created_at TEXT DEFAULT CURRENT_TIMESTAMP
)
""")

# -----------------------------
# LOADS
# -----------------------------
c.execute("""
CREATE TABLE IF NOT EXISTS loads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    load_number TEXT NOT NULL UNIQUE,

    customer_id INTEGER NOT NULL,
    carrier_id INTEGER,
    created_by_user_id INTEGER,

    pu_address TEXT,
    pu_city TEXT,
    pu_state TEXT,
    pu_zip TEXT,

    del_address TEXT,
    del_city TEXT,
    del_state TEXT,
    del_zip TEXT,

    pickup_date TEXT,
    delivery_date TEXT,

    customer_rate REAL,
    carrier_rate REAL,

    status TEXT NOT NULL DEFAULT 'Open',

    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (customer_id) REFERENCES customers(id),
    FOREIGN KEY (carrier_id) REFERENCES carriers(id),
    FOREIGN KEY (created_by_user_id) REFERENCES users(id)
)
""")

conn.commit()
conn.close()

print("Database created successfully.")