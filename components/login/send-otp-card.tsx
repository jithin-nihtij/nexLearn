"use client";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendOtpSchema, TSendOtpSchema } from "@/schema/login";
import { FloatingInput } from "../common/input-floating-label";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { mobileNumberStore } from "@/store/login";
import { sendOtp } from "@/utils/auth";

const SendOtpCard = () => {
  const form = useForm<TSendOtpSchema>({
    resolver: zodResolver(sendOtpSchema),
  });
  const router = useRouter();
  const { setMobile } = mobileNumberStore();

  const sendPhoneNumberMutation = useMutation({
    mutationFn: sendOtp,
    onSuccess: () => {
      router.push("/verify-otp");
      toast.success("Otp Sent to your phone number");
    },
    onError: () => {
      toast.error("An Error Occured");
    },
  });

  const onSubmit = (data: TSendOtpSchema) => {
    sendPhoneNumberMutation.mutate(data);
    setMobile(data.mobile);
  };

  return (
    <form
      className="w-full flex justify-between flex-col gap-4 h-full"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-4">
        <h3 className="text-primary">Enter Your Phone Number</h3>
        <p className="text-primary ">
          We use your mobile number to verify your account
        </p>
        <FloatingInput
          register={form.register}
          type="number"
          name="mobile"
          error={form.formState.errors.mobile?.message}
          label="Phone Number"
        />
        <p className="text-[12px] flex gap-1 flex-wrap text-nowrap">
          <span>By tapping Get started, you agree to the</span>
          <span className="font-semibold">Terms & Conditions</span>
        </p>
      </div>

      <Button
        disabled={sendPhoneNumberMutation.isPending}
        type="submit"
        className="py-6"
      >
        Get Started
      </Button>
    </form>
  );
};

export default SendOtpCard;
