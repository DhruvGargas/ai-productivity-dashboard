import Navbar from "@/components/Navbar";
import DashboardCard from "@/components/DashboardCard";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
export default function Home() {
  return (
    <>
      <Navbar />

      <main className="w-full">

<HeroSection />

  <section className="px-10 pb-10">

    <h2 className="text-3xl font-bold mb-8">
      Today's Overview
    </h2>

    <div className="flex flex-wrap justify-center gap-6">

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

  </section>

</main>
<Footer />
    </>
  );
}