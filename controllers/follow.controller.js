import { pool } from '../lib/connect.js';

export const getFollows = async (req, res) => {
	try {
		const token = req.cookies.accessToken;

		if (!token) return res.status(200).json({ success: false, message: 'Unauthorized' });

		const { userId } = req.query;

		const [following] = await pool.execute(
			`SELECT followingId FROM follows WHERE followerId = ?`,
			[userId]
		);

		const [follower] = await pool.execute(
			`SELECT followerId FROM follows WHERE followingId = ?`,
			[userId]
		);

		// const followingIds = rows.map(row => row.followingId);

		res.status(200).json({ following, follower });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export const newFollow = async (req, res) => {
	try {
		const token = req.cookies.accessToken;

		if (!token) return res.status(401).json({ success: false, message: 'Unauthorized' });

		const { followerId, followingId } = req.body;

		// Check if follow relationship already exists
		const [existing] = await pool.execute(
			`SELECT id FROM follows WHERE followerId = ? AND followingId = ?`,
			[followerId, followingId]
		);

		if (existing.length > 0) {
			// If exists, unfollow
			await pool.execute('DELETE FROM follows WHERE followerId = ? AND followingId = ?', [
				followerId,
				followingId,
			]);
			res.status(200).json({ success: true, message: 'Unfollowed' });
		} else {
			// If doesn't exist, follow
			await pool.execute('INSERT INTO follows (followerId, followingId) VALUES (?, ?)', [
				followerId,
				followingId,
			]);
			res.status(200).json({ success: true, message: 'Followed' });
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export const deleteFollow = (req, res) => {};
