function StatCard({
  title,
  value,
  icon,
  color,
}) {
  return (
    <div
      className="
        bg-slate-900
        border
        border-slate-800
        rounded-2xl
        p-6
        transition-all
        duration-300
        hover:scale-[1.02]
        hover:border-blue-500/50
      "
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-slate-400 text-lg">
          {title}
        </h3>

        <div className={`text-3xl ${color}`}>
          {icon}
        </div>
      </div>

      <h2 className={`text-5xl font-bold ${color}`}>
        {value}
      </h2>
    </div>
  );
}

export default StatCard;