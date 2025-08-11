import jwt from 'jsonwebtoken';
import { pool } from '../lib/connect.js';

export const getPosts = async (req, res) => {
	try {
		const token = req.cookies.accesToken;

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
