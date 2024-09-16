'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FileText, Lock } from "lucide-react"
import { toast } from 'sonner'; 
import { postOtp, postResendOtp } from '../services/api/user/apiMethods';
import { useNavigate } from 'react-router-dom'

export default function OtpVerify() {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [timer, setTimer] = useState<number>(60);
  const [resend, setResend] = useState<boolean>(false);
  const otpRefs = useRef<Array<HTMLInputElement | null>>([]);

  // Handle OTP Input
  const handleChange = (element: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (isNaN(parseInt(element.target.value))) return false;
    setOtp([...otp.map((d, idx) => (idx === index ? element.target.value : d))]);

    if (element.target.nextSibling && element.target.value !== '') {
      (otpRefs.current[index + 1] as HTMLInputElement)?.focus();
    }
  };

  const navigate=useNavigate()
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('email') || "";

  // Timer for OTP resend
  useEffect(() => {
    const countdown = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      } else {
        setResend(true);
        clearInterval(countdown);
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [timer]);

  // Resend OTP Handler
  const handleResendClick = () => {
    setTimer(60); 
    setResend(false);
    setOtp(['', '', '', '']); 
    otpRefs.current[0]?.focus(); 

    postResendOtp({ email: email }) 
      .then((_response: any) => {
        toast.success("OTP resent to your email.");
      })
      .catch((_error) => {
        toast.error("Error resending OTP.");
      });
  };

  // Handle Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.join('').length !== 4) {
      toast.error("Please enter a valid 4-digit OTP.");
      return;
    }
    setIsVerifying(true);

    postOtp({ otp: otp.join('') })
      .then((_response: any) => {
        toast.success("OTP verified!");
        navigate('/login')
        
      })
      .catch((_error) => {
        toast.error("Invalid OTP.");
      })
      .finally(() => {
        setIsVerifying(false);
      });
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-900 rounded-2xl shadow-2xl p-8 space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-bl-full opacity-50 transform rotate-45"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gray-800 p-3 rounded-full">
                <FileText className="h-10 w-10 text-blue-400" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-center text-white mb-2">Verify Your OTP</h1>
            <p className="text-gray-400 text-center mb-6">
              We've sent a code to your device. Enter it below to access your account.
            </p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex justify-center space-x-2">
                {otp.map((data, index) => (
                  <Input
                    key={index}
                    ref={(el) => (otpRefs.current[index] = el)}
                    type="text"
                    maxLength={1}
                    value={data}
                    onChange={(e) => handleChange(e, index)}
                    className="w-12 h-12 text-center text-2xl bg-gray-800 border-gray-700 text-white focus:border-blue-500 focus:ring-blue-500"
                    aria-label={`OTP digit ${index + 1}`}
                  />
                ))}
              </div>
              <div className='flex justify-between items-center mt-4'>
                <p className="text-xs text-blue-500">Expires in {timer} seconds</p>
                {resend ? (
                  <button
                    type="button"
                    onClick={handleResendClick}
                    className="text-xs font-semibold text-red-600 hover:underline focus:outline-none"
                  >
                    Resend OTP
                  </button>
                ) : null}
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-lg py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
                disabled={isVerifying}
              >
                {isVerifying ? (
                  <>
                    <Lock className="animate-pulse mr-2 h-5 w-5" />
                    Verifying OTP...
                  </>
                ) : 'Verify OTP'}
              </Button>
            </form>
            <p className="text-sm text-gray-500 text-center mt-4">
              Didn't receive the OTP? <a href="#" className="text-blue-400 hover:text-blue-300" onClick={handleResendClick}>Resend</a>
            </p>
          </div>
        </div>
        <div className="mt-6 text-center">
          <a href="#" className="text-sm text-gray-500 hover:text-gray-400 transition-colors duration-300">
            Need help? Contact support
          </a>
        </div>
      </div>
    </div>
  );
}
