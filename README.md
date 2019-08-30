# Defeat Repeat: Outfit Tracker
This Single Page Application allows users to make posts with an image, date, notes and tags to keep track of their outfits. Users are able to upload an existing image or upload one using the webcam, as well as filtering their posts by a tag.

I don't mind being an outfit repeater but sometimes I like to keep things fresh. Rather than trying to remember what I wore the last time I met up with a friend, defeatRepeat will keep track for me so I can wear another outfit!

## Setup Steps
1. Fork and clone this repository.
2. Run `npm install` to install all dependencies
3. Use `npm run server` to spin up the server.

## Important Links
[Frontend repo](https://github.com/ekmy318/defeatRepeat) :womans_clothes: [Backend repo](https://github.com/ekmy318/defeatRepeat_backend)

[Client deploy](https://ekmy318.github.io/defeatRepeat/) :jeans: [Heroku deploy](https://whispering-tor-43219.herokuapp.com)

## Planning Story
For this capstone project, I wanted to build an application that would challenge me to utilize the skills I've learned over the last 12 weeks plus some stretch goals. This project aims to meet a practical need I have on a regular basis (outfit repeating) as well as showcase my tech knowledge.

Once I decided on the idea with user stories, I decided on a tech stack, researched the necessary npm packages and got to wireframing!

The biggest struggle I faced through the 4 day project sprint was understanding React and knowing how to best utilize this awesome framework. Related to this, incorporating the various packages also proved to be a challenge. However, through LOTS of googling, patient instructional team and motivating classmates, Defeat Repeat is born!

#### User Stories
- As a user, I want to create a new account.
- As a user, I want to sign into my account.
- As a user, I want to change the password of my account.
- As a user, I want to log out of my account.
- As a user, I want to, on my account, view a post from a specific date.
- As a user, I want to, on my account, create a post with a picture, date, notes and tags.
- As a user, I want to, on my account, edit a post's picture, date, notes or tags.
- As a user, I want to, on my account, delete a post.
- As a user, I want to, on my account, filter the posts by tags.

#### Technologies Used

| Frontend      | Backend |
| ------------- |---------|
| React         | Express |
| Javascript    | Node.js |
| HTML          | Heroku  |
| CSS/SCSS      | MongoDB/Mongoose    |
| Bootstrap     | Amazon Web Services |

#### Catalog of Routes
| Verb   | URI Pattern      |
| ------ |------------------|
| POST   | /sign-up         |
| POST   | /sign-in         |
| PATCH  | /change-password |
| DELETE | /sign-out        |

| Verb   | URI Pattern |
| ------ |-------------|
| GET    | /posts      |
| GET    | /posts/:id  |
| POST   | /posts      |
| PATCH  | /posts/:id  |
| DELETE | /posts/:id  |


#### Future Iterations
- Allow users to search by multiple tags
- Allow posts to be retrieved by date

## Images
App Screenshot
![Calendar](https://i.imgur.com/37UXbxv.png)
##### Clickable calendar to retrieve all posts frmo that day, search bar to filter by tags and a list of all posts.

![Make Post](https://i.imgur.com/nzW7FGA.png)
##### Make a post with a local file or take a picture with the webcam

![img](https://i.imgur.com/RXKfxI2.png)
##### Outfit post!


Wireframe
![wireframe](https://i.imgur.com/sB8ZrwK.jpg)

ERD
![ERD](https://i.imgur.com/kZO2zFm.jpg)
