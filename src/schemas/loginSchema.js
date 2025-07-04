// schemas/loginSchema.js
import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .email('Invalid email address')
    .refine((val) => val.endsWith('@iimamritsar.ac.in'), {
      message: 'Email must end with @iimamritsar.ac.in',
      path: ['email']
    }),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional()
});
