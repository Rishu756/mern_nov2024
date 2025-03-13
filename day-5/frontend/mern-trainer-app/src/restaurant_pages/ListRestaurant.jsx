import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function RestaurantList() {
  const [restaurants, setrestaurants] = useState([]);
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [selectedRestaurantId, setSelectedTrainerId] = useState(null); // Selected restaurant ID for deletion

  useEffect(() => {
    axios.get('http://localhost:8080/restaurants')
      .then(response => setrestaurants(response.data.data))
      .catch(error => console.log(error));
  }, []);

  const handleDelete = (id) => {
    setSelectedTrainerId(id);
    setShowModal(true); // Show the modal for confirmation
  };

  const confirmDelete = () => {
    axios.delete(`http://localhost:8080/restaurants/${selectedRestaurantId}`)
      .then(() => {
        setrestaurants(restaurants.filter(restaurant => restaurant._id !== selectedRestaurantId));
        setShowModal(false); // Hide the modal after deleting
        setSelectedTrainerId(null); // Reset selected ID
      })
      .catch(error => console.log(error));
  };

  return (
    <div>
      <div className="d-flex justify-content-end mb-4">
        <Link to="/add" className="btn btn-outline-primary">Add Restaurant</Link>
      </div>
      <table className="table text-center">
        <thead>
          <tr>
            <th>restaurant_name</th>
            <th>restaurant_type</th>
            <th>location</th>
            <th>food</th>
            <th>rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {restaurants.map(restaurant => (
            <tr key={restaurant._id}>
              <td>{restaurant.restaurant_name}</td>
              <td>{restaurant.restaurant_type}</td>
              <td>{restaurant.location}</td>
              <td>{restaurant.food}</td>
              <td>{restaurant.rating}</td>
              <td>
                <Link to={`/edit/${restaurant._id}`} className="btn btn-warning btn-sm">Edit</Link>
                <button onClick={() => handleDelete(restaurant._id)} className="btn btn-danger btn-sm ms-2">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for confirmation */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this restaurant?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="button" className="btn btn-danger" onClick={confirmDelete}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RestaurantList;