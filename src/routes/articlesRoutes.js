const express = require("express");

const {
    getArticles,
    getArticle,
    createArticle,
    updateArticle,
    deleteArticle
    
} = require("../controllers/articlesControllers");

const router = express.Router();


router.get("/", getArticles);
router.get("/:slug",getArticle);
router.post('/',createArticle);
router.put("/:id", updateArticle);
router.delete("/:id", deleteArticle);


module.exports = router;