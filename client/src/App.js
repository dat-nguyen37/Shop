import { BrowserRouter, Routes, Route, useLocation, Outlet } from 'react-router-dom';
import RegisterSeller from './pages/RegisterSeller';
import Home from './pages/Home';
import Header from './components/header/Header';
import Register from './pages/Register';
import Login from './pages/Login';
import ProductDetail from './pages/ProductDetail';
import Footer from './components/footer/Footer';
import ShopView from './pages/ShopView';
import { EuiPageTemplate } from '@elastic/eui';
import Cart from './pages/Cart';
import Payment from './pages/Payment';
import Profile from './pages/Profile';
import Acount from './components/account/Acount';
import ListAddress from './components/address/ListAddress';
import Setting from './components/setting/Setting';
import Password from './components/password/Password';
import Order from './components/order/Order';
import ActivateAccount from './pages/ActivateAccount';

function App() {

  return (
    <>
      <Routes>
        <Route path="/dangky_nguoiban" element={<RegisterSeller />} />
        <Route path="/dang_ky" element={<Register />} />
        <Route path="/dang_nhap" element={<Login />} />
        <Route path="/kich_hoat" element={<ActivateAccount />} />
        <Route path="/" element={<Nested />} >
          <Route path="/" element={<Home />} />
          <Route path="/chi_tiet_san_pham" element={<ProductDetail />} />
          <Route path="/shop28382" element={<ShopView />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/profile" element={<Profile/>}>
            <Route index element={<Acount />} />
            <Route path="address" element={<ListAddress />} />
            <Route path="setting" element={<Setting />} />
            <Route path="password" element={<Password />} />
            <Route path="order" element={<Order />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

const Nested=()=>(
  <>
    <Header/>
    <EuiPageTemplate style={{marginTop:'100px'}}>
      <Outlet/>
    </EuiPageTemplate>
    <Footer/>
  </>
)

export default function Root() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
