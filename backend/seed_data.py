import sqlite3
from datetime import date, timedelta

# Connect to database
conn = sqlite3.connect("mini_tms.db")
c = conn.cursor()

# -----------------------------
# USERS
# -----------------------------
users = [
    ("Clay", "Landers", "clayrlanders@gmail.com", "Admin"),
    ("Shannon", "Kelly", "shankelly@gmail.com", "Dispatcher"),
    ("Kyle", "Darden", "dardenkyle@hotmail.com", "Operations"),
    ("James", "Belvin", "jbelvin@tmssandbox.com", "Sales"),
    ("John", "Roberts", "john.roberts@tmssandbox.com", "Operations")
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
    ("Shingle Co", "ops@shingleco.com", "409-949-4584", "100 Industrial Drive", "Texas City", "TX", "77590"),
    ("Jones Lumber", "shipping@joneslumber.com", "281-330-8004", "250 Commerce Blvd", "Houston", "TX", "77001"),
    ("Carolina Distribution", "traffic@carolinadistro.com", "910-901-9191", "500 Warehouse Way", "Wilmington", "NC", "28401"),
    ("Blue Ridge Building Supply", "shipping@blueridge.com", "704-555-1001", "100 Supply Road", "Charlotte", "NC", "28202"),
    ("Atlantic Food Group", "traffic@atlanticfood.com", "919-555-1002", "200 Food Park", "Raleigh", "NC", "27601"),
    ("Southeastern Plastics", "logistics@seplastics.com", "864-555-1003", "300 Industrial Blvd", "Greenville", "SC", "29601"),
    ("Freedom Packaging", "shipping@freedompkg.com", "803-555-1004", "400 Packaging Way", "Columbia", "SC", "29201"),
    ("Coastal Manufacturing", "ops@coastalmfg.com", "904-555-1005", "500 Harbor Drive", "Jacksonville", "FL", "32202"),
    ("Sunbelt Roofing", "dispatch@sunbeltroofing.com", "615-555-1006", "600 Contractor Lane", "Nashville", "TN", "37201"),
    ("Piedmont Paper", "traffic@piedmontpaper.com", "336-555-1007", "700 Mill Road", "Greensboro", "NC", "27401")
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
    ("Morgan Transport", "123456", "123456", "dispatch@smithtransport.com", "865-409-1021", "100 Trucking Lane", "Atlanta", "GA", "30301"),
    ("Blue Line Logistics", "234567", "234567", "ops@blueline.com", "615-555-2001", "200 Freight Road", "Nashville", "TN", "37201"),
    ("East Coast Freight", "345678", "345678", "dispatch@eastcoastfreight.com", "904-555-2002", "300 Carrier Ave", "Jacksonville", "FL", "32202"),
    ("Pioneer Transportation", "456789", "456789", "ops@pioneertransport.com", "704-555-2003", "400 Logistics Blvd", "Charlotte", "NC", "28202"),
    ("Southern Freight Systems", "567890", "567890", "dispatch@southernfreight.com", "803-555-2004", "500 Freight Parkway", "Columbia", "SC", "29201"),
    ("Interstate Trucking", "678901", "678901", "ops@interstate.com", "770-555-2005", "600 Interstate Road", "Atlanta", "GA", "30301"),
    ("Liberty Logistics", "789012", "789012", "dispatch@libertylogistics.com", "919-555-2006", "700 Commerce Way", "Raleigh", "NC", "27601"),
    ("Carolina Express", "890123", "890123", "ops@carolinaexpress.com", "910-555-2007", "800 Express Lane", "Wilmington", "NC", "28401"),
    ("Titan Transport", "901234", "901234", "dispatch@titantransport.com", "864-555-2008", "900 Titan Drive", "Greenville", "SC", "29601"),
    ("Freedom Freight", "012345", "012345", "ops@freedomfreight.com", "281-555-2009", "1000 Freedom Blvd", "Houston", "TX", "77001")
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

loads = []

statuses = [
    "Open",
    "Booked",
    "In Transit",
    "Delivered"
]

pickup_cities = [
    ("Charlotte", "NC"),
    ("Raleigh", "NC"),
    ("Wilmington", "NC"),
    ("Greensboro", "NC"),
    ("Atlanta", "GA"),
    ("Nashville", "TN"),
    ("Jacksonville", "FL"),
    ("Houston", "TX")
]

delivery_cities = [
    ("Atlanta", "GA"),
    ("Orlando", "FL"),
    ("Nashville", "TN"),
    ("Charlotte", "NC"),
    ("Jacksonville", "FL"),
    ("Greenville", "SC"),
    ("Columbia", "SC"),
    ("Houston", "TX")
]

for i in range(25):

    load_number = f"L{1001 + i}"

    customer_id = (i % 10) + 1

    created_by_user_id = (i % 5) + 1

    status = statuses[i % 4]

    if status == "Open":
        carrier_id = None
    else:
        carrier_id = (i % 10) + 1

    pu_city, pu_state = pickup_cities[
        i % len(pickup_cities)
    ]

    del_city, del_state = delivery_cities[
        i % len(delivery_cities)
    ]

    pickup_date = (
        date.today() +
        timedelta(days=i)
    ).isoformat()

    delivery_date = (
        date.today() +
        timedelta(days=i + 1)
    ).isoformat()

    customer_rate = 1800 + (i * 100)

    carrier_rate = customer_rate - 400

    loads.append(
        (
            load_number,
            customer_id,
            carrier_id,
            created_by_user_id,

            f"{100 + i} Industrial Drive",
            pu_city,
            pu_state,
            "28000",

            f"{500 + i} Distribution Way",
            del_city,
            del_state,
            "30000",

            pickup_date,
            delivery_date,

            customer_rate,
            carrier_rate,

            status
        )
    )

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