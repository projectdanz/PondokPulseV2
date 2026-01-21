import { useEffect, useState } from "react";
import DashboardLayout from "./DashboardLayout";
import axios from "axios";
import Button from "../components/Button";
import Pagination from "../components/Pagination";
import { FaPencil, FaRegTrashCan } from "react-icons/fa6";

function Event() {
    const [loading, setLoading] = useState(true);
    const [events, setEvents] = useState([""]);
    const [message, setMessage] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const dataRaw = localStorage.getItem("data");
    const token = JSON.parse(dataRaw);

    const fetchData = async (page = 1) => {
        setLoading(true);
        try {
            const res = await axios.get(
                `http://127.0.0.1:8000/api/v1/events?page=${page}&per_page=10`,
                {
                    headers: {
                        Authorization: `Bearer ${token.token}`,
                    },
                },
            );
            setLoading(false);
            setEvents(res.data.data);
            setMessage(res.data.message);
            setCurrentPage(res.data.meta.current_page);
            setTotalPages(res.data.meta.last_page);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage]);
    // if(loading) return <div>Loading...</div>
    return (
        <DashboardLayout>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-4">Event Management</h1>
                <p>Halaman untuk mengatur event.</p>
            </div>
            <div className="bg-white my-8 p-6 rounded-lg shadow-md">
                <div className="w-full flex pb-4 justify-end border-b-2 border-gray-200">
                    <Button variant="danger" size="medium" styling="rounded">
                        Tambah Event
                    </Button>
                </div>
                <div className="py-6">
                    {events.map((event) => (
                        <div
                            key={event.id}
                            className="bg-white border border-gray-100 p-6 my-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col md:flex-row justify-between items-center gap-4"
                        >
                            <div className="flex-1">
                                <h2 className="text-xl font-bold text-gray-800 mb-1">
                                    {event.name_event}
                                </h2>
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
                                >
                                    <FaPencil />
                                </Button>
                                <Button
                                    variant="danger"
                                    size="small"
                                    styling="rounded"
                                >
                                    <FaRegTrashCan />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </DashboardLayout>
    );
}

export default Event;
