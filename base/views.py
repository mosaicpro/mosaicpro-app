from django.db import IntegrityError
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from base.models import Project
from base.models import Post
from base.serializers import PostSerializer, UserSerializer, ProjectSerializer, UserSerializerWithToken
from django.core.mail import send_mail
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework import status


# Create your views here.
@api_view(['GET'])
def getRoutes(request):
    return Response('Hello')


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        
        serializer = UserSerializerWithToken(self.user).data

        for k, v in serializer.items():
            data[k] = v

        return data



class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)

    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def registerUser(request):
    try:
        user = User.objects.create(
            first_name=request.POST["firstname"],
            last_name=request.POST["lastname"],
            username=request.POST["email"],
            email=request.POST["email"],
            password=make_password(request.POST["password"]),
            is_staff=request.POST["isAdmin"]  
        )

        serializer = UserSerializerWithToken(user, many=False)

        return Response(serializer.data)

    except:
        message = {'detail': 'User with this email already exists'} 
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def updateUser(request, pk):
    user = User.objects.get(id=pk)

    data = request.data

    user.first_name = data['firstname']
    user.last_name = data['lastname']
    user.username = data['email']
    user.email = data['email']
    user.is_staff = data['isAdmin']

    user.save()

    serializer = UserSerializer(user, many=False)

    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def deleteUser(request, pk):
    userForDeletion = User.objects.get(id=pk)
    userForDeletion.delete()
    return Response('User was deleted')

@api_view(['GET'])
def getPosts(request):
    posts = Post.objects.all()
    serializer = PostSerializer(posts, many=True)

    return Response(serializer.data)

@api_view(['GET'])
def getPost(request, pk):
    post = Post.objects.get(_id=pk)
    serializer = PostSerializer(post, many=False)

    return Response(serializer.data)

@permission_classes([IsAdminUser])
@api_view(['POST'])
def createPost(request):
    try:
        name = request.POST.get("name","") 
        image =  request.POST.get("image","") 
        imageBanner = request.POST.get("imageBanner","")
        authorName = request.POST.get("authorName","") 
        authorThumbnail = request.POST.get("authorThumbnail","") 
        tags = request.POST.get("tags","")
        title = request.POST.get("title","")
        description = request.POST.get("description","") 

        post = Post.objects.create(
            name = name,
            image = image,
            imageBanner = imageBanner,
            authorName = authorName,
            authorThumbnail = authorThumbnail,
            tags = tags,
            title = title,
            description = description,
        )

        serializer = PostSerializer(post, many=False)

        return Response(serializer.data)

    except IntegrityError as e:
        return Response(e, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAdminUser])
def updatePost(request, pk):
    post = Post.objects.get(_id=pk)

    data = request.data

    post.title = data['title']
    post.description = data['description']
    post.authorName = data['authorName']
    post.name = data['name']

    post.save()

    serializer = PostSerializer(post, many=False)

    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def deletePost(request, pk):
    postForDeletion = Post.objects.get(_id=pk)
    postForDeletion.delete()
    return Response('Post was deleted')

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def uploadPostImage(request):
    data = request.data

    post_id = data['post_id']
    post = Post.objects.get(_id=post_id)

    post.image = request.FILES.get('image')

    post.save()

    return Response('Image was uploaded')

@api_view(['POST'])
@permission_classes([IsAdminUser])
def uploadPostBanner(request):
    data = request.data

    post_id = data['post_id']
    post = Post.objects.get(_id=post_id)

    post.imageBanner = request.FILES.get('imageBanner')

    post.save()

    return Response('Banner Image was uploaded')

@api_view(['POST'])
@permission_classes([IsAdminUser])
def uploadPostThumbnail(request):
    data = request.data

    post_id = data['post_id']
    post = Post.objects.get(_id=post_id)

    post.authorThumbnail = request.FILES.get('authorThumbnail')

    post.save()

    return Response('Banner Image was uploaded')

@api_view(['GET'])
def getProjects(request):
    projects = Project.objects.all()
    serializer = ProjectSerializer(projects, many=True)

    return Response(serializer.data)

@api_view(['GET'])
def getProject(request, pk):
    project = Project.objects.get(_id=pk)
    serializer = ProjectSerializer(project, many=False)

    return Response(serializer.data)

@permission_classes([IsAdminUser])
@api_view(['POST'])
def createProject(request):
    try:
        name = request.POST.get("name","") 
        image =  request.POST.get("image","") 
        imageBanner = request.POST.get("imageBanner","")
        title = request.POST.get("title","")
        description = request.POST.get("description","") 

        project = Project.objects.create(
            name = name,
            image = image,
            imageBanner = imageBanner,
            title = title,
            description = description,
        )

        serializer = ProjectSerializer(project, many=False)

        return Response(serializer.data)

    except IntegrityError as e:
        return Response(e, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def updateProject(request, pk):
    project = Project.objects.get(_id=pk)

    data = request.data

    project.title = data['title']
    project.description = data['description']
    project.save()

    serializer = ProjectSerializer(project, many=False)

    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def deleteProject(request, pk):
    projectForDeletion = Project.objects.get(_id=pk)
    projectForDeletion.delete()
    return Response('Project was deleted')


@api_view(['POST'])
@permission_classes([IsAdminUser])
def uploadProjectImage(request):
    data = request.data

    project_id = data['project_id']
    project = Project.objects.get(_id=project_id)

    project.image = request.FILES.get('image')

    project.save()

    return Response('Image was uploaded')

@api_view(['POST'])
@permission_classes([IsAdminUser])
def uploadProjectBanner(request):
    data = request.data

    project_id = data['project_id']
    project = Project.objects.get(_id=project_id)

    project.imageBanner = request.FILES.get('imageBanner')

    project.save()

    return Response('Banner Image was uploaded')

@api_view(['POST'])
@ensure_csrf_cookie
def contact(request):
    message_name = request.data.get('message_name')
    message_email = request.data.get('email')
    message = request.data.get('message')

    send_mail(
       'message from ' + str(message_name),
        message +'\n'+'Email Address: ' + str(message_email),
        message_email,
        ['amit@mosaicpro.io'] 
    )

    return Response(True)
