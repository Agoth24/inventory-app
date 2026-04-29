const { z } = require("zod");

const authorBodySchema = z.object({
	authorName: z
		.string()
		.trim()
		.min(1, { message: "Author Name is required" }),
});

const authorIdSchema = z.object({
	id: z.coerce
		.number()
		.int()
		.positive({ message: "Author ID must be a positive integer" }),
});

module.exports = { authorBodySchema, authorIdSchema };
