const validateArticle = async (article, pool) => {
    const {
        title,
        slug,
        content,
        category_id,
        status = "draft"
    } = article;

    if (!title?.trim() || !slug?.trim() ||
        !content?.trim() || category_id == null) {
        return "Title, slug, content and category_id are required";
    }

    if (!["draft", "published"].includes(status)) {
        return "Status must be draft or published";
    }

    const categoryId = Number(category_id);

    if (!Number.isInteger(categoryId) || categoryId <= 0) {
        return "Invalid category_id";
    }

    const { rows } = await pool.query(
        "SELECT id FROM categories WHERE id = $1",
        [categoryId]
    );

    if (rows.length === 0) {
        return "Category does not exist";
    }

    return null;
};

module.exports = validateArticle;