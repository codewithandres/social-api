import z from 'zod';

export const createSchemaPosts = z.object({
	description: z.string().min(3).max(191),
	image: z.string().nullable(),
});
