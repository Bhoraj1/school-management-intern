import { useState } from "react";

const App = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev, //spread operator
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      alert(`${data.message}`);
    } catch (error) {
      alert("Something wrong");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="flex flex-col items-center bg-white p-10 rounded-xl shadow-md w-96">
        {/* Login Heading */}
        <h1 className="text-3xl font-bold mb-6">LOGIN</h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col w-full gap-5">
          <label className="flex flex-col text-left">
            Email:
            <input
              type="text"
              placeholder="Enter the email"
              id="email"
              className="border-2 border-gray-400 rounded-lg p-2"
              value={formData.email}
              onChange={handleChange}
            />
          </label>

          <label className="flex flex-col text-left">
            Password:
            <input
              type="password"
              placeholder="Enter the password"
              id="password"
              className="border-2 border-gray-400 rounded-lg p-2"
              value={formData.password}
              onChange={handleChange}
            />
          </label>

          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded-lg mt-3"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
