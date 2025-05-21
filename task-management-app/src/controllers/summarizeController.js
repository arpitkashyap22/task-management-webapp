const { GoogleGenerativeAI } = require('@google/generative-ai');
const axios = require('axios');
const prisma = require('../prisma.js');

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// /POST summarize todos and send to Slack
const summarize = async (req, res) => {
  try {
    // 1. Fetch all incomplete todos
    const todos = await prisma.task.findMany({ 
      where: { completed: false }
    });
    
    // 2. Generate summary using Gemini
    const todoText = todos.map(todo => `- ${todo.title}${todo.description ? `: ${todo.description}` : ''}`).join('\n');
    
    const prompt = `You are a helpful assistant that summarizes todo lists in a concise and organized way. 
    Group related tasks together and highlight priorities. Format the output in a clear, readable way with emojis for better visual organization.
    
    Please summarize the following todo items:
    ${todoText}`;

    const result = await model.generateContent(prompt);
    const summary = result.response.text();
    
    // 3. Send to Slack
    const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;
    
    if (!slackWebhookUrl) {
      throw new Error('Slack webhook URL not configured');
    }
    
    await axios.post(slackWebhookUrl, {
      blocks: [
        {
          type: "header",
          text: {
            type: "plain_text",
            text: "📋 Todo Summary",
            emoji: true
          }
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: summary
          }
        }
      ]
    });
    
    res.status(200).json({ 
      success: true, 
      message: 'Summary sent to Slack successfully',
      summary
    });
  } catch (error) {
    console.error('Error summarizing todos:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to summarize todos or send to Slack',
      details: error.message 
    });
  }
};

module.exports = {
  summarize
};

