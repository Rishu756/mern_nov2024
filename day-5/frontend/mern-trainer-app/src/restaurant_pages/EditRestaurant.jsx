import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditTrainer() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    restaurant_name: '', 
    restaurant_type: '',
    location: '',
    food: '',
    rating: 0
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8080/restaurants/${id}`)
      .then(response => setFormData(response.data.data))
      .catch(error => console.log(error));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8080/restaurants/${id}`, formData)
      .then(() => navigate('/'))
      .catch(error => console.log(error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Restaurant</h2>
      <div className="mb-3">
        <label>restaurant_name</label>
        <input type="text" name="restaurant_name" className="form-control" value={formData.restaurant_name} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label>restaurant_type</label>
        <input type="text" name="restaurant_type" className="form-control" value={formData.restaurant_type} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label>location</label>
        <input type="text" name="location" className="form-control" value={formData.location} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label>food</label>
        <input type="text" name="food" className="form-control" value={formData.food} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label>rating</label>
        <input type="number" max={5} min={0} name="rating" className="form-control" value={formData.rating} onChange={handleChange} />
      </div>
      <button type="submit" className="btn btn-primary">Save Changes</button>
    </form>
  );
}

export default EditTrainer;