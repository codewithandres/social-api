import jwt from 'jsonwebtoken';
import { pool } from '../lib/connect.js';

export const getComments = async (req, res) => {
	try {
		// const token = req.cookies.accessToken;

		// if (!token) return res.status(401).json({ success: false, message: 'Unauthorized' });

		const { postId } = req.query;

		const [rows] = await pool.execute(
			`
			SELECT c.*, u.id AS userId, name, profilePicture FROM
			comments AS c JOIN users AS u ON(u.id = c.userId) WHERE c.postId = ? ORDER BY c.createdAt DESC
			`,

			[postId]
		);

		res.status(200).json({ success: true, comment: rows });
	} catch (error) {
		console.log('error');
		res.status(500).json({ success: false, message: 'Internal Server Error' });
	}
};

export const createdComment = async (req, res) => {
	try {
		const token = req.cookies.accessToken;

		if (!token) return res.status(401).json({ success: false, message: 'Unauthorized' });

		const { comment, postId } = req.body;

		const userInfo = jwt.verify(token, process.env.JWT_SECRET);

		if (!comment || !postId) {
			return res
				.status(400)
				.json({ success: false, message: 'Missing required comment fields' });
		}

		const [rows] = await pool.execute(
			'INSERT INTO comments (description, userId , postId) VALUES (?, ?, ?)',
			[comment, userInfo.id, postId]
		);

		if (rows.affectedRows !== 0) {
			return res
				.status(201)
				.json({ success: true, message: 'Comment created successfully' });
		}
	} catch (error) {
		console.log(error);

		res.status(500).json({ success: false, message: 'Internal Server Error' });
	}
};
