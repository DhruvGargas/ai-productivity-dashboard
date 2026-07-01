import Navbar from "@/components/Navbar";
import DashboardCard from "@/components/DashboardCard";
export default function Home() {
  return (
    <>
      <Navbar />

      <main className="flex flex-col items-center justify-center h-[90vh] gap-6">

        <h1 className="text-5xl font-bold">
          Welcome Back, Dhruv 👋
        </h1>

        <p className="text-xl text-gray-400">
          Your AI assistant is ready to help you stay productive today.
        </p>

        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
          Start Planning
        </button>
        <div className="flex gap-6 mt-10">

  <DashboardCard
    icon="📋"
    title="Tasks"
    value="8"
  />

  <DashboardCard
    icon="⏰"
    title="Focus Time"
    value="3 Hours"
  />

  <DashboardCard
    icon="✅"
    title="Completed"
    value="5"
  />

</div>

      </main>
    </>
  );
}