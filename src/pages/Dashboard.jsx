import { useEffect, useState } from "react";
import StatCard from "../components/dashboard/StatCard";

import {
  FaUsers,
  FaMoneyBillWave,
  FaArrowTrendDown,
  FaWallet,
} from "react-icons/fa6";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/dashboard")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch(console.error);

    fetch("http://localhost:5000/transactions")
      .then((res) => res.json())
      .then((data) => setTransactions(data))
      .catch(console.error);
  }, []);

  if (!stats) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-950 text-white text-2xl">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <>
      {/* Main */}

      <div className="flex justify-between items-center mb-8">
        <h2 className="text-5xl font-bold">Dashboard</h2>

        <div className="text-slate-400">DS Properties Management System</div>
      </div>

      {/* Stats Cards */}
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatCard
          title="Total Customers"
          value={stats.totalCustomers}
          icon={<FaUsers />}
          color="text-blue-400"
        />

        <StatCard
          title="Total Income"
          value={`₹${stats.totalIncome}`}
          icon={<FaMoneyBillWave />}
          color="text-green-400"
        />

        <StatCard
          title="Total Expense"
          value={`₹${stats.totalExpense}`}
          icon={<FaArrowTrendDown />}
          color="text-red-400"
        />

        <StatCard
          title="Current Balance"
          value={`₹${stats.currentBalance}`}
          icon={<FaWallet />}
          color={stats.currentBalance >= 0 ? "text-cyan-400" : "text-red-400"}
        />
      </div>

      {/* Transactions Table */}
      <div className="mt-10 bg-slate-900 rounded-xl border border-slate-800 p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold">Recent Transactions</h3>

          <span className="text-slate-400">{transactions.length} Records</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="text-left py-3">Type</th>
                <th className="text-left py-3">Amount</th>
                <th className="text-left py-3">Payment Method</th>
                <th className="text-left py-3">Description</th>
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

                  <td className="py-4 font-semibold">₹{transaction.amount}</td>

                  <td className="py-4">{transaction.payment_method}</td>

                  <td className="py-4">{transaction.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
