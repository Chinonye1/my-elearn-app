# Elearn

Elearn is a React e-learning web app for discovering, managing, and reviewing online courses. It includes a learner experience for browsing and saving courses, plus an instructor dashboard for creating, editing, and deleting course content.

## Live Demo

View the deployed app here: [Elearn App](https://elearn-app-peach.vercel.app/)

## Features

- Browse all available courses
- Search courses by title, category, or instructor
- Filter courses by difficulty level
- View courses grouped by category
- Open detailed course pages with description, duration, price, difficulty, and reviews
- Add courses to a shopping cart
- Like and unlike courses
- Submit student reviews
- View a "My Learning" dashboard with learning stats
- Use an instructor dashboard to create, edit, and delete courses
- Toggle between light mode and dark mode
- Persist cart items, liked courses, and theme preference in local storage
- Responsive navigation for desktop and mobile screens

## Tech Stack

- React
- Vite
- React Router
- Material UI
- Axios
- Local Storage

## Getting Started

### Prerequisites

Make sure you have Node.js and npm installed.

### Installation

Install the project dependencies:

```bash
npm install
```

Create a `.env.local` file in the project root and add your backend API URL:

```bash
VITE_SERVER_URL=http://localhost:5005
```

The API should provide these endpoints:

- `GET /courses`
- `GET /courses/:courseId`
- `POST /courses`
- `PUT /courses/:courseId`
- `DELETE /courses/:courseId`
- `GET /reviews`
- `POST /reviews`

Start the development server:

```bash
npm run dev
```

## Available Scripts

```bash
npm run dev
```

Starts the Vite development server.

```bash
npm run build
```

Builds the app for production.

```bash
npm run preview
```

Previews the production build locally.

```bash
npm run lint
```

Runs ESLint checks.

## App Routes

- `/` - Home page with featured courses and categories
- `/courses` - Full course catalog
- `/courses/details/:courseId` - Course details and reviews
- `/courses/category/:categoryName` - Courses filtered by category
- `/learning` - Learner dashboard
- `/instructor` - Instructor dashboard
- `/create` - Create a new course
- `/courses/edit/:courseId` - Edit or delete a course
- `/cart` - Shopping cart and order summary

## Project Structure

```text
src/
  assets/       App images and logos
  components/   Reusable UI and course components
  pages/        Main route pages
  App.jsx       Routes, cart state, and liked-course state
  ThemeApp.jsx  Material UI theme and light/dark mode
  main.jsx      React entry point
```
