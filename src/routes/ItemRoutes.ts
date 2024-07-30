import { Router } from "express";
import { ItemController } from "../controllers/ItemController";
import {
  validateCreateItem,
  validateUpdateItem,
} from "../middlewares/validations/itemValidation";

const router = Router();
const itemController = new ItemController();

/**
 * @swagger
 * components:
 *   schemas:
 *     Item:
 *       type: object
 *       required:
 *         - slug
 *         - name
 *         - brand
 *         - category
 *         - price
 *         - stockQuantity
 *       properties:
 *         slug:
 *           type: string
 *           description: The unique slug for the item
 *         name:
 *           type: string
 *           description: The name of the item
 *         description:
 *           type: string
 *           description: The description of the item
 *         brand:
 *           type: integer
 *           description: The brand ID of the item
 *         category:
 *           type: integer
 *           description: The category ID of the item
 *         price:
 *           type: number
 *           format: float
 *           description: The price of the item
 *         stockQuantity:
 *           type: integer
 *           description: The stock quantity of the item
 *         medias:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               url:
 *                 type: string
 *           description: List of media associated with the item
 *       example:
 *         slug: "iphone-15-pro-max"
 *         name: "IPhone 15 Pro Max"
 *         description: "A high-end smartphone with 256GB storage."
 *         brand: 19
 *         category: 22
 *         price: 1199.99
 *         stockQuantity: 50
 *         medias: [
 *           {
 *             name: "image1.jpg",
 *             url: "http://example.com/image1.jpg"
 *           },
 *           {
 *             name: "image2.jpg",
 *             url: "http://example.com/image2.jpg"
 *           }
 *         ]
 */

/**
 * @swagger
 * tags:
 *   name: Items
 *   description: API to manage items
 */

/**
 * @swagger
 * /api/items:
 *   post:
 *     summary: Create a new item
 *     tags: [Items]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       201:
 *         description: The item was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       500:
 *         description: Some server error
 */
router.post("/items", validateCreateItem, (req, res, next) =>
  itemController.create(req, res, next).catch(next)
);

/**
 * @swagger
 * /api/items/{id}:
 *   put:
 *     summary: Update an item by ID
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The item ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       200:
 *         description: The item was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       404:
 *         description: The item was not found
 *       500:
 *         description: Some server error
 */
router.put("/items/:id", validateUpdateItem, (req, res, next) =>
  itemController.update(req, res, next).catch(next)
);

/**
 * @swagger
 * /api/items:
 *   get:
 *     summary: Returns the list of all the items
 *     tags: [Items]
 *     responses:
 *       200:
 *         description: The list of items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Item'
 */
router.get("/items", (req, res, next) =>
  itemController.findAll(req, res, next).catch(next)
);

/**
 * @swagger
 * /api/items/{id}:
 *   get:
 *     summary: Get an item by ID
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The item ID
 *     responses:
 *       200:
 *         description: The item description by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       404:
 *         description: The item was not found
 */
router.get("/items/:id", (req, res, next) =>
  itemController.findOne(req, res, next).catch(next)
);

/**
 * @swagger
 * /api/items/{id}:
 *   delete:
 *     summary: Delete an item by ID
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The item ID
 *     responses:
 *       200:
 *         description: The item was deleted
 *       404:
 *         description: The item was not found
 *       500:
 *         description: Some server error
 */
router.delete("/items/:id", (req, res, next) =>
  itemController.delete(req, res, next).catch(next)
);

/**
 * @swagger
 * /api/items/{id}/stock:
 *   patch:
 *     summary: Update the stock quantity of an item by ID
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The item ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               maxStockThreshold:
 *                 type: integer
 *             example:
 *               maxStockThreshold: 100
 *     responses:
 *       200:
 *         description: The item's stock quantity was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       404:
 *         description: The item was not found
 *       500:
 *         description: Some server error
 */
router.patch("/items/:id/stock", (req, res, next) =>
  itemController.updateStockQuantity(req, res, next).catch(next)
);

export default router;
