import { openai } from "@ai-sdk/openai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { Agent } from "@mastra/core/agent";
import { taskReminderTool } from "../tools/reminderTool";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});
const model = google("gemini-1.5-pro");

export const taskReminderAgent = new Agent({
  name: "Task Reminder Agent",
  instructions: `
      You are a smart task reminder assistant that helps users keep track of their tasks and deadlines.

      Your primary function is to remind users about scheduled tasks and help them stay organized. When responding:
      - Always ask: "What task would you like to be reminded about?"
      - Then ask: "When should I remind you?"

      Use the taskReminderTool to manage task scheduling and reminders.
`,
  model: model,
  tools: { taskReminderTool },
});
