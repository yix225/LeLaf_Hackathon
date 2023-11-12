from flask import Flask , request , abort , redirect , Response ,url_for, jsonify
from flask_login import LoginManager , login_required , UserMixin , login_user, current_user

import os
app = Flask(__name__)

# Configuring the app
app.config['SECRET_KEY'] = 'secret_key'
login_manager = LoginManager()
login_manager.init_app(app)
class Post:
    def __init__(self , id , content , postId, comments=[],type='all'):
        self.id = id
        self.content = content
        self.postId = postId
        self.comments = comments
        self.type = type

class PostsRepository:
    def __init__(self):
        self.posts = dict()
        self.posts_id_dict = dict()
        self.identifier = 0
    
    def save_post(self, post):
        self.posts_id_dict.setdefault(post.id, post)
        self.posts.setdefault(post.postId, post)
    
    def get_post(self, postId):
        return self.posts.get(postId)
    
    def get_post_by_id(self, postid):
        return self.posts_id_dict.get(postid)
    
    def get_posts(self):
        return self.posts.values()
    
    def get_posts_by_user(self, user):
        return user.get_posts()
    
    def get_posts_by_following(self, user):
        return user.get_posts()
    
    def get_posts_by_career(self, user):
        return user.get_posts()
    
    def get_posts_by_education(self, user):
        return user.get_posts()
    
    def get_posts_by_health(self, user):
        return user.get_posts()
    
    def get_posts_by_entertainment(self, user):
        return user.get_posts()
    
    def get_posts_by_sports(self, user):
        return user.get_posts()
    
    def get_posts_by_politics(self, user):
        return user.get_posts()
    
    def get_posts_by_technology(self, user):
        return user.get_posts()
    
    def get_posts_by_news(self, user):
        return user.get_posts()
    
    def get_posts_by_science(self, user):
        return user.get_posts()
    
    def get_posts_by_food(self, user):
        return user.get_posts()
    
    def get_posts_by_travel(self, user):
        return user.get_posts()
    
    def get_posts_by_fashion(self, user):
        return user.get_posts()
    
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
        # data = request.json
        # username = data.get('username')
        # password = data.get('password')

        data = request.get_data()
        print('Data '+ str(data))
        # password = request.get_data('password')
        json_data = request.get_json()

        if json_data:
            username = json_data.get('username')
            password = json_data.get('password')

            print('Username:', username)
            print('Password:', password)
        
        registeredUser = users_repository.get_user(username)
        print('Registered user '+ str(registeredUser))
        print('Users '+ str(users_repository.users))
        print('Register user %s , password %s' % (registeredUser.username, registeredUser.password))
        if registeredUser != None and registeredUser.password == password:
            print('Logged in..')
            login_user(registeredUser)
            return redirect(url_for('home'))
        else:
            return abort(401)
    else:
         return Response('''
            <form action="" method="post">
                <p><input type=text name=username>
                <p><input type=password name=password>
                <p><input type=submit value=Login>
            </form>
        ''')
        # return jsonify({
        #         "method": "post",
        #         "inputs": [
        #             {"type": "text", "name": "username"},
        #             {"type": "password", "name": "password"}
        #         ],
        #         "submit": {"type": "submit", "value": "Login"}
        #     })
    
@app.route('/register' , methods = ['GET' , 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        new_user = User(username , password , users_repository.next_index())
        users_repository.save_user(new_user)

        registeredUser = users_repository.get_user(username)
        print('Registered user '+ str(registeredUser))

        return Response("Registered Successfully")
    else:
        return Response('''
            <form action="" method="post">
            <p><input type=text name=username placeholder="Enter username">
            <p><input type=password name=password placeholder="Enter password">
            <p><input type=submit value=Login>
            </form>
        ''')
        # return jsonify({
        #         "method": "post",
        #         "inputs": [
        #             {"type": "text", "name": "username"},
        #             {"type": "password", "name": "password"}
        #         ],
        #         "submit": {"type": "submit", "value": "Register"}
        #     })



@app.route('/signup', methods=['GET','POST'])
def signup():
    print('Signup...')
    # try:
    #     json_data = request.get_json()

    #     # Assuming the JSON data has keys 'username' and 'password'
    #     username = json_data.get('username')
    #     password = json_data.get('password')
    #     print('Username:', username)
    #     print('Password:', password)

    #     registeredUser = users_repository.get_user(username)
    #     print('Registered user '+ str(registeredUser))

    #     # Add your processing logic here

    #     return jsonify({'message': 'Data processed successfully'})
    # except Exception as e:
    #     return jsonify({'error': str(e)}), 400



    # data = request.json
    # username = data.get('username')
    # password = data.get('password')

    # data = request.get_data()
    # print('Data '+ str(data))
    # password = request.get_data('password')
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


@app.route('/profile/<userId>')
@login_required
def profile(userId):
    print('Profile...')
    profile = users_repository.get_user_by_id(userId)
    if profile is None:
        return Response('<p>Profile Design</p>')
    else:
        return Response(
        '''
            <h1>Profile Page</h1>
        '''
        )
    

@app.route('/logout')
@login_required
def logout():
    print('Logged out..')


@app.route('/allPosts/<type>', methods=['GET'])
@login_required
def allPosts(type):
    print('All Posts...')
    if request.method == 'GET':
        posts = []
        if type == 'all':
            posts = posts_repository.get_posts()
        elif type == 'family':
            posts = posts_repository.get_posts_by_user(current_user)
        elif type == 'relationship':
            posts = posts_repository.get_posts_by_following(current_user)
        elif type == 'career':
            posts = posts_repository.get_posts_by_career(current_user)
        elif type == 'personal':
            posts = posts_repository.get_posts_by_education(current_user)
        elif type == 'finance':
            posts = posts_repository.get_posts_by_health(current_user)
        elif type == 'lafayette':
            posts = posts_repository.get_posts_by_entertainment(current_user)
        elif type == 'northampton':
            posts = posts_repository.get_posts_by_sports(current_user)
        elif type == 'lehigh':
            posts = posts_repository.get_posts_by_politics(current_user)
        elif type == 'moravian':
            posts = posts_repository.get_posts_by_technology(current_user)
        elif type == 'cedar':
            posts = posts_repository.get_posts_by_news(current_user)
        elif type == 'lehigh_carbon':
            posts = posts_repository.get_posts_by_science(current_user)
        elif type == 'kutztown':
            posts = posts_repository.get_posts_by_food(current_user)
        elif type == 'desales':
            posts = posts_repository.get_posts_by_travel(current_user)
        elif type == 'muhlenberg':
            posts = posts_repository.get_posts_by_fashion(current_user)
        else:
            return abort(404)
        return jsonify(posts)
    else:
        return abort(404)


@app.route('/addPost/<userId>/<postId>', methods=['POST'])
@login_required
def post():
    print('Post...')
    if request.method == 'POST':
        data = request.json
        content = data.get('content')
        postId = data.get('postId')
        new_post = Post(users_repository.next_index(), content, postId)
    
# handle login failed
@app.errorhandler(401)
def page_not_found(e):
    return Response('<p>Login failed</p>')

# callback to reload the user object        
@login_manager.user_loader
def load_user(userid):
    return users_repository.get_user_by_id(userid)

if __name__ == '__main__':
    app.run(host='172.20.10.3', port=3000, debug =True)