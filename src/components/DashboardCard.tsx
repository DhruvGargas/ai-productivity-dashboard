type DashboardCardProps = {
  icon: string;
  title: string;
  value: string;
};

export default function DashboardCard({
  icon,
  title,
  value,
}: DashboardCardProps) {
  return (
    <div className="bg-gray-800 p-6 rounded-xl w-64 text-center shadow-lg hover:scale-105 transition">

      <div className="text-5xl">
        {icon}
      </div>

      <h3 className="text-xl font-bold mt-4">
        {title}
      </h3>

      <p className="text-4xl mt-4 text-blue-400">
        {value}
      </p>

    </div>
  );
}