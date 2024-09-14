'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
// import { Icons } from "@/components/ui/icons"
import { motion } from "framer-motion"

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [passwordMatch, setPasswordMatch] = useState<boolean>(true)

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    if (password !== confirmPassword) {
      setPasswordMatch(false)
      return
    }
    setIsLoading(true)
    // Simulating API call
    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-xl p-8 space-y-8 bg-gray-800 rounded-xl shadow-2xl"
      >
        <div className="space-y-2 text-center">
          <h1 className="text-4xl font-bold tracking-tight">Sign Up</h1>
          <p className="text-zinc-400">Create an account to get started</p>
        </div>
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">Email</Label>
            <Input
              id="email"
              placeholder="m@example.com"
              required
              type="email"
              className="bg-gray-700 border-gray-600 focus:border-blue-500 focus:ring-blue-500 h-12" // Increased height
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">Password</Label>
            <Input
              id="password"
              required
              type="password"
              className="bg-gray-700 border-gray-600 focus:border-blue-500 focus:ring-blue-500 h-12" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password" className="text-sm font-medium">Confirm Password</Label>
            <Input
              id="confirm-password"
              required
              type="password"
              className="bg-gray-700 border-gray-600 focus:border-blue-500 focus:ring-blue-500 h-12" 
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setPasswordMatch(true);
              }}
            />
            {!passwordMatch && (
              <p className="text-red-500 text-sm">Passwords do not match</p>
            )}
          </div>
          <Button
            className="w-full bg-purple-600 hover:ring-purple-500 transition-colors duration-300 h-12"
            type="submit"
            disabled={isLoading}
          >
            {/* {isLoading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Sign Up */}
            Sign Up
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
          already have an account?{' '}
          <a href="/login" className="font-medium text-blue-700 hover:text-blue-600">
            login now
          </a>
        </p>
      </motion.div>
    </div>
  );
}