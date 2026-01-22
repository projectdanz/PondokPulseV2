import { useEffect, useState } from "react";
import DashboardLayout from "./DashboardLayout";
import axios from "axios";
import Button from "../components/Button";
import Modal from "../components/Modal";
import Input from "../components/Input";
import { FaPencil, FaEye } from "react-icons/fa6";

function UserManagement() {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [teams, setTeams] = useState([]);
    const [jobDesks, setJobDesks] = useState([]);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [formData, setFormData] = useState({
        team_id: "",
        jobDesk_id: "",
        gender: "",
        join_year: "",
        birth_date: "",
        phone_number: "",
        parent_phone_number: "",
        address: "",
        profile_link: "",
    });

    const dataRaw = localStorage.getItem("data");
    const tokenData = dataRaw ? JSON.parse(dataRaw) : null;
    const token = tokenData?.token;
    const userRole = tokenData?.user?.role;

    const fetchData = async () => {
        if (!token) return;
        setLoading(true);
        try {
            const [usersRes, teamsRes, jobsRes] = await Promise.all([
                axios.get("http://127.0.0.1:8000/api/v1/users", {
                    headers: { Authorization: `Bearer ${token}` },
                }),
                axios.get("http://127.0.0.1:8000/api/v1/teams", {
                    headers: { Authorization: `Bearer ${token}` },
                }),
                axios.get("http://127.0.0.1:8000/api/v1/jobdesks", {
                    headers: { Authorization: `Bearer ${token}` },
                }),
            ]);
            setUsers(usersRes.data.data);
            setTeams(teamsRes.data.data);
            setJobDesks(jobsRes.data.data);
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

    const handleEdit = (user) => {
        setSelectedUser(user);
        setFormData({
            team_id: user.team_id || "",
            jobDesk_id: user.jobDesk_id || "",
            gender: user.gender || "",
            join_year: user.join_year || "",
            birth_date: user.birth_date || "",
            phone_number: user.phone_number || "",
            parent_phone_number: user.parent_phone_number || "",
            address: user.address || "",
            profile_link: user.profile_link || "",
        });
        setIsEditModalOpen(true);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(
                `http://127.0.0.1:8000/api/v1/users/${selectedUser.id}`,
                formData,
                {
                    headers: { Authorization: `Bearer ${token}` },
                },
            );
            setIsEditModalOpen(false);
            fetchData();
        } catch (error) {
            console.error("Error updating user profile:", error);
        }
    };

    return (
        <DashboardLayout>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-4">User Management</h1>
                <p>Kelola data profil karyawan.</p>
            </div>

            <div className="bg-white my-8 p-6 rounded-lg shadow-md">
                <div className="py-6 overflow-x-auto">
                    {loading ? (
                        <div className="text-center py-10 text-gray-500">
                            Loading users...
                        </div>
                    ) : users.length === 0 ? (
                        <div className="text-center py-10 text-gray-500">
                            Tidak ada user tersedia.
                        </div>
                    ) : (
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-sm font-bold text-gray-700 border-b">
                                        Nama
                                    </th>
                                    <th className="px-4 py-3 text-sm font-bold text-gray-700 border-b">
                                        Email
                                    </th>
                                    <th className="px-4 py-3 text-sm font-bold text-gray-700 border-b">
                                        Role
                                    </th>
                                    <th className="px-4 py-3 text-sm font-bold text-gray-700 border-b">
                                        Tim
                                    </th>
                                    <th className="px-4 py-3 text-sm font-bold text-gray-700 border-b">
                                        JobDesk
                                    </th>
                                    <th className="px-4 py-3 text-sm font-bold text-gray-700 border-b text-center">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((profile) => (
                                    <tr
                                        key={profile.id}
                                        className="hover:bg-gray-50"
                                    >
                                        <td className="px-4 py-4 text-sm text-gray-800 border-b font-medium">
                                            {profile.user?.name}
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-800 border-b">
                                            {profile.user?.email}
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-800 border-b">
                                            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-bold uppercase">
                                                {profile.user?.role}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-800 border-b">
                                            {profile.team?.name_team || "-"}
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-800 border-b">
                                            {profile.job_desk?.name_job || "-"}
                                        </td>
                                        <td className="px-4 py-4 text-sm text-center border-b">
                                            <div className="flex justify-center gap-2">
                                                <button
                                                    onClick={() =>
                                                        handleEdit(profile)
                                                    }
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                                                >
                                                    <FaPencil />
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

            {/* Edit Modal */}
            <Modal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                title="Edit Profil User"
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
                <div className="space-y-4 max-h-[60vh] overflow-y-auto px-1">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Tim
                            </label>
                            <select
                                name="team_id"
                                value={formData.team_id}
                                onChange={handleInputChange}
                                className="w-full p-2 rounded-xl bg-[#061E29] text-[#F3F4F4] border-3 border-[#061E29] outline-none"
                            >
                                <option value="">Pilih Tim</option>
                                {teams.map((t) => (
                                    <option key={t.id} value={t.id}>
                                        {t.name_team}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                JobDesk
                            </label>
                            <select
                                name="jobDesk_id"
                                value={formData.jobDesk_id}
                                onChange={handleInputChange}
                                className="w-full p-2 rounded-xl bg-[#061E29] text-[#F3F4F4] border-3 border-[#061E29] outline-none"
                            >
                                <option value="">Pilih JobDesk</option>
                                {jobDesks.map((j) => (
                                    <option key={j.id} value={j.id}>
                                        {j.name_job}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Gender
                            </label>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleInputChange}
                                className="w-full p-2 rounded-xl bg-[#061E29] text-[#F3F4F4] border-3 border-[#061E29] outline-none"
                            >
                                <option value="">Pilih Gender</option>
                                <option value="L">Laki-laki</option>
                                <option value="P">Perempuan</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Tahun Bergabung
                            </label>
                            <Input
                                variant="primary"
                                size="large"
                                name="join_year"
                                type="number"
                                value={formData.join_year}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Telepon
                        </label>
                        <Input
                            variant="primary"
                            size="large"
                            name="phone_number"
                            value={formData.phone_number}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Alamat
                        </label>
                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            className="w-full p-2 rounded-xl bg-[#061E29] text-[#F3F4F4] border-3 border-[#061E29] outline-none"
                            rows="2"
                        ></textarea>
                    </div>
                </div>
            </Modal>
        </DashboardLayout>
    );
}

export default UserManagement;
