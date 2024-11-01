# 832201215zzr_frontend_backend

# Contact Management System - Frontend

This is the frontend of the Contact Management System, developed using HTML, CSS, and JavaScript. The frontend provides a user-friendly interface for managing contacts with features such as adding, editing, deleting, searching, exporting contacts to CSV, and paginating through large contact lists. This frontend is designed to communicate with the backend API to store and retrieve contact information.

## Features

- **Add Contact**: Form to add new contact details, including name, phone, and email.
- **Edit Contact**: Allows editing of existing contact details by selecting a contact.
- **Delete Contact**: Provides functionality to remove a contact from the list.
- **Search**: Real-time search bar for filtering contacts by name or phone number.
- **Export to CSV**: Exports the contact list to a downloadable CSV file.
- **Pagination**: Displays contacts in pages, with navigation options to move between pages.

## Project Structure

```
frontend/
├── index.html         # Main HTML file, containing structure of the contact management page
├── style.css          # CSS file for styling the contact management interface
├── app.js             # JavaScript file handling frontend logic and communication with backend API
└── README.md          # Project description and instructions (this file)
```

## Setup and Usage

1. Clone the repository and navigate to the `frontend` directory.
2. Open `index.html` in a web browser to view the contact management interface.
3. Ensure the backend server is running to allow API communication.

## API Integration

This frontend communicates with the backend API using `fetch` requests. The backend API endpoints handle CRUD operations, exporting contacts, and paginating the contact list.

## Requirements

- Browser with JavaScript enabled
- Backend API (Express.js server)

## Note

Make sure to configure the API endpoint in `app.js` to match the backend server URL.
