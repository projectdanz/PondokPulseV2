export const SIDEBAR_MENU = {
    Manager: [
        { id: 1, label: "Home", path: "/dashboard/manager" },
        { id: 2, label: "Event", path: "/dashboard/manager/event" },
        {
            id: 3,
            label: "KPI",
            children: [
                { id: 31, label: "KPI Karyawan", path: "/dashboard/manager/kpi" },
                { id: 32, label: "KPI Saya", path: "/dashboard/manager/my-kpi" },
            ],
        },
        { id: 4, label: "Periode", path: "/dashboard/manager/periode" },
        { id: 5, label: "JobDesk", path: "/dashboard/manager/jobdesk" },
        { id: 6, label: "Absensi", path: "/dashboard/manager/absensi" },
        { id: 7, label: "Karyawan", path: "/dashboard/manager/karyawan" },
    ],

    Koordinator: [
        { id: 1, label: "Home", path: "/dashboard/koordinator" },
        { id: 2, label: "KPI Saya", path: "/dashboard/koordinator/my-kpi" },
        { id: 3, label: "Absensi", path: "/dashboard/koordinator/absensi" },
        { id: 4, label: "Karyawan", path: "/dashboard/koordinator/karyawan" },
    ],

    Karyawan: [
        { id: 1, label: "Home", path: "/dashboard/karyawan" },
        { id: 2, label: "KPI Saya", path: "/dashboard/karyawan/my-kpi" },
        { id: 3, label: "Absensi", path: "/dashboard/karyawan/absensi" },
    ],
};