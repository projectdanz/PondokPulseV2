import { useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout";
import axios from "axios";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import Input from "../../components/Input";
import { FaPencil, FaRegTrashCan, FaPlus } from "react-icons/fa6";

function KpiManagement() {
    const [loading, setLoading] = useState(true);
    const [kpis, setKpis] = useState([]);
    const [periodes, setPeriodes] = useState([]);
    const [selectedPeriodeId, setSelectedPeriodeId] = useState("");

    // Modal states
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    // Form and selection state
    const [selectedKpi, setSelectedKpi] = useState(null);
    const [formData, setFormData] = useState({
        deskripsi: "",
        weight: "",
        target: "",
        achievement: "",
    });

    const dataRaw = localStorage.getItem("data");
    const tokenData = dataRaw ? JSON.parse(dataRaw) : null;
    const token = tokenData?.token;

    const fetchPeriodes = async () => {
        if (!token) return;
        try {
            const res = await axios.get(
                "http://127.0.0.1:8000/api/v1/periodes",
                {
                    headers: { Authorization: `Bearer ${token}` },
                },
            );
            setPeriodes(res.data.data);
            if (res.data.data.length > 0) {
                setSelectedPeriodeId(res.data.data[0].id);
            }
        } catch (error) {
            console.error("Error fetching periodes:", error);
        }
    };

    const fetchKpis = async () => {
        if (!token) return;
        setLoading(true);
        try {
            const res = await axios.get("http://127.0.0.1:8000/api/v1/kpis", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setKpis(res.data.data);
        } catch (error) {
            console.error("Error fetching KPIs:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPeriodes();
        fetchKpis();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const resetForm = () => {
        setFormData({
            deskripsi: "",
            weight: "",
            target: "",
            achievement: "",
        });
        setSelectedKpi(null);
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!selectedPeriodeId) return alert("Pilih periode terlebih dahulu");
        try {
            await axios.post(
                `http://127.0.0.1:8000/api/v1/periodes/${selectedPeriodeId}/kpis`,
                formData,
                {
                    headers: { Authorization: `Bearer ${token}` },
                },
            );
            setIsCreateModalOpen(false);
            resetForm();
            fetchKpis();
        } catch (error) {
            console.error("Error creating KPI:", error);
        }
    };

    const handleEdit = (kpi) => {
        setSelectedKpi(kpi);
        setFormData({
            deskripsi: kpi.deskripsi || "",
            weight: kpi.weight || "",
            target: kpi.target || "",
            achievement: kpi.achievement || "",
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
            resetForm();
            fetchKpis();
        } catch (error) {
            console.error("Error updating KPI:", error);
        }
    };

    const handleDeleteClick = (kpi) => {
        setSelectedKpi(kpi);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            await axios.delete(
                `http://127.0.0.1:8000/api/v1/periodes/${selectedKpi.periode_id}/kpis/${selectedKpi.id}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                },
            );
            setIsDeleteModalOpen(false);
            setSelectedKpi(null);
            fetchKpis();
        } catch (error) {
            console.error("Error deleting KPI:", error);
        }
    };

    return (
        <DashboardLayout>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-4">KPI Management</h1>
                <p>Halaman untuk mengatur target KPI.</p>
            </div>

            <div className="bg-white my-8 p-6 rounded-lg shadow-md">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 pb-4 border-b-2 border-gray-200">
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <span className="text-sm font-medium text-gray-700">
                            Periode:
                        </span>
                        <select
                            value={selectedPeriodeId}
                            onChange={(e) =>
                                setSelectedPeriodeId(e.target.value)
                            }
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                        >
                            <option value="">Pilih Periode</option>
                            {periodes.map((p) => (
                                <option key={p.id} value={p.id}>
                                    {p.periode}
                                </option>
                            ))}
                        </select>
                    </div>
                    <Button
                        variant="primary"
                        size="medium"
                        styling="rounded"
                        onClick={() => setIsCreateModalOpen(true)}
                    >
                        <FaPlus className="mr-2" /> Tambah KPI
                    </Button>
                </div>

                <div className="py-6 overflow-x-auto">
                    {loading ? (
                        <div className="text-center py-10 text-gray-500">
                            Loading KPIs...
                        </div>
                    ) : kpis.length === 0 ? (
                        <div className="text-center py-10 text-gray-500">
                            Tidak ada KPI tersedia.
                        </div>
                    ) : (
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-sm font-bold text-gray-700 border-b">
                                        Deskripsi
                                    </th>
                                    <th className="px-4 py-3 text-sm font-bold text-gray-700 border-b text-center">
                                        Weight
                                    </th>
                                    <th className="px-4 py-3 text-sm font-bold text-gray-700 border-b text-center">
                                        Target
                                    </th>
                                    <th className="px-4 py-3 text-sm font-bold text-gray-700 border-b text-center">
                                        Achievement
                                    </th>
                                    <th className="px-4 py-3 text-sm font-bold text-gray-700 border-b text-center">
                                        Score
                                    </th>
                                    <th className="px-4 py-3 text-sm font-bold text-gray-700 border-b text-center">
                                        Status
                                    </th>
                                    <th className="px-4 py-3 text-sm font-bold text-gray-700 border-b text-center">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {kpis.map((kpi) => (
                                    <tr
                                        key={kpi.id}
                                        className="hover:bg-gray-50"
                                    >
                                        <td className="px-4 py-4 text-sm text-gray-800 border-b">
                                            {kpi.deskripsi}
                                        </td>
                                        <td className="px-4 py-4 text-sm text-center text-gray-800 border-b font-medium">
                                            {kpi.weight}%
                                        </td>
                                        <td className="px-4 py-4 text-sm text-center text-gray-800 border-b">
                                            {kpi.target}
                                        </td>
                                        <td className="px-4 py-4 text-sm text-center text-gray-800 border-b">
                                            {kpi.achievement || 0}
                                        </td>
                                        <td className="px-4 py-4 text-sm text-center text-gray-800 border-b font-bold">
                                            {kpi.score}
                                        </td>
                                        <td className="px-4 py-4 text-sm text-center border-b">
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs font-bold ${
                                                    kpi.status === "achieved"
                                                        ? "bg-green-100 text-green-700"
                                                        : kpi.status ===
                                                            "warning"
                                                          ? "bg-yellow-100 text-yellow-700"
                                                          : "bg-red-100 text-red-700"
                                                }`}
                                            >
                                                {kpi.status?.toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 text-sm text-center border-b">
                                            <div className="flex justify-center gap-2">
                                                <button
                                                    onClick={() =>
                                                        handleEdit(kpi)
                                                    }
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                                                >
                                                    <FaPencil />
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleDeleteClick(kpi)
                                                    }
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                                >
                                                    <FaRegTrashCan />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {/* Create Modal */}
            <Modal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                title="Tambah KPI Baru"
                footer={
                    <>
                        <Button
                            variant="secondary"
                            size="medium"
                            styling="rounded"
                            onClick={() => setIsCreateModalOpen(false)}
                        >
                            Batal
                        </Button>
                        <Button
                            variant="primary"
                            size="medium"
                            styling="rounded"
                            onClick={handleCreate}
                        >
                            Simpan
                        </Button>
                    </>
                }
            >
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Deskripsi KPI
                        </label>
                        <Input
                            variant="primary"
                            size="large"
                            name="deskripsi"
                            placeholder="Deskripsi target..."
                            value={formData.deskripsi}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Weight (%)
                            </label>
                            <Input
                                variant="primary"
                                size="large"
                                name="weight"
                                type="number"
                                placeholder="1-100"
                                value={formData.weight}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Target
                            </label>
                            <Input
                                variant="primary"
                                size="large"
                                name="target"
                                type="number"
                                placeholder="Contoh: 10"
                                value={formData.target}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                </div>
            </Modal>

            {/* Edit Modal */}
            <Modal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                title="Edit KPI"
                footer={
                    <>
                        <Button
                            variant="secondary"
                            size="medium"
                            styling="rounded"
                            onClick={() => setIsEditModalOpen(false)}
                        >
                            Batal
                        </Button>
                        <Button
                            variant="primary"
                            size="medium"
                            styling="rounded"
                            onClick={handleUpdate}
                        >
                            Update
                        </Button>
                    </>
                }
            >
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Deskripsi KPI
                        </label>
                        <Input
                            variant="primary"
                            size="large"
                            name="deskripsi"
                            value={formData.deskripsi}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Weight (%)
                            </label>
                            <Input
                                variant="primary"
                                size="large"
                                name="weight"
                                type="number"
                                value={formData.weight}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Target
                            </label>
                            <Input
                                variant="primary"
                                size="large"
                                name="target"
                                type="number"
                                value={formData.target}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Achievement
                        </label>
                        <Input
                            variant="primary"
                            size="large"
                            name="achievement"
                            type="number"
                            value={formData.achievement}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                title="Konfirmasi Hapus"
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
                            onClick={handleDeleteConfirm}
                        >
                            Hapus
                        </Button>
                    </>
                }
            >
                <div className="text-center">
                    <div className="bg-red-100 text-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FaRegTrashCan className="text-2xl" />
                    </div>
                    <p className="text-gray-600">
                        Apakah Anda yakin ingin menghapus KPI ini?
                    </p>
                </div>
            </Modal>
        </DashboardLayout>
    );
}

export default KpiManagement;
