'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"

export default function LoginPage() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Login attempted with:', { email, password })
    // Here you would typically handle the login logic
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-xl p-8 space-y-8 bg-gray-800 rounded-xl shadow-2xl"
      >
        <div className="text-center space-y-1">
          {/* <Icons.fileText className="mx-auto h-12 w-12 text-purple-500" /> */}
          <h2 className="text-3xl font-bold">PDF Maker</h2>
          <p className="text-zinc-400">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-1">
            <Label htmlFor="email" className="text-sm font-medium">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              className="bg-gray-700 border-gray-600 focus:border-blue-500 focus:ring-blue-500 h-12" // Increased height
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">Password</Label>
            <Input
              id="password"
              type="password"
              required
              className="bg-gray-700 border-gray-600 focus:border-blue-500 focus:ring-blue-500 h-12" // Increased height
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-purple-600 focus:ring-purple-500"
              />
              <Label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">
                Remember me
              </Label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-blue-700 hover:text-blue-600">
                Forgot your password?
              </a>
            </div>
          </div>
          

          <Button
            type="submit"
            className="w-full bg-purple-600 hover:ring-purple-500 transition-colors duration-300 h-12"
          >
            Sign in
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-600" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-gray-800 px-2 text-zinc-400">Or continue with</span>
          </div>
        </div>

        <Button
          variant="outline"
          type="button"
          className="w-full bg-gray-700 border-gray-600 hover:bg-gray-600 transition-colors duration-300 h-12"
        >
          {/* <Icons.google className="mr-2 h-4 w-4" /> */}
          Google
        </Button>

        <p className="mt-8 text-center text-sm text-gray-400">
          Not a member?{' '}
          <a href="/signup" className="font-medium text-blue-700 hover:text-blue-600">
            Sign up now
          </a>
        </p>
      </motion.div>
    </div>
  );
}
