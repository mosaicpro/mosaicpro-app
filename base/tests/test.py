from django.test import TestCase
from base.models import Post
from base.models import Project
from django.utils import timezone
from django.urls import reverse
from django.core import mail
from django.contrib.auth.models import User
from django.core.files.uploadedfile import SimpleUploadedFile
from io import BytesIO
from PIL import Image
import json

class PostTest(TestCase):

    def create_user_with_token(self):
        url=reverse("token_obtain_pair")
        u=User.objects.create_user(username='user', email='user@foo.com', password='pass', is_staff=True)
        resp = self.client.post(url, {'username':'user', 'email':'user@foo.com', 'password':'pass'}, format='json')
        token = resp.data['token']
        return token

    def create_post(self,title="test title",description="this is a description",tags="test"):
        return Post.objects.create(title=title, description=description,tags=tags, createdAt=timezone.now())

    def temporary_image(self):
        bts = BytesIO()
        img = Image.new("RGB", (100, 100))
        img.save(bts, 'jpeg')
        return SimpleUploadedFile("test.jpg", bts.getvalue())

    # models test
    def test_post_creation(self):
        p = self.create_post()
        self.assertTrue(isinstance(p, Post))
        self.assertEqual("test title", p.title)
        self.assertEqual("this is a description", p.description)
        self.assertEqual("test", p.tags)

    # views (uses reverse)
    def test_post_list_view(self):
        p = self.create_post()
        p1 = self.create_post(title="second title")
        url = reverse("posts")
        resp = self.client.get(url)
        self.assertEqual(json.loads(resp.content)[0]['title'], p.title)
        self.assertEqual(json.loads(resp.content)[1]['title'], p1.title)
        self.assertEqual(resp.status_code, 200)

    def test_post_view(self):
        p = self.create_post()
        url = reverse("post", kwargs={'pk':p._id})
        resp = self.client.get(url)
        self.assertEqual(json.loads(resp.content)['title'], p.title)
        self.assertEqual(resp.status_code, 200)
    
    def test_create_post(self):
        url=reverse("post-create")
        token = self.create_user_with_token()

        resp = self.client.post(url,{ "name":"Post 1", "description":"this is a blog post","title":"this is a title"  } ,HTTP_AUTHORIZATION = "Bearer "+token, format='json')
    
        self.assertEqual(resp.status_code, 200)
        self.assertTrue(Post.objects.filter(name="Post 1").count() > 0)

    def test_update_post(self):
        token = self.create_user_with_token()

        post = self.create_post(title="test title",description="this is a description",tags="test")
        url="/api/post/update/"+str(post._id)+'/'

        resp = self.client.post(url,data ={ "description":"description","title":"title", "authorName":"Bob", "name":"POST"  } ,HTTP_AUTHORIZATION = "Bearer "+token, content_type="application/json", format="json")
    
        self.assertEqual(resp.status_code, 200)
        self.assertTrue(Post.objects.get(_id=str(post._id)).description=='description')

    def test_upload_post_image(self):
        token = self.create_user_with_token()

        post = self.create_post(title="test title",description="this is a description",tags="test")
        url="/api/post/upload-image/"

        image = self.temporary_image()
        resp = self.client.post(url, data={'post_id':post._id},files={'image':image} ,HTTP_AUTHORIZATION = "Bearer "+token,)
    
        self.assertEqual(resp.status_code, 200)

    def test_upload_post_banner_image(self):
        token = self.create_user_with_token()

        post = self.create_post(title="test title",description="this is a description",tags="test")
        url="/api/post/upload-banner/"

        image = self.temporary_image()
        resp = self.client.post(url, data={'post_id':post._id},files={'image':image} ,HTTP_AUTHORIZATION = "Bearer "+token,)
    
        self.assertEqual(resp.status_code, 200)
    
    def test_upload_post_thumbnail_image(self):
        token = self.create_user_with_token()

        post = self.create_post(title="test title",description="this is a description",tags="test")
        url="/api/post/upload-thumbnail/"

        image = self.temporary_image()
        resp = self.client.post(url, data={'post_id':post._id},files={'image':image} ,HTTP_AUTHORIZATION = "Bearer "+token,)
    
        self.assertEqual(resp.status_code, 200)  

    def test_delete_post(self):
        token = self.create_user_with_token()
            
        post = self.create_post(title="test title",description="this is a description",tags="test")

        url='/api/post/delete/'+str(post._id)+'/'

        self.assertTrue(Post.objects.filter(title="test title").count()> 0)

        resp = self.client.get(url,HTTP_AUTHORIZATION = "Bearer "+token)
        self.assertEqual(resp.status_code, 200)
        self.assertTrue(Post.objects.filter(title="test title").count() == 0)

class ProjectTest(TestCase):
    def create_user_with_token(self):
        url=reverse("token_obtain_pair")
        u=User.objects.create_user(username='user', email='user@foo.com', password='pass', is_staff=True)
        resp = self.client.post(url, {'username':'user', 'email':'user@foo.com', 'password':'pass'}, format='json')
        token = resp.data['token']
        return token

    def create_project(self,title="test title",description="this is a description"):
        return Project.objects.create(title=title, description=description, createdAt=timezone.now())
    
    def temporary_image(self):
        bts = BytesIO()
        img = Image.new("RGB", (100, 100))
        img.save(bts, 'jpeg')
        return SimpleUploadedFile("test.jpg", bts.getvalue())

    def test_project_creation(self):
        p = self.create_project()
        self.assertTrue(isinstance(p, Project))
        self.assertEqual("test title", p.title)
        self.assertEqual("this is a description", p.description)

    # views (uses reverse)
    def test_project_list_view(self):
        p = self.create_project()
        p1 = self.create_project(title="second title")
        url = reverse("projects")
        resp = self.client.get(url)
        self.assertEqual(json.loads(resp.content)[0]['title'], p.title)
        self.assertEqual(json.loads(resp.content)[1]['title'], p1.title)
        self.assertEqual(resp.status_code, 200)

    def test_project_view(self):
        p = self.create_project()
        url = reverse("project", kwargs={'pk':p._id})
        resp = self.client.get(url)
        self.assertEqual(json.loads(resp.content)['title'], p.title)
        self.assertEqual(resp.status_code, 200)

    def test_create_project(self):
        url=reverse("project-create")
        token = self.create_user_with_token()

        resp = self.client.post(url,{ "name":"Project 1", "description":"this is a project","title":"this is a title"  } ,HTTP_AUTHORIZATION = "Bearer "+token, format='json')
    
        self.assertEqual(resp.status_code, 200)
        self.assertTrue(Project.objects.filter(name="Project 1").count() > 0)

    def test_update_project(self):
        token = self.create_user_with_token()

        project = self.create_project(title="test title",description="this is a description")
        url="/api/project/update/"+str(project._id)+'/'

        resp = self.client.post(url,{ "description":"description","title":"title"  } ,HTTP_AUTHORIZATION = "Bearer "+token, content_type="application/json", format="json")
    
        self.assertEqual(resp.status_code, 200)
        self.assertTrue(Project.objects.get(_id=str(project._id)).description=='description')

    def test_upload_project_image(self):
        token = self.create_user_with_token()

        project = self.create_project(title="test title",description="this is a description")
        url="/api/project/upload-image/"

        image = self.temporary_image()
        resp = self.client.post(url, data={'project_id':project._id},files={'image':image} ,HTTP_AUTHORIZATION = "Bearer "+token,)
    
        self.assertEqual(resp.status_code, 200)

    def test_upload_project_banner_image(self):
        token = self.create_user_with_token()

        project = self.create_project(title="test title",description="this is a description")
        url="/api/project/upload-banner/"

        image = self.temporary_image()
        resp = self.client.post(url, data={'project_id':project._id},files={'image':image} ,HTTP_AUTHORIZATION = "Bearer "+token,)
    
        self.assertEqual(resp.status_code, 200)    

    def test_delete_project(self):
        token = self.create_user_with_token()
            
        project = self.create_project(title="test title",description="this is a description")

        url='/api/project/delete/'+str(project._id)+'/'

        self.assertTrue(Project.objects.filter(title="test title").count()> 0)

        resp = self.client.get(url,HTTP_AUTHORIZATION = "Bearer "+token)
        self.assertEqual(resp.status_code, 200)
        self.assertTrue(Project.objects.filter(title="test title").count() == 0)

class ContactTest(TestCase):
    # contact test
    def test_post_contact_details(self):
        url = reverse("contact")
        data = {"message_name":"Joe Bloggs", "message":"test message","email":"joe@example.com"}
        self.client.post(url, data=data)
        self.assertEqual(len(mail.outbox), 1)
        self.assertEqual(mail.outbox[0].subject,'message from Joe Bloggs')
        self.assertEqual(mail.outbox[0].body,'test message'+'\n'+'Email Address: joe@example.com')
        self.assertEqual(mail.outbox[0].from_email,'joe@example.com')
        self.assertEqual(mail.outbox[0].to,['amit@mosaicpro.io'])    

class UserTest(TestCase):
    def create_user_with_token(self):
        url=reverse("token_obtain_pair")
        u=User.objects.create_user(username='user', email='user@foo.com', password='pass', is_staff=True)
        resp = self.client.post(url, {'username':'user', 'email':'user@foo.com', 'password':'pass'}, format='json')
        token = resp.data['token']
        return token

    def test_get_users(self):    
        token = self.create_user_with_token()
            
        user = User.objects.create_user(username='john', email='jd@example.com', password='pass')

        url=reverse("users")

        resp = self.client.get(url,HTTP_AUTHORIZATION = "Bearer "+token)
        self.assertTrue(len(resp.data)==2)

    def test_get_user_profile(self):    
        token = self.create_user_with_token()
            
        url=reverse("users-profile")

        resp = self.client.get(url,HTTP_AUTHORIZATION = "Bearer "+token)
        self.assertTrue(resp.data['username']=='user')        


    def test_register_user(self):
        url=reverse("register")
        token = self.create_user_with_token()


        resp = self.client.post(url,data={"firstname":"John","lastname":"Doe" ,"email":"jd@example.com","password":"password", "isAdmin":"True"  } ,HTTP_AUTHORIZATION = "Bearer abc")
        self.assertEqual(resp.status_code, 401)

        resp = self.client.post(url,data ={"firstname":"John","lastname":"Doe" ,"email":"jd@example.com","password":"password", "isAdmin":"True"  } ,HTTP_AUTHORIZATION = "Bearer "+token)
    
        self.assertEqual(resp.status_code, 200)
        self.assertTrue(User.objects.filter(email="jd@example.com").count() > 0)

    def test_delete_user(self):
        token = self.create_user_with_token()
            
        user = User.objects.create_user(username='john', email='jd@example.com', password='pass')

        url='/api/users/delete/'+str(user.id)+'/'

        self.assertTrue(User.objects.filter(email="jd@example.com").count()> 0)


        resp = self.client.get(url,HTTP_AUTHORIZATION = "Bearer "+token)
        self.assertEqual(resp.status_code, 200)
        self.assertTrue(User.objects.filter(email="jd@example.com").count() == 0)
    
    def test_update_user(self):
        token = self.create_user_with_token()

        user = User.objects.create_user(username='Jimmy', email='jimmy@example.com', password='pass')

        url='/api/users/update/'+str(user.id)+'/'

        resp = self.client.post(url,data={ "firstname":"John","lastname":"Doe", "email":"jd@example.com","password":"password", "isAdmin":False} ,HTTP_AUTHORIZATION = "Bearer "+token, content_type='application/json')
    
        self.assertEqual(resp.status_code, 200)
        self.assertTrue(User.objects.filter(email="jd@example.com").count() > 0)    
        self.assertTrue(User.objects.filter(email="jimmy@example.com").count() == 0)    