from django.db import models

# Create your models here.

# Custom User model
class User(models.Model):
    id = models.CharField(max_length=8, primary_key=True)
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128, default='password123')
    full_name = models.CharField(max_length=200)
    role = models.CharField(max_length=50, choices=[('admin', 'Admin'), ('user', 'User')], default='user')
    date_added = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'user'

    def __str__(self):
        return self.username


# Storage model
class Storage(models.Model):
    id = models.CharField(max_length=8, primary_key=True)
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=255)
    date_added = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'storage'

    def __str__(self):
        return self.name


# Shelf model
class Shelf(models.Model):
    id = models.CharField(max_length=8, primary_key=True)
    name = models.CharField(max_length=100)
    storage = models.ForeignKey(Storage, on_delete=models.CASCADE, related_name='shelves')
    date_added = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'shelf'

    def __str__(self):
        return f"{self.name} ({self.storage.name})"


# Document model
class Document(models.Model):
    DOCUMENT_TYPE_CHOICES = [
        ('report', 'Report'),
        ('invoice', 'Invoice'),
        ('contract', 'Contract'),
        ('memo', 'Memo'),
    ]

    id = models.CharField(max_length=8, primary_key=True)
    title = models.CharField(max_length=200)
    document_type = models.CharField(max_length=100, choices=DOCUMENT_TYPE_CHOICES, default='report')
    shelf = models.ForeignKey(Shelf, on_delete=models.CASCADE, related_name='documents')
    storage = models.ForeignKey(Storage, on_delete=models.CASCADE, related_name='documents')
    date_added = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'document'

    def __str__(self):
        return self.title
    
    
class LogEntry(models.Model):
        
    ACTION_CHOICES = [
        ('added', 'Added'),
        ('viewed', 'Viewed'),
        ('updated', 'Updated'),
        ('deleted', 'Deleted'),
    ]
    OBJECT_TYPE_CHOICES = [
        ('user', 'User'),
        ('storage', 'Storage'),
        ('shelf', 'Shelf'),
        ('document', 'Document'),
    ]
    id = models.CharField(max_length=8, primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='log_entries')
    action = models.CharField(max_length=255, choices=ACTION_CHOICES)
    object_type = models.CharField(max_length=255, choices=OBJECT_TYPE_CHOICES)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'log_entry'

    def __str__(self):
        return f"[{self.timestamp}] {self.user.username} {self.action} {self.object_type}  "    