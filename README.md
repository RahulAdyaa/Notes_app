# NotesApp

A simple React-based note-taking application that allows users to create, edit, star, and delete notes with an intuitive UI.

## Features
- Create new notes
- Edit note titles and content
- Star important notes
- Delete notes
- Sidebar with note listing and search functionality
- Responsive design

## Technologies Used
- React (with Vite for development)
- Tailwind CSS for styling
- React Icons for UI enhancements

## Getting Started

### Prerequisites
Make sure you have **Node.js** and **npm** (or yarn) installed on your system.

### Installation

1. **Clone the Repository**
   ```sh
   git clone https://github.com/your-username/notes-app.git
   cd notes-app
   ```

2. **Navigate to Frontend Folder**
   ```sh
   cd frontend/notes-app
   ```

3. **Install Dependencies**
   ```sh
   npm install
   ```
   _or_
   ```sh
   yarn install
   ```

### Running the Project

To start the development server, run:
```sh
npm run dev
```
_or_
```sh
yarn dev
```

This will start the application, and you can access it at `http://localhost:5173` (default Vite port).

## Folder Structure
```
notes-app/
├── frontend/
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Pages like Home.jsx
│   │   ├── App.jsx       # Main app component
│   │   ├── main.jsx      # Entry point
│   │   ├── index.css     # Global styles
│   ├── public/           # Static assets
│   ├── package.json      # Dependencies & scripts
│   ├── tailwind.config.js # Tailwind CSS config
│   ├── vite.config.js    # Vite configuration
│   ├── README.md         # Project Documentation
```

## Troubleshooting
If you encounter issues:
- Ensure you have installed all dependencies: `npm install`
- Restart the development server: `npm run dev`
- Check the console for any specific error messages

## Future Enhancements
- Connect with a backend for persistent data storage
- Implement authentication
- Add categories for better note organization

---
🚀 Happy Coding!

