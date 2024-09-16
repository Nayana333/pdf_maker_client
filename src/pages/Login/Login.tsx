'use client'

import {  useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"
import { AiOutlineGoogle } from "react-icons/ai"
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { initialValues, validationSchema } from '../../utils/validation/LoginValidation'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { signInWithPopup } from "firebase/auth"
import { auth, provider } from "../../utils/fireConfig"
import { googleAuthenticate, postLogin } from '../../services/api/user/apiMethods'
import { useDispatch, useSelector } from 'react-redux'
import { logged } from '../../utils/context/reducers/authSlice'
import TextError from '../../components/TextError'

export default function LoginPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const userSelect = (state: any) => state.auth.user
  const user = useSelector(userSelect)

  // Formik submit logic
  const submit = (values: any) => {
    postLogin(values).then((response: any) => {
      const data = response.data
      if (response.status === 200) {
        toast.success(data.message)
        dispatch(logged({ user: data }))
        localStorage.setItem('userToken', data.token)
        navigate('/home')
      } else {
        toast.error(data.message)
      }
    }).catch((error: Error) => {
      toast.error(error?.message)
    })
  }

  // Google authentication logic
  const googleSubmit = () => {
    signInWithPopup(auth, provider).then((data: any) => {
      const userData = {
        userName: data.user.displayName,
        email: data.user.email,
      }
      googleAuthenticate(userData).then((response: any) => {
        const data = response.data
        if (response.status === 200) {
          toast.success(data.message)
          dispatch(logged({ user: data }))
          localStorage.setItem('userToken', data.token)
          navigate('/home')
        } else {
          toast.error(data.message)
        }
      }).catch((error: Error) => {
        toast.error(error?.message)
      })
    })
  }

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/home')
    }
  }, [user, navigate])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-xl p-8 space-y-8 bg-gray-800 rounded-xl shadow-2xl"
      >
        <div className="text-center space-y-1">
          <h2 className="text-3xl font-bold">PDF Maker</h2>
          <p className="text-zinc-400">Sign in to your account</p>
        </div>

        <Formik initialValues={initialValues} onSubmit={submit} validationSchema={validationSchema}>
          {() => (
            <Form className="space-y-3">
              <div className="space-y-1">
                <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                <Field
                  as={Input}
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  className="bg-gray-700 border-gray-600 focus:border-blue-500 focus:ring-blue-500 h-12"
                />
                <ErrorMessage name="email" component={TextError} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm  font-medium">Password</Label>
                <Field
                  as={Input}
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="bg-gray-700 border-gray-600 focus:border-blue-500 focus:ring-blue-500 h-12"
                />
                <ErrorMessage name="password" component={TextError} />
              </div>

              <Button
                type="submit"
                className="w-full mt-16 bg-purple-600 hover:ring-purple-500 transition-colors duration-300 h-12"
              >
                Sign in
              </Button>


              <p className="mt-8 text-center text-sm text-gray-400">
                forgot your password?{' '}
                <a href="/forgotemail" className="font-medium text-blue-700 hover:text-blue-600">
                  reset
                </a>
              </p>
            </Form>
          )}
        </Formik>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-600" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-gray-800 px-2 text-zinc-400">Or continue with</span>
          </div>
        </div>

        <button
          type="button"
          className="w-full bg-gray-700 border-gray-600 hover:bg-gray-600 transition-colors duration-300 h-12 flex items-center justify-center"
          onClick={googleSubmit}
        >
          <AiOutlineGoogle className="mr-2 h-4 w-4" />
          Google
        </button>

        <p className="mt-8 text-center text-sm text-gray-400">
          Not a member?{' '}
          <a href="/signup" className="font-medium text-blue-700 hover:text-blue-600">
            Sign up now
          </a>
        </p>
      </motion.div>
    </div>
  )
}
