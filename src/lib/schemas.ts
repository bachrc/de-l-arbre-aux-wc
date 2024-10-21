import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

export const creationExtractionSchema = z.object({
  nom: z.string().min(5).max(50),
  utilisateur: z.string()
});
