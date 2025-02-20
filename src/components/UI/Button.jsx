import React, { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router";

const Button = ({
  children,
  width,
  type = "primary",
  className,
  icon,
  loading,
  disabled,
  onClick,
  to,
  ...restProps
}) => {
  const navigate = useNavigate();
  function changeRoute() {
    navigate(to);
  }
  return (
    <button
      style={{
        width: width,
      }}
      className={`rounded-2xl mb-3 bg-${
        loading || disabled
          ? "[#E9E9E9]"
          : type === "primary"
          ? "black"
          : "[#E9E9E9]"
      } text-white  py-2 px-5 font-semibold cursor-${
        loading ? "not-allowed" : "pointer"
      } transform hover:scale-105 transition-all duration-200 ease-in-out flex items-center justify-center gap-x-2 ${className}`}
      disabled={loading || disabled}
      onClick={to ? changeRoute : onClick}
      {...restProps}
    >
      {loading ? (
        <>
          <FaSpinner className="animate-spin" />
          <span>Loading...</span>
        </>
      ) : (
        <>
          {icon && <span className="text-lg">{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;
