'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Mail, ArrowRight } from "lucide-react"

export default function RequestOTPForm() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      alert(`OTP sent to ${email}. Please check your email.`)
    } catch (error) {
      alert('Failed to send OTP. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gray-900 border-gray-800">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-white">Reset Password</CardTitle>
          <CardDescription className="text-center text-gray-400">
            Enter your email to receive a one-time password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email</Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                  required
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
              </div>
            </div>
            <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-lg py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
                disabled={isSubmitting}
              >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Sending OTP...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  Send OTP
                  <ArrowRight className="ml-2" size={18} />
                </div>
              )}
            </Button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Remember your password?{' '}
              <a href="/login" className="text-blue-400 hover:text-blue-300 transition-colors duration-200">
                Log in
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}