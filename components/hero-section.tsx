import { Button } from "@/components/ui/button"
import { Download, Play } from "lucide-react"

export function HeroSection() {
  return (
    <section id="home" className="pt-24 pb-16 px-6">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="flex-1 text-center lg:text-left">
            <p className="text-gray-400 mb-4">I am Gerold</p>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">Web Developer</span>
              <span className="text-purple-400"> +</span>
              <br />
              <span className="gradient-text">UX Designer</span>
            </h1>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl">
              I break down complex user experience problems to create integrity focussed solutions that connect billions
              of people
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                <Download className="mr-2 h-4 w-4" />
                Download CV
              </Button>
              <Button
                variant="outline"
                className="border-purple-500 text-purple-400 hover:bg-purple-500/10 bg-transparent"
              >
                <Play className="mr-2 h-4 w-4" />
                Watch Video
              </Button>
            </div>
          </div>

          <div className="flex-shrink-0">
            <div className="relative">
              <div className="w-80 h-80 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-1">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <img
                    src="/web-developer-headshot.png"
                    alt="Gerold - Web Developer"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">👋</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
