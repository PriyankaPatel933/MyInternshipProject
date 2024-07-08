import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./assets/pages/HOME/Home";
import Cart from "./assets/pages/CART/Cart";
import PlaceOrder from "./assets/pages/PLACEORDER/PlaceOrder";
import Footer from "./components/Navbar/Footer/Footer";
import LogIn from "./components/LogIn";
import SignIn from "./components/SignIn";
import MyOrders from "./assets/pages/MYOrders/MyOrders";
import Payment from "./assets/pages/PAYMENT/Payment";
import Add from "./assets/pages/ADDFOOD/Add";
import AdminLogin from "./components/AdminLogin";
import AdminSignIn from "./components/AdminSignIn";
import ContactUs from "./assets/pages/ContactUs/ContactUs";
import AppDownload from "./components/Navbar/AppDownload/AppDownload";
import Sidebar from "./components/Navbar/Sidebar";
import DeleteFood from "./assets/pages/ADDFOOD/DeleteFood";
import GetAllFoods from "./assets/pages/ADDFOOD/getAllFoods";
import FoodCart from "./components/FoodCart/FoodCart";
import FoodDis from "./components/AllFoodGal/FoodDis";
import Cart2 from "./assets/pages/CART/Cart2";
import AddMenu from "./assets/pages/ADDFOOD/AddMenu";
import AllUser from "./assets/pages/ADDFOOD/AllUser";
import FoodDisplay from './components/Navbar/FoodDisplay/FoodDisplay';
import GetAllPaymentDetails from "./assets/pages/ADDFOOD/getAllPaymentDetails";


const App = () => {

  return (
    <>
      <div className="app">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/cart" element={<Cart />} />
          <Route path="/cart2" element={<Cart2 />} />



          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/LogIn" element={<LogIn />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/Payment" element={<Payment />} />
          <Route path="/add" element={<Add />} />



          <Route path="/delete" element={<DeleteFood />} />

          <Route path="/Adm" element={<AdminLogin />} />
          <Route path="/AdminSignIn" element={<AdminSignIn />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/appDownload" element={<AppDownload />} />
          {/* <Route path="/thanku" element={<Thanku />} /> */}
          <Route path="/Sidebar" element={<Sidebar />} />
          <Route path="/getFoods" element={<GetAllFoods />} />

          <Route path="/fd" element={<FoodDisplay />} />

          <Route path="/foodCart" element={<FoodCart />} />
          <Route path="/FoodDis" element={<FoodDis />} />
          <Route path="/menu" element={<AddMenu />} />
          <Route path="/allUser" element={<AllUser />} />
          <Route path="/paymentdetails" element={<GetAllPaymentDetails />} />


        </Routes>

   

    


      </div>
      <Footer />
    </>
  );
};

export default App;
