const Articles = require('../models/articlesModel');
const pool = require('../config/database');
const validateArticle = require('../validators/articleValidator')

const  getArticles = async (req, res ) => {
    try {
        console.log("articles accessing")
       const articles = await Articles.getAllArticales();
        res.status(200).json({
            status: 200,
            articles : articles
        })
    } catch (error) {

        console.error(error);

        res.status(500).json({
            status: 500,
            message: "Failed to fetch articles"
        });

    }
}

const getArticle = async(req,res) => {
    try {
        const {slug} = req.params;
        const article = await Articles.getArticleBySlug(slug);
        if (!article) {
            return res.status(404).json({
                status: 404,
                message: "Article not found"
            });
        }

        res.status(200).json({
            status: 200,
            data: article
        });

    } catch( error) {
        console.log(error)
        res.status(500).json({
            status: 500,
            message: "Failed to fetch article"
        });
    }
}

const createArticle = async (req, res) => {
    try {
      const error = await validateArticle(req.body, pool);

        if (error) {
            return res.status(400).json({
                status: 400,
                message: error
            });
        }

        const article = await Articles.createArticle({
            ...req.body,
            status: req.body.status ?? "draft",
            category_id: Number(req.body.category_id)
        });

        res.status(201).json({
            status: 201,
            data: article
        });

    } catch (error) {
        console.error(error);

        // PostgreSQL unique constraint violation
        if (error.code === "23505") {
            return res.status(409).json({
                status: 409,
                message: "An article with this slug already exists"
            });
        }

        return res.status(500).json({
            status: 500,
            message: "Failed to create article"
        });
    }
};

const updateArticle = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                status: 400,
                message: "Invalid article ID"
            });
        }

        const error = await validateArticle(req.body, pool);

        if (error) {
            return res.status(400).json({
                status: 400,
                message: error
            });
        }

        const article = await Articles.updateArticle(id, {
            ...req.body,
            category_id: Number(req.body.category_id)
        });

        if (!article) {
            return res.status(404).json({
                status: 404,
                message: "Article not found"
            });
        }

        res.status(200).json({
            status: 200,
            data: article
        });
    } catch (error) {
        console.error(error);

        if (error.code === "23505") {
            return res.status(409).json({
                status: 409,
                message: "Article slug already exists"
            });
        }

        res.status(500).json({
            status: 500,
            message: "Failed to update article"
        });
    }
};

const deleteArticle = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                status: 400,
                message: "Invalid article ID"
            });
        }

        const article = await Articles.deleteArticle(id);

        if (!article) {
            return res.status(404).json({
                status: 404,
                message: "Article not found"
            });
        }

        res.status(200).json({
            status: 200,
            message: "Article deleted successfully",
            data: article
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            status: 500,
            message: "Failed to delete article"
        });
    }
};

module.exports = {
    getArticles,
    getArticle,
    createArticle,
    updateArticle,
    deleteArticle
}