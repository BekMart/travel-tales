# TravelTales

## Advanced Front-End - Portfolio Project 5

TravelTales is a full-stack content-sharing web application built as part of the Advanced Front-End Portfolio Project. The goal of this project is to demonstrate proficiency in advanced front-end development practices using React, combined with a RESTful Django REST Framework API on the back-end.

The application allows users to sign up, create and share travel-related posts, interact with others through likes and comments, and follow fellow travelers. Posts can be filtered by title and location, creating a curated and accessible experience for users interested in specific destinations or types of travel.

<h1 id="contents">Table of Contents</h1> 

- [Agile Development](#agile-development)
    - [Kanban board](#kanban-board)
- [UX](#UX)
    - [User-Centered Problem Statement](#user-centered-problem-statement)
    - [Website Owner Business Goals](#website-owner-goals)
    - [User Goals](#user-goals) 
    - [User Stories](#user-stories) 
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
    ![An example of an epic catagory which has several isues within in which are all labelled using the MoSCoW method in relation to their currently perceived priority]()
    - Milestones – I used this feature to track progress and assess whether I was on schedule, allowing me to adjust my time management strategies as needed.
    ![An image of the issues all set out in a calender which has been made easier to complete using Milestones]()

![Screenshot of my kanban board]()

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

<h1 id="structure">Structure</h1>

- This project was developed as a full-stack web application, structured around two separate but interconnected components: a Django REST Framework API on the back-end, and a React front-end application.
- The back-end was built using Django REST Framework, where I created a custom travel-focused API (“travel-api”) that handles all data operations — including user authentication, travel post creation, commenting, likes, following, and profile management. The API also implements security best practices such as token-based authentication and permission classes to ensure users can only edit or delete their own content.
- The front-end was developed using the React JavaScript library, designed to consume and display data from the Travel API. This single-page application includes multiple pages and reusable components, allowing users to interact with posts, browse travel content, view and manage profiles, and engage with the community through likes and comments. Styling and responsive layout were handled using Bootstrap, ensuring accessibility across both desktop and mobile devices.
- Together, these two applications work in tandem to deliver a secure, interactive, and user-friendly content-sharing platform, showcasing both front-end and back-end development skills in one cohesive project.

### Process Flow Chart
The Process Flow Chart visually represents the structure of the website and the possible user navigation paths, helping to illustrate the user journey and overall functionality.

![This is a flow chart demonstrating the structure of this website and the process to navigate around it.]()

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

![This is the ERD which was created to show the database structure and the relationships held between the different models]()

A simple yet effective Entity Relationship Diagram (ERD) was created to support the core functionality of the website. It outlines the relationships between key models including User, Profile, Post, Comment, Like, Follower, and Location. The diagram was used to guide the back-end structure, ensuring that data relationships were clearly defined and aligned with the user experience — such as associating posts with locations, linking comments and likes to posts, and managing user-specific data through profile and follower connections.

### Wireframes
Below are the original wireframe images created during the design thinking phase of this project. Wireframes served as a valuable foundation, helping to visualise the initial structure of the website and guide development decisions as the project progressed.

![These are basic images outlining the initial website structure designed during the planning phase for destop devices.]()
![These are basic images outlining the initial website structure designed during the planning phase for mobile devices.]()

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