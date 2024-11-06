'use client'
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { logout } from '@/utils/context/reducers/authSlice';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FileUp, User, File, ChevronRight, LogOut ,CircleX} from "lucide-react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { baseURL } from '../config';
import { toast } from 'sonner'; 
import PdfComp from '@/components/PdfComp';


import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = 'pdf.worker.min.js';


export default function Component() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [allImage, setAllImage] = useState<{ _id: string; title: string; pdf: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [pdfFile, setPdfFile] = useState<string | null>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectUser = (state: any) => state.auth.user || '';
  const user = useSelector(selectUser) || '';
  const userId = user._id;

  const initialValues = {
    resume: null,
  };

  const validationSchema = Yup.object({
    resume: Yup.mixed()
      .required('File is required')
      .test('fileSize', 'File too large', (value) => value && value.size <= 5000000)
      .test('fileType', 'Invalid file type', (value) => value && value.type === 'application/pdf'),
  });

  const handleGetPages = async () => {
    if (!file) return;
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('pdf', file);
      formData.append('title', file.name);
      formData.append('userId', userId);

      const response = await axios.post(`${baseURL}/users/upload-pdf`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log('File uploaded successfully', response.data);
      toast.success('File uploaded successfully');

    } catch (error) {
      console.error('Error uploading file', error);
      toast.error('Error uploading file');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("userToken");
    navigate("/login");
  };

  const handleSubmit = (values: any, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    handleGetPages();
    setSubmitting(false);
  };


  const deletePdf = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/api/users/delete-file/${id}`);
      toast.success('PDF deleted successfully');
      setAllImage((prev) => prev.filter((item) => item._id !== id)); 
    } catch (error) {
      toast.error('Error deleting PDF');
      console.error('Error deleting PDF:', error);
    }
  };

  const getPdf = async (userId: string) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/users/get-files/${userId}`);
      setAllImage(response.data.data);
      
    } catch (error) {
      console.error('Error fetching PDF files:', error);
    }
  };
  
  const showPdf = (pdf: string) => {
    setPdfFile(`http://localhost:3000/uploads/${pdf}`);
  };

  useEffect(() => {
    if (userId) getPdf(userId);
  }, [userId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex flex-col">
      <header className="bg-black bg-opacity-50 backdrop-blur-md shadow-lg fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            PDF Maker
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
              <DropdownMenuItem className="focus:bg-gray-700 focus:text-white" onSelect={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col items-start">
        <div className="w-full flex">
          <div className="w-96">
            <Card className="bg-gray-800 border-gray-700 shadow-2xl overflow-hidden">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                  Transform Your PDFs
                </h2>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ setFieldValue }) => (
                    <Form className="space-y-6">
                      <div className="relative group">
                        <label
                          htmlFor="resume"
                          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-600 border-dashed rounded-xl cursor-pointer bg-gray-700 group-hover:bg-gray-600 transition-all duration-300 ease-in-out overflow-hidden"
                        >
                          {file ? (
                            <div className="flex items-center justify-center w-full h-full text-center">
                              <div>
                                <File className="w-16 h-16 mb-3 text-blue-400 mx-auto" />
                                <p className="text-sm text-gray-300">{file.name}</p>
                              </div>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <FileUp className="w-12 h-12 mb-4 text-blue-400" />
                              <p className="mb-2 text-sm text-gray-300">
                                <span className="font-semibold">Click to upload</span> or drag and drop
                              </p>
                              <p className="text-xs text-gray-500">PDF (MAX. 5MB)</p>
                            </div>
                          )}
                          <input
                            type="file"
                            id="resume"
                            name="resume"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            accept=".pdf"
                            onChange={(event) => {
                              const file = event.currentTarget.files?.[0];
                              setFieldValue("resume", file);
                              setFile(file || null);
                            }}
                          />
                        </label>
                        <ErrorMessage name="resume" component="div" className="text-red-500 text-sm" />
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-xl pointer-events-none"></div>
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-lg"
                      >
                        Upload
                        <ChevronRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Form>
                  )}
                </Formik>
              </CardContent>
            </Card>

            <div className="uploaded flex flex-col mt-8">
              <h5 className="text-lg font-semibold mb-4">Uploaded PDFs:</h5>
              <div className="output-div space-y-4">
                {allImage.map((data) => (
                  <div
                    className="inner-div flex items-center justify-between p-4 bg-gray-800 border border-gray-700 rounded-lg shadow-md"
                    key={data._id}
                  >
                    <h6 className="text-sm font-medium text-gray-300">Title: {data.title}</h6>
                    <div className="flex space-x-2">
                    <button
                        className="btn btn-primary bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
                        onClick={() => showPdf(data.pdf)}
                      >
                        Show PDF
                      </button>
                      <button
                        className="text-red-500 hover:text-red-600 transition-colors"
                        onClick={() => deletePdf(data._id)}
                      >
                        <CircleX className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="w-3/5 ml-28 mt-2">
            {pdfFile ? (
              <PdfComp pdfFile={pdfFile} />
            ) : (
              <div className="empty-message p-4 bg-gray-800 border border-gray-700 rounded-lg shadow-md">
                <p>No PDF selected.</p>
                <p>Please select a PDF from the uploaded list to view it.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="bg-black bg-opacity-50 backdrop-blur-md py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400 text-sm">
          © 2023 PDF Maker Pro. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
