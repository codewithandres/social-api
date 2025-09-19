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
	} catch (error) {
		console.error(error);
		return res.status(500).json({ success: false, message: 'Something went wrong' });
	}
};

export const toggleLike = async (req, res) => {
	try {
		const { postId } = req.query;
		const token = req.cookies.accessToken;

		if (!token) return res.status(401).json({ success: false, message: 'Unauthorized' });

		const userInfo = jwt.verify(token, process.env.JWT_SECRET);

		// Verificar si ya existe el like
		const [existing] = await pool.execute(
			'SELECT * FROM likes WHERE userId = ? AND postId = ?',
			[userInfo.id, postId]
		);

		if (existing.length > 0) {
			// Si existe, eliminarlo (unlike)
			await pool.execute('DELETE FROM likes WHERE userId = ? AND postId = ?', [
				userInfo.id,
				postId,
			]);
			res.status(200).json({ success: true, message: 'Like removed' });
		} else {
			// Si no existe, agregarlo (like)
			await pool.execute('INSERT INTO likes (userId, postId) VALUES (?,?)', [
				userInfo.id,
				postId,
			]);
			res.status(200).json({ success: true, message: 'Like added' });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false, message: 'Internal server error' });
	}
};
