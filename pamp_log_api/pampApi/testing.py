from db.dbOps import PampRepository
from converter.PampDataConverter import PampDataConverter

pampRepo = PampRepository()
pampConverter = PampDataConverter()

#pampRepo.createFeed("2", "07/23/1994", "0800")
#pampRepo.createBowel("YES", "NO", "07/23/1994", "0800")

#print(pampRepo.getAllBowel())
#print(pampRepo.getAllFeed())

#print(pampConverter.bowelConverter(pampRepo.getAllBowel()))
#print(pampConverter.feedConverter(pampRepo.getAllFeed()))