/**
 * tools.ts
 * 
 * This file defines the tools (special commands/widgets) that the AI can use during chat.
 * Each tool is a specialized function that can be invoked by the AI to perform specific actions
 * or display interactive UI components to the user.
 * 
 * The tools use:
 * - @ai/sdk for tool creation and management
 * - Zod for parameter validation
 * - Custom components for UI rendering
 */

import { tool as createTool } from 'ai';
import { z } from 'zod';
import { getWeather } from '@/actions/weather';

/**
 * Weather Tool
 * 
 * Fetches and displays current weather information for a specified city.
 * The tool accepts a city name and optional country code as parameters.
 * 
 * Example usage:
 * - "London" -> shows weather for London
 * - "London,UK" -> shows weather specifically for London, United Kingdom
 */
export const weatherTool = createTool({
  description: 'Get current weather information for a city',
  parameters: z.object({
    city: z.string().describe('The city name (e.g., "London" or "Bogota")'),
    country: z.string().optional().describe('The country code (e.g., "UK" or "CO")'),
  }),
  execute: async function ({ city, country }) {
    const query = country ? `${city},${country}` : city;
    console.log('Weather query:', query);
    return await getWeather(query);
  },
});

/**
 * Theme Changer Tool
 * 
 * Displays an interface for users to change the application's visual theme.
 * Supports multiple theme options including light, dark, system, and custom themes.
 * 
 * No parameters required - the tool always returns the full list of available themes.
 */
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

/**
 * Confirmation Tool
 * 
 * Presents a Yes/No dialog to the user and waits for their response.
 * Used when the AI needs explicit confirmation before proceeding with an action.
 * 
 * Note: This tool is special as it doesn't have an execute function - it's handled
 * directly by the chat UI component through the addToolResult callback.
 */
export const confirmationTool = {
  description: 'Ask the user for confirmation.',
  parameters: z.object({
    message: z.string().describe('The message to ask for confirmation.'),
  }),
};

/**
 * Self-Destruct Tool
 * 
 * A fun, non-destructive tool that displays an animated "self-destruct" sequence.
 * Always requires confirmation before executing (should be used with confirmationTool).
 * 
 * Features:
 * - Dramatic warning message
 * - Confetti animation
 * - Pulsing text effect
 */
export const selfDestructTool = createTool({
  description: 'Initiate a fun self-destruct sequence that shows confetti when confirmed, always ask for confirmation first.',
  parameters: z.object({}),
  execute: async function () {
    return {
      message: "WARNING: Self-destruct sequence initiated."
    };
  },
});

/**
 * Tool Collection
 * 
 * Exports all available tools as a single object for easy import and use.
 * The keys in this object correspond to the toolName values used in the chat component.
 */
export const tools = {
  displayWeather: weatherTool,
  displayThemeChanger: themeChangerTool,
  askForConfirmation: confirmationTool,
  selfDestruct: selfDestructTool,
};