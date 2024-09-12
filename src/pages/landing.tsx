import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function HomePage() {
  const [email, setEmail] = useState('')

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement your sign up logic here
    console.log('Signing up with:', email)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <a className="flex items-center justify-center" href="#">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6 text-purple-400"
          >
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
          <span className="ml-2 text-lg font-bold">PDF Maker</span>
        </a>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <a className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Features
          </a>
          <a className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Pricing
          </a>
          <a className="text-sm font-medium hover:underline underline-offset-4" href="#">
            About
          </a>
          <Button variant="outline" className="text-purple-400 border-purple-400 hover:bg-purple-400 hover:text-gray-900">
            Log in
          </Button>
          <Button className="bg-purple-500 text-gray-900 hover:bg-purple-600">Sign up</Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Create Professional PDFs in Minutes
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
                  Transform your documents into stunning PDFs with our easy-to-use maker. Perfect for reports, presentations, and more.
                </p>
              </div>
              <div className="space-x-4">
                <Button className="bg-purple-500 text-gray-900 hover:bg-purple-600">Get Started</Button>
                <Button variant="outline" className="text-purple-400 border-purple-400 hover:bg-purple-400 hover:text-gray-900">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: 'zap', title: 'Lightning Fast', description: 'Create PDFs in seconds with our optimized engine.' },
                { icon: 'lock', title: 'Secure & Private', description: 'Your documents are encrypted and never stored on our servers.' },
                { icon: 'share-2', title: 'Easy Sharing', description: 'Share your PDFs with a single click or download instantly.' },
              ].map((feature, index) => (
                <div key={index} className="flex flex-col items-center space-y-3 text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-10 w-10 text-purple-400"
                  >
                    {feature.icon === 'zap' && <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />}
                    {feature.icon === 'lock' && (
                      <>
                        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </>
                    )}
                    {feature.icon === 'share-2' && (
                      <>
                        <circle cx="18" cy="5" r="3" />
                        <circle cx="6" cy="12" r="3" />
                        <circle cx="18" cy="19" r="3" />
                        <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
                        <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
                      </>
                    )}
                  </svg>
                  <h2 className="text-xl font-bold">{feature.title}</h2>
                  <p className="text-sm text-gray-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Ready to start creating?</h2>
                <p className="mx-auto max-w-[600px] text-gray-400 md:text-xl">
                  Sign up now and transform your documents into professional PDFs in minutes.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2" onSubmit={handleSignUp}>
                  <Input
                    className="max-w-lg flex-1 bg-gray-800 text-gray-100 border-gray-700"
                    placeholder="Enter your email"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                  <Button type="submit" className="bg-purple-500 text-gray-900 hover:bg-purple-600">Sign Up</Button>
                </form>
                <p className="text-xs text-gray-400">
                  By signing up, you agree to our{" "}
                  <a className="underline underline-offset-2 hover:text-purple-400" href="#">
                    Terms & Conditions
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-700">
        <p className="text-xs text-gray-400">© 2023 PDF Maker. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <a className="text-xs hover:underline underline-offset-4 text-gray-400" href="#">
            Terms of Service
          </a>
          <a className="text-xs hover:underline underline-offset-4 text-gray-400" href="#">
            Privacy
          </a>
        </nav>
      </footer>
    </div>
  )
}