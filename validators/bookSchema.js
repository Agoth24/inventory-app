const { z } = require("zod");

const bookBodySchema = z.object({
	title: z.string().trim().min(1, { message: "Book title is required" }),
	genreName: z.string().trim().min(1, { message: "Genre Name is required" }),
	authorName: z
		.string()
		.trim()
		.min(1, { message: "Author name cannot be empty" })
		.optional(),
});

const bookIdSchema = z.object({
	id: z.coerce
		.number()
		.int()
		.positive({ message: "Book ID must be a positive integer" }),
});

module.exports = { bookBodySchema, bookIdSchema };
