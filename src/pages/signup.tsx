'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { FiLoader } from "react-icons/fi";
import { AiOutlineGoogle } from "react-icons/ai";
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postRegister, googleAuthenticate } from '../services/api/user/apiMethods';
import { Formik, Form, ErrorMessage } from 'formik';
import { FormValues, validationSchema } from '../utils/validation/signUpValidation';
import TextError from '../components/TextError';
import { toast } from "sonner";
import { auth, provider } from "../utils/fireConfig";
import { signInWithPopup } from "firebase/auth";
import { logged } from '../utils/context/reducers/authSlice';

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('email') || '';
  const [userEmail, setUserEmail] = useState(email);
  const navigate = useNavigate();

  const selectUser = (state: any) => state.auth.user;
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const initialValues: FormValues = {
    userName: '',
    email: userEmail,
    password: '',
    confirmPassword: ''
  };

  useEffect(() => {
    if (email.length !== 0) {
      setUserEmail(email);
    }
  }, [email]);

  // Register Submit
  const submit = (values: FormValues) => {
    setIsLoading(true);
    postRegister(values)
      .then((response: any) => {
        if (response.status === 200) {
          navigate('/otp');
          toast.success(response.data.message);
        } else {
          toast.error(response.message);
        }
      })
      .catch((error: Error) => {
        toast.error(error?.message);
      })
      .finally(() => setIsLoading(false));
  };

  // Google Auth Submit
  const googleSubmit = () => {
    signInWithPopup(auth, provider)
      .then((data: any) => {
        const userData = {
          userName: data.user.displayName,
          email: data.user.email,
        };

        googleAuthenticate(userData)
          .then((response: any) => {
            const data = response.data;
            if (response.status === 200) {
              toast.success(data.message);
              dispatch(logged({ user: data }));
              localStorage.setItem('userToken', data.token);
              navigate('/home');
            } else {
              toast.error(data.message);
            }
          })
          .catch((error) => {
            toast.error(error?.message);
          });
      })
      .catch((error) => {
        toast.error(error?.message);
      });
  };

  useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [user, navigate]);

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

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={submit}
        >
          {({ values, handleChange, handleSubmit }) => (
            <Form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="userName" className="text-sm font-medium">Username</Label>
                <Input
                  id="userName"
                  name="userName"
                  placeholder=""
                  required
                  type="text"
                  onChange={handleChange}
                  value={values.userName}
                  className="bg-gray-700 border-gray-600 focus:border-blue-500 focus:ring-blue-500 h-12"
                />
                <ErrorMessage name="userName" component={TextError} className="text-red-500 text-xs mt-1" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                <Input
                  name="email"
                  id="email"
                  placeholder="m@example.com"
                  required
                  type="email"
                  onChange={handleChange}
                  value={values.email}
                  className="bg-gray-700 border-gray-600 focus:border-blue-500 focus:ring-blue-500 h-12"
                />
                <ErrorMessage name="email" component={TextError} className="text-red-500 text-xs mt-1" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                <Input
                  name="password"
                  id="password"
                  required
                  type="password"
                  onChange={handleChange}
                  value={values.password}
                  className="bg-gray-700 border-gray-600 focus:border-blue-500 focus:ring-blue-500 h-12"
                />
                <ErrorMessage name="password" component={TextError} className="text-red-500 text-xs mt-1" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</Label>
                <Input
                  name="confirmPassword"
                  id="confirmPassword"
                  required
                  type="password"
                  onChange={handleChange}
                  value={values.confirmPassword}
                  className="bg-gray-700 border-gray-600 focus:border-blue-500 focus:ring-blue-500 h-12"
                />
                <ErrorMessage name="confirmPassword" component={TextError} className="text-red-500 text-xs mt-1" />
              </div>

              <Button
                className="w-full bg-purple-600 hover:ring-purple-500 transition-colors duration-300 h-12 flex items-center justify-center"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <FiLoader className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                Sign Up
              </Button>
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

        <Button
          className="w-full bg-gray-700 border-gray-600 hover:bg-gray-600 transition-colors duration-300 h-12 flex items-center justify-center"
          onClick={googleSubmit}
        >
          <AiOutlineGoogle className="mr-2 h-4 w-4" />
          Google
        </Button>

        <p className="mt-8 text-center text-sm text-gray-400">
          Already have an account?{' '}
          <a href="/login" className="font-medium text-blue-700 hover:text-blue-600">
            Login now
          </a>
        </p>
      </motion.div>
    </div>
  );
}
