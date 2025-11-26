import loginHead from "@/public/login/LoginHead.png";
import vectorGroup from "@/public/login/vectorGroup.png";
import Image from "next/image";
import { ReactNode } from "react";
const LoginCard = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-primary h-[501px] w-1/2 border rounded-lg p-2  grid grid-cols-1 lg:grid-cols-2 mx-auto">
      <div className="flex flex-col items-center px-6 py-2 gap-10">
        <Image
          src={loginHead}
          alt="login-head"
          className="mb-10"
          width={0}
          height={0}
        />
        <Image src={vectorGroup} alt="vector-group" width={0} height={0} />
      </div>
      <div className="p-6 bg-background rounded-md">{children}</div>
    </div>
  );
};

export default LoginCard;
