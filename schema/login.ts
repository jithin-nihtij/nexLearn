import z from "zod";

export const sendOtpSchema = z.object({
  mobile: z
    .string("Please Enter Phone Number")
    .min(1, "Please Enter Phone Number")
    .max(10, "Only 10 digits allowed"),
});

export type TSendOtpSchema = z.infer<typeof sendOtpSchema>;

export const verifyOtpSchema = z.object({
  otp: z
    .string()
    .min(6, "Please Enter the OTP correctly")
    .max(6, "Only 6 digits allowed"),
});

export type TVerifyOtpSchema = z.infer<typeof verifyOtpSchema>;

export const createProfileSchema = z.object({
  name: z.string().min(1, "Please enter the Name"),
  email: z.email("Please enter the email"),
  qualification: z.string().min(1, "Please enter the qualification"),
});
export type TCreateProfileSchema = z.infer<typeof createProfileSchema>;
