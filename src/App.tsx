import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import {
  Login,
  Register,
  HomeScreen,
  StoreScreen,
  StoreDetailScreen,
  LocationScreen,
  UserProfileScreen,
  AboutScreen,
  BlogScreen,
  ContactScreen,
  PromotionScreen,
} from "./screens";
import { AdminLayout, AdminLogin, AdminDashboard, StoresManage, StoreDetailManage, UserManage, UserDetailManage, BlogsManage, BlogDetailManage, BlogCreate, SubService } from "./screens/admin";
import { ThemeProvider, Header, AuthProvider, AdminRouteGuard } from "./components";
import "./App.css";

function App() {
  return (
    <MantineProvider>
      <AuthProvider>
        <ThemeProvider>
          <Router>
            <Routes>
              {/* Public Routes */}
              <Route path="/*" element={
                <>
                  <Header />
                  <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/" element={<HomeScreen />} />
                    <Route path="/store" element={<StoreScreen />} />
                    <Route path="/store/:id" element={<StoreDetailScreen />} />
                    <Route path="/location" element={<LocationScreen />} />
                    <Route path="/profile" element={<UserProfileScreen />} />
                    <Route path="/about" element={<AboutScreen />} />
                    <Route path="/blog" element={<BlogScreen />} />
                    <Route path="/contact" element={<ContactScreen />} />
                    <Route path="/promotion" element={<PromotionScreen />} />
                    <Route path="*" element={<HomeScreen />} />
                  </Routes>
                </>
              } />
              
              {/* Admin Routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route path="login" element={<AdminLogin />} />
                <Route path="dashboard" element={
                  <AdminRouteGuard>
                    <AdminDashboard />
                  </AdminRouteGuard>
                } />
                <Route path="stores" element={
                  <AdminRouteGuard>
                    <StoresManage />
                  </AdminRouteGuard>
                } />
                <Route path="stores/:id" element={
                  <AdminRouteGuard>
                    <StoreDetailManage />
                  </AdminRouteGuard>
                } />
                <Route path="users" element={
                  <AdminRouteGuard>
                    <UserManage />
                  </AdminRouteGuard>
                } />
                <Route path="users/:id" element={
                  <AdminRouteGuard>
                    <UserDetailManage />
                  </AdminRouteGuard>
                } />
                <Route path="blogs" element={
                  <AdminRouteGuard>
                    <BlogsManage />
                  </AdminRouteGuard>
                } />
                <Route path="blogs/new" element={
                  <AdminRouteGuard>
                    <BlogCreate />
                  </AdminRouteGuard>
                } />
                <Route path="blogs/:id" element={
                  <AdminRouteGuard>
                    <BlogDetailManage />
                  </AdminRouteGuard>
                } />
                <Route path="introductions/:serviceId" element={
                  <AdminRouteGuard>
                    <SubService />
                  </AdminRouteGuard>
                } />
                <Route path="" element={<AdminLogin />} />
              </Route>
            </Routes>
          </Router>
        </ThemeProvider>
      </AuthProvider>
    </MantineProvider>
  );
}

export default App;
