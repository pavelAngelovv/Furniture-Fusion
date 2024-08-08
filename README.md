# Furniture Management SPA

## Project Overview
This project is a Single Page Application (SPA) developed using React.js for managing a furniture catalog. The application allows users to browse, like, and manage furniture items. Registered users can create and edit their own furniture listings, while unregistered guests can view the catalog and details of the furniture items.

## Technologies Used
- **Frontend:** React.js
- **Backend:** Node.js with Express (for REST API) and MongoDB (for data storage)
- **State Management:** Redux Toolkit
- **Routing:** React Router
- **Form Handling:** React Hook Form
- **Styling:** Material-UI
- **Authentication:** JWT-based authentication
- **Error Handling:** Custom error handling and validation
- **External API:** Utilizes Geoapify API for location suggestions and mapping

## Application Structure
The application is divided into two main parts: Public and Private.

### Public Part
- **Home Page:** Overview of the application.
- **Furniture Catalog:** List of all available furniture items.
- **Furniture Details:** Detailed view of a specific furniture item.
- **About Us:** Information about the application and the team.
- **Login:** User login form.
- **Register:** User registration form.

### Private Part
- **User Profile:** Manage user profile and settings.
- **Furniture Create:** Form to create new furniture listings.
- **Furniture Edit:** Form to edit existing furniture listings.
- **Furniture Liked:** View furniture items liked by the user.

## Key Features
- **Dynamic Pages:** Includes at least 3 dynamic pages such as Furniture Catalog, Furniture Details, and Furniture Liked.
- **Catalog View:** Displays a list of all furniture items.
- **Details View:** Shows detailed information about a specific furniture item.
- **CRUD Operations:** Create, read, update, and delete furniture items. Users can like or dislike items and add comments.
- **Authentication:** Secure login and registration using JWT.
- **Client-Side Routing:** Implemented with React Router for navigating between pages.
- **Error Handling:** Proper error handling for API requests and form validation.
- **Component Styling:** Utilizes Material-UI for consistent styling and responsive design.
- **State Management:** Uses Redux Toolkit for managing global state and facilitating efficient state updates.
- **User Experience:** Incorporates responsive design, loading indicators, and user-friendly error messages to enhance overall user experience.
- **External API Integration:** Utilizes the Geoapify API for location-based features, such as location suggestions in the registration form and dynamic mapping.

## Component Overview
- **App.jsx:** 
  - Provider: Wraps the application with Redux store.
  - Router: Handles routing with React Router.
  - Layout: Provides a consistent layout for the application.
- **FurnitureCatalog.jsx:** 
  - Displays a list of furniture items.
  - Includes search and filter functionality.
- **FurnitureDetails.jsx:** 
  - Shows detailed information about a selected furniture item.
- **FurnitureLiked.jsx:** 
  - Displays furniture items liked by the user.
- **FurnitureCreate.jsx:** 
  - Form for creating new furniture listings.
- **FurnitureEdit.jsx:** 
  - Form for editing existing furniture listings.
- **Profile.jsx:** 
  - Allows users to view and edit their profile information.
- **RegisterForm.jsx:**
  - **Function:** Handles user registration including form validation and location suggestions.
  - **External API:** Uses Geoapify API to fetch location suggestions for the location field in the registration form.
- **Map.jsx:**
  - **Function:** Displays a static map centered on a given location.
  - **External API:** Uses Geoapify API to display a static map with a marker.

## Routing
- **Public Routes**
  - `/` - Home
  - `/furniture` - Furniture Catalog
  - `/furniture/:id` - Furniture Details
  - `/about-us` - About Us
  - `/login` - Login
  - `/register` - Register
- **Private Routes**
  - `/furniture/create` - Create Furniture (Private)
  - `/furniture/edit/:id` - Edit Furniture (Private)
  - `/profile` - User Profile (Private)
  - `/furniture/liked` - Liked Furniture (Private)

## Authentication and Authorization
- **PrivateRoute Component:** Guards private routes to ensure that only authenticated users can access them.
- **Public Route Guard:** Prevents logged-in users from accessing public pages like Login and Register.

## Error Handling and Validation
- **Form Validation:** Utilizes React Hook Form for handling form inputs and validations.
- **Error Boundaries:** Handles API errors and validation issues gracefully.
- **User Feedback:** Includes user-friendly messages and visual feedback for form submission and error states.

## Project Setup and Running
1. **Clone the Repository**
   git clone <repository-url>
   cd <project-directory>
## Start the server
(if you are located in root folder)
(`cd server`)
`node server.js`

## Install Dependencies
(if you are located in root folder)
(`cd client`)
`npm install`

## Start the Application
(if you are located in root folder)
(`cd client`)
`npm run dev`


Project is deployed at: https://furniture-fusion.netlify.app/
