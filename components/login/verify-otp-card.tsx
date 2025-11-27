import { TVerifyOtpSchema, verifyOtpSchema } from "@/schema/login";
import { mobileNumberStore } from "@/store/login";
import { apiClient } from "@/utils/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { FloatingInput } from "../common/input-floating-label";
import { Button } from "../ui/button";

const VerifyOtpCard = () => {
  const form = useForm<TVerifyOtpSchema>({
    resolver: zodResolver(verifyOtpSchema),
  });

  const { mobile } = mobileNumberStore();

  const verifyOtpMutation = useMutation({
    mutationFn: async ({ otp }: TVerifyOtpSchema) => {
      const formData = new FormData();
      if (mobile) {
        formData.append("otp", otp);
        formData.append("mobile", `+91${mobile}`);
      }
      const response = await apiClient.post("/auth/verify-otp", formData);
      return response.data;
    },
    onSuccess: () => {
      localStorage.removeItem("mobile");
      toast.success("Otp Verified");
    },
    onError: () => {
      toast.error("Error Occured");
    },
  });

  const onSubmit = (data: TVerifyOtpSchema) => {
    verifyOtpMutation.mutate(data);
  };

  return (
    <form
      className="w-full flex justify-between flex-col gap-4 h-full"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-4">
        <h3 className="text-primary">Enter The Code We Texted You</h3>
        <p className="text-primary ">We&apos;ve sent an SMS to +91 {mobile}</p>
        <FloatingInput
          register={form.register}
          type="number"
          name="otp"
          error={form.formState.errors.otp?.message}
          label="SMS Code"
        />
        <p className="text-[12px] flex gap-1  ">
          <span>
            Your 6 digit code is on its way. This can sometimes take a few
            moments to arrive.
          </span>
        </p>
      </div>

      <Button
        disabled={verifyOtpMutation.isPending}
        type="submit"
        className="py-6"
      >
        Get Started
      </Button>
    </form>
  );
};

export default VerifyOtpCard;
