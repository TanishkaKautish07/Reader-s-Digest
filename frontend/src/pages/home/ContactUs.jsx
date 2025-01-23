import React, { useState } from "react";
import Swal from "sweetalert2";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form data submitted:", formData);
    const response = await fetch("http://localhost:5000/api/books/contact-us", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      const res = await response.json();

      Swal.fire({
        title: res.message,
        text: "Mail is sent successfully",
        icon: "success",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, It's Okay!",
      });
      setFormData({ name: "", email: "", message: "" });
    } else {
      const res = await response.json();
      Swal.fire({
        title: res.data.message,
        text: "some error occured",
        icon: "error",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, It's Okay!",
      });
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none"
            rows="4"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactUs;
