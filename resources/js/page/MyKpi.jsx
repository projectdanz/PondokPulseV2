import { useEffect, useState } from "react";
import DashboardLayout from "./DashboardLayout";
import axios from "axios";
import Button from "../components/Button";
import Modal from "../components/Modal";
import Input from "../components/Input";
import { FaPencil, FaTrash, FaPlus } from "react-icons/fa6";

function MyKpi() {
    const [loading, setLoading] = useState(true);
    const [kpis, setKpis] = useState([]);
    const [periodes, setPeriodes] = useState([]);
    const [selectedPeriodeId, setSelectedPeriodeId] = useState("");
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedKpi, setSelectedKpi] = useState(null);
    const [summary, setSummary] = useState({
        totalScore: 0,
        averageAchievement: 0,
        status: "Normal",
    });

    const dataRaw = localStorage.getItem("data");
    const tokenData = dataRaw ? JSON.parse(dataRaw) : null;
    const token = tokenData?.token;
    const userRole = tokenData?.user?.role;
    const userId = tokenData?.user?.id;

    const [formData, setFormData] = useState({
        deskripsi: "",
        weight: "",
        target: "",
        achievement: 0,
    });

    const fetchPeriodes = async () => {
        if (!token || userRole !== "Manager") return;
        try {
            const res = await axios.get(
                "http://127.0.0.1:8000/api/v1/periodes",
                {
                    headers: { Authorization: `Bearer ${token}` },
                },
            );
            const myPeriodes = res.data.data.filter((p) => p.user_id === userId);
            setPeriodes(myPeriodes);
            if (myPeriodes.length > 0) {
                setSelectedPeriodeId(myPeriodes[0].id);
            }
        } catch (error) {
            console.error("Error fetching periodes:", error);
        }
    };

    const fetchData = async () => {
        if (!token) return;
        setLoading(true);
        try {
            const url =
                userRole === "Manager" && selectedPeriodeId
                    ? `http://127.0.0.1:8000/api/v1/kpis?periode_id=${selectedPeriodeId}&scope=my`
                    : "http://127.0.0.1:8000/api/v1/kpis?scope=my";

            const res = await axios.get(url, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = res.data.data;
            setKpis(data);

            // Calculate summary
            if (data.length > 0) {
                const totalScore = data.reduce(
                    (acc, curr) => acc + (curr.score || 0),
                    0,
                );
                const avgAchievements =
                    data.reduce((acc, curr) => {
                        const target = curr.target || 1;
                        const achievement = curr.achievement || 0;
                        return acc + (achievement / target) * 100;
                    }, 0) / data.length;

                let status = "Need Improvement";
                if (avgAchievements >= 100) status = "Exemplary";
                else if (avgAchievements >= 80) status = "Good";

                setSummary({
                    totalScore: Math.round(totalScore),
                    averageAchievement: Math.round(avgAchievements),
                    status,
                });
            } else {
                setSummary({
                    totalScore: 0,
                    averageAchievement: 0,
                    status: "Normal",
                });
            }
        } catch (error) {
            console.error("Error fetching personal KPIs:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userRole === "Manager") {
            fetchPeriodes();
        } else {
            fetchData();
        }
    }, []);

    useEffect(() => {
        if (userRole === "Manager" && selectedPeriodeId) {
            fetchData();
        }
    }, [selectedPeriodeId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                `http://127.0.0.1:8000/api/v1/periodes/${selectedPeriodeId}/kpis`,
                formData,
                {
                    headers: { Authorization: `Bearer ${token}` },
                },
            );
            setIsCreateModalOpen(false);
            setFormData({
                deskripsi: "",
                weight: "",
                target: "",
                achievement: 0,
            });
            fetchData();
        } catch (error) {
            console.error("Error creating KPI:", error);
        }
    };

    const handleEdit = (kpi) => {
        setSelectedKpi(kpi);
        setFormData({
            deskripsi: kpi.deskripsi,
            weight: kpi.weight,
            target: kpi.target,
            achievement: kpi.achievement,
        });
        setIsEditModalOpen(true);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(
                `http://127.0.0.1:8000/api/v1/periodes/${selectedKpi.periode_id}/kpis/${selectedKpi.id}`,
                formData,
                {
                    headers: { Authorization: `Bearer ${token}` },
                },
            );
            setIsEditModalOpen(false);
            fetchData();
        } catch (error) {
            console.error("Error updating KPI:", error);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(
                `http://127.0.0.1:8000/api/v1/periodes/${selectedKpi.periode_id}/kpis/${selectedKpi.id}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                },
            );
            setIsDeleteModalOpen(false);
            fetchData();
        } catch (error) {
            console.error("Error deleting KPI:", error);
        }
    };

    return (
        <DashboardLayout>
            <div className="bg-white p-6 rounded-lg shadow-md mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold mb-2">KPI Saya</h1>
                    <p className="text-gray-600">
                        Pantau performa dan pencapaian target personal Anda.
                    </p>
                </div>
                {userRole === "Manager" && (
                    <div className="flex gap-4 items-center">
                        <select
                            value={selectedPeriodeId}
                            onChange={(e) =>
                                setSelectedPeriodeId(e.target.value)
                            }
                            className="p-2 rounded-xl bg-[#061E29] text-[#F3F4F4] border-3 border-[#061E29] outline-none"
                        >
                            <option value="">-- Pilih Periode --</option>
                            {periodes.map((p) => (
                                <option key={p.id} value={p.id}>
                                    {p.periode}
                                </option>
                            ))}
                        </select>
                        <Button
                            variant="primary"
                            size="medium"
                            styling="rounded"
                            onClick={() => setIsCreateModalOpen(true)}
                        >
                            <FaPlus className="mr-2" /> Tambah KPI
                        </Button>
                    </div>
                )}
            </div>

            {loading ? (
                <div className="text-center py-20 text-gray-500">
                    Memuat data KPI...
                </div>
            ) : kpis.length === 0 ? (
                <div className="bg-white p-10 rounded-xl shadow-sm text-center text-gray-400">
                    Belum ada data KPI yang ditugaskan untuk Anda pada periode
                    ini.
                </div>
            ) : (
                <div className="space-y-8">
                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-gradient-to-br from-[#061E29] to-[#1D546D] p-6 rounded-2xl shadow-lg text-white">
                            <p className="text-sm opacity-80 mb-1">
                                Total Score
                            </p>
                            <h3 className="text-4xl font-black">
                                {summary.totalScore}
                            </h3>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-md border-b-4 border-blue-500">
                            <p className="text-sm text-gray-500 mb-1">
                                Rata-rata Pencapaian
                            </p>
                            <h3 className="text-4xl font-black text-gray-800">
                                {summary.averageAchievement}%
                            </h3>
                        </div>
                        <div
                            className={`p-6 rounded-2xl shadow-md border-b-4 ${
                                summary.status === "Exemplary"
                                    ? "bg-green-50 border-green-500 text-green-700"
                                    : summary.status === "Good"
                                      ? "bg-blue-50 border-blue-500 text-blue-700"
                                      : "bg-orange-50 border-orange-500 text-orange-700"
                            }`}
                        >
                            <p className="text-sm opacity-80 mb-1">
                                Status Performa
                            </p>
                            <h3 className="text-2xl font-black uppercase italic">
                                {summary.status}
                            </h3>
                        </div>
                    </div>

                    {/* KPI List */}
                    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                        <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
                            <h2 className="font-bold text-gray-700 tracking-wide">
                                DETAIL TARGET
                            </h2>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {kpis.map((kpi) => {
                                const percentage = Math.min(
                                    100,
                                    Math.round(
                                        (kpi.achievement / kpi.target) * 100,
                                    ) || 0,
                                );
                                return (
                                    <div
                                        key={kpi.id}
                                        className="p-6 hover:bg-gray-50/50 transition-colors"
                                    >
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                            <div className="flex-1">
                                                <h4 className="font-bold text-gray-800 text-lg mb-1">
                                                    {kpi.deskripsi}
                                                </h4>
                                                <p className="text-gray-400 text-sm">
                                                    Target:{" "}
                                                    <span className="text-gray-600 font-medium">
                                                        {kpi.target}
                                                    </span>{" "}
                                                    | Achievement:{" "}
                                                    <span className="text-gray-600 font-medium">
                                                        {kpi.achievement || 0}
                                                    </span>
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-black uppercase ${
                                                        kpi.status ===
                                                        "achieved"
                                                            ? "bg-green-100 text-green-700"
                                                            : kpi.status ===
                                                                "warning"
                                                              ? "bg-yellow-100 text-yellow-700"
                                                              : "bg-red-100 text-red-700"
                                                    }`}
                                                >
                                                    {kpi.status}
                                                </span>
                                                <div className="mt-1 text-2xl font-black text-[#061E29]">
                                                    {kpi.score}
                                                    <span className="text-xs font-normal text-gray-400 ml-1">
                                                        pts
                                                    </span>
                                                </div>
                                                {userRole === "Manager" && (
                                                    <div className="flex justify-end gap-2 mt-2">
                                                        <button
                                                            onClick={() =>
                                                                handleEdit(kpi)
                                                            }
                                                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                        >
                                                            <FaPencil
                                                                size={14}
                                                            />
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                setSelectedKpi(
                                                                    kpi,
                                                                );
                                                                setIsDeleteModalOpen(
                                                                    true,
                                                                );
                                                            }}
                                                            className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                        >
                                                            <FaTrash
                                                                size={14}
                                                            />
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Progress Bar */}
                                        <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                                            <div
                                                className={`h-full transition-all duration-1000 ${
                                                    percentage >= 100
                                                        ? "bg-green-500"
                                                        : percentage >= 80
                                                          ? "bg-yellow-500"
                                                          : "bg-red-500"
                                                }`}
                                                style={{
                                                    width: `${percentage}%`,
                                                }}
                                            ></div>
                                        </div>
                                        <div className="flex justify-between mt-2">
                                            <span className="text-[10px] text-gray-400 font-medium uppercase tracking-tighter">
                                                Progress: {percentage}%
                                            </span>
                                            <span className="text-[10px] text-gray-400 font-medium uppercase tracking-tighter">
                                                Weight: {kpi.weight}%
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}

            {/* Create & Edit Modal */}
            <Modal
                isOpen={isCreateModalOpen || isEditModalOpen}
                onClose={() => {
                    setIsCreateModalOpen(false);
                    setIsEditModalOpen(false);
                }}
                title={
                    isCreateModalOpen
                        ? "Tambah KPI Personal"
                        : "Edit KPI Personal"
                }
                footer={
                    <>
                        <Button
                            variant="secondary"
                            size="medium"
                            styling="rounded"
                            onClick={() => {
                                setIsCreateModalOpen(false);
                                setIsEditModalOpen(false);
                            }}
                        >
                            Batal
                        </Button>
                        <Button
                            variant="primary"
                            size="medium"
                            styling="rounded"
                            onClick={
                                isCreateModalOpen ? handleCreate : handleUpdate
                            }
                        >
                            {isCreateModalOpen ? "Simpan" : "Update"}
                        </Button>
                    </>
                }
            >
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Deskripsi Target
                        </label>
                        <textarea
                            name="deskripsi"
                            value={formData.deskripsi}
                            onChange={handleInputChange}
                            className="w-full p-2 rounded-xl bg-[#061E29] text-[#F3F4F4] border-3 border-[#061E29] outline-none"
                            rows="3"
                        ></textarea>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Weight (%)
                            </label>
                            <Input
                                name="weight"
                                type="number"
                                value={formData.weight}
                                onChange={handleInputChange}
                                variant="primary"
                                size="large"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Target
                            </label>
                            <Input
                                name="target"
                                type="number"
                                value={formData.target}
                                onChange={handleInputChange}
                                variant="primary"
                                size="large"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Achievement (Pencapaian)
                        </label>
                        <Input
                            name="achievement"
                            type="number"
                            value={formData.achievement}
                            onChange={handleInputChange}
                            variant="primary"
                            size="large"
                        />
                    </div>
                </div>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                title="Hapus KPI?"
                footer={
                    <>
                        <Button
                            variant="secondary"
                            size="medium"
                            styling="rounded"
                            onClick={() => setIsDeleteModalOpen(false)}
                        >
                            Batal
                        </Button>
                        <Button
                            variant="danger"
                            size="medium"
                            styling="rounded"
                            onClick={handleDelete}
                        >
                            Ya, Hapus
                        </Button>
                    </>
                }
            >
                <p className="text-gray-600">
                    Apakah Anda yakin ingin menghapus target KPI ini? Tindakan
                    ini tidak dapat dibatalkan.
                </p>
            </Modal>
        </DashboardLayout>
    );
}

export default MyKpi;
