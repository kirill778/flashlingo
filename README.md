# FlashLingo

FlashLingo is a web application designed to help users learn new languages through flashcards. It allows users to import their own vocabulary, study using different modes, track their progress, and manage application settings.

## Features

- **Study Flashcards**: Learn and review vocabulary using an interactive flashcard system.
- **Import Words**: Easily import word lists from CSV files (English-Russian pairs).
- **Track Progress**: View statistics on your learning progress and accuracy.
- **Manage Settings**: Export your vocabulary data and reset application data if needed.
- **Responsive Design**: Usable on both desktop and mobile devices.

## Technologies Used

- **Frontend**: React, TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Linting**: ESLint

## Project Structure

```
project/
├── public/                  # Static assets
├── src/
│   ├── components/          # Reusable UI components (Flashcard, Navigation, etc.)
│   ├── hooks/               # Custom React hooks (useWords, useWordStats)
│   ├── pages/               # Page components (HomePage, ImportPage, StatsPage, SettingsPage)
│   ├── App.tsx              # Main application component with routing
│   ├── main.tsx             # Application entry point
│   ├── index.css            # Global styles and Tailwind CSS imports
│   └── ...                  # Other TypeScript and asset files
├── .gitignore
├── index.html               # Main HTML file
├── package.json             # Project metadata and dependencies
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript configuration
├── tailwind.config.js       # Tailwind CSS configuration
└── README.md                # This file
```

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v18 or later recommended)
- npm (comes with Node.js)

### Installation

1. **Clone the repository (if applicable)**:
   ```sh
   git clone <repository-url>
   cd project
   ```
2. **Install NPM packages**:
   ```sh
   npm install
   ```

### Running the Application

1. **Start the development server**:
   ```sh
   npm run dev
   ```
   This will start the Vite development server, typically on `http://localhost:5173` (the port might vary).

2. **Open your browser** and navigate to the provided URL.

## Available Scripts

In the project directory, you can run:

- `npm run dev`: Runs the app in development mode.
- `npm run build`: Builds the app for production to the `dist` folder.
- `npm run lint`: Lints the project files using ESLint.
- `npm run preview`: Serves the production build locally for preview.

## How It Works

The application is built using React and TypeScript. It uses Vite as a fast build tool.

- **State Management**: Primarily uses React's built-in state management (`useState`, `useEffect`) and custom hooks (`useWords`, `useWordStats`) to manage vocabulary, study sessions, and statistics. Data is stored in `localStorage` for persistence across sessions.
- **Routing**: A simple client-side routing mechanism is implemented in `App.tsx` to switch between different pages (Study, Import, Progress, Settings).
- **Components**: The UI is broken down into reusable components located in the `src/components` directory. Pages are located in `src/pages`.
- **Styling**: Tailwind CSS is used for utility-first styling, configured in `tailwind.config.js` and `index.css`.

### Core Functionality

- **`src/hooks/useWords.ts`**: Manages the list of words, including adding new words (from import), retrieving words for study, and clearing all words. Words are stored in `localStorage`.
- **`src/hooks/useWordStats.ts`**: Manages user statistics, such as study session accuracy and overall progress. Stats are also stored in `localStorage`.
- **`src/pages/ImportPage.tsx`**: Allows users to upload a CSV file. The `FileImport.tsx` component handles the file parsing.
- **`src/pages/HomePage.tsx`**: Displays the flashcard deck (`FlashcardDeck.tsx`) for studying and allows users to select study modes.
- **`src/pages/StatsPage.tsx`**: Shows user's learning statistics using `StatisticsDisplay.tsx`.
- **`src/pages/SettingsPage.tsx`**: Provides options to export data and reset all application data via `SettingsPanel.tsx`.
- **`src/components/Navigation.tsx`**: Provides navigation between the different sections of the application.

This README provides a comprehensive overview of the FlashLingo application. If you have any questions or suggestions, feel free to contribute or open an issue.