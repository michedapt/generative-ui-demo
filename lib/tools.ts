import { tool as createTool } from 'ai';
import { z } from 'zod';
import { getWeather } from '@/actions/weather';

export const weatherTool = createTool({
  description: 'Get current weather information for a city',
  parameters: z.object({
    city: z.string().describe('The city to get weather for'),
  }),
  execute: async function ({ city }) {
    return await getWeather(city);
  },
});

export const themeChangerTool = createTool({
  description: 'Display a theme selector interface that allows users to switch between light, dark, and system color themes',
  parameters: z.object({}),
  execute: async function () {
    return {
      themes: [
        { name: 'Light', value: 'light' },
        { name: 'Dark', value: 'dark' },
        { name: 'System', value: 'system' },
        { name: 'Forest', value: 'forest' },
        { name: 'Ocean', value: 'ocean' }
      ]
    };
  },
});

export const confirmationTool = {
  description: 'Ask the user for confirmation.',
  parameters: z.object({
    message: z.string().describe('The message to ask for confirmation.'),
  }),
};

export const selfDestructTool = createTool({
  description: 'Initiate a fun self-destruct sequence that shows confetti when confirmed, always ask for confirmation first.',
  parameters: z.object({}),
  execute: async function () {
    return {
      message: "WARNING: Self-destruct sequence initiated."
    };
  },
});

export const tools = {
  displayWeather: weatherTool,
  displayThemeChanger: themeChangerTool,
  askForConfirmation: confirmationTool,
  selfDestruct: selfDestructTool,
};