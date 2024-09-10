// import React, { useContext, useState } from "react";
// import "./PlaceOrder.css";
// import { StoreContext } from "../../Context/StoreContext";
// import axios from "axios";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// const PlaceOrder = () => {
//   const { getTotalCartAmount, token, food_list, cartItems, url } =
//     useContext(StoreContext);
//   const [paymentMethod, setPaymentMethod] = useState("cash");

//   const [data, setData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     street: "",
//     city: "",
//     state: "",
//     zipCode: "",
//     country: "",
//     phone: "",
//   });

//   const onChangeHandler = (event) => {
//     const name = event.target.name;
//     const value = event.target.value;
//     setData((data) => ({ ...data, [name]: value }));
//   };

//   // useEffect(() => {
//   //   console.log(data);
//   // }, [data]);
//   const placeOrder = async (event) => {
//     event.preventDefault();
//     let orderItems = [];
//     food_list.map((item) => {
//       if (cartItems[item._id] > 0) {
//         let itemInfo = item;
//         itemInfo["quantity"] = cartItems[item._id];
//         orderItems.push(itemInfo);
//       }
//       // console.log(orderItems);
//     });
//     let orderData = {
//       // address: data,
//       // items: orderItems,
//       // amount: getTotalCartAmount() + 20,
//       // paymentMethod: paymentMethod,
//       userId: "12345",
//       items: orderItems,
//       amount: getTotalCartAmount() + 20,
//       address: { street: "123 Main St", city: "Sample City" },
//       paymentMethod: "cash",
//     };
//     // let response = await axios.post(url + "/api/order/place", orderData, {
//     //   headers: { token },
//     // });
//     // if (response.data.success) {
//     //   const { session_url } = response.data;
//     //   window.location.replace(session_url);
//     //   alert("Order placed successfully with cash payment!");
//     // } else {
//     //   alert("Error placing order.");
//     // }
//     try {
//       let response = await axios.post(url + "/api/order/place", orderData);
//       if (response.data.success) {
//         alert("Order placed successfully with cash payment!");
//       } else {
//         alert("Error placing order.");
//       }
//     } catch (error) {
//       alert("Error in placing order: " + error.message);
//     }
//   };

//   return (
//     <form onSubmit={placeOrder} className="place-order">
//       <div className="place-order-left">
//         <p className="title">Delivery Information</p>
//         <div className="multi-fields">
//           <input
//             required
//             name="firstName"
//             onChange={onChangeHandler}
//             value={data.firstName}
//             type="text"
//             placeholder="First Name"
//           />
//           <input
//             required
//             name="lastName"
//             onChange={onChangeHandler}
//             value={data.lastName}
//             type="text"
//             placeholder="Last Name"
//           />
//         </div>
//         <input
//           required
//           name="email"
//           onChange={onChangeHandler}
//           value={data.email}
//           type="email"
//           placeholder="Email Address"
//         />
//         <input
//           required
//           name="street"
//           onChange={onChangeHandler}
//           value={data.street}
//           type="text"
//           placeholder="Street"
//         />
//         <div className="multi-fields">
//           <input
//             required
//             name="city"
//             onChange={onChangeHandler}
//             value={data.city}
//             type="text"
//             placeholder="City"
//           />
//           <input
//             required
//             name="state"
//             onChange={onChangeHandler}
//             value={data.state}
//             type="text"
//             placeholder="State"
//           />
//         </div>
//         <div className="multi-fields">
//           <input
//             required
//             name="zipCode"
//             onChange={onChangeHandler}
//             value={data.zipCode}
//             type="text"
//             placeholder="Zip Code"
//           />
//           <input
//             required
//             name="country"
//             onChange={onChangeHandler}
//             value={data.country}
//             type="text"
//             placeholder="Country"
//           />
//         </div>
//         <input
//           required
//           name="phone"
//           onChange={onChangeHandler}
//           value={data.phone}
//           type="text"
//           placeholder="Phone"
//         />
//       </div>
//       <div className="place-order-right">
//         <div className="cart-total">
//           <h2>Cart Totals</h2>
//           <div>
//             <div className="cart-total-details">
//               <p>Subtotal</p>
//               <p>{getTotalCartAmount()}Af</p>
//             </div>
//             <hr />
//             <div className="cart-total-details">
//               <p>Delivery fee</p>
//               <p>{getTotalCartAmount() === 0 ? 0 : 20}Af</p>
//             </div>
//             <hr />
//             <div className="cart-total-details">
//               <b>Total</b>
//               <b>
//                 {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 20}Af
//               </b>
//             </div>
//           </div>
//           <button type="submit" disabled>
//             PROCEED TO PAYMENT
//           </button>
//           <div className="payment-method">
//             <label>
//               <input
//                 type="radio"
//                 value="cash"
//                 checked={paymentMethod === "cash"}
//                 onChange={() => setPaymentMethod("cash")}
//               />
//               Cash on Delivery
//             </label>
//             <button type="submit" className="radio_button">
//               Proceed To Cash Payment
//             </button>
//           </div>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default PlaceOrder;

import React, { useContext, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } =
    useContext(StoreContext);
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      userId: "12345",
      items: orderItems,
      amount: getTotalCartAmount() + 20,
      address: data,
      paymentMethod: paymentMethod,
    };

    try {
      let response = await axios.post(url + "/api/order/place", orderData, {
        headers: { token },
      });
      if (response.data.success) {
        alert("Order placed successfully with cash payment!");
      } else {
        alert("Error placing order.");
      }
    } catch (error) {
      alert("Error in placing order: " + error.message);
    }
  };

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            required
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
            type="text"
            placeholder="First Name"
          />
          <input
            required
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
            type="text"
            placeholder="Last Name"
          />
        </div>
        <input
          required
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          type="email"
          placeholder="Email Address"
        />
        <input
          required
          name="street"
          onChange={onChangeHandler}
          value={data.street}
          type="text"
          placeholder="Street"
        />
        <div className="multi-fields">
          <input
            required
            name="city"
            onChange={onChangeHandler}
            value={data.city}
            type="text"
            placeholder="City"
          />
          <input
            required
            name="state"
            onChange={onChangeHandler}
            value={data.state}
            type="text"
            placeholder="State"
          />
        </div>
        <div className="multi-fields">
          <input
            required
            name="zipCode"
            onChange={onChangeHandler}
            value={data.zipCode}
            type="text"
            placeholder="Zip Code"
          />
          <input
            required
            name="country"
            onChange={onChangeHandler}
            value={data.country}
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          required
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
          type="text"
          placeholder="Phone"
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>{getTotalCartAmount()}Af</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery fee</p>
              <p>{getTotalCartAmount() === 0 ? 0 : 20}Af</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 20}Af
              </b>
            </div>
          </div>
          <button type="submit" disabled={getTotalCartAmount() === 0}>
            PROCEED TO PAYMENT
          </button>
          <div className="payment-method">
            <label>
              <input
                type="radio"
                value="cash"
                checked={paymentMethod === "cash"}
                onChange={() => setPaymentMethod("cash")}
              />
              Cash on Delivery
            </label>
            <button type="submit" className="radio_button">
              Proceed To Cash Payment
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;

// const placeOrder = async (event) => {
//   event.preventDefault();

//   let orderItems = [];
//   food_list.map((item) => {
//     if (cartItems[item._id] > 0) {
//       let itemInfo = item;
//       itemInfo["quantity"] = cartItems[item._id];
//       orderItems.push(itemInfo);
//     }
//   });

//   let orderData = {
//     userId: "12345", //
//     items: orderItems,
//     amount: getTotalCartAmount() + 20,
//     address: { street: "123 Main St", city: "Sample City" }, //
//     paymentMethod: "cash", //
//   };

//   try {
//     let response = await axios.post(url + "/api/order/place", orderData);
//     if (response.data.success) {
//       alert("Order placed successfully with cash payment!");
//     } else {
//       alert("Error placing order.");
//     }
//   } catch (error) {
//     alert("Error in placing order: " + error.message);
//   }
// };

// const navigate = useNavigate();

// useEffect(() => {
//   if (!token) {
//     navigate("/cart");
//   } else if (getTotalCartAmount() === 0) {
//     navigate("/cart");
//   }
// }, [token]);
