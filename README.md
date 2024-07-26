# Product Catalog 📦

This project implements a RESTful API for managing a product catalog using Node.js, Express.js, MySQL, and TypeScript.

## Features 💡

- **Create** new brands, categories, and items.
- **Retrieve** brands, categories, and items.
- **Update** existing brands, categories, and items.
- **Delete** brands, categories, and items.
- **Update** stock quantities for items.
- **Centralized** error handling and validation.

## Technologies Used

- Node.js
- Express.js
- TypeScript
- MySQL with TypeORM
- Joi for validation

## Getting Started 🚀

### Prerequisites

- [Node.js](https://nodejs.org/)
- [MySQL](https://www.mysql.com/)

### Installation 📥

1. **Clone the repository:**

```
git clone https://github.com/Yasinj05/product-catalog.git
```

2. **Navigate to the project directory:**

```
cd product-catalog
```

3. **Install dependencies:**

```
npm install
```

4. **Create a .env file in the root directory and add your MySQL connection details:**

```
PORT=your-port
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=your-username
DATABASE_PASSWORD=your-password
DATABASE_NAME=your-db-name
```

5. **Start the server:**

```
npm start
```

## API Endpoints 🖇️

### Brand

#### Create Brand

- URL: POST `/api/brands`

#### Update Brand

- URL: PUT `/api/brands/:id`

#### Retrieve All Brand

- URL: GET `/api/brands`

#### Retrieve Single Brand

- URL: GET `/api/brands/:id`

#### Delete Brand

- URL: DELETE `/api/brands/:id`

### Category

#### Create Category

- URL: POST `/api/categories`

#### Update Category

- URL: PUT `/api/categories/:id`

#### Retrieve All Categories

- URL: GET `/api/categories`

#### Retrieve Single Category

- URL: GET `/api/categories/:id`

#### Delete Category

- URL: DELETE `/api/categories/:id`

### Item

#### Create Item

- URL: POST `/api/items`

#### Update Item

- URL: PUT `/api/items/:id`

#### Retrieve All Items

- URL: GET `/api/items`

#### Retrieve Single Item

- URL: GET `/api/items/:id`

#### Delete Item

- URL: DELETE `/api/items/:id`

#### Update Stock Quantity

- URL: PATCH `/api/items/:id/stock`

## Contributing

Contributions are welcome! Please submit a pull request or open an issue to discuss any changes.

## License ⚖️

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
