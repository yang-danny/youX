import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useUserStore } from "@/store/useUserStore";

const MobileNavLinks = () => {
  const { logout } = useUserStore();
  return (
    <>
      <Link
        to="/manage-restaurant"
        className="flex bg-white items-center font-bold text-black hover:text-orange-500"
      >
        My Applications
      </Link>
      <Link
        to="/user-profile"
        className="flex bg-white items-center font-bold text-black hover:text-orange-500"
      >
        User Profile
      </Link>
      <Button
        onClick={() => logout()}
        className="flex items-center px-3 font-bold hover:bg-gray-500"
      >
        Log Out
      </Button>
    </>
  );
};

export default MobileNavLinks;