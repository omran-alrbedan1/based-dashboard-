import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import MainLayout from "./components/layout/MainLayout"
import Dashboard from "./features/dashboard/pages/Dashboard"
import Login from "./features/auth/pages/Login"
import ProductsList from "./features/products/ProductsList"
import ProductReview from "./features/products/ProductReview"
import ProductApprovalPage from "./features/productApproval/pages/ProductApprovalPage"
import ProductApprovalDetailsPage from "./features/productApproval/pages/ProductApprovalDetailsPage"
import DriversList from "./features/drivers/pages/DriversList"
import DriverDetails from "./features/drivers/pages/DriverDetails"
import Articles from "./features/content/pages/Articles"
import Videos from "./features/content/pages/Videos"
import Guides from "./features/content/pages/Guides"
import Posts from "./features/community/pages/Posts"
import CommunityReports from "./features/community/pages/Reports"
import SalesReports from "./features/reports/pages/SalesReports"
import VendorReports from "./features/reports/pages/VendorReports"
import DeliveryReports from "./features/reports/pages/DeliveryReports"
import UserReports from "./features/reports/pages/UserReports"
import PaymentsMonitoringPage from "./features/payments/pages/PaymentsMonitoringPage"
import PaymentDetailsPage from "./features/payments/pages/PaymentDetailsPage"
import UsersList from "./features/users/pages/UsersList"
import VendorsList from "./features/vendors/pages/VendorsList"
import VendorDetails from "./features/vendors/pages/VendorDetails"
import OrdersListPage from "./features/orders/pages/OrdersListPage"
import UserDetails from "./features/users/pages/UserDetails"
import OrderDetailsPage from "./features/orders/pages/OrderDetailsPage"

interface PrivateRouteProps {
  children: React.ReactNode
}

function PrivateRoute({ children }: PrivateRouteProps) {
  return children
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes with Layout */}
        <Route path="/" element={<PrivateRoute><MainLayout /></PrivateRoute>}>
          <Route index element={<Dashboard />} />

          {/* User Management */}
          <Route path="users" element={<UsersList />} />
          <Route path="users/:id" element={<UserDetails />} />

          {/* Vendor Management */}
          <Route path="vendors" element={<VendorsList />} />
          <Route path="vendors/:id" element={<VendorDetails />} />

          {/* Product Management */}
          <Route path="products" element={<ProductsList />} />
          <Route path="admin/product-approval" element={<ProductApprovalPage />} />
          <Route path="admin/product-approval/:id" element={<ProductApprovalDetailsPage />} />
          {/* Approval Subroutes */}
          <Route path="products/:id" element={<ProductReview />} />

          {/*Payments management   */}
          <Route path="payments" element={<PaymentsMonitoringPage />} />
          <Route path="payments/:id" element={<PaymentDetailsPage />} />

          {/* Order Management */}
          <Route path="orders" element={<OrdersListPage />} />
          <Route path="orders/:id" element={<OrderDetailsPage />} />

          {/* Driver Management */}
          <Route path="drivers" element={<DriversList />} />
          <Route path="drivers/:id" element={<DriverDetails />} />

          {/* Content Management */}
          <Route path="content/articles" element={<Articles />} />
          <Route path="content/videos" element={<Videos />} />
          <Route path="content/guides" element={<Guides />} />

          {/* Community Management */}
          <Route path="community/posts" element={<Posts />} />
          <Route path="community/reports" element={<CommunityReports />} />

          {/* Reports */}
          <Route path="reports/sales" element={<SalesReports />} />
          <Route path="reports/vendors" element={<VendorReports />} />
          <Route path="reports/delivery" element={<DeliveryReports />} />
          <Route path="reports/users" element={<UserReports />} />
        </Route>

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App