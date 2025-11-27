import LoginCard from "@/components/login/login-card";
import SendOtpCard from "@/components/login/send-otp-card";
import React from "react";

const SendOtp = () => {
  return (
    <div className="w-full">
      <LoginCard>
        <SendOtpCard />
      </LoginCard>
    </div>
  );
};

export default SendOtp;
