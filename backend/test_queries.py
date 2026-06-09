import sqlite3

conn = sqlite3.connect("mini_tms.db")
c = conn.cursor()

c.execute("SELECT * FROM users")

users = c.fetchall()

for user in users:
    print(user)
          
conn.close()
