import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Ikon dari react-icons

const InputField = ({ type, title, value, onChange, disabled, className }) => {
  const [showPassword, setShowPassword] = useState(false);
  // Fungsi untuk toggle visibility password
  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <div className={`mb-4 w-full ${className}`}>
      <label
        htmlFor={type}
        className="block text-md font-medium text-gray-800 mb-2"
      >
        <span className="block text-sm font-semibold text-gray-900 text-start">
          {title}
        </span>
      </label>
      <div className="relative">
        <input
          type={showPassword ? "text" : type}
          name={type}
          value={value}
          disabled={disabled}
          onChange={onChange}
          placeholder={`Input ${title}...`}
          className="w-full px-3 py-1 border-2 text-md border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition duration-300 ease-in-out transform hover:scale-105"
        />
        {type === "password" && !disabled && (
          <button
            type="button"
            onClick={togglePassword} // Toggle password visibility saat ikon diklik
            className="absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500 text-lg "
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}{" "}
            {/* Menampilkan ikon mata */}
          </button>
        )}
      </div>
    </div>
  );
};

export default InputField;
