const db = require("../db/authorQueries")

const getAuthors = async (req, res) => {
    const authors = await db.getAllAuthors();
    if (authors.length === 0) {
        return res.status(404).json({message: "No Authors Found"})
    }
}


module.exports = {

}