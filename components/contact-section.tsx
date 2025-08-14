import { Button } from "@/components/ui/button"

export function ContactSection() {
  return (
    <section id="contact" className="py-16 px-6">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Let's work together!</h2>
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
          I design and code beautifully simple things and I love what I do. Just simple like that!
        </p>
        <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-lg px-8 py-3">
          Start Project
        </Button>

        <div className="mt-16 pt-8 border-t border-gray-700">
          <p className="text-gray-500">© 2024 All Rights Reserved by Gerold</p>
        </div>
      </div>
    </section>
  )
}
