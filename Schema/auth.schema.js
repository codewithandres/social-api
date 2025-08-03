import { z } from 'zod';

export const singUpSchema = z.object({
	username: z.string().min(3).max(20),
	password: z.string().min(6).max(20),
	email: z.string().email(),
	name: z.string().min(3).max(20),
	bio: z.string().min(3).max(200).optional(),
});

export const singInSchema = z.object({
	username: z.string().min(3).max(20),
	password: z.string().min(6).max(20),
});
