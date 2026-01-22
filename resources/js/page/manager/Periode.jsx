import { useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout";
import axios from "axios";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import Input from "../../components/Input";
import { FaPencil, FaRegTrashCan } from "react-icons/fa6";

function PeriodeManagement() {
    const [loading, setLoading] = useState(true);
    const [periodes, setPeriodes] = useState([]);

    // Modal states
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    // Form and selection state
    const [selectedPeriode, setSelectedPeriode] = useState(null);
    const [formData, setFormData] = useState({
        periode: "",
    });

    const dataRaw = localStorage.getItem("data");
    const tokenData = dataRaw ? JSON.parse(dataRaw) : null;
    const token = tokenData?.token;

    const fetchData = async () => {
        if (!token) return;
        setLoading(true);
        try {
            const res = await axios.get(
                "http://127.0.0.1:8000/api/v1/periodes",
                {
                    headers: { Authorization: `Bearer ${token}` },
                },
            );
            setPeriodes(res.data.data);
        } catch (error) {
            console.error("Error fetching periodes:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const resetForm = () => {
        setFormData({ periode: "" });
        setSelectedPeriode(null);
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                "http://127.0.0.1:8000/api/v1/periodes",
                formData,
                {
                    headers: { Authorization: `Bearer ${token}` },
                },
            );
            setIsCreateModalOpen(false);
            resetForm();
            fetchData();
        } catch (error) {
            console.error("Error creating periode:", error);
        }
    };

    const handleEdit = (periode) => {
        setSelectedPeriode(periode);
        setFormData({ periode: periode.periode || "" });
        setIsEditModalOpen(true);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(
                `http://127.0.0.1:8000/api/v1/periodes/${selectedPeriode.id}`,
                formData,
                {
                    headers: { Authorization: `Bearer ${token}` },
                },
            );
            setIsEditModalOpen(false);
            resetForm();
            fetchData();
        } catch (error) {
            console.error("Error updating periode:", error);
        }
    };

    const handleDeleteClick = (periode) => {
        setSelectedPeriode(periode);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            await axios.delete(
                `http://127.0.0.1:8000/api/v1/periodes/${selectedPeriode.id}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                },
            );
            setIsDeleteModalOpen(false);
            setSelectedPeriode(null);
            fetchData();
        } catch (error) {
            console.error("Error deleting periode:", error);
        }
    };

    return (
        <DashboardLayout>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-4">Periode Management</h1>
                <p>Halaman untuk mengatur periode kpi.</p>
            </div>
            <div className="bg-white my-8 p-6 rounded-lg shadow-md">
                <div className="w-full flex pb-4 justify-end border-b-2 border-gray-200">
                    <Button
                        variant="primary"
                        size="medium"
                        styling="rounded"
                        onClick={() => setIsCreateModalOpen(true)}
                    >
                        Tambah Periode
                    </Button>
                </div>
                <div className="py-6">
                    {loading ? (
                        <div className="text-center py-10 text-gray-500">
                            Loading periodes...
                        </div>
                    ) : periodes.length === 0 ? (
                        <div className="text-center py-10 text-gray-500">
                            Tidak ada periode tersedia.
                        </div>
                    ) : (
                        periodes.map((item, index) => (
                            <div
                                key={item.id}
                                className="bg-white border border-gray-100 p-6 my-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col md:flex-row justify-between items-center gap-4"
                            >
                                <div className="flex-1">
                                    <h2 className="text-xl font-bold text-gray-800 mb-1">
                                        {item.periode}
                                    </h2>
                                    <p className="text-gray-500 text-sm flex items-center gap-2">
                                        <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs font-medium">
                                            ID: {index}
                                        </span>
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="secondary"
                                        size="small"
                                        styling="rounded"
                                        onClick={() => handleEdit(item)}
                                    >
                                        <FaPencil />
                                    </Button>
                                    <Button
                                        variant="danger"
                                        size="small"
                                        styling="rounded"
                                        onClick={() => handleDeleteClick(item)}
                                    >
                                        <FaRegTrashCan />
                                    </Button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Create Modal */}
            <Modal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                title="Tambah Periode Baru"
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
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nama Periode
                    </label>
                    <Input
                        variant="primary"
                        size="large"
                        name="periode"
                        placeholder="Contoh: Januari 2026"
                        value={formData.periode}
                        onChange={handleInputChange}
                    />
                </div>
            </Modal>

            {/* Edit Modal */}
            <Modal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                title="Edit Periode"
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
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nama Periode
                    </label>
                    <Input
                        variant="primary"
                        size="large"
                        name="periode"
                        value={formData.periode}
                        onChange={handleInputChange}
                    />
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
                        Apakah Anda yakin ingin menghapus periode{" "}
                        <span className="font-bold text-gray-800">
                            "{selectedPeriode?.periode}"
                        </span>
                        ?
                    </p>
                </div>
            </Modal>
        </DashboardLayout>
    );
}

export default PeriodeManagement;
