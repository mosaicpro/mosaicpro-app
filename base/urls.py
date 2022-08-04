from django.urls import path
from . import views



urlpatterns = [
    path('', views.getRoutes, name="routes"),

    path('users/login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('users/profile/', views.getUserProfile, name='users-profile'),
    path('users/', views.getUsers, name='users'),
    path('users/register/', views.registerUser, name='register'),
    path('users/update/<str:pk>/', views.updateUser, name='user-update'),
    path('users/delete/<str:pk>/', views.deleteUser, name='user-delete'),

    path('posts/', views.getPosts, name="posts"),
    path('posts/<str:pk>/', views.getPost, name="post"),
    path('post/create/', views.createPost, name='post-create'),
    path('post/update/<str:pk>/', views.updatePost, name='post-update'),
    path('post/delete/<str:pk>/', views.deletePost, name='post-delete'),
    path('post/upload-image/', views.uploadPostImage, name="post-image"),
    path('post/upload-banner/', views.uploadPostBanner, name="post-banner"),
    path('post/upload-thumbnail/', views.uploadPostThumbnail, name="post-thumbnail"),


    path('projects/', views.getProjects, name="projects"),
    path('projects/<str:pk>/', views.getProject, name="project"),
    path('project/create/', views.createProject, name='project-create'),
    path('project/update/<str:pk>/', views.updateProject, name='project-update'),
    path('project/delete/<str:pk>/', views.deleteProject, name='project-delete'),
    path('project/upload-image/', views.uploadProjectImage, name="project-image"),
    path('project/upload-banner/', views.uploadProjectBanner, name="project-banner"),
    
    path('contact', views.contact, name="contact"),
]