# DS Properties MVP

## Project Overview

DS Properties is a plotting and land development business.

The company receives money from customers who purchase plots and spends money on development activities such as road construction, gutter work, electricity, water infrastructure, legal work, and labor.

The purpose of this system is to provide a simple and reliable way to track money coming in, money going out, customer payments, and overall project finances.

The system should automatically calculate balances and provide basic reports without requiring manual calculations.

---

# Users

## Admin

The primary user of the system.

Responsibilities:

* Manage customers
* Record customer payments
* Record expenses
* View financial reports
* Monitor overall balance

---

# Daily Workflow

A typical working day consists of:

1. Login to the system
2. Add new customers if required
3. Record payments received from customers
4. Record expenses made for development work
5. Review current balance
6. View reports and summaries

---

# Data To Be Stored

## Customers

Each customer should contain:

* Full Name
* Phone Number
* Plot Number
* Address (Optional)
* Notes (Optional)

---

## Income Transactions

Each income transaction should contain:

* Customer
* Amount
* Payment Date
* Payment Method
* Notes

Examples:

* Plot Booking Amount
* Advance Payment
* Installment Payment
* Full Payment

---

## Expense Transactions

Each expense transaction should contain:

* Expense Category
* Amount
* Expense Date
* Description

Examples:

* Road Construction
* Gutter Work
* Electricity
* Water
* Labor
* Legal Expenses
* Other

---

# System Calculations

The system should automatically calculate:

## Current Balance

Current Balance =
Total Income - Total Expenses

---

## Customer Total Payments

For each customer:

Customer Total Paid =
Sum of all payments received from that customer

---

## Category Expense Totals

For each category:

Category Total Expense =
Sum of all expenses recorded under that category

---

# Screens Required

## 1. Login Page

Features:

* Email
* Password
* Login Button

---

## 2. Dashboard

Display:

* Current Balance
* Total Income
* Total Expenses
* Total Customers

Recent Transactions List

---

## 3. Customers Page

Features:

* Add Customer
* Edit Customer
* View Customer Details
* Search Customers

---

## 4. Transactions Page

Features:

* Add Income
* Add Expense
* View Transaction History
* Filter Transactions

---

## 5. Reports Page

Display:

### Customer Payment Summary

Customer Name
Total Amount Paid

### Expense Summary

Category
Total Expense

### Monthly Summary

Total Income
Total Expense
Current Balance

---

# MVP Goals

The MVP is successful if DS Properties can:

* Add customers
* Record money received
* Record money spent
* View customer payment history
* View expense history
* View current balance
* Generate basic financial summaries

The MVP does not require advanced analytics, audit logs, multi-user support, PDF exports, Excel exports, notifications, or complex permissions.

The focus is simplicity, reliability, and daily usability.
