# 🏨 Hotel Booking Management System

A full-stack Hotel Booking Management System developed using **React + Vite** for the frontend and **Spring Boot + PostgreSQL** for the backend.

This project allows users to browse hotels, make bookings, manage reservations, and handle hotel-related operations through a modern web interface.

---

# 🚀 Features

## 👤 User Features

* View available hotels
* Book hotel rooms
* Check booking details
* Manage reservations
* Responsive user interface
---

# 🔄 Project Flow

```text
User Registration/Login
          ↓
Browse Hotels
          ↓
Select Hotel & Room
          ↓
Book Hotel
          ↓
Booking Stored in Database
          ↓
User Views Booking Status
```

---

## 📌 Detailed Workflow

### 👤 User Side

1. User opens the application.
2. User browses available hotels.
3. User selects hotel details and booking dates.
4. Booking request is sent to the backend.
5. Spring Boot APIs process and store booking details in PostgreSQL.
6. User can view booking confirmation status.
---

# 🚀 Features

## 👤 User Features

* View available hotels
* Book hotel rooms
* Check booking details
* Manage reservations
* Responsive user interface
  
# 🧑‍💻 Tech Stack

## Frontend

* React.js
* Vite
* Axios
* React Router DOM
* CSS

## Backend

* Spring Boot
* Spring MVC
* Spring Security
* Spring Data JPA
* PostgreSQL

---

# 📂 Project Structure

```bash
Hackathon/
│
├── src/                  # React frontend source code
├── public/               # Public assets
├── pom.xml               # Maven configuration
├── package.json          # Frontend dependencies
├── vite.config.js        # Vite configuration
└── README.md
```

---

# ⚙️ Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone https://github.com/sindhujangala04/Hackathon.git
cd Hackathon
```

---

# ▶️ Frontend Setup

## Install Dependencies

```bash
npm install
```

## Run Frontend

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# ▶️ Backend Setup

## Configure PostgreSQL

Create a PostgreSQL database.

Example:

```sql
CREATE DATABASE hotel_booking;
```

---

## Update application.properties

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/hotel_booking
spring.datasource.username=your_username
spring.datasource.password=your_password

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

---

## Run Spring Boot Application

Using Maven:

```bash
mvn spring-boot:run
```

OR

```bash
./mvnw spring-boot:run
```

Backend runs on:

```bash
http://localhost:8080
```

---

# 🔗 API Integration

Frontend communicates with backend APIs using Axios.

Example:

```javascript
axios.get("http://localhost:8080/api/hotels")
```

---

# 📦 Dependencies

## Frontend Dependencies

```json
react
react-dom
react-router-dom
axios
vite
```

## Backend Dependencies

* Spring Boot Starter Web MVC
* Spring Boot Starter Data JPA
* Spring Boot Starter Security
* PostgreSQL Driver

---

# 🧪 Run Build

## Frontend Build

```bash
npm run build
```

---

# 🌟 Future Enhancements

* Payment Gateway Integration
* JWT Authentication
* Email Notifications
* Review & Rating System

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to your branch
5. Open a Pull Request

---


