import { Router } from "express";
import { BrandController } from "../controllers/BrandController";
import {
  validateCreateBrand,
  validateUpdateBrand,
} from "../middlewares/validations/brandValidation";

const router = Router();
const brandController = new BrandController();

/**
 * @swagger
 * components:
 *   schemas:
 *     Brand:
 *       type: object
 *       required:
 *         - brand
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the brand
 *         brand:
 *           type: string
 *           description: The name of the brand
 *       example:
 *         id: 1
 *         brand: "Apple"
 */

/**
 * @swagger
 * tags:
 *   name: Brands
 *   description: API to manage brands
 */

/**
 * @swagger
 * /api/brands:
 *   post:
 *     summary: Create a new brand
 *     tags: [Brands]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Brand'
 *           example:
 *             brand: "Apple"
 *     responses:
 *       201:
 *         description: The brand was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Brand'
 *       500:
 *         description: Some server error
 */
router.post("/brands", validateCreateBrand, (req, res, next) =>
  brandController.create(req, res, next).catch(next)
);

/**
 * @swagger
 * /api/brands/{id}:
 *   put:
 *     summary: Update a brand by ID
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The brand ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Brand'
 *           example:
 *             brand: "Adidas"
 *     responses:
 *       200:
 *         description: The brand was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Brand'
 *       404:
 *         description: The brand was not found
 *       500:
 *         description: Some server error
 */
router.put("/brands/:id", validateUpdateBrand, (req, res, next) =>
  brandController.update(req, res, next).catch(next)
);

/**
 * @swagger
 * /api/brands:
 *   get:
 *     summary: Returns the list of all the brands
 *     tags: [Brands]
 *     responses:
 *       200:
 *         description: The list of brands
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Brand'
 */
router.get("/brands", (req, res, next) =>
  brandController.findAll(req, res, next).catch(next)
);

/**
 * @swagger
 * /api/brands/{id}:
 *   get:
 *     summary: Get a brand by ID
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The brand ID
 *     responses:
 *       200:
 *         description: The brand description by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Brand'
 *       404:
 *         description: The brand was not found
 */
router.get("/brands/:id", (req, res, next) =>
  brandController.findOne(req, res, next).catch(next)
);

/**
 * @swagger
 * /api/brands/{id}:
 *   delete:
 *     summary: Delete a brand by ID
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The brand ID
 *     responses:
 *       200:
 *         description: The brand was deleted
 *       404:
 *         description: The brand was not found
 *       500:
 *         description: Some server error
 */
router.delete("/brands/:id", (req, res, next) =>
  brandController.delete(req, res, next).catch(next)
);

export default router;
