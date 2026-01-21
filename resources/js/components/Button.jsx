import { useState } from "react";

const Button = ({
    children,
    onClick,
    variant,
    size,
    styling,
    type,
    className = "",
}) => {
    const [loading, setLoading] = useState(false);

    const variants = {
        primary: "bg-[#061E29] hover:bg-[#1D546D] text-[#F3F4F4]",
        secondary: "bg-[#296374] hover:bg-[#629FAD] text-[#EDEDCE]",
        danger: "bg-[#91C6BC] text-[#F6F3C2] hover:bg-[#E37434]",
        light: "hover:bg-[#1C4D8D] bg-[#4988C4] text-[#BDE8F5]",
    };

    const sizes = {
        small: "h-10 w-10 flex-shrink-0 text-lg",
        medium: "py-2 w-[8rem] tracking-wider font-semibold",
        large: "py-3 w-3xs font-bold text-2xl tracking-wider",
    };

    const styles = {
        circle: "rounded-full",
        square: "rounded-none",
        rounded: "rounded-lg",
    };

    const baseClass =
        "inline-flex items-center justify-center transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";

    const combinedClassName = `
    ${baseClass}
    ${variants[variant] || ""}
    ${sizes[size] || ""}
    ${styles[styling] || ""}
    ${className}
    `;

    return (
        <button type={type} className={combinedClassName} onClick={onClick}>
            {loading ? "Loading..." : children}
        </button>
    );
};

export default Button;
