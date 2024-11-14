import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

export const creationExtractionSchema = z.object({
  nom: z.string().min(5).max(100),
  poids_cafe: z.number().positive(),
  poids_boisson: z.number().positive(),
  utilisateur: z.string(),
  releves_tds: z.array(z.number())
});
