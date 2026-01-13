from django.urls import path
from . import views

urlpatterns = [
    path("", views.apiOverview),
    path("users/", views.user_list),
    path("user-create/", views.create_user),
    path("user/<str:pk>/", views.user_detail),
    path("user-update/", views.update_user),
    path("user-delete/<str:pk>/", views.delete_user),

    path("storages/", views.storage_list),
    path("storage-create/", views.create_storage),
    path("storage/<str:pk>/", views.storage_detail),
    path("storage-update/", views.update_storage),
    path("storage-delete/<str:pk>/", views.delete_storage),

    path("shelves/", views.shelf_list),
    path("shelves-by-storage/<str:storage_id>/", views.shelf_list_by_storage),
    path("shelf-create/", views.create_shelf),
    path("shelf/<str:pk>/", views.shelf_detail),
    path("shelf-update/", views.update_shelf),
    path("shelf-delete/<str:pk>/", views.delete_shelf),

    path("documents/", views.document_list),
    path("document-create/", views.create_document),
    path("document/<str:pk>/", views.document_detail),
    path("document-update/", views.update_document),
    path("document-delete/<str:pk>/", views.delete_document),
    path("documents-by-shelf/<str:shelf_id>/", views.document_list_by_shelf),

    path("logentries/", views.logentry_list),
    path("logentry-create/", views.create_logentry),
    path("logentry/<str:pk>/", views.logentry_detail),
    path("logentry-update/", views.update_logentry),
    path("logentry-delete/<str:pk>/", views.delete_logentry),
    
    path("docstore-stats/", views.get_docstore_info),
]
