require("dotenv").config();
const { Pool } = require("pg");

module.exports = new Pool(
	process.env.DATABASE_URL
		? {
				connectionString: process.env.DATABASE_URL,
				ssl: process.env.DATABASE_URL
					? { rejectUnauthorized: false }
					: false,
			}
		: {
				host: process.env.DB_HOST,
				user: process.env.DB_USER,
				database: process.env.DB_NAME,
				password: process.env.DB_PASSWORD,
				port: process.env.DB_PORT,
			},
);
