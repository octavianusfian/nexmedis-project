import React, { useEffect, useState } from "react";
import Button from "../UI/Button";
import { RiLogoutCircleLine } from "react-icons/ri";
import InputField from "../UI/InputField";
import { Avatar } from "antd";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import Cookies from "js-cookie";
import { data, useNavigate } from "react-router";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogginUser, fetchUsers, removeLogginUser } from "../../redux/userSlice";

const ProfilLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { logginUser, status } = useSelector((state) => state.users);
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchLogginUser());
    }
  }, [status, dispatch]);

  function handleToLogout() {
    Cookies.remove("authToken"); // Hapus token di cookies
    localStorage.removeItem("logginEmail");
    dispatch(removeLogginUser());
    navigate("/login");
  }

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <div className="h-[70vh] w-[80vw] bg-white text-black rounded-2xl p-2 lg:w-[60vw] lg:h-[90vh]">
      <div className="h-full w-full p-4 relative flex flex-col gap-5 items-center justify-center lg:p-7">
        <Button
          className={"absolute right-4 top-4 lg:right-7 lg:top-7"}
          icon={<RiLogoutCircleLine />}
          onClick={handleToLogout}
        >
          <div className="hidden md:block">Logout</div>
        </Button>
        <Button
          className={"absolute left-4 top-4 lg:left-7 lg:top-7"}
          icon={<IoArrowBackCircleOutline />}
          to={"/"}
        >
          <div className="hidden md:block">Back</div>
        </Button>
        <h2 className=" text-2xl font-bold  md:text-3xl">My Profil</h2>
        <div className="hidden lg:block">
          <Avatar size={100} src={logginUser.avatar} />
        </div>

        <div>
          <InputField
            type={"text"}
            title={"Name"}
            value={`${logginUser.first_name} ${logginUser.last_name}`}
            disabled
          />
          <InputField
            type={"email"}
            title={"Email"}
            value={logginUser.email}
            disabled
          />
          <InputField
            type={"password"}
            title={"Password"}
            value={"********"}
            disabled
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilLayout;
