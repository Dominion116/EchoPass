export function ExperienceSection() {
  const experiences = [
    {
      period: "2020 - Present",
      title: "LEAD DEVELOPER",
      company: "Blockdots, London",
    },
    {
      period: "2016 - 2020",
      title: "FULL STACK WEB DEVELOPER",
      company: "Parsons, The New School",
    },
    {
      period: "2014 - 2016",
      title: "UI DESIGNER",
      company: "House of Life, Leeds",
    },
    {
      period: "2012 - 2014",
      title: "JUNIOR GRAPHICS DESIGNER",
      company: "Theme Junction",
    },
  ]

  const education = [
    {
      period: "2006 - 2010",
      title: "PROGRAMMING COURSE",
      company: "Harverd University",
    },
    {
      period: "2008 - 2012",
      title: "GRAPHIC DESIGN COURSE",
      company: "University of Denmark",
    },
    {
      period: "2008 - 2010",
      title: "WEB DESIGN COURSE",
      company: "University of California",
    },
    {
      period: "2010 - 2012",
      title: "DESIGN & TECHNOLOGY",
      company: "Parsons, The New School",
    },
  ]

  return (
    <section id="experience" className="py-16 px-6">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
              <span className="text-green-400 mr-3">💼</span>
              My Experience
            </h2>
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <div key={index} className="glass-card rounded-lg p-6">
                  <div className="text-purple-400 text-sm mb-2">{exp.period}</div>
                  <h3 className="text-lg font-semibold text-white mb-1">{exp.title}</h3>
                  <p className="text-gray-400">{exp.company}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
              <span className="text-blue-400 mr-3">🎓</span>
              My Education
            </h2>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <div key={index} className="glass-card rounded-lg p-6">
                  <div className="text-purple-400 text-sm mb-2">{edu.period}</div>
                  <h3 className="text-lg font-semibold text-white mb-1">{edu.title}</h3>
                  <p className="text-gray-400">{edu.company}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
