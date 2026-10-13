import { z } from 'zod';

export const leadSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254).optional().or(z.literal('')),
  phone: z.string().trim().min(7).max(32).optional().or(z.literal('')),
  service: z.string().trim().min(2).max(120),
  area: z.string().trim().min(1).max(40),
  location: z.string().trim().min(2).max(160),
  timeline: z.string().trim().min(2).max(80),
  comments: z.string().trim().max(2000).optional().default(''),
  consent: z.literal(true),
}).refine((value) => Boolean(value.email || value.phone), {
  message: 'Se requiere correo electrónico o teléfono',
  path: ['email'],
});

export const chatSchema = z.object({
  message: z.string().trim().min(1).max(2000),
  conversationHistory: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    text: z.string().max(2000),
  })).max(20).default([]),
});

export type LeadPayload = z.infer<typeof leadSchema>;
export type ChatPayload = z.infer<typeof chatSchema>;
