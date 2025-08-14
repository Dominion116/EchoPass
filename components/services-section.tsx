import { Palette, Monitor, Smartphone, Layers } from "lucide-react"

export function ServicesSection() {
  const services = [
    {
      icon: <Palette className="h-8 w-8" />,
      title: "Branding Design",
      description:
        "I break down complex user experience problems to create integrity focussed solutions that connect billions of people",
    },
    {
      icon: <Layers className="h-8 w-8" />,
      title: "UI/UX Design",
      description:
        "I break down complex user experience problems to create integrity focussed solutions that connect billions of people",
    },
    {
      icon: <Monitor className="h-8 w-8" />,
      title: "Web Design",
      description:
        "I break down complex user experience problems to create integrity focussed solutions that connect billions of people",
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "App Design",
      description:
        "I break down complex user experience problems to create integrity focussed solutions that connect billions of people",
    },
  ]

  return (
    <section className="py-16 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">My Quality Services</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We put your ideas and thus your wishes in the form of a unique web project that inspires you and you
            customers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <div key={index} className="service-card rounded-xl p-6 group cursor-pointer">
              <div className="flex items-start gap-4">
                <div className="text-purple-400 group-hover:text-pink-400 transition-colors">{service.icon}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{service.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
