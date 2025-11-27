import { create } from "zustand";
import { persist } from "zustand/middleware";
type MobileNumberState = {
  mobile: string | null;
  setMobile: (mobile: string | null) => void;
};
export const mobileNumberStore = create<MobileNumberState>()(
  persist(
    (set) => ({
      mobile: null,
      setMobile: (data) => set({ mobile: data }),
    }),
    {
      name: "mobile", // key in localStorage
    }
  )
);
