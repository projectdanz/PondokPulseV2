import { useEffect, useState } from "react";
import DashboardLayout from "./DashboardLayout";
import axios from "axios";
import Button from "../components/Button";
import Pagination from "../components/Pagination";
import Modal from "../components/Modal";
import Input from "../components/Input";
import { FaPencil, FaRegTrashCan } from "react-icons/fa6";

function Event() {
    const [loading, setLoading] = useState(true);
    const [events, setEvents] = useState([]);
    const [message, setMessage] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Modal states
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    // Form and selection state
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [formData, setFormData] = useState({
        name_event: "",
        description_event: "",
        date_event: "",
    });

    const dataRaw = localStorage.getItem("data");
    const tokenData = dataRaw ? JSON.parse(dataRaw) : null;
    const token = tokenData?.token;

    const fetchData = async (page = 1) => {
        if (!token) return;
        setLoading(true);
        try {
            const res = await axios.get(
                `http://127.0.0.1:8000/api/v1/events?page=${page}&per_page=10`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            setEvents(res.data.data);
            setMessage(res.data.message);
            setCurrentPage(res.data.meta.current_page);
            setTotalPages(res.data.meta.last_page);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const resetForm = () => {
        setFormData({
            name_event: "",
            description_event: "",
            date_event: "",
        });
        setSelectedEvent(null);
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://127.0.0.1:8000/api/v1/events", formData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setIsCreateModalOpen(false);
            resetForm();
            fetchData(currentPage);
        } catch (error) {
            console.error("Error creating event:", error);
        }
    };

    const handleEdit = (event) => {
        setSelectedEvent(event);
        setFormData({
            name_event: event.name_event || "",
            description_event: event.description_event || "",
            date_event: event.date_event || "",
        });
        setIsEditModalOpen(true);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(
                `http://127.0.0.1:8000/api/v1/events/${selectedEvent.id}`,
                formData,
                {
                    headers: { Authorization: `Bearer ${token}` },
                },
            );
            setIsEditModalOpen(false);
            resetForm();
            fetchData(currentPage);
        } catch (error) {
            console.error("Error updating event:", error);
        }
    };

    const handleDeleteClick = (event) => {
        setSelectedEvent(event);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            await axios.delete(
                `http://127.0.0.1:8000/api/v1/events/${selectedEvent.id}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                },
            );
            setIsDeleteModalOpen(false);
            setSelectedEvent(null);
            fetchData(currentPage);
        } catch (error) {
            console.error("Error deleting event:", error);
        }
    };

    return (
        <DashboardLayout>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-4">Event Management</h1>
                <p>Halaman untuk mengatur event.</p>
            </div>
            <div className="bg-white my-8 p-6 rounded-lg shadow-md">
                <div className="w-full flex pb-4 justify-end border-b-2 border-gray-200">
                    <Button
                        variant="primary"
                        size="medium"
                        styling="rounded"
                        onClick={() => setIsCreateModalOpen(true)}
                    >
                        Tambah Event
                    </Button>
                </div>
                <div className="py-6">
                    {loading ? (
                        <div className="text-center py-10 text-gray-500">
                            Loading events...
                        </div>
                    ) : events.length === 0 ? (
                        <div className="text-center py-10 text-gray-500">
                            Tidak ada event tersedia.
                        </div>
                    ) : (
                        events.map((event) => (
                            <div
                                key={event.id}
                                className="bg-white border border-gray-100 p-6 my-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col md:flex-row justify-between items-center gap-4"
                            >
                                <div className="flex-1">
                                    <h2 className="text-xl font-bold text-gray-800 mb-1">
                                        {event.name_event}
                                    </h2>
                                    <p className="text-gray-600 text-sm mb-2">
                                        {event.description_event}
                                    </p>
                                    <p className="text-gray-500 text-sm flex items-center gap-2">
                                        <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs font-medium">
                                            ID: {event.id}
                                        </span>
                                        <span>•</span>
                                        <span>
                                            {event.date_event
                                                ? event.date_event
                                                : "Belum ada tanggal"}
                                        </span>
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="secondary"
                                        size="small"
                                        styling="rounded"
                                        onClick={() => handleEdit(event)}
                                    >
                                        <FaPencil />
                                    </Button>
                                    <Button
                                        variant="danger"
                                        size="small"
                                        styling="rounded"
                                        onClick={() => handleDeleteClick(event)}
                                    >
                                        <FaRegTrashCan />
                                    </Button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {events.length > 0 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            )}

            {/* Create Modal */}
            <Modal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                title="Tambah Event Baru"
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
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nama Event
                        </label>
                        <Input
                            variant="primary"
                            size="large"
                            name="name_event"
                            placeholder="Contoh: Bakti Sosial"
                            value={formData.name_event}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Deskripsi
                        </label>
                        <textarea
                            name="description_event"
                            className="w-full p-2 rounded-xl bg-[#061E29] text-[#F3F4F4] border-3 border-[#061E29] outline-none focus:border-3 focus:border-[#5F9598]"
                            rows="3"
                            placeholder="Keterangan event..."
                            value={formData.description_event}
                            onChange={handleInputChange}
                        ></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Tanggal
                        </label>
                        <Input
                            type="date"
                            variant="primary"
                            size="large"
                            name="date_event"
                            value={formData.date_event}
                            onChange={handleInputChange}
                        />
                    </div>
                </form>
            </Modal>

            {/* Edit Modal */}
            <Modal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                title="Edit Event"
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
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nama Event
                        </label>
                        <Input
                            variant="primary"
                            size="large"
                            name="name_event"
                            value={formData.name_event}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Deskripsi
                        </label>
                        <textarea
                            name="description_event"
                            className="w-full p-2 rounded-xl bg-[#061E29] text-[#F3F4F4] border-3 border-[#061E29] outline-none focus:border-3 focus:border-[#5F9598]"
                            rows="3"
                            value={formData.description_event}
                            onChange={handleInputChange}
                        ></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Tanggal
                        </label>
                        <Input
                            type="date"
                            variant="primary"
                            size="large"
                            name="date_event"
                            value={formData.date_event}
                            onChange={handleInputChange}
                        />
                    </div>
                </form>
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
                        Apakah Anda yakin ingin menghapus event{" "}
                        <span className="font-bold text-gray-800">
                            "{selectedEvent?.name_event}"
                        </span>
                        ?
                    </p>
                    <p className="text-sm text-gray-400 mt-2">
                        Tindakan ini tidak dapat dibatalkan.
                    </p>
                </div>
            </Modal>
        </DashboardLayout>
    );
}

export default Event;
