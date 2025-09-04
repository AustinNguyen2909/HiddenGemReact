import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import {
  Login,
  Register,
  HomeScreen,
  StoreScreen,
  LocationScreen,
  AboutScreen,
  BlogScreen,
  ContactScreen,
  PromotionScreen,
} from "./screens";
import { ThemeProvider, Header, AuthProvider } from "./components";
import "./App.css";

function App() {
  return (
    <MantineProvider>
      <AuthProvider>
        <ThemeProvider>
          <Router>
            <Header />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<HomeScreen />} />
              <Route path="/store" element={<StoreScreen />} />
              <Route path="/location" element={<LocationScreen />} />
              <Route path="/about" element={<AboutScreen />} />
              <Route path="/blog" element={<BlogScreen />} />
              <Route path="/contact" element={<ContactScreen />} />
              <Route path="/promotion" element={<PromotionScreen />} />
              <Route path="*" element={<HomeScreen />} />
            </Routes>
          </Router>
        </ThemeProvider>
      </AuthProvider>
    </MantineProvider>
  );
}

export default App;
