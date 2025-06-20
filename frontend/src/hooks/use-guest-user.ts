import { create } from "zustand";
import { persist } from "zustand/middleware";

type GuestUserState = {
  guestId: string | null;
  ensureGuestId: () => string;
};

export const useGuestUser = create<GuestUserState>()(
  persist(
    (set, get) => ({
      guestId: null,
      ensureGuestId: () => {
        let currentId = get().guestId;
        if (!currentId) {
          currentId = crypto.randomUUID();
          set({ guestId: currentId });
        }
        return currentId;
      },
    }),
    {
      name: "guest-user-storage",
      partialize: (state) => ({ guestId: state.guestId }),
    },
  ),
);

useGuestUser.getState().ensureGuestId();
