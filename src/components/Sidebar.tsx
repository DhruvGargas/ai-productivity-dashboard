export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-white p-6 self-stretch">

      <h2 className="text-2xl font-bold mb-8">
        Menu
      </h2>

      <ul className="space-y-4">

        <li className="cursor-pointer hover:text-blue-400">
          🏠 Dashboard
        </li>

        <li className="cursor-pointer hover:text-blue-400">
          📋 Tasks
        </li>

        <li className="cursor-pointer hover:text-blue-400">
          📈 Analytics
        </li>

        <li className="cursor-pointer hover:text-blue-400">
          ⚙ Settings
        </li>

      </ul>

    </aside>
  );
}