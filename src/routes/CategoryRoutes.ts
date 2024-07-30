import { Router } from "express";
import { CategoryController } from "../controllers/CategoryController";
import {
  validateCreateCategory,
  validateUpdateCategory,
} from "../middlewares/validations/categoryValidation";

const router = Router();
const categoryController = new CategoryController();

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - category
 *       properties:
 *         category:
 *           type: string
 *           description: The name of the category
 *       example:
 *         category: "Electronics"
 *     Subcategory:
 *       type: object
 *       required:
 *         - category
 *         - parentId
 *       properties:
 *         category:
 *           type: string
 *           description: The name of the subcategory
 *         parentId:
 *           type: integer
 *           description: The ID of the parent category
 *       example:
 *         category: "Phone"
 *         parentId: 20
 */

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: API to manage categories
 */

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Create a new category or subcategory
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             oneOf:
 *               - $ref: '#/components/schemas/Category'
 *               - $ref: '#/components/schemas/Subcategory'
 *     responses:
 *       201:
 *         description: The category or subcategory was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/Category'
 *                 - $ref: '#/components/schemas/Subcategory'
 *       500:
 *         description: Some server error
 */
router.post("/categories", validateCreateCategory, (req, res, next) =>
  categoryController.create(req, res, next).catch(next)
);

/**
 * @swagger
 * /api/categories/{id}:
 *   put:
 *     summary: Update a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: The category was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: The category was not found
 *       500:
 *         description: Some server error
 */
router.put("/categories/:id", validateUpdateCategory, (req, res, next) =>
  categoryController.update(req, res, next).catch(next)
);

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Returns the list of all the categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: The list of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */
router.get("/categories", (req, res, next) =>
  categoryController.findAll(req, res, next).catch(next)
);

/**
 * @swagger
 * /api/categories/{id}:
 *   get:
 *     summary: Get a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The category ID
 *     responses:
 *       200:
 *         description: The category description by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: The category was not found
 */
router.get("/categories/:id", (req, res, next) =>
  categoryController.findOne(req, res, next).catch(next)
);

/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     summary: Delete a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The category ID
 *     responses:
 *       200:
 *         description: The category was deleted
 *       404:
 *         description: The category was not found
 *       500:
 *         description: Some server error
 */
router.delete("/categories/:id", (req, res, next) =>
  categoryController.delete(req, res, next).catch(next)
);

export default router;
