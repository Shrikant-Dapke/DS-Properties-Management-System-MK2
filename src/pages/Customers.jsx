import { useEffect, useState } from "react";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    plot_number: "",
    address: "",
    notes: "",
  });

  useEffect(() => {
    fetch("http://localhost:5000/customers")
      .then((res) => res.json())
      .then((data) => setCustomers(data))
      .catch(console.error);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;
      let customerData;

      if (editingCustomer) {
        response = await fetch(
          `http://localhost:5000/customers/${editingCustomer.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          },
        );

        customerData = await response.json();

        setCustomers(
          customers.map((customer) =>
            customer.id === customerData.id ? customerData : customer,
          ),
        );
      } else {
        response = await fetch("http://localhost:5000/customers", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        customerData = await response.json();

        setCustomers([...customers, customerData]);
      }

      setFormData({
        name: "",
        phone: "",
        plot_number: "",
        address: "",
        notes: "",
      });

      setEditingCustomer(null);
      setShowModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete this customer?");

    if (!confirmed) return;

    try {
      await fetch(`http://localhost:5000/customers/${id}`, {
        method: "DELETE",
      });

      setCustomers(customers.filter((customer) => customer.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Customers</h1>

        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 px-4 py-2 rounded-lg"
        >
          + Add Customer
        </button>
      </div>

      <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400">
              <th className="text-left py-3">Name</th>
              <th className="text-left py-3">Plot</th>
              <th className="text-left py-3">Phone</th>
              <th className="text-left py-3">Address</th>
              <th className="text-left py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id} className="border-b border-slate-800">
                <td className="py-4">{customer.name}</td>
                <td className="py-4">{customer.plot_number}</td>
                <td className="py-4">{customer.phone}</td>
                <td className="py-4">{customer.address}</td>

                <td className="py-4">
                  <button
                    onClick={() => {
                      setEditingCustomer(customer);

                      setFormData({
                        name: customer.name,
                        phone: customer.phone,
                        plot_number: customer.plot_number,
                        address: customer.address,
                        notes: customer.notes || "",
                      });

                      setShowModal(true);
                    }}
                    className="bg-yellow-600 px-3 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(customer.id)}
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
          <div className="bg-slate-900 p-6 rounded-xl w-[500px]">
            <h2 className="text-2xl font-bold mb-6">
              {editingCustomer ? "Edit Customer" : "Add Customer"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Customer Name"
                className="w-full p-3 rounded bg-slate-800"
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
              />

              <input
                type="text"
                placeholder="Phone"
                className="w-full p-3 rounded bg-slate-800"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    phone: e.target.value,
                  })
                }
              />

              <input
                type="text"
                placeholder="Plot Number"
                className="w-full p-3 rounded bg-slate-800"
                value={formData.plot_number}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    plot_number: e.target.value,
                  })
                }
              />

              <input
                type="text"
                placeholder="Address"
                className="w-full p-3 rounded bg-slate-800"
                value={formData.address}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    address: e.target.value,
                  })
                }
              />

              <textarea
                placeholder="Notes"
                className="w-full p-3 rounded bg-slate-800"
                value={formData.notes}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    notes: e.target.value,
                  })
                }
              />

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-slate-700 px-4 py-2 rounded"
                >
                  Cancel
                </button>

                <button type="submit" className="bg-blue-600 px-4 py-2 rounded">
                  {editingCustomer ? "Update Customer" : "Save Customer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Customers;
