import React, { useState } from "react";
import Button from "../UI/Button";
import { RiLogoutCircleLine } from "react-icons/ri";
import { IoPersonSharp } from "react-icons/io5";
import { useNavigate } from "react-router";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect } from "react";
import UserManagement from "../UserManagement";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLogginUser,
  fetchUsers,
  removeLogginUser,
} from "../../redux/userSlice";

const HomeLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, status, logginUser } = useSelector((state) => state.users);
  useEffect(() => {
    if (status === "idle" || status === "failed") {
      dispatch(fetchUsers())
        .unwrap() // Menunggu fetchUsers selesai
        .then(() => {
          dispatch(fetchLogginUser());
        })
        .catch((error) => {
          console.error("Gagal mengambil users:", error);
        });
    }
  }, [status, dispatch]);

  // useEffect(() => {
  //   if (status === "idle") {
  //     dispatch(fetchLogginUser());
  //   }
  // }, [dispatch, status]);

  function handleToProfil() {
    navigate("/profil");
  }

  function handleToLogout() {
    Cookies.remove("authToken"); // Hapus token di cookies
    localStorage.removeItem("logginEmail");
    dispatch(removeLogginUser());
    setTimeout(() => {
      navigate("/login");
    }, 200);
  }

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <div className="w-[70vw] min-h-[85vh] bg-white text-black rounded-2xl p-2  ">
      <div className="h-full w-full p-4 relative flex flex-col gap-4 items-center lg:p-7">
        <Button
          className={"absolute right-4 top-4 lg:right-7 lg:top-7"}
          icon={<RiLogoutCircleLine />}
          onClick={handleToLogout}
        >
          <div className="hidden md:block ">Logout</div>
        </Button>

        <Button
          // width={"140px"}
          icon={<IoPersonSharp />}
          className={"absolute left-4 top-4 lg:left-7 lg:top-7"}
          onClick={handleToProfil}
        >
          <div className="hidden md:block ">Profil</div>
        </Button>

        <h3 className="text-2xl md:text-4xl font-bold mt-15 mb-5">
          Welcome {logginUser.first_name}!
        </h3>

        <UserManagement />
      </div>
    </div>
  );
};

export default HomeLayout;
