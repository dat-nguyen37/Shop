import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import RegisterSeller from './pages/RegisterSeller';
import Home from './pages/Home';
import Header from './components/header/Header';
import Register from './pages/Register';
import Login from './pages/Login';
import ProductDetail from './pages/ProductDetail';
import Footer from './components/footer/Footer';

function App() {
  const location = useLocation();
  
  // Specify routes where you want the Header to appear
  const showHeaderRoutes = ["/","/chi_tiet_san_pham"]; // Add more paths as needed
  const showHeader = showHeaderRoutes.includes(location.pathname);

  return (
    <>
      {showHeader && <Header />}
      <Routes>
        <Route path="/dangky_nguoiban" element={<RegisterSeller />} />
        <Route path="/dang_ky" element={<Register />} />
        <Route path="/dang_nhap" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/chi_tiet_san_pham" element={<ProductDetail />} />
        {/* Add more routes as needed */}
      </Routes>
    </>
  );
}

export default function Root() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
