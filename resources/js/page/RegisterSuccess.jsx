import { FaRegUser, FaCopy, FaCheck } from "react-icons/fa6";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterSuccess() {
  const navigate = useNavigate();
  const data = JSON.parse(localStorage.getItem("data"));
  const user = data?.credentical;

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = `Email: ${user.email}\nPassword: ${user.password}`;
    await navigator.clipboard.writeText(text);

    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    navigate("/auth");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-300 p-4 relative">
      {/* Background blur */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#5F9598] rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#296374] rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-[#F3F4F4] rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-[#061E29] px-8 py-10 text-center relative">
            <div className="absolute inset-0 bg-[#1D546D] opacity-10"></div>

            <div className="flex justify-center mb-4">
              <div className="w-24 h-24 bg-[#296374] rounded-full flex items-center justify-center shadow-lg border-4 border-[#5F9598]">
                <FaRegUser className="w-12 h-12 text-[#F3F4F4]" />
              </div>
            </div>

            <h2 className="text-white text-xl font-semibold">
              Registrasi Berhasil
            </h2>
            <p className="text-gray-300 text-sm mt-1">
              Simpan data akun kamu dengan baik
            </p>
          </div>

          {/* Content */}
          <div className="px-8 py-8 space-y-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Email</p>
              <div className="bg-gray-800 text-white px-5 py-3 rounded-xl font-medium">
                {user.email}
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">Password</p>
              <div className="bg-gray-200 text-gray-800 px-5 py-3 rounded-xl font-mono">
                {user.password}
              </div>
            </div>

            {/* Copy Button */}
            <button
              onClick={handleCopy}
              className="w-full mt-6 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition
                bg-[#296374] text-white hover:bg-[#1D546D] active:scale-[0.98]"
            >
              {copied ? (
                <>
                  <FaCheck /> Copied
                </>
              ) : (
                <>
                  <FaCopy /> Copy Email & Password
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterSuccess;
