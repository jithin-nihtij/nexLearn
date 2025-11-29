"use client";
import { Button } from "../ui/button";
import { FloatingInput } from "../common/input-floating-label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProfileSchema, TCreateProfileSchema } from "@/schema/login";
import { useMutation } from "@tanstack/react-query";
import ChooseProfileImage from "./choose-profile-image";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { createProfile } from "@/utils/auth";
import { mobileNumberStore, profileImageStore } from "@/store/login";

const CreateProfileCard = () => {
  const { setProfileImage, profileImage } = profileImageStore();
  const { mobile } = mobileNumberStore();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(createProfileSchema),
  });

  const createProfileMutation = useMutation({
    mutationFn: async (data: TCreateProfileSchema) => {
      return createProfile({
        ...data,
        mobile: mobile,
        profileImage: profileImage,
      });
    },
    onSuccess: (data) => {
      const { access_token, message, refresh_token } = data;
      Cookies.set("access_token", access_token);
      Cookies.set("refresh_token", refresh_token);
      toast.success(message);
      localStorage.removeItem("mobile");
      router.replace("/");
    },
    onError: () => {
      toast.error("An Error Occured");
    },
  });

  const onSubmit = (data: TCreateProfileSchema) => {
    if (!profileImage) {
      toast.error("Please choose a profile photo");
      return;
    }
    createProfileMutation.mutate(data);
  };
  return (
    <form
      className="w-full flex justify-between flex-col gap-4 h-full"
      onSubmit={form.handleSubmit(onSubmit, (err) => console.log({ err }))}
    >
      <div className="flex w-full flex-col gap-6">
        <h3 className="text-primary">Add Your Details</h3>
        <ChooseProfileImage
          label="Add Your Profile Photo"
          profileImage={profileImage}
          setProfileImage={setProfileImage}
        />
        <FloatingInput
          register={form.register}
          type="text"
          name="name"
          error={form.formState.errors.name?.message}
          label="Name"
        />
        <FloatingInput
          register={form.register}
          type="text"
          name="email"
          error={form.formState.errors.email?.message}
          label="Email"
        />
        <FloatingInput
          register={form.register}
          type="text"
          name="qualification"
          error={form.formState.errors.qualification?.message}
          label="Qualification"
        />
      </div>

      <Button
        disabled={createProfileMutation.isPending}
        type="submit"
        className="py-6 "
      >
        Get Started
      </Button>
    </form>
  );
};

export default CreateProfileCard;
