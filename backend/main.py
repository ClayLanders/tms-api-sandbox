from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware
import sqlite3

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
def create_customer(
    customer: dict = Body(
        example={
            "name": "Customer Name",
            "email": "email@example.com",
            "phone": "555-123-4567",
            "address": "123 Main St",
            "city": "Charlotte",
            "state": "NC",
            "zip_code": "28202"
        }
    )
):

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

# UPDATE CUSTOMER

@app.patch("/customers/{customer_id}")
def update_customer(
    customer_id: int,
    updates: dict = Body(
        example={
            "name": "Customer Name",
            "email": "email@example.com",
            "phone": "555-123-4567",
            "address": "123 Main St",
            "city": "Charlotte",
            "state": "NC",
            "zip_code": "28202"
        }
    )
):

    conn = sqlite3.connect("mini_tms.db")
    c = conn.cursor()

    protected_fields = ["id"]

    updates = {
        k: v
        for k, v in updates.items()
        if k not in protected_fields
    }

    if not updates:
        conn.close()
        return {"message": "No valid fields supplied"}

    fields = []

    for key in updates.keys():
        fields.append(f"{key} = ?")

    sql = f"""
    UPDATE customers
    SET {", ".join(fields)}
    WHERE id = ?
    """

    values = list(updates.values())
    values.append(customer_id)

    c.execute(sql, values)

    conn.commit()
    conn.close()

    return {"message": "Customer updated successfully"}

#DELETE CUSTOMER

@app.delete("/customers/{customer_id}")
def delete_customer(customer_id: int):

    conn = sqlite3.connect("mini_tms.db")
    c = conn.cursor()

    c.execute("""
    DELETE FROM customers
    WHERE id = ?
    """, (customer_id,))

    conn.commit()
    conn.close()

    return {"message": "Customer deleted successfully"}

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
def create_carrier(
    carrier: dict = Body(
        example={
            "name": "Carrier Name",
            "mc_number": "MC123456",
            "dot_number": "DOT987654",
            "email": "dispatch@carrier.com",
            "phone": "555-123-4567",
            "address": "456 Carrier Way",
            "city": "Atlanta",
            "state": "GA",
            "zip_code": "30301"
        }
    )
):

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

#UPDATE CARRIER

@app.patch("/carriers/{carrier_id}")
def update_carrier(
    carrier_id: int,
    updates: dict = Body(
        example={
            "name": "Carrier Name",
            "mc_number": "MC123456",
            "dot_number": "DOT987654",
            "email": "dispatch@carrier.com",
            "phone": "555-123-4567",
            "address": "456 Carrier Way",
            "city": "Atlanta",
            "state": "GA",
            "zip_code": "30301"
        }
    )
):

    conn = sqlite3.connect("mini_tms.db")
    c = conn.cursor()

    protected_fields = ["id"]

    updates = {
        k: v
        for k, v in updates.items()
        if k not in protected_fields
    }

    if not updates:
        conn.close()
        return {"message": "No valid fields supplied"}

    fields = []

    for key in updates.keys():
        fields.append(f"{key} = ?")

    sql = f"""
    UPDATE carriers
    SET {", ".join(fields)}
    WHERE id = ?
    """

    values = list(updates.values())
    values.append(carrier_id)

    c.execute(sql, values)

    conn.commit()
    conn.close()

    return {"message": "Carrier updated successfully"}

#DELETE CARRIER

@app.delete("/carriers/{carrier_id}")
def delete_carrier(carrier_id: int):

    conn = sqlite3.connect("mini_tms.db")
    c = conn.cursor()

    c.execute("""
    DELETE FROM carriers
    WHERE id = ?
    """, (carrier_id,))

    conn.commit()
    conn.close()

    return {"message": "Carrier deleted successfully"}

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

        load.id,
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

        load.pickup_date,
        load.delivery_date,

        load.customer_rate,
        load.carrier_rate,

        load.status,

        load.created_at,
        load.updated_at

    FROM loads load

    LEFT JOIN customers cust
        ON load.customer_id = cust.id

    LEFT JOIN carriers carr
        ON load.carrier_id = carr.id

    LEFT JOIN users usr
        ON load.created_by_user_id = usr.id

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

        load.id,
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

        load.pickup_date,
        load.delivery_date,

        load.customer_rate,
        load.carrier_rate,

        load.status,

        load.created_at,
        load.updated_at

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
def create_load(
    load: dict = Body(
        example={
            "load_number": "L1001",
            "customer_id": 1,
            "carrier_id": 1,
            "created_by_user_id": 1,

            "pu_address": "123 Pickup St",
            "pu_city": "Charlotte",
            "pu_state": "NC",
            "pu_zip": "28202",

            "del_address": "456 Delivery Ave",
            "del_city": "Atlanta",
            "del_state": "GA",
            "del_zip": "30301",

            "pickup_date": "2026-06-20",
            "delivery_date": "2026-06-21",

            "customer_rate": 2500,
            "carrier_rate": 1800,

            "status": "Created"
        }
    )
):

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

#UPDATE LOAD

@app.patch("/loads/{load_number}")
def update_load(
    load_number: str,
    updates: dict = Body(
        example={
            "customer_id": 1,
            "carrier_id": 1,
            "created_by_user_id": 1,

            "pu_address": "Pickup Address",
            "pu_city": "Pickup City",
            "pu_state": "NC",
            "pu_zip": "28202",

            "del_address": "Delivery Address",
            "del_city": "Delivery City",
            "del_state": "GA",
            "del_zip": "30301",

            "pickup_date": "2026-06-20",
            "delivery_date": "2026-06-21",

            "customer_rate": 2500,
            "carrier_rate": 1800,

            "status": "Created"
        }
    )
):

    conn = sqlite3.connect("mini_tms.db")
    c = conn.cursor()

    protected_fields = [
        "id",
        "load_number",
        "created_at",
        "updated_at"
    ]

    updates = {
        k: v
        for k, v in updates.items()
        if k not in protected_fields
    }

    if not updates:
        conn.close()
        return {"message": "No valid fields supplied"}

    fields = []

    for key in updates.keys():
        fields.append(f"{key} = ?")

    sql = f"""
    UPDATE loads
    SET {", ".join(fields)}
    WHERE load_number = ?
    """

    values = list(updates.values())
    values.append(load_number)

    c.execute(sql, values)

    conn.commit()
    conn.close()

    return {"message": "Load updated successfully"}

#DELETE LOAD

@app.delete("/loads/{load_number}")
def delete_load(load_number: str):

    conn = sqlite3.connect("mini_tms.db")
    c = conn.cursor()

    c.execute("""
    DELETE FROM loads
    WHERE load_number = ?
    """, (load_number,))

    conn.commit()
    conn.close()

    return {"message": "Load deleted successfully"}

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
def create_user(
    user: dict = Body(
        example={
            "first_name": "John",
            "last_name": "Doe",
            "email": "john.doe@example.com",
            "role": "Dispatcher"
        }
    )
):

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

#UPDATE USER

@app.patch("/users/{user_id}")
def update_user(
    user_id: int,
    updates: dict = Body(
        example={
            "first_name": "John",
            "last_name": "Doe",
            "email": "john.doe@example.com",
            "role": "Dispatcher"
        }
    )
):

    conn = sqlite3.connect("mini_tms.db")
    c = conn.cursor()

    protected_fields = ["id"]

    updates = {
        k: v
        for k, v in updates.items()
        if k not in protected_fields
    }

    if not updates:
        conn.close()
        return {"message": "No valid fields supplied"}

    fields = []

    for key in updates.keys():
        fields.append(f"{key} = ?")

    sql = f"""
    UPDATE users
    SET {", ".join(fields)}
    WHERE id = ?
    """

    values = list(updates.values())
    values.append(user_id)

    c.execute(sql, values)

    conn.commit()
    conn.close()

    return {"message": "User updated successfully"}

#DELETE USER

@app.delete("/users/{user_id}")
def delete_user(user_id: int):

    conn = sqlite3.connect("mini_tms.db")
    c = conn.cursor()

    c.execute("""
    DELETE FROM users
    WHERE id = ?
    """, (user_id,))

    conn.commit()
    conn.close()

    return {"message": "User deleted successfully"}