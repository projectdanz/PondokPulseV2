import Sidebar from "../components/Sidebar"

function DashboardLayout ({ children }) {
    return (
        <>
           <div className="flex h-screen overflow-hidden">
            {/* Sidebar menetap */}
            <aside className="w-64 flex-shrink-0">
                <Sidebar />
            </aside>

            {/* Konten bisa scroll */}
            <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
                {children}
            </main>
        </div>
        </>
    )   
}

export default DashboardLayout