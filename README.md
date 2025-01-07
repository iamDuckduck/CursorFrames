# cursorFrames

- **cursorFrames** is a web application that converts GIF or ANI animated images into individual frames, intended to be used with **Mousecape**, a macOS application for customizing your cursor. With this tool, you can animate your cursor by using individual frames of an animation.

## Features
- Convert GIF or ANI files into individual frames.
- Download each frame for use in Mousecape to create animated cursors on macOS.
- Simple drag-and-drop or file selection interface for uploading GIF/ANI files.

## Tech Stack
- **Frontend**: React, Vite, Chakra UI, Zustand
- **Backend**: Node.js, Express

## Installation

- While this project is deployed online, you can also run it locally for development purposes. Follow the instructions below to set it up.

### Prerequisites

- Ensure you have [Node.js](https://nodejs.org/) installed.

### Setup
- Install dependencies for both the client and server:
```
cd client
npm install
```
```
cd server
npm install
```
- Set the environment variable for the server:

On macOS/Linux:
```
export NODE_ENV=development
```
On Windows:
```
set NODE_ENV=development
```

- Run the client and server locally:
```
nodemon
```

```
npm run dev
```

- The app will now be available at http://localhost:3000.

# Usage
- Go to the homepage of the app.
- Drag and drop or select your GIF or ANI file by clicking the drop area.
- The app will convert the animation into individual frames.
- Download the frames one by one for use in Mousecape to create an animated cursor.

# Contributing
- This project wouldn't have been possible without the ani-cursor package. It provides an awesome method for rendering Windows Animated Cursor files (.ani) in the browser by parsing out the individual frames and constructing a CSS animation. Thanks to their work, this project was made possible!


  
