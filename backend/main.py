from fastapi import FastAPI
import sqlite3

app = FastAPI()


# ------------------------
# ROOT
# ------------------------

@app.get("/")
def root():
    return {"message": "Mini TMS API is running"}


# ------------------------
# CUSTOMERS
# ------------------------

# GET ALL CUSTOMERS

@app.get("/customers")
def get_customers():

    conn = sqlite3.connect("mini_tms.db")
    c = conn.cursor()

    c.execute("SELECT * FROM customers")

    customers = c.fetchall()

    conn.close()

    return customers

# GET CUSTOMER BY ID

@app.get("/customers/{customer_id}")
def get_customer(customer_id: int):

    conn = sqlite3.connect("mini_tms.db")
    c = conn.cursor()

    c.execute("""
    SELECT *
    FROM customers
    WHERE id = ?
    """, (customer_id,))

    customer = c.fetchone()

    conn.close()

    return customer

#ADD NEW CUSTOMER

@app.post("/customers")
def create_customer(customer: dict):

    conn = sqlite3.connect("mini_tms.db")
    c = conn.cursor()

    c.execute("""
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
    """, (
        customer["name"],
        customer["email"],
        customer["phone"],
        customer["address"],
        customer["city"],
        customer["state"],
        customer["zip_code"]
    ))

    conn.commit()
    conn.close()

    return {"message": "Customer created successfully"}

# ------------------------
# CARRIERS
# ------------------------

#GET ALL CARRIERS

@app.get("/carriers")
def get_carriers():

    conn = sqlite3.connect("mini_tms.db")
    c = conn.cursor()

    c.execute("SELECT * FROM carriers")

    carriers = c.fetchall()

    conn.close()

    return carriers

#GET CARRIER BY ID

@app.get("/carriers/{carrier_id}")
def get_carrier(carrier_id: int):

    conn = sqlite3.connect("mini_tms.db")
    c = conn.cursor()

    c.execute("""
    SELECT *
    FROM carriers
    WHERE id = ?
    """, (carrier_id,))

    carrier = c.fetchone()

    conn.close()

    return carrier

#ADD NEW CARRIER

@app.post("/carriers")
def create_carrier(carrier: dict):

    conn = sqlite3.connect("mini_tms.db")
    c = conn.cursor()

    c.execute("""
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
    """, (
        carrier["name"],
        carrier["mc_number"],
        carrier["dot_number"],
        carrier["email"],
        carrier["phone"],
        carrier["address"],
        carrier["city"],
        carrier["state"],
        carrier["zip_code"]
    ))

    conn.commit()
    conn.close()

    return {"message": "Carrier created successfully"}

# ------------------------
# LOADS
# ------------------------

#GET ALL LOADS

@app.get("/loads")
def get_loads():

    conn = sqlite3.connect("mini_tms.db")
    c = conn.cursor()

    c.execute("""
    SELECT

        load.load_number,

        cust.name AS customer_name,

        carr.name AS carrier_name,

        load.status

    FROM loads load

    LEFT JOIN customers cust
        ON load.customer_id = cust.id

    LEFT JOIN carriers carr
        ON load.carrier_id = carr.id

    ORDER BY load.load_number
    """)

    loads = c.fetchall()

    conn.close()

    return loads

#GET LOAD BY LOAD#

@app.get("/loads/{load_number}")
def get_load(load_number: str):

    conn = sqlite3.connect("mini_tms.db")
    c = conn.cursor()

    c.execute("""
    SELECT

        load.load_number,

        cust.name AS customer_name,

        carr.name AS carrier_name,

        usr.first_name || ' ' || usr.last_name AS created_by,

        load.pu_address,
        load.pu_city,
        load.pu_state,
        load.pu_zip,

        load.del_address,
        load.del_city,
        load.del_state,
        load.del_zip,

        load.status

    FROM loads load

    LEFT JOIN customers cust
        ON load.customer_id = cust.id

    LEFT JOIN carriers carr
        ON load.carrier_id = carr.id

    LEFT JOIN users usr
        ON load.created_by_user_id = usr.id

    WHERE load.load_number = ?
    """, (load_number,))

    load_record = c.fetchone()

    conn.close()

    return load_record

#ADD NEW LOAD

@app.post("/loads")
def create_load(load: dict):

    conn = sqlite3.connect("mini_tms.db")
    c = conn.cursor()

    c.execute("""
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
    """, (
        load["load_number"],
        load["customer_id"],
        load["carrier_id"],
        load["created_by_user_id"],

        load["pu_address"],
        load["pu_city"],
        load["pu_state"],
        load["pu_zip"],

        load["del_address"],
        load["del_city"],
        load["del_state"],
        load["del_zip"],

        load["pickup_date"],
        load["delivery_date"],

        load["customer_rate"],
        load["carrier_rate"],

        load["status"]
    ))

    conn.commit()
    conn.close()

    return {"message": "Load created successfully"}

# ------------------------
# USERS
# ------------------------

#GET ALL USERS

@app.get("/users")
def get_users():

    conn = sqlite3.connect("mini_tms.db")
    c = conn.cursor()

    c.execute("SELECT * FROM users")

    users = c.fetchall()

    conn.close()

    return users

#GET USER BY ID

@app.get("/users/{user_id}")
def get_user(user_id: int):

    conn = sqlite3.connect("mini_tms.db")
    c = conn.cursor()

    c.execute("""
    SELECT *
    FROM users
    WHERE id = ?
    """, (user_id,))

    user = c.fetchone()

    conn.close()

    return user

#ADD NEW USER

@app.post("/users")
def create_user(user: dict):

    conn = sqlite3.connect("mini_tms.db")
    c = conn.cursor()

    c.execute("""
    INSERT INTO users (
        first_name,
        last_name,
        email,
        role
    )
    VALUES (?, ?, ?, ?)
    """, (
        user["first_name"],
        user["last_name"],
        user["email"],
        user["role"]
    ))

    conn.commit()
    conn.close()

    return {"message": "User created successfully"}