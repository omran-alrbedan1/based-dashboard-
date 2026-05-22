import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { getToken } from "./lib/auth"

import MainLayout from "./components/layout/MainLayout"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import UsersList from "./pages/Users/UsersList"
import UserDetails from "./pages/Users/UserDetails"
import VendorsList from "./pages/Vendors/VendorsList"
import VendorDetails from "./pages/Vendors/VendorDetails"
import ProductsList from "./pages/Products/ProductsList"
import ProductReview from "./pages/Products/ProductReview"
import OrdersList from "./pages/Orders/OrdersList"
import OrderDetails from "./pages/Orders/OrderDetails"
import DriversList from "./pages/Drivers/DriversList"
import DriverDetails from "./pages/Drivers/DriverDetails"
import Articles from "./pages/Content/Articles"
import Videos from "./pages/Content/Videos"
import Guides from "./pages/Content/Guides"
import Posts from "./pages/Community/Posts"
import CommunityReports from "./pages/Community/Reports"
import SalesReports from "./pages/Reports/SalesReports"
import VendorReports from "./pages/Reports/VendorReports"
import DeliveryReports from "./pages/Reports/DeliveryReports"
import UserReports from "./pages/Reports/UserReports"

interface PrivateRouteProps {
  children: React.ReactNode
}

function PrivateRoute({ children }: PrivateRouteProps) {
  const isAuthenticated = getToken()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
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
          {/* Approval Subroutes */}
          <Route path="products/:id" element={<ProductReview />} />
          
          {/* Order Management */}
          <Route path="orders" element={<OrdersList />} />
          <Route path="orders/:id" element={<OrderDetails />} />
          
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
          <Route path="reports/sales" element={<SalesReports/>} />
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