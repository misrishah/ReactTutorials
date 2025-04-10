import React, { useState } from "react";
import { useFormik } from "formik";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [showErrors, setShowErrors] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); // For image view

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      gender: "",
      address: "",
      country: "",
      image: null,
    },
    validate: (values) => {
      const errors = {};
      if (!values.name) errors.name = "Name is required";
      if (!values.email) errors.email = "Email is required";
      if (!values.phone) errors.phone = "Phone number is required";
      if (!values.password) errors.password = "Password is required";
      if (!values.gender) errors.gender = "Gender is required";
      if (!values.address) errors.address = "Address is required";
      if (!values.country) errors.country = "Country is required";
      return errors;
    },
    onSubmit: (values) => {
      setShowErrors(false);
      if (editIndex !== null) {
        const updatedUsers = [...users];
        updatedUsers[editIndex] = values;
        setUsers(updatedUsers);
        setEditIndex(null);
      } else {
        setUsers([...users, values]);
      }
      formik.resetForm();
    },
  });

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("File size should be less than 2MB");
        return;
      }
      const imageUrl = URL.createObjectURL(file);
      formik.setFieldValue("image", imageUrl);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowErrors(true);
    formik.handleSubmit();
  };

  const handleEdit = (index) => {
    formik.setValues(users[index]);
    setEditIndex(index);
    setShowErrors(false);
  };

  const handleDelete = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
  };

  return (
    <div className="App">
      <h1>User Registration</h1>
      <div className="user-container">
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" value={formik.values.name} onChange={formik.handleChange} placeholder="Enter Name" />
          {showErrors && formik.errors.name && <div className="error-message">{formik.errors.name}</div>}

          <input type="email" name="email" value={formik.values.email} onChange={formik.handleChange} placeholder="Enter Email" />
          {showErrors && formik.errors.email && <div className="error-message">{formik.errors.email}</div>}

          <input type="password" name="password" value={formik.values.password} onChange={formik.handleChange} placeholder="Enter Password" />
          {showErrors && formik.errors.password && <div className="error-message">{formik.errors.password}</div>}

          <input type="tel" name="phone" value={formik.values.phone} onChange={formik.handleChange} placeholder="Enter Phone Number" />
          {showErrors && formik.errors.phone && <div className="error-message">{formik.errors.phone}</div>}

          <div className="radio-container">
    <label>Gender:</label>
    <input
        type="radio"
        name="gender"
        value="M"
        checked={formik.values.gender === "M"}
        onChange={formik.handleChange}
    /> M
    <input
        type="radio"
        name="gender"
        value="F"
        checked={formik.values.gender === "F"}
        onChange={formik.handleChange}
    /> F
</div>

          {showErrors && formik.errors.gender && <div className="error-message">{formik.errors.gender}</div>}

          <textarea name="address" value={formik.values.address} onChange={formik.handleChange} placeholder="Enter Address"></textarea>
          {showErrors && formik.errors.address && <div className="error-message">{formik.errors.address}</div>}

          <select name="country" value={formik.values.country} onChange={formik.handleChange}>
            <option value="">Select Country</option>
            <option value="India">India</option>
            <option value="USA">USA</option>
            <option value="Canada">Canada</option>
            <option value="Russia">Russia</option>
            <option value="Japan">Japan</option>
          </select>
          {showErrors && formik.errors.country && <div className="error-message">{formik.errors.country}</div>}

          <input type="file" accept="image/*" onChange={handleImageUpload} />

          <button type="submit">{editIndex !== null ? "Update User" : "Add User"}</button>
        </form>
      </div>

      {users.length > 0 && (
        <div className="user-list">
          <table className="user-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Phone</th>
                <th>Gender</th>
                <th>Address</th>
                <th>Country</th>
                <th>Profile</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                  <td>{user.phone}</td>
                  <td>{user.gender}</td>
                  <td>{user.address}</td>
                  <td>{user.country}</td>
                  <td>
                    {user.image && (
                      <button className="view-btn" onClick={() => setSelectedImage(user.image)}>View</button>
                    )}
                  </td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEdit(index)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(index)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Image Preview Modal */}
      {selectedImage && (
        <div className="image-modal" onClick={() => setSelectedImage(null)}>
          <img src={selectedImage} alt="User Upload" className="modal-image" />
        </div>
      )}
    </div>
  );
}

export default App;
