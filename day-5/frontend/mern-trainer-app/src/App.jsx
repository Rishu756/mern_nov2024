import React from 'react';
import {Routes, Route} from 'react-router-dom';
import ListRestaurant from './restaurant_pages/ListRestaurant';
import AddRestaurant from './restaurant_pages/AddRestaurant';
import EditRestaurant from './restaurant_pages/EditRestaurant';

function App() {
  return (
    <div className="container">
      <h1 className="my-4 text-center">Restaurant Management</h1>
      <Routes>
        <Route path="/" element={<ListRestaurant />} />
        <Route path="/add" element={<AddRestaurant />} />
        <Route path="/edit/:id" element={<EditRestaurant />} />
      </Routes>
    </div>
  );
}

export default App;
