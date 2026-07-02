import Navbar from "@/components/Navbar";
import DashboardCard from "@/components/DashboardCard";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import TaskList from "@/components/TaskList";
export default function Home() {
  const dashboardData = [
  {
    icon: "📋",
    title: "Tasks",
    value: "8",
  },
  {
    icon: "⏰",
    title: "Focus Time",
    value: "3 Hours",
  },
  {
    icon: "✅",
    title: "Completed",
    value: "5",
  },
];
  return (
    <>
      <Navbar />

      <main className="flex min-h-screen">

  <Sidebar />

  <div className="flex-1">

    <HeroSection />

    <section className="px-10 pb-10">

      <h2 className="text-3xl font-bold mb-8">
        Today's Overview
      </h2>

      <div className="flex flex-wrap justify-center gap-6">

  {dashboardData.map((card) => (
    <DashboardCard
      key={card.title}
      icon={card.icon}
      title={card.title}
      value={card.value}
    />
  ))}

</div>
    <TaskList />
    </section>
    <Footer />
  </div>

</main>
    </>
  );
}