export default function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center h-[60vh] gap-6">
      <h1 className="text-5xl font-bold">
        Welcome Back, Dhruv 👋
      </h1>

      <p className="text-xl text-gray-400">
        Your AI assistant is ready to help you stay productive today.
      </p>

      <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 hover:scale-105 transition duration-300">
        Start Planning
      </button>
    </section>
  );
}