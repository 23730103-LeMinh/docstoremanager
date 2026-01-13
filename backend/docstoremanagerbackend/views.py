from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import User, Storage, Shelf, Document, LogEntry
from .serializers import UserSerializer, StorageSerializer, ShelfSerializer, DocumentSerializer, LogEntrySerializer
from django.utils import timezone


@api_view(['GET'])
def apiOverview(request):
    api_urls = {
       "Docstore API": "/docstore/",
       "Users": "/docstore/users/",
       "Storages": "/docstore/storages/",
       "Shelves": "/docstore/shelves/",
       "Documents": "/docstore/documents/",
       "Log Entries": "/docstore/logentries/",

       "Create User": "/docstore/user-create/",
       "Create Storage": "/docstore/storage-create/",
       "Create Shelf": "/docstore/shelf-create/",
       "Create Document": "/docstore/document-create/",
       "Create Log Entry": "/docstore/logentry-create/",
       
       "User Detail": "/docstore/user/<str:pk>/",
       "Storage Detail": "/docstore/storage/<str:pk>/",
       "Shelf Detail": "/docstore/shelf/<str:pk>/",
       "Document Detail": "/docstore/document/<str:pk>/",
       "Log Entry Detail": "/docstore/logentry/<str:pk>/",
       
       "Update User": "/docstore/user-update/",
       "Update Storage": "/docstore/storage-update/",
       "Update Shelf": "/docstore/shelf-update/",
       "Update Document": "/docstore/document-update/",
       "Update Log Entry": "/docstore/logentry-update/",
       
       "Delete User": "/docstore/user-delete/<str:pk>/",
       "Delete Storage": "/docstore/storage-delete/<str:pk>/",
       "Delete Shelf": "/docstore/shelf-delete/<str:pk>/",
       "Delete Document": "/docstore/document-delete/<str:pk>/",
       "Delete Log Entry": "/docstore/logentry-delete/<str:pk>/",
       }
    return Response(api_urls)

# ============================= User Views =============================

@api_view(['GET'])
def user_list(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def create_user(request):
    new_user_id = create_custom_id(User, 'US')
    request.data['id'] = new_user_id
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(id=new_user_id)
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

@api_view(['GET'])
def user_detail(request, pk):
    user = User.objects.get(id=pk)
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def update_user(request, pk):
    user = User.objects.get(id=request.data['id'])
    serializer = UserSerializer(instance=user, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)

@api_view(['DELETE'])
def delete_user(request, pk):
    user = User.objects.get(id=pk)
    user.delete()
    return Response("User deleted successfully!")

# ============================= Storage Views =============================

@api_view(['GET'])
def storage_list(request):
    storages = Storage.objects.all().order_by('date_added').reverse()
    serializer = StorageSerializer(storages, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def create_storage(request):
    new_storage_id = create_custom_id(Storage, 'ST')
    request.data['id'] = new_storage_id
    
    newStorage = {
        'id': new_storage_id,
        'name': request.data['name'],
        'location': request.data['location'],
        'date_added': timezone.now(),
    }
    
    serializer = StorageSerializer(data=newStorage)
    if serializer.is_valid():
        serializer.save(id=new_storage_id)
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

@api_view(['GET'])
def storage_detail(request, pk):
    storage = Storage.objects.get(id=pk)
    serializer = StorageSerializer(storage, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def update_storage(request):
    storage = Storage.objects.get(id=request.data['id'])
    serializer = StorageSerializer(instance=storage, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)

@api_view(['DELETE'])
def delete_storage(request, pk):
    storage = Storage.objects.get(id=pk)
    storage.delete()
    return Response("Storage deleted successfully!")

# ============================= Shelf Views =============================

@api_view(['GET'])
def shelf_list(request):
    shelves = Shelf.objects.all()
    serializer = ShelfSerializer(shelves, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def shelf_list_by_storage(request, storage_id):
    storage = Storage.objects.get(id=storage_id)
    shelves = Shelf.objects.filter(storage=storage_id).order_by('date_added').reverse()
    serializer = ShelfSerializer(shelves, many=True)
    result = {
        "shelves": serializer.data,
        "storage_id": storage.id,
        "location": storage.location
        }
    return Response(result)


@api_view(['POST'])
def create_shelf(request):
    new_shelf_id = create_custom_id(Shelf, 'SH')
    storage = Storage.objects.get(id=request.data['storage'])
    newShelf = {
        'id': new_shelf_id,
        'name': request.data['name'],
        'storage': storage.id,
        'date_added': timezone.now(),
    }
    serializer = ShelfSerializer(data=newShelf)
    if serializer.is_valid():
        serializer.save(id=new_shelf_id)
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

@api_view(['GET'])
def shelf_detail(request, pk):
    shelf = Shelf.objects.get(id=pk)
    serializer = ShelfSerializer(shelf, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def update_shelf(request):
    shelf = Shelf.objects.get(id=request.data['id'])
    serializer = ShelfSerializer(instance=shelf, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)

@api_view(['DELETE'])
def delete_shelf(request, pk):
    shelf = Shelf.objects.get(id=pk)
    shelf.delete()
    return Response("Shelf deleted successfully!")

#============================= Document Views =============================

@api_view(['GET'])
def document_list(request):
    documents = Document.objects.all()
    serializer = DocumentSerializer(documents, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def document_list_by_shelf(request, shelf_id):
    shelf = Shelf.objects.get(id=shelf_id)
    documents = Document.objects.filter(shelf=shelf_id)
    serializer = DocumentSerializer(documents, many=True)
    result = {
        "documents": serializer.data,
        "shelf_id": shelf.id,
        "storage_id": shelf.storage.id
    }
    return Response(result)

@api_view(['POST'])
def create_document(request):
    new_document_id = create_custom_id(Document, 'DC')
    request.data['id'] = new_document_id
    serializer = DocumentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(id=new_document_id)
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

@api_view(['GET'])
def document_detail(request, pk):
    document = Document.objects.get(id=pk)
    serializer = DocumentSerializer(document, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def update_document(request, pk):
    document = Document.objects.get(id=request.data['id'])
    serializer = DocumentSerializer(instance=document, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)

@api_view(['DELETE'])
def delete_document(request, pk):
    document = Document.objects.get(id=pk)
    document.delete()
    return Response("Document deleted successfully!")


#============================= LogEntry Views =============================

@api_view(['GET'])
def logentry_list(request):
    logentries = LogEntry.objects.all()
    serializer = LogEntrySerializer(logentries, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def create_logentry(request):
    new_logentry_id = create_custom_id(LogEntry, 'LG')
    request.data['id'] = new_logentry_id
    serializer = LogEntrySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(id=new_logentry_id)
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

@api_view(['GET'])
def logentry_detail(request, pk):
    logentry = LogEntry.objects.get(id=pk)
    serializer = LogEntrySerializer(logentry, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def update_logentry(request, pk):
    logentry = LogEntry.objects.get(id=request.data['id'])
    serializer = LogEntrySerializer(instance=logentry, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)

@api_view(['DELETE'])
def delete_logentry(request, pk):
    logentry = LogEntry.objects.get(id=pk)
    logentry.delete()
    return Response("LogEntry deleted successfully!")

# ============================= Utility Functions =============================
@api_view(['GET'])
def get_docstore_info(request):
    # get number of storages, shelves, documents, users
    num_storages = Storage.objects.count()
    num_shelves = Shelf.objects.count()
    num_documents = Document.objects.count()
    num_users = User.objects.count()
    return Response({
        "numOfStorages": num_storages,
        "numOfShelves": num_shelves,
        "numOfDocuments": num_documents,
        "numOfUsers": num_users
    })


# Utility function to create custom IDs
def create_custom_id(model, prefix):
    last_record = model.objects.order_by('id').last()
    if last_record:
        last_id = last_record.id
        new_id = prefix + str(int(last_id[2:]) + 1).zfill(6)
        
    else:
        new_id = prefix + '000001'
    return new_id