import {
  TCreateProfileSchema,
  TSendOtpSchema,
  TVerifyOtpSchema,
} from "@/schema/login";
import { apiClient } from "./axios";
import { CreateProfileRes, OtpVerifyRes } from "@/types/login";

export const sendOtp = async ({ mobile }: TSendOtpSchema) => {
  const formData = new FormData();
  formData.append("mobile", `+91${mobile}`);
  const response = await apiClient.post("/auth/send-otp", formData);
  return response.data;
};

export const verifyOtp = async ({
  otp,
  mobile,
}: TVerifyOtpSchema & { mobile: string | null }) => {
  const formData = new FormData();
  if (mobile) {
    formData.append("otp", otp);
    formData.append("mobile", `+91${mobile}`);
  }
  const response = await apiClient.post("/auth/verify-otp", formData);
  return response.data as OtpVerifyRes;
};

export const createProfile = async ({
  email,
  name,
  qualification,
  mobile,
  profileImage,
}: TCreateProfileSchema & { profileImage?: File; mobile: string | null }) => {
  const formData = new FormData();
  formData.append("email", email);
  if (profileImage) {
    formData.append("profile_image", profileImage);
  }
  formData.append("name", name);
  formData.append("qualification", qualification);
  formData.append("mobile", `+91${mobile}`);
  const response = await apiClient.post("/auth/create-profile", formData);
  return response.data as CreateProfileRes;
};

export const logout = async () => {
  return await apiClient.post("/auth/logout");
};
