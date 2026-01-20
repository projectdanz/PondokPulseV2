import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import api from "../lib/axios";
import { FaRegUser } from "react-icons/fa6";

function Auth() {
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: "",
        password: "",
        name: "",
        date: "", 
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const endPoint = isLogin ? "/login" : "/register";
        const dashboardMap = {
            Manager: "/dashboard/manager",
            Koordinator: "/dashboard/koordinator",
            Karyawan: "/dashboard/karyawan"
        }
        const payLoad = isLogin ? {
            email: form.email,
            password: form.password,
        } : {
            name: form.name,
            birth_date: form.date,
        }
        
        try {
            const res = await api.post(endPoint, payLoad)
            const data = res.data;
            localStorage.setItem("data", JSON.stringify(data));
            const role = await data.user.role
            console.log(role)
            console.log(data)
            {isLogin ? navigate(dashboardMap[role]) : navigate("/register-success")};
        } catch (error) {
            if (error.response) {
                console.log("STATUS:", error.response.status);
                console.log("ERROR DATA:", error.response.data);
            } else {
                console.log(error);
            }
        }
    }
    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-300 p-4 relative">
            {/* Subtle Background Decoration */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#5F9598] rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#296374] rounded-full blur-3xl"></div>
            </div>

            {/* Auth Card */}
            <div className="w-full max-w-md relative z-10">
                <div className="bg-[#F3F4F4] rounded-2xl shadow-2xl overflow-hidden">
                    {/* Header Section */}
                    <div className="bg-[#061E29] px-8 py-10 text-center relative">
                        <div className="absolute inset-0 bg-[#1D546D] opacity-10"></div>

                        {/* Logo/Avatar */}
                        <div className="flex justify-center mb-6">
                            <div className="relative">
                                <div className="w-24 h-24 bg-[#296374] rounded-full flex items-center justify-center shadow-lg border-4 border-[#5F9598]">
                                    <FaRegUser className="w-12 h-12 text-[#F3F4F4]" />
                                </div>
                            </div>
                        </div>

                        {/* Title */}
                        <h2 className="text-3xl font-bold text-[#F3F4F4] mb-2 relative z-10">
                            {isLogin ? "Selamat Datang" : "Daftar Akun"}
                        </h2>
                        <p className="text-[#BDE8F5] text-sm relative z-10">
                            {isLogin
                                ? "Masuk untuk melanjutkan"
                                : "Buat akun baru Anda"}
                        </p>
                    </div>

                    {/* Form Section */}
                    <div className="px-8 py-8">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="space-y-2">
                                <label
                                    className="block text-sm font-semibold text-[#061E29]"
                                    htmlFor="email"
                                >
                                    {isLogin ? "Email" : "Nama Lengkap"}
                                </label>
                                <Input
                                    type={isLogin ? "email" : "text"}
                                    value={isLogin ? form.email : form.name}
                                    name={isLogin ? "email" : "name"}
                                    onChange={handleChange}
                                    placeholder={
                                        isLogin
                                            ? "Masukkan email Anda..."
                                            : "Masukkan nama lengkap..."
                                    }
                                    variant="primary"
                                    size="large"
                                />
                            </div>

                            <div className="space-y-2">
                                <label
                                    className="block text-sm font-semibold text-[#061E29]"
                                    htmlFor="password"
                                >
                                    {isLogin ? "Password" : "Tanggal Lahir"}
                                </label>
                                <Input
                                    type={isLogin ? "password" : "date"}
                                    value={isLogin ? form.password : form.date}
                                    name={isLogin ? "password" : "date"}
                                    onChange={handleChange}
                                    placeholder={
                                        isLogin
                                            ? "Masukkan password..."
                                            : "DD/MM/YYYY"
                                    }
                                    variant="primary"
                                    size="large"
                                />
                            </div>

                            <div className="pt-2 flex justify-center">
                                <Button
                                    variant="primary"
                                    size="medium"
                                    type="submit"
                                    styling="circle"
                                >
                                    {isLogin ? "Masuk" : "Daftar"}
                                </Button>
                            </div>
                        </form>

                        {/* Toggle Auth Mode */}
                        <div className="mt-6 text-center">
                            <p className="text-[#061E29] text-sm">
                                {isLogin
                                    ? "Belum punya akun?"
                                    : "Sudah punya akun?"}{" "}
                                <button
                                    type="button"
                                    className="text-[#296374] hover:text-[#1D546D] font-semibold transition-colors hover:underline"
                                    onClick={() => setIsLogin(!isLogin)}
                                >
                                    {isLogin ? "Daftar sekarang" : "Masuk"}
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Auth;
