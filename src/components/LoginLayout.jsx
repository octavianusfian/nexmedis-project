import React from "react";
import Ilustrate from "./Ilustrate";
import LoginSection from "./Login/LoginSection";
import RegisterSection from "./Login/RegisterSection";
const LoginLayout = () => {
  const currentPath = window.location.pathname.slice(1);
  console.log(currentPath);

  return (
    <div className="h-[90vh] w-[80vw] bg-[#E9E9E9] text-black rounded-2xl p-2 lg:w-[60vw] lg:h-[80vh]">
      <div className="flex h-full w-full">
        <Ilustrate />
        {currentPath === "login" ? <LoginSection /> : <RegisterSection />}
      </div>
    </div>
  );
};

export default LoginLayout;
