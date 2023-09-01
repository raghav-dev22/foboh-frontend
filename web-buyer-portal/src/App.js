import Login from "./loginRegister/Login";

import CreateAccount from "./CreateAccount/CreateAccount";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./loginRegister/Signup";
import { Provider } from "react-redux";
import Verifyemail from "./loginRegister/Verifyemail";
import HomePage from "./desktop/HomePage";
import store from "./store/Store";
import ProductList from "./desktop/ProductList";
import ProductDetails from "./desktop/ProductDetails";
import Profile from "./MyAccount/Profile";
import AddressDetails from "./MyAccount/AddressDetails";
import ProfileEdit from "./MyAccount/ProfileEdit";
import DeliveryEdit from "./MyAccount/DeliveryEdit";
import CartPage from "./MyAccount/CartPage";
import MainHomePage from "./desktop/MainHomePage";
import MyAccount from "./MyAccount/MyAccount";
// import EditProductDetails from "../../foboh-frontend/products/src/editProduct/EditProductDetails";

// import MainHomePage from "./desktop/MainHomePage";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/verify-email" element={<Verifyemail />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route exact path="/main/*" element={<HomePage />} />
          <Route path="/product-list" element={<ProductList />} />
          <Route path="/product-details/:id" element={<ProductDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/address" element={<AddressDetails />} />
          <Route path="/delivery-edit" element={<DeliveryEdit />} />
          <Route path="/profile-edit" element={<ProfileEdit />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/home-page-main" element={<MainHomePage />} />
          <Route path="/account-details" element={<MyAccount />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
