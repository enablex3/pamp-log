import sqlite3
import sys

class PampRepository:
    
    def __init__(self):
        self.db = "D:\\Daniel\\baby-tracker\\pamp_log_api\\pampApi\\db\\pamplog.db"
        
        self.connection = sqlite3.connect(self.db, check_same_thread=False)

        if (self.connection):
            print("Connection to " + self.db + " successful.")
            self.curs = self.connection.cursor()
        else:
            print("Connection failed.")
            sys.exit(1)

    def getAllFeed(self):
        query = "SELECT rowid, ounces, date, time FROM feed"
        result = self.curs.execute(query).fetchall()
        return result

    def getAllBowel(self):
        query = "SELECT rowid, excrement, void, date, time FROM bowel"
        result = self.curs.execute(query).fetchall()
        return result

    def createFeed(self, ounces, date, time):
        result = False
        
        query = "INSERT INTO feed VALUES (?, ?, ?)"
        
        try:
            self.curs.execute(query, (ounces, date, time))
            result = True
        except Exception as e:
            print(e)

        self.connection.commit()

        return result

    def deleteFeed(self, rowid):
        result = False

        query = "DELETE FROM feed WHERE rowid = ?"

        try:
            self.curs.execute(query, (rowid,))
            result = True
        except Exception as e:
            print(e)

        self.connection.commit()

        return result


    def createBowel(self, excrement, void, date, time):
        result = False

        query = "INSERT INTO bowel VALUES (?, ?, ?, ?)"

        try:
            self.curs.execute(query, (excrement, void, date, time))
            result = True
        except Exception as e:
            print(e)

        self.connection.commit()

        return result

    def deleteBowel(self, rowid):
        result = False

        query = "DELETE FROM bowel WHERE rowid = ?"

        try:
            self.curs.execute(query, (rowid,))
            result = True
        except Exception as e:
            print(e)

        self.connection.commit()

        return result