import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      {children}
    </div>
  );
};

export default Layout;
