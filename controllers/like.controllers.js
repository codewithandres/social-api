import { pool } from '../lib/connect.js';
import jwt from 'jsonwebtoken';

export const getLikes = async (req, res) => {
	try {
		const token = req.cookies.accessToken;

		if (!token) return res.status(401).json({ success: false, message: 'Unauthorized' });

		const { postId } = req.query;

		const [rows] = await pool.execute('SELECT userId FROM likes WHERE postId= ?', [
			postId,
		]);

		res.status(200).json({ success: true, likes: rows });
	} catch (error) {}
};
