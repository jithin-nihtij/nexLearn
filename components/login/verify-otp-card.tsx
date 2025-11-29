import { TVerifyOtpSchema, verifyOtpSchema } from "@/schema/login";
import { mobileNumberStore } from "@/store/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { FloatingInput } from "../common/input-floating-label";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { verifyOtp } from "@/utils/auth";

const VerifyOtpCard = () => {
  const form = useForm<TVerifyOtpSchema>({
    resolver: zodResolver(verifyOtpSchema),
  });

  const router = useRouter();
  const { mobile } = mobileNumberStore();

  const verifyOtpMutation = useMutation({
    mutationFn: async (data: TVerifyOtpSchema) => {
      return verifyOtp({ ...data, mobile: mobile });
    },
    onSuccess: (data) => {
      const { login, access_token, refresh_token, message } = data;
      toast.success(message);
      if (!login) {
        return router.push("/create-profile");
      } else {
        localStorage.removeItem("mobile");
        Cookies.set("access_token", access_token);
        Cookies.set("refresh_token", refresh_token);
        router.push("/");
      }
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
