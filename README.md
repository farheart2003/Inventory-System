



Inventory Management System
This is a simple inventory management system built using Java Spring Boot (Backend) and PostgreSQL as the database. The application is structured using a clean architecture with clear separation of concerns, including controllers, services, repositories, DTOs, and models.

🛠 Technologies Used
Java 17+

Spring Boot

Spring Data JPA

PostgreSQL

Lombok

Spring Web

Spring Dev Tools

Postman (for API testing)

📁 Project Structure

✅ Features
User registration & login 

Create, update, delete, and fetch products

Each product is associated with the user who added it

DTOs for clean input/output

Error handling and validation-ready structure

📦 API Endpoints
User Auth
Method	Endpoint	Description
POST	/api/auth/register	Register a new user
POST	/api/auth/login	Login a user
GET	/api/auth/me/{email}	Get user profile

Products
Method	Endpoint	Description
POST	/api/products/add	Add a new product
GET	/api/products	List all products
GET	/api/products/{id}	Get product by ID
PUT	/api/products/{id}	Update existing product
DELETE	/api/products/{id}	Delete a product

🧪 Testing with Postman
You can test endpoints using Postman by sending JSON payloads to the endpoints above. Examples:

Register:

POST /api/auth/register

j
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secret123"
}
Add Product:

POST /api/products/add


{
  "name": "Laptop",
  "description": "Gaming Laptop",
  "quantity": 5,
  "price": 1200.50,
  "category": "Electronics",
  "addedById": 1
}
⚙️ Running the Project
Clone the repository

Open in your favorite IDE (e.g., IntelliJ)

Configure application.properties for PostgreSQL:

properties

Edit
spring.datasource.url=jdbc:postgresql://localhost:5432/inventorydb
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
Run the application:

Using IntelliJ: Right-click on InventoryApplication.java → Run

Or use: ./mvnw spring-boot:run
