# BrainStation Capstone Project - BuddyMD - Medication Adherence Tracker (Backend)

This project is the **backend service** for the **Medication Adherence Tracker**, developed as part of a **Capstone Project for BrainStation**. It provides the core API functionality, authentication, database management, and messaging services needed to support the frontend.

## 📌 Motivation

Medication non-adherence costs the healthcare system between **$100 to $290 billion annually**. More than **40% of the U.S. population** and **over 45% of Canadians** suffer from chronic diseases lasting at least six months or more.

This backend enables **secure data storage, authentication, and communication** features to support the medication tracking system.

---

## 🚀 Tech Stack

### **Core Framework**
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)

### **Database & Query Builder**
- [MySQL2](https://www.npmjs.com/package/mysql2)
- [Knex.js](https://knexjs.org/)

### **Authentication & APIs**
- [Firebase](https://firebase.google.com/)
- [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup)

### **Messaging & Communication**
- [Twilio](https://www.twilio.com/)

### **Utilities & Security**
- [CORS](https://www.npmjs.com/package/cors)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [UUID](https://www.npmjs.com/package/uuid)

---

## ⚙️ Setup Instructions

### **1. Clone the Repository**
```bash
git clone https://github.com/FarinazCodes/buddymd-backend.git
cd buddymd-backend
```

### **2. Install Dependencies**
```bash
npm install
```

### **3. Configure Environment Variables**
Create a `.env` file in the root directory and add:
```plaintext
DB_HOST=your-database-host
DB_PORT=your-database-port
DB_USER=your-database-user
DB_PASSWORD=your-database-password
DB_NAME=your-database-name

FIREBASE_SERVICE_ACCOUNT='{
  "type": "",
  "project_id": "",
  "private_key_id": "",
  "private_key": "",
  "client_email": "",
  "client_id": "",
  "auth_uri": "",
  "token_uri": "",
  "auth_provider_x509_cert_url": "",
  "client_x509_cert_url": "",
  "universe_domain": ""
}'

TWILIO_ACCOUNT_SID=twilio_account_sid
TWILIO_AUTH_TOKEN=twilio_auth_token
TWILIO_PHONE_NUMBER=twilio_phone_number

CORS_ORIGIN=your-allowed-origin
```

### **4. Run Database Migrations**
```bash
npx knex migrate:latest
```

### **5. Start the Server**
```bash
npm start
```

### **6. Run in Development Mode**
```bash
npm run dev
```

---

## 🔗 Related Repositories
- **Frontend Repository:** [BuddyMD (Frontend)](https://github.com/FarinazCodes/buddymd-frontend)

---


## 👨‍💻 Author
- **Farinaz** - [GitHub Profile](https://github.com/FarinazCodes)

This project was developed as part of the **Capstone Project for BrainStation**. Feel free to report issues, or suggest improvements!
