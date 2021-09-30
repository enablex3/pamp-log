class PampDataConverter:

    def __init__(self):
        return None

    def bowelConverter(self, result):
        jsonResult = {}

        for row in result:
            jsonResult[row[0]] = {
                "excrement": row[1],
                "void": row[2],
                "date": row[3],
                "time": row[4]
            }

        return jsonResult

    def feedConverter(self, result):
        jsonResult = {}

        for row in result:
            jsonResult[row[0]] = {
                "ounces": row[1],
                "date": row[2],
                "time": row[3]
            }

        return jsonResult
