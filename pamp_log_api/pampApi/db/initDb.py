""" ONLY RUN IF CREATING THE DATABASE FOR THE FIRST TIME OR REINITIALIZING THE DATABASE """
import sqlite3

db = "D:\\Daniel\\baby-tracker\\pamp_log_api\\pampApi\\db\\pamplog.db"
connection = sqlite3.connect(db)
curs = connection.cursor()

feedTableDestroy = "DROP TABLE IF EXISTS feed"
bowelTableDestroy = "DROP TABLE IF EXISTS bowel"

feedTableCreate = "CREATE TABLE feed (ounces TEXT, date TEXT, time TEXT)"
bowelTableCreate = "CREATE TABLE bowel (excrement TEXT, void TEXT, date TEXT, time TEXT)"

curs.execute(feedTableDestroy)
curs.execute(bowelTableDestroy)

curs.execute(feedTableCreate)
curs.execute(bowelTableCreate)

connection.commit()
connection.close()

print("Database " + db + " has been initialized.")