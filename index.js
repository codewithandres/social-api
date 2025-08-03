import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';

//? Routes
import authRoute from './routes/auth.route.js';
import userRoutes from './routes/user.route.js';
import postRoutes from './routes/post.route.js';
import likeRoutes from './routes/like.route.js';
import commentRoutes from './routes/comment.route.js';

const app = express();

// ? Midelwares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
// app.use('/api/user', (req, res) => {
// 	res.send('Hello World!');
// });

app.use('/api/auth', authRoute);
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/like', likeRoutes);
app.use('/api/comment', commentRoutes);

app.listen(8080, () => {
	console.log('Server is running on port 8080');
});
