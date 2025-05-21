# Task Management Web Application

A full-stack task management application with AI-powered task summarization and Slack integration. Built with React, Node.js, and modern web technologies.

## 🌟 Features

- 📝 Create, read, update, and delete tasks
- ✅ Mark tasks as complete/incomplete
- 🤖 AI-powered task summarization using Gemini
- 📨 Slack integration for task summaries
- 🔐 Secure user authentication
- 📱 Responsive design with Tailwind CSS
- 🌙 Dark mode support
- 🗄️ PostgreSQL database with Prisma ORM

## 🏗️ Project Structure

```
task-management-webapp/
├── task-manager-frontend/    # React + Vite frontend
└── task-management-app/      # Node.js + Express backend
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- PostgreSQL database
- Gemini API key
- Slack workspace with webhook URL

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd task-management-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.sample .env
   ```
   Update the `.env` file with your configuration.

4. Set up the database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd task-manager-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.sample .env
   ```
   Update the `.env` file with your configuration.

4. Start the frontend development server:
   ```bash
   npm run dev
   ```

## 🔧 Environment Variables

### Backend (.env)
```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/taskdb"

# Authentication
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=24h

# Gemini AI
GEMINI_API_KEY=your_gemini_api_key

# Slack Integration
SLACK_WEBHOOK_URL=your_slack_webhook_url_here
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3000
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_SLACK_WEBHOOK_URL=your_slack_webhook_url
```

## 📚 Documentation

- [Backend Documentation](./task-management-app/README.md)
- [Frontend Documentation](./task-manager-frontend/README.md)

## 🔐 Demo Credentials

For testing purposes, you can use these demo credentials:
- Email: your@email.com
- Password: your@email.com

## 🛠️ Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios

### Backend
- Node.js
- Express
- Prisma
- PostgreSQL
- JWT Authentication
- Gemini AI API
- Slack Webhooks

## 🚀 Deployment

### Backend Deployment
1. Set up a PostgreSQL database
2. Configure environment variables
3. Deploy to your preferred hosting service (e.g., Vercel, Heroku)

### Frontend Deployment
1. Build the application:
   ```bash
   npm run build
   ```
2. Deploy the `dist` directory to your preferred hosting service

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Arpit Kashyap

## 🙏 Acknowledgments

- Gemini AI for task summarization
- Slack for webhook integration
- The open-source community for amazing tools and libraries
