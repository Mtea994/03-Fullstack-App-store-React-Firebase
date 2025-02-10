import React from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase.config";

const Home = () => {
  const navigate = useNavigate();
  async function handleSignout() {
    await auth.signOut();
    toast.success("Logged Out Successfull");
    navigate("/auth", { replace: true });
  }
  return (
    <div className="">
      Home
      <button onClick={handleSignout} className="cursor-pointer">
        Sign Out
      </button>
    </div>
  );
};

export default Home;
