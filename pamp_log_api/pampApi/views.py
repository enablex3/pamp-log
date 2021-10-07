import json
from django.http import HttpResponse
from django.http import response
from django.http.response import HttpResponseServerError, JsonResponse
from pampApi.db.dbOps import PampRepository
from pampApi.converter.PampDataConverter import PampDataConverter
from django.views.decorators.csrf import csrf_exempt

pampConverter = PampDataConverter()

def index(request):
    return HttpResponse("Root of pamp api.")

def all(request):
    response = createResponse()
    return JsonResponse(response)

@csrf_exempt
def feed(request):
    data = json.loads(request.body)
    pampRepo = PampRepository()
    if (pampRepo.createFeed(data["ounces"], data["date"], data["time"])):
        response = createResponse()
        return JsonResponse(response)
    else:
        return HttpResponseServerError("Something went wrong with the creation of this record.")

@csrf_exempt
def del_feed(request):
    data = json.loads(request.body)
    pampRepo = PampRepository()
    if (pampRepo.deleteFeed(data["rowid"])):
        response = createResponse()
        return JsonResponse(response)
    else:
        return HttpResponseServerError("Something went wrong with the removal of this record.")

@csrf_exempt
def bowel(request):
    data = json.loads(request.body)
    pampRepo = PampRepository()
    if (pampRepo.createBowel(data["excrement"], data["void_p"], data["date"], data["time"])):
        response = createResponse()
        return JsonResponse(response)
    else:
        return HttpResponseServerError("Something went wrong with the creation of this record.")

@csrf_exempt
def del_bowel(request):
    data = json.loads(request.body)
    pampRepo = PampRepository()
    if (pampRepo.deleteBowel(data["rowid"])):
        response = createResponse()
        return JsonResponse(response)
    else:
        return HttpResponseServerError("Something went wrong with the removal of this record.")

def createResponse():
    response = {}
    pampRepo = PampRepository()
    response["bowel"] = pampConverter.bowelConverter(pampRepo.getAllBowel())
    response["feed"] = pampConverter.feedConverter(pampRepo.getAllFeed())
    return response
    
