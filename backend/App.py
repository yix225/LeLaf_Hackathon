from flask import Flask , request , abort , redirect , Response ,url_for, jsonify
from flask_login import LoginManager , login_required , UserMixin , login_user, current_user

import os
app = Flask(__name__)

# Configuring the app
app.config['SECRET_KEY'] = 'secret_key'
login_manager = LoginManager()
login_manager.init_app(app)

class Comment:
    def __init__(self, postId, content):
        self.postId = postId
        self.content = content
            
    def get_comment(self):
        return {
            'postId': self.postId,
            'content': self.content
        }
    
class CommentsRepository:
        
        def __init__(self):
            self.comments = dict()
            self.identifier = 0
            
        def save_comment(self, comment):
            self.comments.setdefault(comment.postId, comment)
            
        def get_all_comment(self, postId):
            my_comments = []
            for comment in self.comments.values():
                if comment.postId == postId:
                    my_comments.append(comment)
            return my_comments
    

class Profile:
    def __init__(self, username, email = None, posts=[]):
        self.username = username
        self.email = email
        self.posts = posts
    
    def get_userInfo(self):
        return {
            # 'userId': self.userId,
            'username': self.username,
            # 'email': self.email,
            'posts':  [post.to_post() for post in self.posts]
        }
    
class Post:
    def __init__(self ,username, content , postId, comments=[],types='all'):
        self.username = username
        self.content = content
        self.postId = postId
        self.comments = comments
        self.types = types

    def to_post(self):
        return {
            'username': self.username,
            'content': self.content,
            'postId': self.postId,
            'comments': self.comments,
            'types': self.types
        }

class PostsRepository:
    
        def __init__(self):
            self.posts = dict()
            self.identifier = 0
        
        def save_post(self, post):
            self.posts.setdefault(post.postId, post)
        
        def get_post(self, postId):
            return self.posts.get(postId)
        
        def get_posts(self):
            return self.posts
        
        def get_family_posts(self, user):
            posts = []
            for post in self.posts.values():
                if post.types == 'family':
                    posts.append(post)
            return posts
        
        def get_relationship_posts(self, user):
            posts = []
            for post in self.posts.values():
                if post.types == 'relationship':
                    posts.append(post)
            return posts
        
        def get_career_posts(self, user):
            posts = []
            for post in self.posts.values():
                if post.types == 'career':
                    posts.append(post)
            return posts
        
        def get_personal_posts(self, user):
            posts = []
            for post in self.posts.values():
                if post.types == 'personal':
                    posts.append(post)
            return posts
        
        def get_finance_posts(self, user):
            posts = []
            for post in self.posts.values():
                if post.types == 'finance':
                    posts.append(post)
            return posts
        
        def get_lafayette_posts(self, user):
            posts = []
            for post in self.posts.values():
                if post.types == 'lafayette':
                    posts.append(post)
            return posts
        
        def get_northampton_posts(self, user):
            posts = []
            for post in self.posts.values():
                if post.types == 'northampton':
                    posts.append(post)
            return posts
        
        def get_lehigh_posts(self, user):
            posts = []
            for post in self.posts.values():
                if post.types == 'lehigh':
                    posts.append(post)
            return posts
        
        def get_moravian_posts(self, user):
            posts = []
            for post in self.posts.values():
                if post.types == 'moravian':
                    posts.append(post)
            return posts
        
        def get_cedar_posts(self, user):
            posts = []
            for post in self.posts.values():
                if post.types == 'cedar':
                    posts.append(post)
            return posts
        
        def get_lehigh_carbon_posts(self, user):
            posts = []
            for post in self.posts.values():
                if post.types == 'lehigh_carbon':
                    posts.append(post) 
            return posts

        def get_kutztown_posts(self, user):
            posts = []
            for post in self.posts.values():
                if post.types == 'kutztown':
                    posts.append(post)
            return posts
        
        def get_desales_posts(self, user):
            posts = []
            for post in self.posts.values():
                if post.types == 'desales':
                    posts.append(post)
            return posts
        
        def get_muhlenberg_posts(self, user):
            posts = []
            for post in self.posts.values():
                if post.types == 'muhlenberg':
                    posts.append(post)
            return posts
        
        def next_index(self):
            self.identifier +=1
            return self.identifier
        
class User(UserMixin):
    def __init__(self , username , password , id , active=True, email=None, posts=[]):
        self.id = id
        self.username = username
        self.password = password
        self.active = active
        self.email = email
        self.posts = []

    def get_id(self):
        return self.id

    def is_active(self):
        return self.active

    def get_auth_token(self):
        return make_secure_token(self.username , key='secret_key')
    
    def get_username(self):
        return self.username
    
    def get_userInfo(self):
        return {
            'username': self.username,
            'id': self.id,
            'active': self.active,
            'email': self.email
        }
    
    def get_posts(self):
        return self.posts
    



class UsersRepository:

    def __init__(self):
        self.users = dict()
        self.users_id_dict = dict()
        self.identifier = 0
    
    def save_user(self, user):
        self.users_id_dict.setdefault(user.id, user)
        self.users.setdefault(user.username, user)
    
    def get_user(self, username):
        return self.users.get(username)
    
    def get_user_by_id(self, userid):
        return self.users_id_dict.get(userid)
    
    def next_index(self):
        self.identifier +=1
        return self.identifier

users_repository = UsersRepository()
posts_repository = PostsRepository()
comments_repository = CommentsRepository()



# routes

# home page
@app.route('/')
# @login_required
def home():
    print('Home...')
    return Response(
        '''
            <h1>Home Page</h1>
        '''
        )

@app.route('/login' , methods=['GET' , 'POST'])
def login():
    print('Login...')
    if request.method == 'POST':

        data = request.get_data()
        print('Data '+ str(data))
        # password = request.get_data('password')
        json_data = request.get_json()

        if json_data:
            username = json_data.get('username')
            password = json_data.get('password')

            print('Username:', username)
            print('Password:', password)
        
        # registeredUser = users_repository.get_user(username)
        # print('Registered user '+ str(registeredUser))
        # print('Users '+ str(users_repository.users))
        # print('Register user %s , password %s' % (registeredUser.username, registeredUser.password))
        user_obj = users_repository.get_user(username)
        if user_obj.username != None and user_obj.password == password:
            # print('Logged in..')
            login_user(user_obj)
            # redirect to home page if login successful
            return redirect(url_for('profile'))
            # return redirect(url_for('addPost', types='all'))
            # return redirect(url_for('allPosts', types='all'))
        else:
            return abort(401)
    else:
         return Response('''
            <form action="" method="post">
                <p><input types=text name=username>
                <p><input types=password name=password>
                <p><input types=submit value=Login>
            </form>
        ''')
        # return jsonify({
        #         "method": "post",
        #         "inputs": [
        #             {"types": "text", "name": "username"},
        #             {"types": "password", "name": "password"}
        #         ],
        #         "submit": {"types": "submit", "value": "Login"}
        #     })


def login_user(user):
    global current_user
    current_user = user
    print('Logged in user '+ str(current_user))
    print('Logged in user '+ str(current_user.username))
    return

@app.route('/signup', methods=['GET','POST'])
def signup():
    print('Signup...')
    json_data = request.get_json()

    if json_data:
        username = json_data.get('username')
        password = json_data.get('password')

        print('Username:', username)
        print('Password:', password)
        
        new_user = User(username,password,users_repository.next_index())
        users_repository.save_user(new_user)
        print('Registered user '+ str(new_user))
        print("username" + new_user.username)
        print("password" + new_user.password)
    else:
        print('No data')
    return Response("Registered Sucessfully")


@app.route('/profile', methods=['GET'])
def profile():
    print('global user '+ str(current_user.username))
    print('Profile...')
    
    
    # get posts when username = current_user.username
    # use a for loop to check if username in posts = current_user.username
    # if yes, add to posts list
    # return posts list
    posts = []
    for post in posts_repository.posts.values():
        if post.username == current_user.username:
            posts.append(post)
    print('Posts '+ str(posts))   
    profile = Profile(current_user.username, email = None, posts = posts)
    print('Profile '+ str(profile))
    print('Profile '+ str(profile.get_userInfo()))

    print(profile.get_userInfo())
    return jsonify(profile.get_userInfo())

    # return profile.get_userInfo()

    # return json of avatar, username, email, posts
    # print("returning profile")
    # print(profile.get_userInfo())

@app.route('/logout')
@login_required
def logout():
    print('Logged out..')


@app.route('/allPosts/<types>', methods=['GET'])
#@login_required
def allPosts(types):
    # json_data = request.get_json()
    # print('Received JSON data:', json_data)

    # content = json_data.get('content')
    # print('Content:', content)
    # my_type = json_data.get('type')
    # print('Type:', my_type)
    # print('All Posts...')
    my_type = types
    if request.method == 'GET':
        posts = []
        if my_type == 'all':
            posts = posts_repository.get_posts()
            print("posts")
            print(str(posts))
        elif my_type == 'family':
            posts = posts_repository.get_family_posts(current_user)
        elif my_type == 'relationship':
            posts = posts_repository.get_relationship_posts(current_user)
        elif my_type == 'career':
            posts = posts_repository.get_career_posts(current_user)
        elif my_type == 'personal':
            posts = posts_repository.get_personal_posts(current_user)
        elif my_type == 'finance':
            posts = posts_repository.get_finance_posts(current_user)
        elif my_type == 'lafayette':
            posts = posts_repository.get_lafayette_posts(current_user)
        elif my_type == 'northampton':
            posts = posts_repository.get_northampton_posts(current_user)
        elif my_type == 'lehigh':
            posts = posts_repository.get_lehigh_posts(current_user)
        elif my_type == 'moravian':
            posts = posts_repository.get_moravian_posts(current_user)
        elif my_type == 'cedar':
            posts = posts_repository.get_cedar_posts(current_user)
        elif my_type == 'lehigh_carbon':
            posts = posts_repository.get_lehigh_carbon_posts(current_user)
        elif my_type == 'kutztown':
            posts = posts_repository.get_kutztown_posts(current_user)
        elif my_type == 'desales':
            posts = posts_repository.get_desales_posts(current_user)
        elif my_type == 'muhlenberg':
            posts = posts_repository.get_muhlenberg_posts(current_user)
        else:
            return abort(404)
        

        ret = []
        for post in posts.values():
            ret.append(post.to_post())

        print("ret" + str(ret))
        # print(ret)
        return jsonify(ret)
        # return response(posts)
    else:
        return abort(404)


@app.route('/addPost/<types>', methods=['POST'])
# @login_required
def addPost(types):
    print('Add Post...')
    # print('Received POST request to /addPost/' + type)

    if request.method == 'POST':
        # json_data = request.get_json()
        # content = json_data.get('content')
        # new_post = Post(postId=posts_repository.next_index(), content=content, type=type,username=current_user.username)
        # posts_repository.save_post(new_post)
        # return Response("Post Added Sucessfully")
        try:
            json_data = request.get_json()
            print('Received JSON data:', json_data)

            content = json_data.get('postText')
            print('Content:', content)
            my_type = types
            print('Type:', my_type)
            new_post = Post(postId=posts_repository.next_index(), content=content, types=my_type, username=current_user.username)
            posts_repository.save_post(new_post)

            print('Post Added Successfully')
            return jsonify(new_post.to_post())
        except Exception as e:
            print('Error:', str(e))
            return abort(500)  # Internal Server Error
    else:
        return abort(404)
    
@app.route('/addComment/<postId>', methods=['POST'])
@login_required
def addComment(postId):
    print('Comment...')
    if request.method == 'POST':
        json_data = request.get_json()
        content = json_data.get('content')
        new_comment = Comment(postId=postId, content=content)
        comments_repository.save_comment(new_comment)
        return Response("Comment Added Sucessfully")
    else:
        return abort(404)
    
@app.route('/getAllComments/<postId>', methods=['GET'])
@login_required
def getAllComments(postId):
    print('All Comments...')
    if request.method == 'GET':
        comments = comments_repository.get_all_comment(postId)
        return jsonify(comments)
    else:
        return abort(404)
    
# handle login failed
@app.errorhandler(401)
def page_not_found(e):
    return Response('<p>Login failed</p>')

# callback to reload the user object        
@login_manager.user_loader
def load_user(userid):
    return users_repository.get_user_by_id(userid)

if __name__ == '__main__':
    app.run(host='172.20.10.7', port=3000, debug =True)
