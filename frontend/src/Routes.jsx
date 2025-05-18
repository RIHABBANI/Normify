import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Dashboard from './components/Common/Dashboard';

import { RamesTable } from './components/Rames/rames-table';
import { RaksTable } from './components/Raks/raks-tables';
import { CartesTable } from './components/Cartes/cartes-table';


import { NormTable } from './components/Norms/norm-table';
import { NormsChaptersTable } from './components/NormsChapters/chapters-table';
import { NormsSubChaptersTable } from './components/NormsSubChapters/sub-chapters-table';
import { ExigenciesTable } from './components/Exigencies/exigencies-table';
import { DiagnosticsTable } from './components/Diagnostics/diagnostic-table';
import { ActionsTable } from './components/Actions/actions-table';

import { Login } from './components/Users/Login';
import UsersTable from './components/Users/users-table';

// ProtectedRoute Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
};

const AppRoutes = () => {
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
        <Route index path="dashboard" element={<Dashboard />} /> {/* Default route */}
        <Route path="rames" element={<RamesTable />} /> 
        <Route path="raks" element={<RaksTable />} /> 
        <Route path="cartes" element={<CartesTable />} /> 
        <Route path="users" element={<UsersTable />} />
        <Route path="norms" element={<NormTable />} />
        <Route path="norms-chapters" element={<NormsChaptersTable />} />
        <Route path="norms-sub-chapters" element={<NormsSubChaptersTable />} />
        <Route path="norms-exigencies" element={<ExigenciesTable />} />
        <Route path="diagnostics" element={<DiagnosticsTable />} />
        <Route path="actions" element={<ActionsTable />} />
        
        <Route path="*" element={<h1>Not Found</h1>} />
      </Route>

      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default AppRoutes;
