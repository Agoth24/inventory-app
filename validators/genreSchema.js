const { z } = require("zod");

const genreBodySchema = z.object({
	genreName: z.string().trim().min(1, { message: "Genre name is required" }),
});

const genreIdSchema = z.object({
	id: z.coerce
		.number()
		.int()
		.positive({ message: "Genre ID must be a positive integer" }),
});

module.exports = { genreBodySchema, genreIdSchema };
