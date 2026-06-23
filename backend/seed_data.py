import sqlite3

# Connect to database
conn = sqlite3.connect("mini_tms.db")
c = conn.cursor()

# -----------------------------
# USERS
# -----------------------------
users = [
    ("Clay", "Landers", "clayrlanders@gmail.com", "Admin"),
    ("Shannon", "Kelly", "shankelly@gmail.com", "Dispatcher"),
    ("Kyle", "Darden", "dardenkyle@hotmail.com", "Operations")
]

c.executemany("""
INSERT INTO users (
    first_name,
    last_name,
    email,
    role
)
VALUES (?, ?, ?, ?)
""", users)

# -----------------------------
# CUSTOMERS
# -----------------------------
customers = [
    (
        "Shingle Co",
        "ops@shingleco.com",
        "409-949-4584",
        "100 Industrial Drive",
        "Texas City",
        "TX",
        "77590"
    ),
    (
        "Jones Lumber",
        "shipping@joneslumber.com",
        "281-330-8004",
        "250 Commerce Blvd",
        "Houston",
        "TX",
        "77001"
    ),
    (
        "Carolina Distribution",
        "traffic@carolinadistro.com",
        "910-901-9191",
        "500 Warehouse Way",
        "Wilmington",
        "NC",
        "28401"
    )
]

c.executemany("""
INSERT INTO customers (
    name,
    email,
    phone,
    address,
    city,
    state,
    zip_code
)
VALUES (?, ?, ?, ?, ?, ?, ?)
""", customers)

# -----------------------------
# CARRIERS
# -----------------------------
carriers = [
    (
        "Morgan Transport",
        "MC123456",
        "DOT123456",
        "dispatch@smithtransport.com",
        "865-409-1021",
        "100 Trucking Lane",
        "Atlanta",
        "GA",
        "30301"
    ),
    (
        "Blue Line Logistics",
        "MC234567",
        "DOT234567",
        "ops@blueline.com",
        "555-5555",
        "200 Freight Road",
        "Nashville",
        "TN",
        "37201"
    ),
    (
        "East Coast Freight",
        "MC345678",
        "DOT345678",
        "dispatch@eastcoastfreight.com",
        "555-6666",
        "300 Carrier Ave",
        "Jacksonville",
        "FL",
        "32202"
    )
]

c.executemany("""
INSERT INTO carriers (
    name,
    mc_number,
    dot_number,
    email,
    phone,
    address,
    city,
    state,
    zip_code
)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
""", carriers)

# -----------------------------
# LOADS
# -----------------------------
loads = [
    (
        "L1001",
        1,
        1,
        1,
        "100 Industrial Drive",
        "Charlotte",
        "NC",
        "28202",
        "500 Warehouse Way",
        "Atlanta",
        "GA",
        "30301",
        "2026-06-04",
        "2026-06-05",
        1500.00,
        1100.00,
        "Open"
    ),
    (
        "L1002",
        2,
        2,
        1,
        "250 Commerce Blvd",
        "Greensboro",
        "NC",
        "27401",
        "200 Distribution Rd",
        "Nashville",
        "TN",
        "37201",
        "2026-06-05",
        "2026-06-06",
        2200.00,
        1800.00,
        "Booked"
    ),
    (
        "L1003",
        3,
        3,
        2,
        "500 Warehouse Way",
        "Wilmington",
        "NC",
        "28401",
        "800 Grocery Park",
        "Orlando",
        "FL",
        "32801",
        "2026-06-06",
        "2026-06-07",
        3100.00,
        2600.00,
        "In Transit"
    )
]

c.executemany("""
INSERT INTO loads (
    load_number,
    customer_id,
    carrier_id,
    created_by_user_id,

    pu_address,
    pu_city,
    pu_state,
    pu_zip,

    del_address,
    del_city,
    del_state,
    del_zip,

    pickup_date,
    delivery_date,

    customer_rate,
    carrier_rate,

    status
)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
""", loads)

conn.commit()
conn.close()

print("Seed data inserted successfully.")