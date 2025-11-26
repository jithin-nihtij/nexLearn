import React from "react";
import InputFloatingLabel from "../common/input-floating-label";

const SendOtpCard = () => {
  return (
    <div className="w-full flex flex-col gap-4 h-full">
      <h2 className="text-primary">Enter Your Phone Number</h2>
      <p className="text-primary">
        We use your mobile number to verify your account
      </p>
      <InputFloatingLabel />
    </div>
  );
};

export default SendOtpCard;
