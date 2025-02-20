import React from "react";
import InputField from "../UI/InputField";
import { useState } from "react";
import Button from "../UI/Button";
import { Link, useNavigate } from "react-router";
import { message } from "antd";
import axios from "axios";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";

const RegisterSection = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
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
  async function handleRegister(event) {
    event.preventDefault();
    if (!name) {
      errorMessage("Nama Kosong, Silahkan masukan nama");
      return;
    }
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
      const res = await axios.post("https://reqres.in/api/register", sendData);
      if (res.data.token) {
        Cookies.set("authToken", res.data.token, { expires: 1 }); // Simpan token selama 1 hari
        // dispatch(addLogginEmail({ email: email }));
        localStorage.setItem("logginEmail", email);
        successMessage("Register berhasil");
        navigate("/");
      }
    } catch (error) {
      errorMessage(
        error.response.data.error || "Register Gagal, Mohon Coba Kembali"
      );
    }
    setLoading(false);
  }
  return (
    <>
      {contextHolder}
      <div className="w-[100%] bg-white rounded-2xl text-center flex  flex-col items-center py-[1.5rem] px-[2rem] lg:py-[1.5rem] lg:px-[2.5rem]  lg:w-[45%] ">
        <div className="flex-grow w-full">
          <p className="text-lg font-medium mb-3 xl:mb-7">Nexmedis</p>
          <h2 className="text-2xl font-semibold mb-1 lg:text-xl xl:text-2xl xl:mb-3">
            Welcome Member!
          </h2>
          <p className="mb-3 text-md lg:text-sm xl:text-md xl:mb-7">
            Please enter your details
          </p>
          <form method="post">
            <InputField
              type={"text"}
              title={"Name"}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
              width={"100%"}
              htmlType="submit"
              onClick={handleRegister}
              loading={loading}
            >
              Register
            </Button>
          </form>
        </div>
        <p className="text-sm ">
          Already have an account?{" "}
          <Link className="!font-medium !text-black" to={"/login"}>
            Log in
          </Link>
        </p>
      </div>
    </>
  );
};

export default RegisterSection;
