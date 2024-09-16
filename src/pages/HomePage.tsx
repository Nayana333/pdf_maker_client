'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { logout } from '@/utils/context/reducers/authSlice'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FileUp, User, File, ChevronRight, LogOut } from "lucide-react"
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Component() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file)
    } else {
      alert('Please select a valid PDF file.')
    }
  }

  const dispatch=useDispatch()
  const navigate=useNavigate()

  const handleGetPages = () => {
    if (selectedFile) {
      console.log(`Processing ${selectedFile.name}...`)
      alert(`Getting all pages from ${selectedFile.name}`)
    } else {
      alert('Please upload a PDF file first.')
    }
  }

  const handleViewProfile = () => {
    console.log("View Profile clicked")
    // Implement view profile logic here
  }

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("userToken");
    localStorage.removeItem("userRefreshToken");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex flex-col">
      <header className="bg-black bg-opacity-50 backdrop-blur-md shadow-lg fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            PDF Maker Pro
          </h1>
          <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-white hover:text-blue-400 transition-colors duration-300">
                <User className="h-5 w-5 mr-2" />
                Profile
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-gray-800 border-gray-700 text-white">
              <DropdownMenuItem className="focus:bg-gray-700 focus:text-white">
                <span className="text-sm">user@example.com</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-gray-700" />
              <DropdownMenuItem className="focus:bg-gray-700 focus:text-white" onSelect={handleViewProfile}>
                <User className="mr-2 h-4 w-4" />
                <span>View Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-gray-700 focus:text-white" onSelect={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-24 flex items-center justify-center">
        <Card className="w-full max-w-md bg-gray-800 border-gray-700 shadow-2xl overflow-hidden">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              Transform Your PDFs
            </h2>
            <div className="space-y-6">
              <div className="relative group">
                <input
                  type="file"
                  id="dropzone-file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".pdf"
                />
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-600 border-dashed rounded-xl cursor-pointer bg-gray-700 group-hover:bg-gray-600 transition-all duration-300 ease-in-out overflow-hidden"
                >
                  {selectedFile ? (
                    <div className="flex items-center justify-center w-full h-full text-center">
                      <div>
                        <File className="w-16 h-16 mb-3 text-blue-400 mx-auto" />
                        <p className="text-sm text-gray-300">{selectedFile.name}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <FileUp className="w-12 h-12 mb-4 text-blue-400" />
                      <p className="mb-2 text-sm text-gray-300"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                      <p className="text-xs text-gray-500">PDF (MAX. 10MB)</p>
                    </div>
                  )}
                </label>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-xl pointer-events-none"></div>
              </div>
              <Button 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-lg"
                onClick={handleGetPages}
              >
                Get All Pages
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      <footer className="bg-black bg-opacity-50 backdrop-blur-md py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400 text-sm">
          © 2023 PDF Maker Pro. All rights reserved.
        </div>
      </footer>
    </div>
  )
}