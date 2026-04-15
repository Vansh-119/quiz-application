# Quiz Application

A full-stack web application for creating and taking quizzes, with user authentication, quiz management, and performance tracking.

## Features

- **User Authentication**: Register and login functionality
- **Quiz Management**: Create, view, and manage quizzes
- **Quiz Taking**: Interactive quiz interface with timer and scoring
- **Attempt Tracking**: Store and review quiz attempts
- **Leaderboard**: View top performers
- **Statistics**: Personal and overall quiz statistics
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens

### Frontend
- **React** - UI library
- **Vite** - Build tool and dev server
- **CSS** - Styling

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd quiz-app/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/quizapp
   JWT_SECRET=your_jwt_secret_here
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd quiz-app/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and go to `http://localhost:5173` (default Vite port)

## Usage

1. **Register**: Create a new account or login with existing credentials
2. **Dashboard**: View available quizzes and your statistics
3. **Create Quiz**: Add new quizzes with questions (admin functionality)
4. **Take Quiz**: Select a quiz and answer questions within the time limit
5. **Results**: View your score and correct answers after completion
6. **Leaderboard**: Check your ranking against other users
7. **Stats**: Review your quiz performance history

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Quizzes
- `GET /api/quizzes` - Get all quizzes
- `POST /api/quizzes` - Create new quiz
- `GET /api/quizzes/:id` - Get specific quiz

### Questions
- `GET /api/questions/quiz/:quizId` - Get questions for a quiz
- `POST /api/questions` - Add question to quiz

### Attempts
- `POST /api/attempts` - Submit quiz attempt
- `GET /api/attempts/user/:userId` - Get user's attempts

## Project Structure

```
quiz-app/
├── backend/
│   ├── controllers/     # Route handlers
│   ├── middleware/      # Authentication middleware
│   ├── models/         # MongoDB schemas
│   ├── routes/         # API routes
│   ├── config/         # Database configuration
│   ├── server.js       # Main server file
│   └── package.json
├── frontend/
│   ├── public/         # Static assets
│   ├── src/
│   │   ├── api/        # API service functions
│   │   ├── components/ # Reusable components
│   │   ├── pages/      # Page components
│   │   ├── App.jsx     # Main app component
│   │   └── main.jsx    # App entry point
│   ├── vite.config.js
│   └── package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For questions or support, please open an issue on GitHub.