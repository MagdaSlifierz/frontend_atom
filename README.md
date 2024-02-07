
# Atom Frontend Todo Application


https://github.com/MagdaSlifierz/frontend_atom/assets/49603115/b8166c5e-4e5c-422a-a6e2-326eb2a28fff


## Description
This project is a frontend Todo application built using React and Chakra UI for the UI components. It allows users to create, update, delete, and list todo items. It also supports user management, enabling the creation, update, and deletion of user profiles. The application utilizes React Router for navigation between different components/pages.

## Features
- Create, update, and delete todo items.
- Mark todo items as completed.
- View a list of all todo items for a user.
- Create a new user profile.
- Edit and delete user profiles.
- Navigation between user's todo list, user creation, and user profile editing.

## Technologies Used
- React: A JavaScript library for building user interfaces.
- Chakra UI: A simple, modular, and accessible component library that gives you the building blocks to build React applications.
- React Router: A collection of navigational components that compose declaratively with your application.

## Installation
1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies with `npm install`.
4. Start the development server with `npm start`.
5. Open [http://localhost:3000](http://localhost:3000) to view the application in the browser.

## Pages and Components
- `UserCreatePage`: Allows creating a new user.
- `EditDeleteUserPage`: Allows editing and deleting a user profile.
- `TodoListPage`: Displays a list of todo items for a user and allows adding new todo items.
- `EditDeleteTodosPage`: Allows editing and deleting a specific todo item.
- `ListOfUsersPage`: Displays a list of users and provides navigation to their todo lists.

## API Integration
The application makes HTTP requests to a backend API for user and todo item management. Ensure that your backend API is running and accessible at `http://localhost:8000/api/v1`. Adjust the API endpoint as necessary to match your backend setup.

## Usage
- Navigate to the user creation page to create a new user.
- Once a user is created, you can add, edit, or delete todo items from the user's todo list.
- You can edit or delete the user profile from the user's todo list page or the list of users page.
- Use the navigation buttons and links to move between different pages and actions.

## Contribution
Contributions are welcome! Please fork the repository and submit pull requests with your proposed changes.

## License
This project is open-source and available under the MIT License.
