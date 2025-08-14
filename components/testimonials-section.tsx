export function TestimonialsSection() {
  const testimonials = [
    {
      name: "John Smith",
      role: "CEO, TechCorp",
      content:
        "Working with Gerold was an absolute pleasure. His attention to detail and creative vision transformed our digital presence completely.",
      avatar: "/male-ceo-headshot.png",
    },
    {
      name: "Sarah Johnson",
      role: "Marketing Director",
      content:
        "Gerold delivered exceptional results that exceeded our expectations. His expertise in both design and development is remarkable.",
      avatar: "/female-marketing-director-headshot.png",
    },
  ]

  return (
    <section className="py-16 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">My Client's Stories</h2>
          <p className="text-gray-400">Empowering people in new a digital journey with my super services</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="glass-card rounded-xl p-6">
              <p className="text-gray-300 mb-6 leading-relaxed">"{testimonial.content}"</p>
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-white font-semibold">{testimonial.name}</h4>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
