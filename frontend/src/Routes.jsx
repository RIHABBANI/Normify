import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Dashboard from './components/Common/Dashboard';

import { RamesTable } from './components/Rames/rames-table';
import RameDetails from './components/Rames/rame-details';
import { RaksTable } from './components/Raks/raks-tables';
import { RaksByRame } from './components/Raks/RaksByRame';
import { CartesTable } from './components/Cartes/cartes-table';
import CartesByRak from './components/Cartes/CartesByRak';
import CarteDetails from './components/Cartes/carte-details';
import { InterventionsTable } from './components/Interventions/interventions-table';
import InterventionDetails from './components/Interventions/intervention-details';
import MaintenanceTable from './components/Maintenance/maintenance-table';

import { Login } from './components/Users/Login';
import UsersTable from './components/Users/users-table';

// ProtectedRoute Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
};

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      >        
        <Route index path="/" element={<Dashboard />} /> {/* Default route */}
        <Route path="rames" element={<RamesTable />} /> 
        <Route path="rames/:rameId" element={<RameDetails />} />
        <Route path="racks" element={<RaksTable />} /> 
        <Route path="raks/:rameId" element={<RaksByRame />} />        <Route path="cartes" element={<CartesTable />} /> 
        <Route path="cartes/rak/:rakId" element={<CartesByRak />} />
        <Route path="cartes/:carteId" element={<CarteDetails />} />
        <Route path="interventions" element={<InterventionsTable />} />
        <Route path="interventions/:id" element={<InterventionDetails />} />
        <Route path="maintenances" element={<MaintenanceTable />} />
        <Route path="users" element={<UsersTable />} />
        
        <Route path="*" element={<h1>Not Found</h1>} />
      </Route>

      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default AppRoutes;
