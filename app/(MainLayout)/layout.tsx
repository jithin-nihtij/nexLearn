import TopBar from "@/components/test/top-bar";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className=" bg-primary/10 max-h-max min-h-screen">
      <TopBar />
      <div className=" py-30">{children}</div>
    </div>
  );
};

export default Layout;
