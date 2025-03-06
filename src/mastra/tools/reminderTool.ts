import { createTool } from '@mastra/core/tools';
import { z } from 'zod';

export const taskReminderTool = createTool({
  id: 'set-task-reminder',
  description: 'Set a reminder for a task and notify the user',
  inputSchema: z.object({
    task: z.string().describe('Task description'),
    time: z.string().describe('Time duration in minutes or hours (e.g., "5 minutes", "1 hour")'),
  }),
  outputSchema: z.object({
    message: z.string(),
  }),
  execute: async ({ context }) => {
    const { task, time } = context;
    const duration = extractTime(time);

    if (!duration) {
      throw new Error('Invalid time format. Please provide a valid duration like "5 minutes" or "2 hours".');
    }

    console.log(`Reminder set: "${task}" in ${duration.value} ${duration.unit}`);
    
    setTimeout(() => {
      console.log(`🔔 Reminder: ${task}`);
    }, duration.milliseconds);

    return {
      message: `Reminder set for "${task}" in ${duration.value} ${duration.unit}.`
    };
  },
});

function extractTime(timeString: string) {
  const match = timeString.match(/(\d+)\s*(minute|hour|minutes|hours)/i);
  if (!match) return null;

  const value = parseInt(match[1], 10);
  const unit = match[2].toLowerCase();
  const milliseconds = unit.startsWith('minute') ? value * 60000 : value * 3600000;

  return { value, unit, milliseconds };
}
