import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import RegisterSeller from './pages/RegisterSeller';
import Home from './pages/Home';
import Header from './components/header/Header';

function App() {
  const location = useLocation();
  
  // Specify routes where you want the Header to appear
  const showHeaderRoutes = ["/"]; // Add more paths as needed
  const showHeader = showHeaderRoutes.includes(location.pathname);

  return (
    <>
      {showHeader && <Header />}
      <Routes>
        <Route path="/dangky_nguoiban" element={<RegisterSeller />} />
        <Route path="/" element={<Home />} />
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
