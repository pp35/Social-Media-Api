import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import FriendsPage from './components/pages/FriendsPage';
import PrivateRoute from './components/Shared/PrivateRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/friends" element={<PrivateRoute component={FriendsPage} />} />
      </Routes>
    </Router>
  );
};

export default App;
