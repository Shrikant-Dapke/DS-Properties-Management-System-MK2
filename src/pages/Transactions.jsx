import { useEffect, useState } from "react";

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [categories, setCategories] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const [formData, setFormData] = useState({
    type: "EXPENSE",
    customer_id: "",
    category_id: "",
    amount: "",
    payment_method: "",
    description: "",
  });

  useEffect(() => {
    fetch("http://localhost:5000/transactions")
      .then((res) => res.json())
      .then((data) => setTransactions(data))
      .catch(console.error);

    fetch("http://localhost:5000/customers")
      .then((res) => res.json())
      .then((data) => setCustomers(data))
      .catch(console.error);

    fetch("http://localhost:5000/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch(console.error);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;
      let transactionData;

      if (editingTransaction) {
        response = await fetch(
          `http://localhost:5000/transactions/${editingTransaction.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          },
        );

        transactionData = await response.json();

        const refreshed = await fetch("http://localhost:5000/transactions");

        const updatedTransactions = await refreshed.json();

        setTransactions(updatedTransactions);
      } else {
        response = await fetch("http://localhost:5000/transactions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        transactionData = await response.json();

        setTransactions([transactionData, ...transactions]);
      }

      setFormData({
        type: "EXPENSE",
        customer_id: "",
        category_id: "",
        amount: "",
        payment_method: "",
        description: "",
      });

      setEditingTransaction(null);
      setShowModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete transaction?");

    if (!confirmed) return;

    await fetch(`http://localhost:5000/transactions/${id}`, {
      method: "DELETE",
    });

    setTransactions(
      transactions.filter((transaction) => transaction.id !== id),
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Transactions</h1>

        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + Add Transaction
        </button>
      </div>

      <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400">
              <th className="text-left py-3">Type</th>
              <th className="text-left py-3">Related To</th>
              <th className="text-left py-3">Amount</th>
              <th className="text-left py-3">Method</th>
              <th className="text-left py-3">Description</th>
              <th className="text-left py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="border-b border-slate-800">
                <td className="py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      transaction.type === "INCOME"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {transaction.type}
                  </span>
                </td>

                <td className="py-4">
                  {transaction.customer_name ||
                    transaction.category_name ||
                    "-"}
                </td>

                <td className="py-4">₹{transaction.amount}</td>

                <td className="py-4">{transaction.payment_method}</td>

                <td className="py-4">{transaction.description}</td>

                <td className="py-4">
                  <button
                    onClick={() => {
                      setEditingTransaction(transaction);

                      setFormData({
                        type: transaction.type,
                        customer_id: transaction.customer_id || "",
                        category_id: transaction.category_id || "",
                        amount: transaction.amount,
                        payment_method: transaction.payment_method,
                        description: transaction.description,
                      });

                      setShowModal(true);
                    }}
                    className="bg-yellow-600 px-3 py-1 rounded mr-2"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(transaction.id)}
                    className="bg-red-600 px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="bg-slate-900 p-6 rounded-xl w-[500px] border border-slate-700">
            <h2 className="text-2xl font-bold mb-6">
              {editingTransaction ? "Edit Transaction" : "Add Transaction"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Type */}
              <select
                className="w-full p-3 rounded bg-slate-800"
                value={formData.type}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    type: e.target.value,
                    customer_id: "",
                    category_id: "",
                  })
                }
              >
                <option value="EXPENSE">Expense</option>
                <option value="INCOME">Income</option>
              </select>

              {/* Dynamic Dropdown */}
              {formData.type === "EXPENSE" ? (
                <select
                  className="w-full p-3 rounded bg-slate-800"
                  value={formData.category_id}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      category_id: e.target.value,
                    })
                  }
                >
                  <option value="">Select Category</option>

                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              ) : (
                <select
                  className="w-full p-3 rounded bg-slate-800"
                  value={formData.customer_id}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      customer_id: e.target.value,
                    })
                  }
                >
                  <option value="">Select Customer</option>

                  {customers.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                      {customer.name}
                    </option>
                  ))}
                </select>
              )}

              <input
                type="number"
                placeholder="Amount"
                className="w-full p-3 rounded bg-slate-800"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    amount: e.target.value,
                  })
                }
                required
              />

              <input
                type="text"
                placeholder="Payment Method"
                className="w-full p-3 rounded bg-slate-800"
                value={formData.payment_method}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    payment_method: e.target.value,
                  })
                }
                required
              />

              <textarea
                placeholder="Description"
                className="w-full p-3 rounded bg-slate-800"
                value={formData.description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: e.target.value,
                  })
                }
              />

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingTransaction(null);
                  }}
                  className="bg-slate-700 px-4 py-2 rounded"
                >
                  Cancel
                </button>

                <button type="submit" className="bg-blue-600 px-4 py-2 rounded">
                  {editingTransaction
                    ? "Update Transaction"
                    : "Save Transaction"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Transactions;
