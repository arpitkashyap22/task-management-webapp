# Task Management Backend API

A robust backend API for the Task Management application built with Node.js, Express, and Prisma. Features include user authentication, task management, and integrations with Gemini AI and Slack.

## Features

- 🔐 JWT-based authentication
- 📝 CRUD operations for tasks
- 🗄️ PostgreSQL database with Prisma ORM
- 🤖 Gemini AI integration for task summarization
- 📨 Slack webhook integration
- 🔒 Secure password hashing
- 🛡️ Input validation and sanitization
- 📊 API documentation

## Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- PostgreSQL database
- Gemini API key
- Slack workspace with webhook URL

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd task-management-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp .env.sample .env
   ```

4. Update the `.env` file with your configuration:
   - Add your database URL
   - Add your JWT secret
   - Add your Gemini API key
   - Add your Slack webhook URL

5. Set up the database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/taskdb"

# Authentication
JWT_SECRET=your_jwt_secret_here

# Gemini AI
GEMINI_API_KEY=your_gemini_api_key_here

# Slack Integration
SLACK_WEBHOOK_URL=your_slack_webhook_url_here
```

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user

### Tasks
- `GET /tasks` - Get all tasks
- `GET /tasks/:id` - Get task by ID
- `POST /tasks` - Create new task
- `PUT /tasks/:id` - Update task
- `DELETE /tasks/:id` - Delete task

### Summarization
- `POST /summarize` - Generate and send task summary to Slack

## Available Scripts

- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm run build` - Build TypeScript files
- `npx prisma generate` - Generate Prisma client
- `npx prisma db push` - Push database schema changes

## Project Structure

```
task-management-app/
├── src/
│   ├── controllers/    # Route controllers
│   ├── middlewares/    # Custom middlewares
│   ├── routes/         # API routes
│   ├── services/       # Business logic
│   ├── utils/          # Utility functions
│   └── app.js          # Express app setup
├── prisma/
│   └── schema.prisma   # Database schema
└── dist/              # Compiled JavaScript
```

## Database Schema

The application uses Prisma with PostgreSQL. Key models include:

```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  tasks     Task[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Task {
  id          String   @id @default(uuid())
  title       String
  description String?
  completed   Boolean  @default(false)
  user        User     @relation(fields: [userId], references: [id])
  userId      String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Input validation
- CORS configuration
- Rate limiting
- Environment variable protection

## Error Handling

The API implements consistent error handling with:
- HTTP status codes
- Error messages
- Stack traces (development only)
- Validation errors

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 