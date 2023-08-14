import Navbar from "@/components/ui/Navbar";
import Sidebar from "@/components/ui/Sidebar";

async function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full relative ">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 bg-gray-900">
        <Sidebar />
      </div>
      <main className="md:pl-72 mb-30">
        <Navbar />
        {children}
      </main>
    </div>
  );
}

export default DashboardLayout;
