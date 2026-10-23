const pool = require("../config/database");

const Categories = {
    async getCategories() {
        const { rows } = await pool.query(
            "SELECT id, name, slug, description FROM categories ORDER BY name ASC"
        );

        return rows;
    },
        async getCategoryBySlug(slug) {
        const { rows } = await pool.query(
            `SELECT id, name, slug, description
             FROM categories
             WHERE slug = $1
             LIMIT 1`,
            [slug]
        );

        return rows[0] || null;
    },

    async getCategoryBySlug(slug) {
        const { rows } = await pool.query(
            `SELECT id, name, slug, description
             FROM categories
             WHERE slug = $1
             LIMIT 1`,
            [slug]
        );

        return rows[0] || null;
    },

    async getArticlesByCategorySlug(slug) {
        const { rows } = await pool.query(
            `SELECT
                a.id,
                a.title,
                a.slug,
                a.excerpt,
                a.cover_image,
                a.published_at,
                c.name AS category_name
             FROM articles a
             JOIN categories c
                ON c.id = a.category_id
             WHERE c.slug = $1
               AND a.status = 'published'
             ORDER BY a.published_at DESC NULLS LAST,
                      a.created_at DESC`,
            [slug]
        );

        return rows;
    },
        
    async createCategory({ name, slug, description }) {
        const { rows } = await pool.query(
            `INSERT INTO categories (name, slug, description)
            VALUES ($1, $2, $3)
            RETURNING id, name, slug, description`,
            [name, slug, description || null]
        );

        return rows[0];
    },

    async updateCategory(id, { name, slug, description }) {
        const { rows } = await pool.query(
            `UPDATE categories
            SET name = $1,
                slug = $2,
                description = $3
            WHERE id = $4
            RETURNING id, name, slug, description`,
            [name, slug, description || null, id]
        );

        return rows[0] || null;
    },

    async deleteCategory(id) {
        const { rows } = await pool.query(
            `DELETE FROM categories
            WHERE id = $1
            RETURNING id`,
            [id]
        );

        return rows[0] || null;
    }
}

module.exports = Categories;