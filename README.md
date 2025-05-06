# TravelTales

## Advanced Front-End - Portfolio Project 5

TravelTales is a full-stack content-sharing web application built as part of the Advanced Front-End Portfolio Project. The goal of this project is to demonstrate proficiency in advanced front-end development practices using React, combined with a RESTful Django REST Framework API on the back-end.

The application allows users to sign up, create and share travel-related posts, interact with others through likes and comments, and follow fellow travelers. Posts can be filtered by title and location, creating a curated and accessible experience for users interested in specific destinations or types of travel.

![Image of website on several different devices, using am i responsive app](https://res.cloudinary.com/dvgobcuck/image/upload/v1746546774/responsive_yunazb.png)

<h1 id="contents">Table of Contents</h1> 

- [Agile Development](#agile-development)
    - [Kanban board](#kanban-board)
- [UX](#UX)
    - [User-Centered Problem Statement](#user-centered-problem-statement)
    - [Website Owner Business Goals](#website-owner-goals)
    - [User Goals](#user-goals) 
    - [User Stories](#user-stories) 
-[Design Process](#design-process)
    - [Structure](#structure) 
    - [Surface](#surface)

<h2 id="kanban-board">Kanban Board</h2>

### The Role of a Kanban Board in Project Management
- A Kanban board is a visual workflow management tool that helps track tasks, organize work, and improve productivity. It is widely used in project development to streamline processes, identify bottlenecks, and ensure efficient task prioritization. 

### My Experience with a Kanban Board
- For this project, I set up a Kanban board divided into three main columns: "To Do," "In Progress," and "Done." This structure allowed me to manage my workload effectively, ensuring I focused on one task at a time while maintaining visibility over the project's overall progress.
- To optimize task management, I incorporated the following features:
    - Epics – I grouped related tasks under broader sections to organize work into meaningful categories.
    - Labels using the MoSCoW method – I categorized tasks into "Must Have," "Should Have," "Could Have," and "Won’t Have" to prioritize essential work.
    - Milestones – I used this feature to track progress and assess whether I was on schedule, allowing me to adjust my time management strategies as needed.

[Back to Contents](#contents)

<h1 id="UX">UX</h1>

<h2 id="user-centered-problem-statement">User-Centered Problem Statement</h2>

*"As someone who loves to travel, I often find myself stuck when trying to decide where to go next. I want real recommendations from real people — not polished ads or generic travel blogs. I want to hear about hidden gems, honest experiences, and personal tips from fellow travellers who’ve been there."*

*"But it’s hard to find all of that in one place. I jump between blogs, YouTube videos, and social media, and still feel like I’m missing out on the full picture. I don’t just want to read about travel — I want to connect with people, share my own stories, and be part of a community that inspires and supports each other."*

*"What I really need is a simple, friendly platform where I can browse travel stories, get inspired, and share my own adventures. Somewhere I can comment, like, follow, and interact — not just consume content. I want travel to feel personal again."*

<h2 id="website-owner-goals">Website Owner Business Goals</h2> 

- Build an engaged travel community, where users actively share their travel experiences, interact with others, and return regularly to discover new destinations and content.
- Build an integrated front-end and back-end system that allows users to create, update, and manage their content safely. Prioritise security best practices—such as authentication, authorization, and environment variable management—to protect user data and provide a trustworthy experience across the platform.
- Grow the platform’s user base by encouraging user sign-ups and participation through a simple, accessible interface that makes it easy to post, comment, like, and follow others.
- Build a scalable platform that can expand to include additional features (e.g., trip planning tools, travel guides, partner promotions) as the community grows.

<h2 id="user-goals">User Goals</h2> 

### New Users 
- Discover new travel destinations and experiences
- Share my own travel stories and photos
- Connect with other travellers through comments and likes
- Follow users whose journeys inspire me
- Filter posts by location or category to find what interests me
- Personalise my profile to reflect my travel identity
- Use a secure platform where my content and data are protected

### Returning Users 
- Catch up on new posts from users I follow
- Continue conversations through comments
- Check the engagement on my latest posts
- Edit or delete older posts I’ve shared
- Add new travel stories or photos to my profile
- Update my profile with new info or a fresh image
- Explore new users or destinations I haven’t seen before
- Log in quickly and securely to pick up where I left off

<h2 id="user-stories">User Stories</h2> 

### As a web designer... 
- I want to create a fully responsive, clean and consistent layout across all pages so that users can easily navigate the site regardless of their device.
- I want to design clear, accessible forms with proper validation so users can input and edit data with confidence and ease.
- I want to build a fully functioning API that can store, retrieve, and update user-generated content in real time, so that users can interact with live data and see changes reflected immediately across the platform.
- I want to build a reusable component structure in React so that future features can be easily added and maintained.

### As a new user...
- I want to browse public posts without needing an account, so I can get a feel for what the platform offers. 
- I want to sign up easily so I can start exploring and sharing travel content.
- I want to view different travel destinations and stories so I can find inspiration for my own trip. 
- I want to create a profile after signing up so I can personalise my profile and start posting. 
- I want the navigation to be simple and clear so I can easily find my way around the site without confusion.

### As a returning user...
- I want to log in quickly and securely so I can pick up where I left off.
- I want to view new posts from users I follow so I can stay up to date with their travels.
- I want to edit or delete my previous posts so I can keep my profile current and relevant.
- I want to see notifications or visual feedback on new likes or comments so I know when someone interacts with my content.
- I want to discover new profiles and destinations so I can continue to grow my network and find inspiration.

<h1 id="design-process">Design Process</h1>

<h2 id="structure">Structure</h1>

- This project was developed as a full-stack web application, structured around two separate but interconnected components: a Django REST Framework API on the back-end, and a React front-end application.
- The back-end was built using Django REST Framework, where I created a custom travel-focused API (“travel-api”) that handles all data operations — including user authentication, travel post creation, commenting, likes, following, and profile management. The API also implements security best practices such as token-based authentication and permission classes to ensure users can only edit or delete their own content.
- The front-end was developed using the React JavaScript library, designed to consume and display data from the Travel API. This single-page application includes multiple pages and reusable components, allowing users to interact with posts, browse travel content, view and manage profiles, and engage with the community through likes and comments. Styling and responsive layout were handled using Bootstrap, ensuring accessibility across both desktop and mobile devices.
- Together, these two applications work in tandem to deliver a secure, interactive, and user-friendly content-sharing platform, showcasing both front-end and back-end development skills in one cohesive project.

### Process Flow Chart
The Process Flow Chart visually represents the structure of the website and the possible user navigation paths, helping to illustrate the user journey and overall functionality.

![This is a flow chart demonstrating the structure of this website and the process to navigate around it.](https://res.cloudinary.com/dvgobcuck/image/upload/v1746533382/process-flow-chart_i1vr9h.png)

- Upon entering the site, users are directed to the Home page, which features a sidebar showcasing the top 5 travel destinations and posts, alongside a central feed displaying the most recent user submissions.
- A persistent header ensures seamless navigation across the site. Before logging in, users can access the Home page, along with options to Sign Up or Log In.
- Once authenticated, users are redirected to their Profile page, and the header updates to include a Profile link and a Log Out option, replacing the sign-up and login buttons.
    - Authenticated users can:
    - Create and manage their own travel posts
    - Like and comment on other users' posts
    - Follow other users
    - Edit or delete their own posts and comments
- The website is designed with clarity and usability in mind, offering consistent feedback and an intuitive experience across all devices.

### ERD
The ERD below illustrates the different models used within the database and the relationships between them.

![This is the ERD which was created to show the database structure and the relationships held between the different models](https://res.cloudinary.com/dvgobcuck/image/upload/v1746433801/ERD_dlavr8.png)

A simple yet effective Entity Relationship Diagram (ERD) was created to support the core functionality of the website. It outlines the relationships between key models including User, Profile, Post, Comment, Like, Follower, Notification and Location. The diagram was used to guide the back-end structure, ensuring that data relationships were clearly defined and aligned with the user experience — such as associating posts with locations, linking comments and likes to posts, and managing user-specific data through profile and follower connections.

### Wireframes
Below are the original wireframe images created during the design thinking phase of this project. Wireframes served as a valuable foundation, helping to visualise the initial structure of the website and guide development decisions as the project progressed.

![These are basic images outlining the initial website structure designed during the planning phase for destop devices.](https://res.cloudinary.com/dvgobcuck/image/upload/v1746527528/Desktop_Wireframe_qekp1z.png)

![These are basic images outlining the initial website structure designed during the planning phase for mobile devices.](https://res.cloudinary.com/dvgobcuck/image/upload/v1746527523/Mobile_Wireframe_zqvdlj.png)

The wireframes represent three core pages: the Home Page, Profile Page, and Post Detail Page. A clean, minimalist approach was used throughout to ensure a consistent and user-friendly experience. The final styling will be implemented using Bootstrap and custom CSS, with content dynamically rendered via React components.

- Shared Layout Features
    - All pages include consistent structural elements:
    - A navigation bar within the header, offering access to search, sign up, or log in (or log out/profile if authenticated).
    - A sidebar on larger screens displaying top-ranked destinations and posts, based on likes.
    - For logged-in users, the sidebar also displays a list of profiles they follow.
    - A "Create Post" button is visible in the header when the user is authenticated.
    - A footer is present on all pages, containing navigation links on mobile and copyright information.

- Home Page
    The home page is the default landing page and displays the most recent posts submitted to the platform. Each post includes:
    - An image
    - Title
    - Author and timestamp
    - Linked location for filtering
    - Optional user caption
    - Buttons to like the post or view/comment

- Profile Page
    Each user has a profile page, generated upon account creation. When a user logs in, they are directed to their own profile. This page displays:
    - A profile image and short bio
    - A list of the user's posts in reverse chronological order
    - Follower and following counts
    - A button to follow/unfollow the user (if viewing another user’s profile)

- Post Detail Page
    Clicking on a post takes the user to its detail page, which displays:
    - The full post content
    - Comments already submitted
    - A comment form (for authenticated users) to join the conversation

USER STORY TESTING

1. As a new user, I want to sign up for an account so I can post and interact with content.

| Feature | Action | Expected Result | Actual Result |
| ---- | --- | --- | --- |
| Sign up | Click Sign up option from menu and complete the form to create an account | User is directed to the sign up page and on completion of the form, an account is created and feedback is provided. User is directed to the login page | Works as expected |
<details><summary>See evidence</summary>

![Image showing the sign up form and where to click to navigate to it](https://res.cloudinary.com/dvgobcuck/image/upload/v1746530380/signup_rrd5zd.png)
![Feedback after creating an account and getting redirected to the login page](https://res.cloudinary.com/dvgobcuck/image/upload/v1746544138/signup-feedback_obcbzg.png)
</details>
<br/>

2. As a returning user, I want to log in so I can access my profile and features.

| Feature | Action | Expected Result | Actual Result |
| ---- | --- | --- | --- |
| Login | Select Login from menu and complete form to log into account and access restricted features | On completion of the login form, feedback is given and the user is able to access other features | Works as expected |
<details><summary>See evidence</summary>

![Image showing the log in form and where to click to navigate to it](https://res.cloudinary.com/dvgobcuck/image/upload/v1746530395/login-form_djcfxk.png)
![Feedback after successful login and getting redirected to the home page with extra navigation items](https://res.cloudinary.com/dvgobcuck/image/upload/v1746527912/login-feedback_p8ndho.png)
</details>
<br/>

3. As a logged-in user, I want to log out securely when I’m done.

| Feature | Action | Expected Result | Actual Result |
| --- | --- | --- | --- |
| Log out | Select Log out from the menu to exit account | When a user clicks log out, feedback is given, they return to the home page and all restricted access is gone | Works as expected |
<details><summary>See evidence</summary>

![Image showing the log out button in navigation menu](https://res.cloudinary.com/dvgobcuck/image/upload/v1746530397/logout_ekxz1v.png)
![Feedback after successful logout and getting redirected to the home page with reduced navigation items](https://res.cloudinary.com/dvgobcuck/image/upload/v1746529369/logout-success_dk2aax.png)
</details>
<br/>

4. As a logged-in user, I want to create a travel post so I can share my experience with others.

| Feature | Action | Expected Result | Actual Result |
| --- | --- | --- | --- |
| Create Post | Once authenticated, a user can select `Add Post` from the menu to complete a form to create a travel post including an image, title, locatin and content | When a form is completed, feedback is provided and the post is created and listed on the home page and their profile page as well as any feeds of user's who follow them | Works as expected |
<details><summary>See evidence</summary>

![Image of what button to click to create post](https://res.cloudinary.com/dvgobcuck/image/upload/v1746530400/add-post_bqeibs.png)
![Image of create post form and where to click to find image and submit post](https://res.cloudinary.com/dvgobcuck/image/upload/v1746530403/add-post-form_twdp8t.png)
![Feedback after successful post creation. User is redirected to the post detail page.](https://res.cloudinary.com/dvgobcuck/image/upload/v1746530411/add-post-feedback_l9nwjf.png)
</details>
<br/>

5. As a logged-in user, I want to edit my own posts so I can update the content later.

| Feature | Action | Expected Result | Actual Result |
| --- | --- | --- | --- |
| Edit Posts | Users can click on the drop down menu on the top right of a their own posts, to select the edit button and complete a form to edit the post | Once the form is completed and submitted, feedback is given and the post will update | Works as expected |
<details><summary>See evidence</summary>

![Image of what buttons to click to navigate to the edit post form](https://res.cloudinary.com/dvgobcuck/image/upload/v1746531247/edit-post_pdy60c.png)
![Image of edit post form and where to click to change image and update post](https://res.cloudinary.com/dvgobcuck/image/upload/v1746531246/edit-post-fom_pncoph.png)
![Feedback after post is successfully updated. User is redirected to the updated posts detail page.](https://res.cloudinary.com/dvgobcuck/image/upload/v1746531250/edit-post-feedback_osrkfc.png)
</details>
<br/>

6. As a logged-in user, I want to delete my own posts if I no longer want them visible.

| Feature | Action | Expected Result | Actual Result |
| --- | --- | --- | --- |
| Delete Posts | Users can click on the drop down menu on the top right of a their own posts, to select the delete button and complete a form to delete the post | Once the form is completed and submitted, feedback is given and the post will be removed | Works as expected |
<details><summary>See evidence</summary>

![Image of what buttons to click to delete a post](https://res.cloudinary.com/dvgobcuck/image/upload/v1746533882/post-delete_vxzi1y.png)
![Feedback after post is successfully deleted. User is redirected to the previous page.](https://res.cloudinary.com/dvgobcuck/image/upload/v1746533883/delete-sucess_xkeetu.png)
</details>
<br/>

7. As any user, I want to browse all travel posts so I can read others' stories.

| Feature | Action | Expected Result | Actual Result |
| --- | --- | --- | --- |
| Browse Posts  | Users can browse all posts on the home page, which are displayed in date order | When a post is created it is displayed on the home page for users consumption | Works as expected |
<details><summary>See evidence</summary>

![Image of where user can click to navigate to home page](https://res.cloudinary.com/dvgobcuck/image/upload/v1746534589/home_vmiv74.png)
</details>
<br/>

8. As any user, I want to filter or search posts by keyword or category so I can find what interests me.

| Feature | Action | Expected Result | Actual Result |
| --- | --- | --- | --- |
| Search | Users can enter keywords in the search bar and click enter to search for specific content | Users can search posts by owner, title, location and content. The results are displayed in a list format, consistent with the layout of the rest of the site | Works as expected |
<details><summary>See evidence</summary>

![Image of where user can click to enter search keywords](https://res.cloudinary.com/dvgobcuck/image/upload/v1746534935/search_f1ogus.png)
![Image of search results page, where the heading states what the search was for and then associated posts are listed below](https://res.cloudinary.com/dvgobcuck/image/upload/v1746534939/search-results_jjdn4d.png)
![Image of display when there are no matches for the searched keywords](https://res.cloudinary.com/dvgobcuck/image/upload/v1746535163/no-results_tzr3fk.png)

</details>
<br/>

9. As a logged-in user, I want to leave a comment on a post so I can join the discussion.

| Feature | Action | Expected Result | Actual Result |
| --- | --- | --- | --- |
| Comment | Authenticated users can click on a post to access the comment form, underneath the post itself | Once a user submits a comment, feedback is given and it is displayed beneath the form in date order | Works as expected |
<details><summary>See evidence</summary>

![Image of post detail showing where user can write a comment and submit it](https://res.cloudinary.com/dvgobcuck/image/upload/v1746535679/comment_gxnmxs.png)
![Image of updated post detail with feedback saying "Thanks for the comment!" and the new comment at the top of the comments feed](https://res.cloudinary.com/dvgobcuck/image/upload/v1746535678/comment-feedback_vfja4o.png)

</details>
<br/>

10. As a logged in user, I want to update or delete my comments incase I make a mistake or change my mind about writing something. 

| Feature | Action | Expected Result | Actual Result |
| --- | --- | --- | --- |
| Comment Edit | Authenticated users can click on a post to access the edit comment option, in the top right corner of their comment | Once a user updates a comment and clicks save, feedback is given and the updated comment is displayed in place of the original one | Works as expected |
<details><summary>See evidence</summary>

![Image of post detail showing where user can click to access the edit comment form](https://res.cloudinary.com/dvgobcuck/image/upload/v1746536530/edit-comment_iztxnj.png)
![Image of the edit comment form and where to click to submit the edited comment](https://res.cloudinary.com/dvgobcuck/image/upload/v1746536530/edit-comment1_cbzymg.png)
![Image of updated post detail with feedback saying "Comment updated successfully!" and the updated comment where the previous one was](https://res.cloudinary.com/dvgobcuck/image/upload/v1746537094/edit-comment-success_if9ztj.png)

</details>
<br/>

| Feature | Action | Expected Result | Actual Result |
| --- | --- | --- | --- |
| Comment Delete | Authenticated users can click on a post to access the delete comment option, in the top right corner of their comment | Once a user deletes a comment, feedback is given and the comment is removed from the post | Works as expected |
<details><summary>See evidence</summary>

![Image of post detail showing where user can click to delete a comment](https://res.cloudinary.com/dvgobcuck/image/upload/v1746537031/delete-comment_udzhsg.png)
![Image of updated post detail with feedback saying "Comment deleted successfully!" and the comment has been removed from the feed](https://res.cloudinary.com/dvgobcuck/image/upload/v1746533883/delete-sucess_xkeetu.png)

</details>
<br/>

11. As a logged-in user, I want to like a post to show appreciation.

| Feature | Action | Expected Result | Actual Result |
| --- | --- | --- | --- |
| Like | Authenticated users can click the heart button underneath a post to like it | When a user likes a post, feedback is given and the like count increases by one and the post is added to their liked feed | Works as expected |
<details><summary>See evidence</summary>

![Image of a post displaying where to click to like it and showing that the heart becomes coloured and the count increases by one. Feedback is also given at the top of the page](https://res.cloudinary.com/dvgobcuck/image/upload/v1746538196/liked_ilh6ns.png)
![Image of a post displaying where to click to unlike it and showing that the heart becomes transparent again and the count decreases by one. Feedback is also given at the top of the page](https://res.cloudinary.com/dvgobcuck/image/upload/v1746538228/unliked_t6kjub.png)

</details>
<br/>

12. As a user, I want to see how many likes and comments a post has to understand its popularity.

| Feature | Action | Expected Result | Actual Result |
| --- | --- | --- | --- |
| Post stats | Users can browse posts in the home page | Likes and comments are updated in real-time and are displayed undeath each post | Works as expected |
<details><summary>See evidence</summary>

![Image of a post displaying the number of likes it has represented by a heart and the number of comments the post has, represented by a speach bubble](https://res.cloudinary.com/dvgobcuck/image/upload/v1746538546/post-stats_nserqu.png)

</details>
<br/>

13. As a user, I want to view another user's profile to see their posts.

| Feature | Action | Expected Result | Actual Result |
| --- | --- | --- | --- |
| View Profiles | Users can click on user's avatars or usernames to view their profile | All user's post are displayed on their profile page in date order | Works as expected |
<details><summary>See evidence</summary>

![Image of a users profile with the profile owners details at the top including their avatar, username, page stats and an optional bio section. I have highlighted where user's can click to navigate to this page](https://res.cloudinary.com/dvgobcuck/image/upload/v1746539167/profile_nxvi36.png)

</details>
<br/>

14. As a logged-in user, I want to follow another user so I can keep up with their new posts.

| Feature | Action | Expected Result | Actual Result |
| --- | --- | --- | --- |
| Follow | Authenticated users can click a follow button on user's profiles to follow them | Feedback is given, the button changes to unfollow and the followed user's posts are then listed on the user's feed page | Works as expected |
<details><summary>See evidence</summary>

![Image of a users profile and where to click to follow them. The follow button will then change to unfollow and their followers count will increase by one. Users will also recieve feedback confirming they are following profile owner](https://res.cloudinary.com/dvgobcuck/image/upload/v1746540852/follow_j6hyqy.png) 
![Image of a users profile and where to click to unfollow them. The unfollow button will then change back to follow and their followers count will decrease by one. Users will also recieve feedback confirming they have unfollowed the profile owner](https://res.cloudinary.com/dvgobcuck/image/upload/v1746540851/unfollow_thfmqp.png) 

</details>
<br/>

15. As a user, I want to see how many people follow users and how many profiles they follow, so I can gage their popularity.

| Feature | Action | Expected Result | Actual Result |
| --- | --- | --- | --- |
| Follow Stats | Users can access follower/following stats on a users profile page | The number of followers a user has and the number of profiles they follow is displayed at the top of each profile and is updated in real-time | Works as expected |
<details><summary>See evidence</summary>

![Image of a users profile where at the top it states a number next to followers and following to represent the number of users who follow them and the profiles they follow, respectively](https://res.cloudinary.com/dvgobcuck/image/upload/v1746541303/follow-stats_lipylb.png) 

</details>
<br/>

16. As a user, I want to see a navigation menu so I can easily access all sections.

| Feature | Action | Expected Result | Actual Result |
| --- | --- | --- | --- |
| Navigation | Users can access a navigation menu on a smaller device by clicking the toggle menu button or is on display horizontally on larger devices | Users have access to all areas of the website at all times | Works as expected |
<details><summary>See evidence</summary>

![Image of the horizontal navigation bar which is always visible for a logged in user at the top of the screen](https://res.cloudinary.com/dvgobcuck/image/upload/v1746542356/desktop-nav_lk9d2y.png)
![Image of a mobile screen with a toggle menu button](https://res.cloudinary.com/dvgobcuck/image/upload/v1746542358/mobile-nav-toggle_w1scua.png)
![Image of the mobile menu once toggle button has been selected and shows that all the nav links are listed](https://res.cloudinary.com/dvgobcuck/image/upload/v1746542357/mobile-nav-menu_bcyikj.png)

</details>
<br/>

16. As a user, I want to know whether I am logged in or not.

| Feature | Action | Expected Result | Actual Result |
| --- | --- | --- | --- |
| Authentication verification | Users can see if they are logged in or not at all times whilst on the site | A personalised message is displayed at the top of post list pages and the menu has more features, including the users avatar | Wors as expected |
<details><summary>See evidence</summary>

![Image of the home page when a user is not logged in. It shows a generic message saying Welcome to Travel Tales and has less navigation options available](https://res.cloudinary.com/dvgobcuck/image/upload/v1746542830/unauthenticated_ekx892.png)
![Image of the home page when a user is logged in. It has a personalised welcome message including their username and additional navigation options including a picture of their avatar which links to their personal profile](https://res.cloudinary.com/dvgobcuck/image/upload/v1746542829/authenticated_puimqn.png)

</details>
<br/>

17. As a user, I want the site to work well on mobile so I can use it on the go.

| Feature | Action | Expected Result | Actual Result |
| --- | --- | --- | --- |
| Responsive Design | Users can use the app on any device including mobile | The design of the website has been adapted to accomodate being displayed on a mobile device as well as desktop | Works as expected |
<details><summary>See evidence</summary>

![Image of the authentication pages on mobile, highlighted where a user needs to click to navigate to the page and the 404 error page.](https://res.cloudinary.com/dvgobcuck/image/upload/v1746567918/mobile-auth_cy4rxt.png)

![Image of the home, feed, like and locations pages on mobile, highlighted where a user needs to click to navigate to the page.](https://res.cloudinary.com/dvgobcuck/image/upload/v1746567918/mobile-pages_pkdqjz.png)

![Image of the post related pages, including post search, create post, edit post and post detail on mobile screens.](https://res.cloudinary.com/dvgobcuck/image/upload/v1746568313/mobile-post-pages_qeh4tj.png)

![Image of the profile related pages, including user profile, edit profile, edit username and edit password pages on mobile screens.](https://res.cloudinary.com/dvgobcuck/image/upload/v1746567913/mobile-profile-pages_inlaum.png)

</details>
<br/>

18. As a user, I want to see posts for each location so that I can see what it's like.

| Feature | Action | Expected Result | Actual Result |
| --- | --- | --- | --- |
| Locations Menu | Users can click the locations option in the menu to access the locations list and then click a specific location to view all its associated posts | Locations are listed in popularity order considering number of posts and like/comment counts. When a user clicks on the location image or title, they are directed to a list of posts tagged to the location, if they click on those posts, they will be directed to the post detail where they can view and add comments. | Works as expected |
<details><summary>See evidence</summary>

![Image of the locations menu page with the heading 'Locations' followed by a list of locations, illustrated by an image and the location name, ordered by popularity. The route to this page is highlighted in the navigation bar.](https://res.cloudinary.com/dvgobcuck/image/upload/v1746555090/locations-menu_m2j5uy.png)
![Image of the Cornwall page. This page is located by clicking on the image or name Cornwall. It displays the title 'Cornwall' followed by a list of posts which are ordered by popularity considering the number of likes and comments it has.](https://res.cloudinary.com/dvgobcuck/image/upload/v1746555110/locations-slug_d4xbqo.png)

</details>
<br/>

19. As a logged-in user, I want to update my profile with a display name, photo, and bio so my profile feels more personal.

| Feature | Action | Expected Result | Actual Result |
| --- | --- | --- | --- |
| Profile Personalisation | Authenticated users can edit their profile by clicking the menu in the top right corner of their profile page and selecting the 'Edit Profile' option from the dropdown menu | A form is displayed where users can update their profile image and add some content to display on their profile page | Works as expected |
<details><summary>See evidence</summary>

![Image to illustrate how to navigate to the edit profile form. User must first access their profile via the avatar link in the nav bar, then click the menu in the top right corner of their profile and select 'Edit profile'](https://res.cloudinary.com/dvgobcuck/image/upload/v1746556535/profile-edit_q61nl2.png)
![Image of edit profile form. User can update their profile picture by clicking either button underneath the image and update their Bio with text. User must click save in order to update any changes](https://res.cloudinary.com/dvgobcuck/image/upload/v1746556536/profile-edit-form_uhglyd.png)
![Image of updated profile with the changes highlighted and user feedback at the top of the screen.](https://res.cloudinary.com/dvgobcuck/image/upload/v1746556912/profile-edit-success_taqlqi.png)

</details>
<br/>

20. As a user, I want a "My Feed" page that shows posts from users I follow so I can keep up with content I care about.

| Feature | Action | Expected Result | Actual Result |
| --- | --- | --- | --- |
| Feed | Authenticated users can click a link to 'Feed' in their navigation menu | Feed page displays all posts that have been submitted by any profile owners that the user is currently following | Works as expected |
<details><summary>See evidence</summary>

![Image to illustrate how to navigate to feed page. Page is empty and displaying a default image and a message telling user that no results were found and to follow a user to view their posts in this page.](https://res.cloudinary.com/dvgobcuck/image/upload/v1746557491/no-results-feed_mpfcka.png)
![Image displaying results of posts that have been created by followed users only.](https://res.cloudinary.com/dvgobcuck/image/upload/v1746557492/feed_ofpnv5.png)

</details>
<br/>

21. As a user, I can see a profile image of other users to easily identify them

| Feature | Action | Expected Result | Actual Result |
| --- | --- | --- | --- |
| Avatar | When browsing profiles and posts, users can see who owns the profile or posts and comments | Users can see avatars and often usernames next to all profiles, posts and comments | Works as expected |
<details><summary>See evidence</summary>

![Image of a post detail page, highlighting all areas where avatars are displayed, including post header, each of the comments and the popular profiles list on the right of the page. These avatars make it easy to identify the associated owner and links to their profile.](https://res.cloudinary.com/dvgobcuck/image/upload/v1746558058/avatars_w5kabc.png)

</details>
<br/>

22. As a user, I can keep scrolling down and the page will load more posts so that I don't have to click next and back to navigate through posts.

| Feature | Action | Expected Result | Actual Result |
| --- | --- | --- | --- |
| Infinite Scroll | User can scroll down the page to load any further posts | On all pages, if there are posts to load, the user can access these by scrolling down until all have been displayed, when the footer will appear at the bottom of the screen | Works as expected |
<details><summary>See evidence</summary>

![Image of the bottom of the home page, displaying a loading spinner which will run until the next posts are loaded so that the user doesn't need to click any buttons.](https://res.cloudinary.com/dvgobcuck/image/upload/v1746558312/Infinite-scroll_gyvyon.png)

</details>
<br/>

23. As a user, I can see a list of the most popular profiles so i can follow them myself.

| Feature | Action | Expected Result | Actual Result |
| --- | --- | --- | --- |
| Popular profiles | Users can view a list of top 5 profiles and click a follow button alongside them to easily follow their profile and posts | In desktop view on the right hand side of post pages, is a display of the top 5 profiles which is determined by number of followers. A user can click follow, feedback is given and the follow button changes to unfollow, all follow stats are updated | Works as expected |
<details><summary>See evidence</summary>

![Image of a display showing the top 5 profiles, which is deterined by the number of followers each profile has. The profiles are labelled with the owners avatar and username, which users can click to visit their profile. There is also a follow/unfollow button alongside each profile for users to click, depending on whether or not they already follow the profile.](https://res.cloudinary.com/dvgobcuck/image/upload/v1746558557/profiles-popular_t7unnv.png)

</details>
<br/>

24. As a user, I can update my username and password to keep my profile secure.

| Feature | Action | Expected Result | Actual Result |
| --- | --- | --- | --- |
| Update Username/Password | Authenticated users can access forms to update their username or password by clicking the menu icon in the top right corner of their profile and selecting the relevant option from the menu | Users can complete the forms, feedback is given and their username or password will be updated throughout the site | Works as expected |
<details><summary>See evidence</summary>

![Image of how to navigate to the edit username and password forms via a users profile page. User must click on the menu icon in the top corner of their profile and then select either Change username or Change password accordignly.](https://res.cloudinary.com/dvgobcuck/image/upload/v1746559278/edit-menu_is2nry.png)

![Image of the edit username form. User simply needs to change their username by inputting a new one in the input field and click save.](https://res.cloudinary.com/dvgobcuck/image/upload/v1746559278/username-edit-form_rfvfqo.png)
![Image of the upsdated user profile with the new username and feedback confirming the change at the top of the page.](https://res.cloudinary.com/dvgobcuck/image/upload/v1746559282/username-edit-success_p4ph6r.png)

![Image of the change password form. User needs to complete two fields- New password and Confirm password. These need to be the same otherwise they will recieve feedback and then click save to update it.](https://res.cloudinary.com/dvgobcuck/image/upload/v1746559278/password-edit-form_tq1use.png)
![Image showing feedback that the user has updated their password and bneen redirected to their profile page.](https://res.cloudinary.com/dvgobcuck/image/upload/v1746559279/password-edit-success_citozx.png)

</details>
<br/>

25. As a user, I want to receive a notification every time that someone likes my post, leaves a comment or follows my profile, so that I can see how popular my posts are and network with fellow minded travellers.

| Feature | Action | Expected Result | Actual Result |
| --- | --- | --- | --- |
| Notifications | Authenticated users can access notifications in their navigation bar by clicking the toggle menu with the bell icon | Users will see the number of notifications displayed in the toggle menu, when clicked, a dropdown will display an icon to signify which type of notification they have and the name of the user who sent it. 
<details><summary>See evidence</summary>

![Image displaying notifications list in navigation bar with number of notifications in toggle menu. In the open menu it shows wha the notification type is and who it is from. Highlighted evidence that the post has a comment and a like.](https://res.cloudinary.com/dvgobcuck/image/upload/v1746560552/notifications_vyjlgu.png)

![Image showing where to click to read follow notification](https://res.cloudinary.com/dvgobcuck/image/upload/v1746561397/follow-notification_l2zijw.png)
![Image showing that user is directed to the profile of the user who follows them once clicked.](https://res.cloudinary.com/dvgobcuck/image/upload/v1746561399/follow-notification-profile_oddl4f.png)

![Image showing where to click to read comment notification and that the notification count has been updated](https://res.cloudinary.com/dvgobcuck/image/upload/v1746561395/notification-comment_r39jre.png)
![Image showing where to click to read like notification and that the notification count has been updated](https://res.cloudinary.com/dvgobcuck/image/upload/v1746561394/notification-like_kx4fib.png)
![Image showing that user is directed to the post that has been commented on or liked once clicked.](https://res.cloudinary.com/dvgobcuck/image/upload/v1746561583/notification-post_iwl8ut.png)

</details>
<br/>

| Feature | Action | Expected Result | Actual Result |
| --- | --- | --- | --- |
| Notifications/read | Users can click on an individual notification to mark as read or clear list by clicking 'Mark all read' at the bottom of the menu | Clicking on the individual notification will redirect the user to the associated profile or post and the notification will be cleared from the list. Clicking 'Mark all read' will clear all notifications immediately | Works as expected |
<details><summary>See evidence</summary>

![Image displaying where to click to mark all notifications as read.](https://res.cloudinary.com/dvgobcuck/image/upload/v1746561398/mark-all-read_ppnfv0.png)
![Image showing that all noticfications have been deleted.](https://res.cloudinary.com/dvgobcuck/image/upload/v1746561396/no-notifications_ib5qgw.png)

</details>
<br/>

26. As a user, I can see a list of the most popular locations and posts to get inspiration of places to travel to.

| Feature | Action | Expected Result | Actual Result |
| --- | --- | --- | --- |
| Popular Locations | Users can view a list of the top 5 locations | In desktop view on the right hand side of post pages, is a display of the top 5 locations which is determined by number of posts and the likes and comments count. If a user clicks on a location image or name, then it will direct them to a list of posts associated with the location | Works as expected |
<details><summary>See evidence</summary>

![Image of a display showing the top 5 locations, which is determined by the number of posts the location has. The locations are labelled with the image of the most popular post within the the catagory and the location name. When users click the image or name, they are directed to a list of posts relating to this location, which is ordered by popularity.](https://res.cloudinary.com/dvgobcuck/image/upload/v1746561966/popular-locations_bwadcr.png)

</details>
<br/>

| Feature | Action | Expected Result | Actual Result |
| --- | --- | --- | --- |
| Popular Posts | Users can view a list of the top 5 posts | In desktop view on the right hand side of post pages, is a display of the top 5 posts which is determined by the likes and comments count. If a user clicks on a post image or title, then it will direct them to the post detail page, where they can see all the associated comments | Works as expected |
<details><summary>See evidence</summary>

![Image of a display showing the top 5 posts, which is determined by the number of comments and likes the post has. The posts are labelled with its image and the post title. When users click the image or title, they are directed to the posts detail page where they can view or add comments.](https://res.cloudinary.com/dvgobcuck/image/upload/v1746561967/popular-posts_ynuacn.png)

</details>
<br/>

