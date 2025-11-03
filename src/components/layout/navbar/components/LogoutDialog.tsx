import { useNavigate } from "react-router-dom";
import type { Dispatch, SetStateAction } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useUserContext } from "@/context/user-context";
import { handleLogout } from "@/api/auth/auth";

type LogoutDialogProps = {
  isLogoutOpen: boolean;
  onOpenLogoutDialog: Dispatch<SetStateAction<boolean>>;
};

function LogoutDialog({ isLogoutOpen, onOpenLogoutDialog }: LogoutDialogProps) {
  const navigate = useNavigate();
  const { setUser } = useUserContext();

  const logout = async () => {
    await handleLogout();
    setUser(null);
    navigate("/sign-in");
    onOpenLogoutDialog(false);
  };

  return (
    <Dialog open={isLogoutOpen} onOpenChange={onOpenLogoutDialog}>
      <DialogContent className="rounded-2xl p-0 sm:max-w-md">
        <DialogHeader className="px-4 pt-4 pb-2 sm:px-6">
          <DialogTitle className="text-center text-lg font-semibold">
            Logout
          </DialogTitle>
        </DialogHeader>

        <div className="mx-4 sm:mx-6 h-px bg-zinc-200" />

        <DialogDescription className="px-4 py-4 text-center text-[15px] text-zinc-600 sm:px-6">
          Are you sure you want to log out?
        </DialogDescription>

        <div className="px-4 pb-4 sm:px-6">
          <div className="grid grid-cols-2 gap-3">
            <DialogClose asChild>
              <button
                type="button"
                className="w-full cursor-pointer rounded-xl bg-zinc-200 px-4 py-3 text-sm font-medium text-zinc-800 hover:bg-zinc-300"
              >
                Cancel
              </button>
            </DialogClose>

            <button
              type="button"
              onClick={logout}
              className="w-full cursor-pointer rounded-xl bg-blue-600 px-4 py-3 text-sm font-medium text-white hover:bg-blue-700"
            >
              Yes, Logout
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default LogoutDialog;
