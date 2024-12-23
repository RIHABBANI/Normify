// src/Routes.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Dashboard from './components/Common/Dashboard';
import {NormTable} from './components/Norms/norm-table';
import {NormsChaptersTable} from './components/NormsChapters/chapters-table';
import {NormsSubChaptersTable} from './components/NormsSubChapters/sub-chapters-table';
import {ExigenciesTable} from './components/Exigencies/exigencies-table';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index element={<Dashboard />} /> {/* Default route */}
        <Route path="norms" element={<NormTable />} />
        <Route path="norms-chapters" element={<NormsChaptersTable />} />
        <Route path="norms-sub-chapters" element={<NormsSubChaptersTable />} />
        <Route path="norms-exigencies" element={<ExigenciesTable />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
