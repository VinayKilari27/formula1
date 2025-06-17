'use server';

/**
 * @fileOverview AI-powered generation of descriptions for Formula 1 cars.
 *
 * - generateCarDescription - A function to generate a description for a given F1 car.
 * - GenerateCarDescriptionInput - The input type for the generateCarDescription function.
 * - GenerateCarDescriptionOutput - The return type for the generateCarDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCarDescriptionInputSchema = z.object({
  team: z.string().describe('The name of the Formula 1 team that built the car.'),
  year: z.number().describe('The year the car competed in Formula 1.'),
  engine: z.string().describe('The engine used in the Formula 1 car.'),
  carName: z.string().describe('The specific name or model of the Formula 1 car.'),
});
export type GenerateCarDescriptionInput = z.infer<typeof GenerateCarDescriptionInputSchema>;

const GenerateCarDescriptionOutputSchema = z.object({
  description: z.string().describe('A detailed and engaging description of the Formula 1 car.'),
});
export type GenerateCarDescriptionOutput = z.infer<typeof GenerateCarDescriptionOutputSchema>;

export async function generateCarDescription(input: GenerateCarDescriptionInput): Promise<GenerateCarDescriptionOutput> {
  return generateCarDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCarDescriptionPrompt',
  input: {schema: GenerateCarDescriptionInputSchema},
  output: {schema: GenerateCarDescriptionOutputSchema},
  prompt: `You are an expert Formula 1 historian. Generate a detailed and engaging description for the following Formula 1 car, including interesting historical context and anecdotes.

Team: {{{team}}}
Year: {{{year}}}
Engine: {{{engine}}}
Car Name: {{{carName}}}`,
});

const generateCarDescriptionFlow = ai.defineFlow(
  {
    name: 'generateCarDescriptionFlow',
    inputSchema: GenerateCarDescriptionInputSchema,
    outputSchema: GenerateCarDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
