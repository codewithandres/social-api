import { pool } from '../lib/connect.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { singInSchema, singUpSchema } from '../Schema/auth.schema.js';
import z, { success } from 'zod';

export const singUp = async (req, res) => {
	try {
		//? Validar datos de entrada
		const validateData = singUpSchema.parse(req.body);

		const { username, password, email, name } = validateData;

		// ? Check user if exit
		const [rows] = await pool.execute('SELECT * FROM users WHERE username = ?  ', [
			username,
		]);

		// ? Create  user and has Password
		const salt = bcrypt.genSaltSync(10);
		const hashedPassword = bcrypt.hashSync(password, salt);

		// ? Insert user into database
		const [rowsInsert] = await pool.execute(
			'INSERT INTO  users (username, email, password, name) VALUES (?,?,?,?)',
			[username, email, hashedPassword, name]
		);

		if (rowsInsert.affectedRows === 1) {
			res.status(201).json({ sucsses: true, message: 'User created' });
		}

		console.log(rowsInsert);
	} catch (error) {
		console.error(error);

		if (error instanceof z.ZodError) {
			return res
				.status(400)
				.json({ success: false, message: 'validation error ', errors: error.errors });
		}

		if (error instanceof Error) {
			console.log(error.message);

			if (error.message.includes('Duplicate entry')) {
				return res
					.status(400)
					.json({ sucsses: false, message: 'Username already exists' });
			}
		}
		res.status(500).json({ sucsses: false, message: 'Internal Server Error' });
	}
};

export const singIn = async (req, res) => {
	const validateData = singInSchema.parse(req.body);

	const { username, password } = validateData;

	try {
		const [rows] = await pool.execute('SELECT * FROM users WHERE username = ?', [
			username,
		]);

		if (rows.length === 0) {
			res.status(404).json({ sucsses: false, message: 'User not found' });
		}

		const checkPassword = bcrypt.compareSync(password, rows.at(0).password);

		if (!checkPassword) {
			return res.status(401).json({ sucsses: false, message: 'incorrect credentials' });
		}

		const { password: pass, ...other } = rows.at(0);
		// ? create access token
		const token = jwt.sign({ id: other.id }, 'JWT_SECRET2025@developer');

		// ? response user info and token
		res
			.cookie('accessToken', token, {
				httpOnly: true,
			})
			.status(200)
			.json({ other, token });
	} catch (error) {
		if (error instanceof z.ZodError) {
			return res
				.status(400)
				.json({ success: false, message: 'validation error', errors: error.errors });
		}
		console.log(error);
		res.status(500).json({ sucsses: false, message: 'server internal server ' });
	}
};

export const singOut = res => {
	res
		.clearCookie('accesToken', { secure: true, sameSite: 'none' })
		.status(200)
		.json({ succses: true, message: 'the user has logged out' });
};
