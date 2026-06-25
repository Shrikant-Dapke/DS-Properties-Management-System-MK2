# DS Properties Database Design

## Table 1: Users

Purpose:
Store login credentials.

Fields:

* id
* name
* email
* password_hash
* created_at
* updated_at

---

## Table 2: Customers

Purpose:
Store customer information.

Fields:

* id
* name
* phone
* plot_number
* address
* notes
* created_at
* updated_at

Example:

Name: Rahul Patil
Phone: 9876543210
Plot: A-12

---

## Table 3: Categories

Purpose:
Store expense categories.

Fields:

* id
* name
* created_at

Default Categories:

* Road Construction
* Gutter Work
* Electricity
* Water
* Labor
* Legal
* Other

---

## Table 4: Transactions

Purpose:
Store both income and expense records.

Fields:

* id

* type
  Values:

  * INCOME
  * EXPENSE

* customer_id
  Nullable
  Used only for income transactions

* category_id
  Nullable
  Used only for expense transactions

* amount

* transaction_date

* payment_method

  Examples:

  * Cash
  * UPI
  * Bank Transfer
  * Cheque

* description

* created_at

* updated_at

---

# Relationships

Customer

1 Customer
↓
Many Transactions

customers.id
→
transactions.customer_id

---

Category

1 Category
↓
Many Transactions

categories.id
→
transactions.category_id

---

# Important Rules

Income Transaction:

* type = INCOME
* customer_id required
* category_id NULL

Expense Transaction:

* type = EXPENSE
* category_id required
* customer_id NULL

---

# Dashboard Calculations

Total Income

SUM(
transactions.amount
WHERE type = 'INCOME'
)

---

Total Expense

SUM(
transactions.amount
WHERE type = 'EXPENSE'
)

---

Current Balance

Total Income - Total Expense

---

Total Customers

COUNT(customers)

---

# Customer Report

For each customer:

SUM(
transactions.amount
WHERE customer_id = customer.id
)

---

# Expense Report

For each category:

SUM(
transactions.amount
WHERE category_id = category.id
)
