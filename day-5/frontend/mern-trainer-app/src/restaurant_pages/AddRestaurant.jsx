import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddRestaurant() {
  const [formData, setFormData] = useState({
    restaurant_name: '', 
    restaurant_type: '',
    location: '',
    food: '',
    rating: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/restaurants', formData)
      .then(() => navigate('/'))
      .catch(error => console.log(error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Restaurant</h2>
      <div className="mb-3">
        <label>restaurant_name</label>
        <input type="text" name="restaurant_name" className="form-control" onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label>restaurant_type</label>
        <input type="text" name="restaurant_type" className="form-control" onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label>location</label>
        <input type="text" name="location" className="form-control" onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label>food</label>
        <input type="text" name="food" className="form-control" onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label>rating</label>
        <input type="text" name="rating" className="form-control" onChange={handleChange} />
      </div>
      <button type="submit" className="btn btn-primary">Add Restaurant</button>
    </form>
  );
}

export default AddRestaurant;