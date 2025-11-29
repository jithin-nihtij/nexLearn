import { Camera, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
interface Props {
  label: string;
  profileImage?: File;
  setProfileImage: (profileImage?: File) => void;
}

const ChooseProfileImage = ({ label, setProfileImage }: Props) => {
  const [preview, setPreview] = useState<string | null>();
  const removeImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setPreview(null);
  };

  return (
    <div className="w-full">
      <label
        htmlFor={label}
        className="w-40 mx-auto relative flex overflow-hidden flex-col gap-4 justify-center items-center rounded-md h-40 cursor-pointer border border-dashed"
      >
        {preview ? (
          <>
            <button
              onClick={removeImage}
              className="h-5 w-5 p-1 cursor-pointer  rounded-full flex flex-col absolute bg-primary  text-background top-2 right-2 items-center "
            >
              <X className=" " />
            </button>
            <Image
              alt="profile-image"
              width={0}
              height={0}
              src={preview}
              className="w-full object-cover h-full"
              unoptimized
            />
          </>
        ) : (
          <>
            <Camera size={34} />
            <span className="text-gray-300 text-[12px]">{label}</span>
          </>
        )}
      </label>
      <input
        onChange={(e) => {
          const file = e.target.files?.[0];
          setProfileImage(file);
          if (file) {
            const url = URL.createObjectURL(file);
            setPreview(url);
          }
        }}
        accept="image/jpg, image/png"
        id={label}
        hidden
        className="w-50 h-50"
        type="file"
      />
    </div>
  );
};

export default ChooseProfileImage;
