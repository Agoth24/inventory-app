const validate =
	(schema, { target }) =>
	(req, res, next) => {
		const result = schema.safeParse(req[target]);

		if (!result.success) {
			return res.status(400).json({
				status: "error",
				message: "Error Validation Failed",
				errors: result.error.issues.map((e) => ({
					field: e.path[0],
					message: e.message,
				})),
			});
		}
		req[target] = result.data;
		next();
	};

module.exports = validate;
