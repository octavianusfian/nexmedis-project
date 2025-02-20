import React from "react";
import InputField from "../UI/InputField";
import { useState } from "react";
import Button from "../UI/Button";
import { Link, useNavigate } from "react-router";
import { message } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";

const LoginSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const users = useSelector((state) => state.users);

  console.log(users); // ✅ Benar

  const errorMessage = (content) => {
    messageApi.open({
      type: "error",
      content,
    });
  };
  const successMessage = (content) => {
    messageApi.open({
      type: "success",
      content,
    });
  };
  async function handleLogin(event) {
    event.preventDefault();

    if (!email) {
      errorMessage("Email Kosong, Silahkan masukan email");
      return;
    }
    if (!password) {
      errorMessage("Password Kosong, Silahkan masukan password");
      return;
    }
    if (!email.includes("@")) {
      errorMessage("Email tidak sesuai, Silahkan masukkan email yang benar");
      return;
    }
    // if (password.trim().length < 8) {
    //   errorMessage(
    //     "Password minimal 8 karakter, Silahkan masukkan password yang benar"
    //   );
    //   return;
    // }
    setLoading(true);
    try {
      const sendData = {
        email,
        password,
      };
      const res = await axios.post("https://reqres.in/api/login", sendData);
      if (res.data.token) {
        Cookies.set("authToken", res.data.token, { expires: 1 }); // Simpan token selama 1 hari
        // dispatch(addLogginEmail({ email: email }));
        localStorage.setItem("logginEmail", email);
        successMessage("Login berhasil");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      errorMessage(
        error.response.data.error || "Login Gagal, Mohon Coba Kembali"
      );
    }
    setLoading(false);
  }
  return (
    <>
      {contextHolder}
      <div className="w-[100%] bg-white rounded-2xl text-center flex  flex-col items-center py-[2rem] px-[3rem]  lg:w-[45%] ">
        <div className="flex-grow w-full">
          <p className="text-lg font-medium mb-7">Nexmedis</p>
          <h2 className="text-3xl font-semibold mb-3 lg:text-2xl xl:text-3xl ">
            Welcome back!
          </h2>
          <p className="mb-7 text-md lg:text-sm xl:text-md">
            Please enter your details
          </p>
          <form method="post">
            <InputField
              type={"email"}
              title={"Email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputField
              type={"password"}
              title={"Password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              className={"mt-3"}
              type="primary"
              htmlType="submit"
              width={"100%"}
              onClick={handleLogin}
              loading={loading}
            >
              Log In
            </Button>
          </form>
        </div>
        <p className="text-sm ">
          Don't have an account?{" "}
          <Link className="!font-medium !text-black" to={"/register"}>
            Sign Up
          </Link>
        </p>
      </div>
    </>
  );
};

export default LoginSection;
