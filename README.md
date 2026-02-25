# Bitcoin One Million Countdown App

A full-stack application that provides a real-time countdown to the 1,000,000th Bitcoin block. The app features a premium dark-themed UI with cyan glow aesthetics, matching the provided design requirements.

## Features

- **Real-time Tracking**: Fetches the latest block height from the Mempool API.
- **Auto-Update**: The frontend polls the backend every 60 seconds to ensure the countdown is always up-to-date.
- **Premium UI**: Modern, responsive design with high-quality typography, cyan glow effects, and micro-animations.
- **Full-Stack Architecture**: React (Vite) frontend and Node.js (Express) backend.

## Tech Stack

- **Frontend**: React, Vite, Axios, CSS (Custom Design)
- **Backend**: Node.js, Express, Axios, CORS, Dotenv
- **API**: [Mempool.Space API](https://mempool.space/docs/api/rest)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/)

### Installation

1. **Clone or download the project files.**

2. **Install all dependencies** (run from the project root):
   ```bash
   npm install
   cd server && npm install
   cd ../client && npm install
   ```

### Running the App

#### Option A — Single command (recommended)

From the project root, run both the server and client simultaneously:

```bash
npm run dev
```

This uses `concurrently` to start both processes in one terminal. Output from each is color-coded and prefixed for easy reading.

- Server: `http://localhost:5001`
- Client: `http://localhost:5173`

The server uses Node's built-in `--watch` flag, so it automatically restarts when you change server files (requires Node 18+).

#### Option B — Separate terminals

1. **Start the Backend Server:**
   ```bash
   cd server
   npm run dev
   ```
   The server will start on `http://localhost:5001`.

2. **Start the Frontend Client:**
   ```bash
   cd client
   npm run dev
   ```
   The application will be available at `http://localhost:5173`.

## Running in Production

The Express server is configured to serve the React app's static build. To run the app in production:

1. **Build the React client:**
   ```bash
   cd client && npm run build
   ```
   This generates static files in `client/dist/`.

2. **Start the Express server:**
   ```bash
   cd server && npm start
   ```
   The server serves both the React app and API at `http://localhost:5001` (or the `PORT` value in your `.env`).

## API Endpoints

### GET `/api/block-info`
Returns the current block height and the countdown to 1 million.
- **Response**:
  ```json
  {
    "block height": 932000,
    "countdown": 68000
  }
  ```

## UI Design

The UI is designed to be visually stunning, featuring:
- **Dark Mode**: Deep black background for a premium feel.
- **Cyan Glow**: Neon cyan accents and shadows for the counter.
- **Animated Pulse**: Subtle breathing effect on the main countdown number.
- **Responsive Layout**: Optimized for various screen sizes.
