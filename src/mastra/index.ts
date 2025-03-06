
import { Mastra } from '@mastra/core/mastra';
import { createLogger } from '@mastra/core/logger';

import { weatherAgent} from './agents';
import { taskReminderAgent} from './agents/reminder';
export const mastra = new Mastra({
  agents: { weatherAgent, taskReminderAgent },
  logger: createLogger({
    name: 'Mastra',
    level: 'info',
  }),
});
