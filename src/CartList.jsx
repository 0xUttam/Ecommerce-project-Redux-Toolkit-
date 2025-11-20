import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAllItem, removeItem } from "./redux/slice";
import { useNavigate } from "react-router-dom";

export default function CartList() {
  const cartSelector = useSelector((state) => state.cart.items);
  console.log(cartSelector);
  const [cartItems, setCartItems] = useState(cartSelector);

  useEffect(()=>{
    setCartItems(cartSelector)
  },[cartSelector]);

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const manageQuantity = (id, q) => {
    console.log(id, q);
    let quantity = parseInt(q) > 1 ? parseInt(q) : 1;
    const cartTempItems = cartSelector.map((item) => {
      return item.id == id ? { ...item, quantity } : item;
    });
    setCartItems(cartTempItems);
  };

  const handlePlaceOrder = () => {
    localStorage.clear();
    dispatch(clearAllItem())
    alert('Congratulations! 🎉 Order placed')
    navigate("/")
  }

  return (
    <>
      <div className="cart-container">
        <div className="cart-header">
          <div className="cart-header-container">
            <h2>Your Cart Items</h2>
            <span>{cartItems.length} Items</span>
          </div>
          {cartItems.length > 0
            ? cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="item-info">
                    <div className="item-info-left">
                      <img src={item.thumbnail} alt="" />
                      <div className="item-details">
                        <h4>{item.title}</h4>
                        <p>{item.brand}</p>
                      </div>
                    </div>
                    <div className="item-actions">
                      <div style={{ display: "flex" }}>
                        <input
                          onChange={(e) =>
                            manageQuantity(item.id, e.target.value)
                          }
                          value={item.quantity ? item.quantity : 1}
                          style={{
                            margin: "0 15px",
                            padding: "4px",
                            height: "35px",
                            maxWidth: "70px",
                          }}
                          type="number"
                          placeholder="Enter Quntity"
                        />
                        <div>
                          <span className="price">
                            $
                            {(item.quantity
                              ? item.price * item.quantity
                              : item.price
                            ).toFixed(2)}
                          </span>
                          <button onClick={()=>dispatch(removeItem(item))} className="btn remove-btn">Remove</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            : null}

          <div className="cart-footer" style={{marginBottom:'20px'}}>
            Total : $
            {cartItems
              .reduce(
                (sum, item) =>
                  item.quantity
                    ? sum + item.price * item.quantity
                    : sum + item.price,0
              )
              .toFixed(2)}
          </div>
          
          <button className="btn" onClick={handlePlaceOrder}>
            Place Order
          </button>
        </div>
      </div>
    </>
  );
}
