export function PortfolioSection() {
  const projects = [
    {
      title: "Crypto Dashboard",
      category: "Web Design",
      image: "/modern-crypto-dashboard.png",
    },
    {
      title: "Mobile Banking App",
      category: "App Design",
      image: "/mobile-banking-app.png",
    },
    {
      title: "E-commerce Platform",
      category: "Web Design",
      image: "/modern-ecommerce-website.png",
    },
    {
      title: "Portfolio Website",
      category: "Branding",
      image: "/creative-portfolio-website.png",
    },
  ]

  return (
    <section id="work" className="py-16 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">My Recent Works</h2>
          <p className="text-gray-400">
            We put your ideas and thus your wishes in the form of a unique web project that inspires you and you
            customers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="glass-card rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="text-purple-400 text-sm mb-2">{project.category}</div>
                  <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
