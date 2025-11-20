import Header from "./Header";
import "./App.css";
import Product from "./Product";
import { useDispatch } from "react-redux";
import { clearAllItem } from "./redux/slice";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CartList from "./CartList";

function App() {
  const dispatch = useDispatch();
  return (
    <>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Product />} />
          <Route path="/cart" element={<CartList />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
