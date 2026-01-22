import { useEffect, useState } from "react";
import DashboardLayout from "./DashboardLayout";
import axios from "axios";
import Button from "../components/Button";
import Modal from "../components/Modal";
import Input from "../components/Input";
import { FaCheck, FaXmark, FaCalendarDays } from "react-icons/fa6";

function Absensi() {
    const [loading, setLoading] = useState(true);
    const [absensiData, setAbsensiData] = useState([]);
    const [events, setEvents] = useState([]);

    const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        event_id: "",
        status: "hadir",
        note: "",
        date: new Date().toISOString().split("T")[0],
    });

    const dataRaw = localStorage.getItem("data");
    const tokenData = dataRaw ? JSON.parse(dataRaw) : null;
    const token = tokenData?.token;
    const userRole = tokenData?.user?.role;
    const userId = tokenData?.user?.id;

    const fetchData = async () => {
        if (!token) return;
        setLoading(true);
        try {
            const [absensiRes, eventsRes] = await Promise.all([
                axios.get("http://127.0.0.1:8000/api/v1/absensis", {
                    headers: { Authorization: `Bearer ${token}` },
                }),
                axios.get("http://127.0.0.1:8000/api/v1/events", {
                    headers: { Authorization: `Bearer ${token}` },
                }),
            ]);
            setAbsensiData(absensiRes.data.data);
            setEvents(eventsRes.data.data);
        } catch (error) {
            console.error("Error fetching data:", error);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                "http://127.0.0.1:8000/api/v1/absensis",
                {
                    ...formData,
                    user_id: userId,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                },
            );
            setIsSubmitModalOpen(false);
            fetchData();
        } catch (error) {
            console.error("Error submitting attendance:", error);
        }
    };

    return (
        <DashboardLayout>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-4">Absensi</h1>
                <p>Catat dan pantau kehadiran kegiatan.</p>
            </div>

            <div className="bg-white my-8 p-6 rounded-lg shadow-md">
                <div className="w-full flex pb-4 justify-between items-center border-b-2 border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-700">
                        Daftar Kehadiran
                    </h2>
                    {userRole === "Karyawan" && (
                        <Button
                            variant="primary"
                            size="medium"
                            styling="rounded"
                            onClick={() => setIsSubmitModalOpen(true)}
                        >
                            Absen Sekarang
                        </Button>
                    )}
                </div>

                <div className="py-6 overflow-x-auto">
                    {loading ? (
                        <div className="text-center py-10 text-gray-500">
                            Loading data...
                        </div>
                    ) : absensiData.length === 0 ? (
                        <div className="text-center py-10 text-gray-500">
                            Belum ada data absensi.
                        </div>
                    ) : (
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-sm font-bold text-gray-700 border-b">
                                        Tanggal
                                    </th>
                                    <th className="px-4 py-3 text-sm font-bold text-gray-700 border-b">
                                        Nama
                                    </th>
                                    <th className="px-4 py-3 text-sm font-bold text-gray-700 border-b">
                                        Event
                                    </th>
                                    <th className="px-4 py-3 text-sm font-bold text-gray-700 border-b text-center">
                                        Status
                                    </th>
                                    <th className="px-4 py-3 text-sm font-bold text-gray-700 border-b">
                                        Catatan
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {absensiData.map((abs) => (
                                    <tr
                                        key={abs.id}
                                        className="hover:bg-gray-50"
                                    >
                                        <td className="px-4 py-4 text-sm text-gray-800 border-b">
                                            {abs.date}
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-800 border-b font-medium">
                                            {abs.user?.name || "Self"}
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-800 border-b">
                                            {abs.event?.name_event ||
                                                `Event ID: ${abs.event_id}`}
                                        </td>
                                        <td className="px-4 py-4 text-sm text-center border-b">
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${
                                                    abs.status === "hadir"
                                                        ? "bg-green-100 text-green-700"
                                                        : abs.status === "izin"
                                                          ? "bg-blue-100 text-blue-700"
                                                          : abs.status ===
                                                              "sakit"
                                                            ? "bg-yellow-100 text-yellow-700"
                                                            : "bg-red-100 text-red-700"
                                                }`}
                                            >
                                                {abs.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-500 border-b italic">
                                            {abs.note || "-"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {/* Submit Attendance Modal */}
            <Modal
                isOpen={isSubmitModalOpen}
                onClose={() => setIsSubmitModalOpen(false)}
                title="Submit Absensi"
                footer={
                    <>
                        <Button
                            variant="secondary"
                            size="medium"
                            styling="rounded"
                            onClick={() => setIsSubmitModalOpen(false)}
                        >
                            Batal
                        </Button>
                        <Button
                            variant="primary"
                            size="medium"
                            styling="rounded"
                            onClick={handleSubmit}
                        >
                            Kirim
                        </Button>
                    </>
                }
            >
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Pilih Event
                        </label>
                        <select
                            name="event_id"
                            value={formData.event_id}
                            onChange={handleInputChange}
                            className="w-full p-2 rounded-xl bg-[#061E29] text-[#F3F4F4] border-3 border-[#061E29] outline-none"
                        >
                            <option value="">-- Pilih Event --</option>
                            {events.map((e) => (
                                <option key={e.id} value={e.id}>
                                    {e.name_event}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Status
                        </label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleInputChange}
                            className="w-full p-2 rounded-xl bg-[#061E29] text-[#F3F4F4] border-3 border-[#061E29] outline-none"
                        >
                            <option value="hadir">Hadir</option>
                            <option value="izin">Izin</option>
                            <option value="sakit">Sakit</option>
                            <option value="alpa">Alpa</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Tanggal
                        </label>
                        <Input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleInputChange}
                            variant="primary"
                            size="large"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Catatan (Opsional)
                        </label>
                        <textarea
                            name="note"
                            value={formData.note}
                            onChange={handleInputChange}
                            className="w-full p-2 rounded-xl bg-[#061E29] text-[#F3F4F4] border-3 border-[#061E29] outline-none"
                            rows="2"
                            placeholder="Keterangan tambahan..."
                        ></textarea>
                    </div>
                </div>
            </Modal>
        </DashboardLayout>
    );
}

export default Absensi;
