# Wild Play

Griffith college Web Technologie group Project

The app will be designed using React and Javascript using vite template.

## Structure

        project-root/
        │── public/            # Static assets like favicon, robots.txt
        │── src/               # Source code of the application
        │   │── assets/        # Stores images, icons, fonts, stylesheets
        │   │   │── styles/    # Global and component-specific CSS files
        │   │── components/    # Reusable UI components (Navbar, Footer, Buttons)
        │   │── context/       # React Context files for state management
        │   │── data/          # JSON files containing structured data
        │   │── features/      # Feature-specific folders (auth, theme, modals)
        │   │── hooks/         # Custom React hooks (useAuth, useTheme, etc.)
        │   │── layouts/       # Structural components like sidebar, navbar, footer
        │   │── modules/       # Handles specific application tasks
        │   │── pages/         # Contains views of the web application
        │   │── router/        # React Router configurations
        │   │── store/         # State management (Redux, Zustand, etc.)
        │   │── utils/         # Utility functions for common operations
        │   │── App.jsx        # Main application component
        │   │── main.jsx       # Entry point of the application
        │── index.html         # Main HTML file
        │── vite.config.js     # Vite configuration file
        │── package.json       # Dependencies and scripts
        │── .gitignore         # Files to ignore in version control

### Public

The public directory contains static files that do not change, such as `favicon.ico` and other public assets directly served by the server.

### Src

The `src` folder contains all the source code of the application.

### Assets

This folder contains all images, icons, CSS files, font files, etc., used in your web application. Custom images, icons, and paid fonts are placed inside this folder.

### Styles

A subfolder inside `assets`, the `styles` directory contains global CSS files and component-specific stylesheets.

### Components

The components folder holds reusable UI elements of your application, such as navbar, footer, buttons, modals, and cards.

### Context

This folder stores all React Context API files that manage global state across multiple components and pages.

### Data

The data folder is used to store text data as JSON files. This structure helps keep content updates organized and easily manageable.

### Features

This folder contains individual feature-specific folders for different parts of the application, such as authentication, theme management, and modals.

### Hooks

This folder contains custom React hooks. Hooks let you "hook into" React state and lifecycle features from function components. Custom hooks typically start with a `use` prefix, such as `useAuth.js` or `useTheme.js`.

### Layouts

The layouts folder is used to define the general structure and appearance of the web pages. It often contains layout-based components such as sidebars, navbars, and footers.

### Modules

The modules folder handles specific tasks in your application, organizing code based on its purpose.

### Pages

The pages directory contains the views of your web application.

### Router

This folder stores the configuration for React Router, managing navigation between pages.

### Store

The store folder is used for state management, using tools like Redux or Zustand.

### Utility/Utils

This folder stores utility functions such as authentication helpers, theme management, and API error handling functions.

### Main Files

- `App.jsx` - The main component that serves as the root of the application.
- `main.jsx` - The entry point of the application, initializing React and rendering the app.

### Configuration and Other Files

- `vite.config.js` - Configuration file for Vite.
- `package.json` - Contains project dependencies and scripts.
- `.gitignore` - Lists files and directories to be ignored by Git.

Using this as a template https://dev.to/noruwa/folder-structure-for-modern-web-applications-4d11