import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const loginStore = (set: any) => ({
  userId: "",
  setLoginStore(payload: any) {
    set((state: any) => ({
      ...state,
      userId: payload,
    }));
  },
});

export const useLoginStore = create(
  devtools(persist(loginStore, { name: "loginInfo" }))
);
