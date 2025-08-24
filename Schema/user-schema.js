import z from 'zod';

export const userSearchSchema = z.object({ q: z.string() });
