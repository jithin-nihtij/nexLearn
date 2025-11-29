import nexLearn from "@/public/nexLearn.png";
import Image from "next/image";

const TopBar = () => {
  return (
    <nav className="shadow-md fixed w-full bg-white flex justify-center py-4">
      <Image src={nexLearn} alt="nex-learn" width={0} height={0} />
    </nav>
  );
};

export default TopBar;
