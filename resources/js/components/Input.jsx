import { useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";

const Input = ({ type, placeholder, variant, size, value, name, onChange }) => {
    const [showPassword, setShowPassword] = useState(false)
    const isPassword = type === "password"

    const variants = {
        primary: "bg-[#061E29] text-[#F3F4F4] border-3 border-[#061E29] outline-none focus:border-3 focus:border-[#5F9598]",
        secondary: "bg-[#296374] text-[#EDEDCE] border-3 border-[#296374] outline-none focus:border-3 focus:border-[#629FAD]",
        tertiary: "bg-[#E37434] text-[#BDE8F5] border-3 border-[#E37434] outline-none focus:border-3 focus:border-[#91C6BC]",
    }

    const sizes = {
        small: "p-2 rounded-xl w-full",
        medium: "p-2 rounded-xl w-full",
        large: "p-2 rounded-xl w-full",
    }

    const boxSize = {
        small: "w-48",
        medium: "w-[70%]",
        large: "w-full",
    }

    const textEye = {
        primary : "text-[#F3F4F4]",
        secondary : "text-[#EDEDCE]",
        tertiary : "text-[#BDE8F5]"
    }

    const className = `
    ${variants[variant]}
    ${sizes[size]}
    `
 
    return (
        <>
        <div className={`relative ${boxSize[size]}`}>
            <input
                type={isPassword && showPassword ? "text" : type}
                placeholder={placeholder}
                className={className}
                value={value}
                name={name}
                onChange={onChange}
            />

            {isPassword && (
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold ${textEye[variant]} focus:outline-none`}
        >
          {showPassword ? <FaEye /> : <FaEyeSlash />}
        </button>
      )}
    </div>
        </>
    )
}

export default Input