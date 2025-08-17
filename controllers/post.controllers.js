import jwt from 'jsonwebtoken';

import { pool } from '../lib/connect.js';

import { createSchemaPosts } from '../Schema/posts.schema.js';

import z from 'zod';

export const getPosts = async (req, res) => {
	try {
		const token = req.cookies.accessToken;

		if (!token) {
			return res.status(401).json({ success: false, message: 'Unauthorized' });
		}

		const user = jwt.verify(token, 'JWT_SECRET2025@developer');

		const [rows] = await pool.execute(
			`SELECT p.*, u.name, u.profilePicture FROM posts p 
			JOIN users u ON u.id = p.userId
			WHERE p.userId = ? OR p.userId IN (
				SELECT followingId FROM follows WHERE followerId = ?
			)
			ORDER BY p.createdAt DESC`,
			[user.id, user.id]
		);

		res.status(200).json({ success: true, data: rows });
	} catch (error) {
		res.status(500).json({ success: false, message: 'Internal Server Error' });
		console.log(error);
	}
};

export const createPost = async (req, res) => {
	try {
		const token = req.cookies.accessToken;

		const { description, image } = createSchemaPosts.parse(req.body);
		console.log(token);
		if (!token) {
			return res.status(401).json({ success: false, message: 'Unauthorized posts' });
		}
		const user = jwt.verify(token, 'JWT_SECRET2025@developer');

		const [rows] = await pool.execute(
			'INSERT INTO posts (description, image, userId) VALUES (?, ?, ?)',
			[description, image || null, user.id]
		);

		if (rows.affectedRows !== 0) {
			return res
				.status(201)
				.json({ success: true, message: 'Post created successfully' });
		}
	} catch (error) {
		console.log(error);

		if (error instanceof z.ZodError) {
			return res
				.status(400)
				.json({ success: false, message: 'validation error ', errors: error.errors });
		}
	}
};
