import React from "react";
import "./Verify.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useContext } from "react";
import { StoreContext } from "../../Context/StoreContext";
import { useEffect } from "react";
const Verify = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const { url } = useContext(StoreContext);
  const navigate = useNavigate();
  const verifyPayment = async () => {
    const response = await axios.post(url + "/api/order/verify", {
      success: orderId,
    });
    if (response.data.success) {
      navigate("/MyOrders");
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);
  console.log(success, orderId);

  return;
  <div>
    <div className="verify"></div>
    <div className="spinner"></div>
  </div>;
};

export default Verify;
