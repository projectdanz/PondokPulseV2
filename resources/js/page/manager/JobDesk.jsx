import { useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout";
import axios from "axios";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import Input from "../../components/Input";
import { FaPencil, FaRegTrashCan, FaPlus } from "react-icons/fa6";

function JobDeskManagement() {
    const [loading, setLoading] = useState(true);
    const [jobDesks, setJobDesks] = useState([]);

    // Modal states
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    // Form and selection state
    const [selectedJob, setSelectedJob] = useState(null);
    const [formData, setFormData] = useState({
        name_job: "",
        description_job: "",
    });

    const dataRaw = localStorage.getItem("data");
    const tokenData = dataRaw ? JSON.parse(dataRaw) : null;
    const token = tokenData?.token;

    const fetchData = async () => {
        if (!token) return;
        setLoading(true);
        try {
            const res = await axios.get(
                "http://127.0.0.1:8000/api/v1/jobdesks",
                {
                    headers: { Authorization: `Bearer ${token}` },
                },
            );
            setJobDesks(res.data.data);
        } catch (error) {
            console.error("Error fetching jobdesks:", error);
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
        setFormData({ name_job: "", description_job: "" });
        setSelectedJob(null);
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                "http://127.0.0.1:8000/api/v1/jobdesks",
                formData,
                {
                    headers: { Authorization: `Bearer ${token}` },
                },
            );
            setIsCreateModalOpen(false);
            resetForm();
            fetchData();
        } catch (error) {
            console.error("Error creating jobdesk:", error);
        }
    };

    const handleEdit = (job) => {
        setSelectedJob(job);
        setFormData({
            name_job: job.name_job || "",
            description_job: job.description_job || "",
        });
        setIsEditModalOpen(true);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(
                `http://127.0.0.1:8000/api/v1/jobdesks/${selectedJob.id}`,
                formData,
                {
                    headers: { Authorization: `Bearer ${token}` },
                },
            );
            setIsEditModalOpen(false);
            resetForm();
            fetchData();
        } catch (error) {
            console.error("Error updating jobdesk:", error);
        }
    };

    const handleDeleteClick = (job) => {
        setSelectedJob(job);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            await axios.delete(
                `http://127.0.0.1:8000/api/v1/jobdesks/${selectedJob.id}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                },
            );
            setIsDeleteModalOpen(false);
            setSelectedJob(null);
            fetchData();
        } catch (error) {
            console.error("Error deleting jobdesk:", error);
        }
    };

    return (
        <DashboardLayout>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-4">JobDesk Management</h1>
                <p>Halaman untuk mengatur deskripsi pekerjaan.</p>
            </div>
            <div className="bg-white my-8 p-6 rounded-lg shadow-md">
                <div className="w-full flex pb-4 justify-end border-b-2 border-gray-200">
                    <Button
                        variant="primary"
                        size="medium"
                        styling="rounded"
                        onClick={() => setIsCreateModalOpen(true)}
                    >
                        <FaPlus className="mr-2" /> Tambah JobDesk
                    </Button>
                </div>
                <div className="py-6">
                    {loading ? (
                        <div className="text-center py-10 text-gray-500">
                            Loading jobdesks...
                        </div>
                    ) : jobDesks.length === 0 ? (
                        <div className="text-center py-10 text-gray-500">
                            Tidak ada jobdesk tersedia.
                        </div>
                    ) : (
                        jobDesks.map((job, index) => (
                            <div
                                key={job.id}
                                className="bg-white border border-gray-100 p-6 my-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col md:flex-row justify-between items-center gap-4"
                            >
                                <div className="flex-1">
                                    <h2 className="text-xl font-bold text-gray-800 mb-1">
                                        {job.name_job}
                                    </h2>
                                    <p className="text-gray-600 text-sm mb-2">
                                        {job.description_job}
                                    </p>
                                    <p className="text-gray-500 text-sm flex items-center gap-2">
                                        <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs font-medium">
                                            INDEX: {index}
                                        </span>
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="secondary"
                                        size="small"
                                        styling="rounded"
                                        onClick={() => handleEdit(job)}
                                    >
                                        <FaPencil />
                                    </Button>
                                    <Button
                                        variant="danger"
                                        size="small"
                                        styling="rounded"
                                        onClick={() => handleDeleteClick(job)}
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
                title="Tambah JobDesk Baru"
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
                            Nama Pekerjaan
                        </label>
                        <Input
                            variant="primary"
                            size="large"
                            name="name_job"
                            placeholder="Contoh: Frontend Developer"
                            value={formData.name_job}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Deskripsi
                        </label>
                        <textarea
                            name="description_job"
                            className="w-full p-2 rounded-xl bg-[#061E29] text-[#F3F4F4] border-3 border-[#061E29] outline-none focus:border-3 focus:border-[#5F9598]"
                            rows="3"
                            placeholder="Keterangan pekerjaan..."
                            value={formData.description_job}
                            onChange={handleInputChange}
                        ></textarea>
                    </div>
                </div>
            </Modal>

            {/* Edit Modal */}
            <Modal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                title="Edit JobDesk"
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
                            Nama Pekerjaan
                        </label>
                        <Input
                            variant="primary"
                            size="large"
                            name="name_job"
                            value={formData.name_job}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Deskripsi
                        </label>
                        <textarea
                            name="description_job"
                            className="w-full p-2 rounded-xl bg-[#061E29] text-[#F3F4F4] border-3 border-[#061E29] outline-none focus:border-3 focus:border-[#5F9598]"
                            rows="3"
                            value={formData.description_job}
                            onChange={handleInputChange}
                        ></textarea>
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
                        Apakah Anda yakin ingin menghapus jobdesk{" "}
                        <span className="font-bold text-gray-800">
                            "{selectedJob?.name_job}"
                        </span>
                        ?
                    </p>
                </div>
            </Modal>
        </DashboardLayout>
    );
}

export default JobDeskManagement;
