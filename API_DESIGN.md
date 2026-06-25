# DS Properties API Design

## Base URL

/api

---

# Authentication

## Login

POST /auth/login

Request:

{
"email": "[dapkeshrikant@gmail.com](mailto:dapkeshrikant@gmail.com)",
"password": "Shrikant@2006"
}

Response:

{
"token": "jwt_token",
"user": {
"id": 1,
"name": "Admin"
}
}

---

# Customers

## Get All Customers

GET /customers

Response:

[
{
"id": 1,
"name": "Rahul Patil",
"phone": "9876543210",
"plot_number": "A-12"
}
]

---

## Add Customer

POST /customers

Request:

{
"name": "Rahul Patil",
"phone": "9876543210",
"plot_number": "A-12",
"address": "Pune"
}

Response:

{
"message": "Customer created successfully"
}

---

# Transactions

## Get All Transactions

GET /transactions

Optional Filters:

?type=INCOME
?type=EXPENSE

Response:

[
{
"id": 1,
"type": "INCOME",
"amount": 50000
}
]

---

## Create Income Transaction

POST /transactions

Request:

{
"type": "INCOME",
"customer_id": 1,
"amount": 50000,
"payment_method": "UPI",
"description": "Plot advance"
}

Response:

{
"message": "Transaction added"
}

---

## Create Expense Transaction

POST /transactions

Request:

{
"type": "EXPENSE",
"category_id": 1,
"amount": 10000,
"payment_method": "Cash",
"description": "Road work"
}

Response:

{
"message": "Transaction added"
}

---

# Dashboard

## Get Dashboard Data

GET /dashboard

Response:

{
"current_balance": 250000,
"total_income": 500000,
"total_expense": 250000,
"total_customers": 12
}

---

# Reports

## Customer Report

GET /reports/customers

Response:

[
{
"customer_name": "Rahul Patil",
"total_paid": 150000
}
]

---

## Expense Report

GET /reports/expenses

Response:

[
{
"category": "Road Construction",
"total_expense": 120000
}
]
}
