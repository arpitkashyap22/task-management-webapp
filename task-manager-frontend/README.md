# Task Management Web App

A modern task management application built with React, TypeScript, and Vite. Features include task creation, management, and Slack integration for task summaries.

## Features

- 📝 Create, read, update, and delete tasks
- ✅ Mark tasks as complete/incomplete
- 📱 Responsive design with Tailwind CSS
- 🔐 User authentication
- 📊 Task summarization with Gemini AI
- 📨 Slack integration for task summaries
- 🌙 Dark mode support

## Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- A Slack workspace (for webhook integration)
- Gemini API key (for AI summarization)

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd task-manager-frontend
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
   - Add your backend API URL
   - Add your Gemini API key
   - Add your Slack webhook URL

5. Start the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
VITE_API_URL=http://localhost:3000
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_SLACK_WEBHOOK_URL=your_slack_webhook_url
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
task-manager-frontend/
├── src/
│   ├── components/     # Reusable components
│   ├── pages/         # Page components
│   ├── services/      # API services
│   ├── types/         # TypeScript types
│   └── utils/         # Utility functions
├── public/            # Static assets
└── dist/             # Production build
```

## Deployment

The application is configured for deployment on Vercel. The `vercel.json` file includes:
- Build command
- Output directory
- Framework specification
- Client-side routing configuration

## Demo Credentials

For testing purposes, you can use these demo credentials:
- Email: your@email.com
- Password: your@email.com

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
