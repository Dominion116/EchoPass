export function StatsSection() {
  const stats = [
    { number: "14", label: "Complete Projects", sublabel: "Worldwide" },
    { number: "50+", label: "Happy Customers", sublabel: "Worldwide" },
    { number: "1.5K", label: "Hours of Work", sublabel: "Experience" },
    { number: "14", label: "Awards Won", sublabel: "Worldwide" },
  ]

  return (
    <section className="py-16 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
              <div className="text-gray-300 font-medium">{stat.label}</div>
              <div className="text-gray-500 text-sm">{stat.sublabel}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
