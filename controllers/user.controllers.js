import { pool } from '../lib/connect.js';

export const getAllUser = async (req, res) => {
	try {
		const token = req.cookies.accessToken;

		if (!token) {
			return res.status(401).json({ success: false, message: 'Unauthorized' });
		}

		const [rows] = await pool.execute(
			'SELECT id, username, name, profilePicture FROM users ORDER BY username'
		);

		res.status(200).json({ success: true, users: rows });
	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false, message: 'Internal Server Error' });
	}
};

export const searchUsers = async (req, res) => {
	try {
		const token = req.cookies.accessToken;

		// if (!token) {
		// 	return res.status(401).json({ success: false, message: 'Unauthorized' });
		// }

		const { userSearchSchema } = await import('../Schema/user-schema.js');
		const validateQuery = userSearchSchema.parse(req.query);

		const { q: query } = validateQuery;

		if (!query || query.trim().length === 0) {
			return res.status(200).json({ success: true, users: [] });
		}

		const [rows] = await pool.execute(
			'SELECT id, username, name, profilePicture FROM users WHERE username LIKE ? OR name LIKE ? LIMIT 10',
			[`%${query}%`, `%${query}%`]
		);

		res.status(200).json({ success: true, users: rows });
	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false, message: 'error internal server' });
	}
};
