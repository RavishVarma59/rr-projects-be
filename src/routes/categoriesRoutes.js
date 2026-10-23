const express = require("express");

const {
    getCategories,
    getCategoryBySlug,
    getArticlesByCategory,
        createCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/categoriesController');

const router = express.Router();

router.get('/',getCategories);
router.post("/", createCategory);


router.get("/:slug/articles", getArticlesByCategory);
router.get("/:slug", getCategoryBySlug);

router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);


module.exports = router;