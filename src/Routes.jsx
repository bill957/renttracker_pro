import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import PropertyDetails from './pages/property-details';
import RentCollection from './pages/rent-collection';
import FinancialReports from './pages/financial-reports';
import PropertyDashboard from './pages/property-dashboard';
import TenantManagement from './pages/tenant-management';
import ExpenseTracking from './pages/expense-tracking';
import MaintenanceRequests from './pages/maintenance-requests';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<PropertyDashboard />} />
        <Route path="/property-details" element={<PropertyDetails />} />
        <Route path="/rent-collection" element={<RentCollection />} />
        <Route path="/financial-reports" element={<FinancialReports />} />
        <Route path="/property-dashboard" element={<PropertyDashboard />} />
        <Route path="/tenant-management" element={<TenantManagement />} />
        <Route path="/expense-tracking" element={<ExpenseTracking />} />
        <Route path="/maintenance-requests" element={<MaintenanceRequests />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
