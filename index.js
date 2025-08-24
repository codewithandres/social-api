import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';

//? Routes
import authRoute from './routes/auth.route.js';
import userRoutes from './routes/user.route.js';
import postRoutes from './routes/post.route.js';
import likeRoutes from './routes/like.route.js';
import commentRoutes from './routes/comment.route.js';
import { initEdgeStore } from '@edgestore/server';
import { createEdgeStoreExpressHandler } from '@edgestore/server/adapters/express';
import z from 'zod';

const app = express();

// --- EDGESTORE ROUTER CONFIG --

// ? Midelwares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(cookieParser());

const es = initEdgeStore.create();

const edgeStoreRouter = es.router({
	PrivateFiles: es
		.fileBucket({
			maxSize: 1024 * 1024 * 10, // 10MB
			accept: ['image/jpeg', 'image/png'], // wildcard also works: ['image/*']
		})
		.input(z.object({ type: z.enum(['private', 'profile']) }))
		.path(({ input }) => [{ type: input.type }])
		.beforeDelete((ctx, fileInfo) => {
			console.log('beforeDelete', { ctx, fileInfo });
			return true;
		}),
});

const handler = createEdgeStoreExpressHandler({
	router: edgeStoreRouter,
});

// set the get and post routes for the edgestore router

app.use('/edgestore/', handler);

app.use('/api/auth', authRoute);
app.use('/api/user', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/like', likeRoutes);
app.use('/api/comments', commentRoutes);

app.listen(8080, () => {
	console.log('Server is running on port 8080');
});
