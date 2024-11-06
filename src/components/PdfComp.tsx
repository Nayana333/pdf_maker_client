// import { useState, useRef, useEffect } from "react";
// import { Eye, Check, DownloadIcon } from 'lucide-react';
// import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Progress } from "@/components/ui/progress";

// import { Document, Page } from "react-pdf";
// import axios from 'axios';

// import { pdfjs } from 'react-pdf';

// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.mjs`;


// pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';


// interface PDFThumbnailViewerProps {
//   thumbnailUrl: string;
//   onSelect: (isSelected: boolean) => void;
//   onView: () => void;
//   scanProgress: number;
//   pdfFile: string;
// }

// export default function PdfComp({
//   thumbnailUrl,
//   onSelect,
//   onView,
//   scanProgress,
//   pdfFile
// }: PDFThumbnailViewerProps) {
//   const [isSelected, setIsSelected] = useState(false);
//   const [numPages, setNumPages] = useState(0);
//   const [selectedPages, setSelectedPages] = useState<number[]>([]);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [showScrollToTop, setShowScrollToTop] = useState(false);

//   // Handle selecting/unselecting the PDF thumbnail
//   const handleSelect = () => {
//     setIsSelected(!isSelected);
//     onSelect(!isSelected);
//   };

//   // console.log(thumbnailUrl, scanProgress, pdfFile);
//   console.log(pdfFile);
  

//   // Handle scroll to show/hide "scroll to top" button
//   useEffect(() => {
//     const handleScroll = () => {
//       if (containerRef.current && containerRef.current.scrollTop > 300) {
//         setShowScrollToTop(true);
//       } else {
//         setShowScrollToTop(false);
//       }
//     };

//     const container = containerRef.current;
//     if (container) {
//       container.addEventListener('scroll', handleScroll);
//     }

//     return () => {
//       if (container) {
//         container.removeEventListener('scroll', handleScroll);
//       }
//     };
//   }, []);

//   // When the document is successfully loaded
//   function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
//     setNumPages(numPages);
//   }

//   // Handle selection of specific pages
//   const handlePageSelection = (pageNumber: number) => {
//     setSelectedPages((prev) =>
//       prev.includes(pageNumber) ? prev.filter(page => page !== pageNumber) : [...prev, pageNumber]
//     );
//   };

//   // Handle downloading the selected pages
//   const handleDownloadSelectedPages = async () => {
//     if (selectedPages.length > 0) {
//       try {
//         const response = await axios.post(
//           `http://localhost:3000/api/users/downloadSelectedPages`,
//           {
//             pdfFile: pdfFile.split('/').pop(), // Send only the file name to the backend
//             selectedPages: selectedPages
//           },
//           { responseType: 'blob' }
//         );

//         // Create a download link for the selected pages PDF
//         const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
//         const link = document.createElement('a');
//         link.href = url;
//         link.setAttribute('download', 'selected_pages.pdf');
//         document.body.appendChild(link);
//         link.click();
//         link.remove();

//         window.URL.revokeObjectURL(url);
//       } catch (error) {
//         console.error("Error downloading selected pages:", error);
//       }
//     } else {
//       alert("No pages selected");
//     }
//   };

//   // Scroll to top functionality
//   const scrollToTop = () => {
//     if (containerRef.current) {
//       containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
//     }
//   };

//   return (
//     <div className="h-3/5 bg-card text-card-foreground rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl" ref={containerRef}>
//       <p className="mb-2 text-sm text-gray-300">
//         <span className="font-semibold">Click to Download</span>
//       </p>

//       <Button
//         type="submit"
//         className="w-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-lg"
//         onClick={handleDownloadSelectedPages}
//       >
//         Download
//         <DownloadIcon className="ml-2 h-5 w-5" />
//       </Button>

//       <div className="relative aspect-[3/4] w-full">
//         <img
//           src={thumbnailUrl}
//           alt="PDF thumbnail"
//           className="w-full h-full object-cover"
//         />
//         <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
//           <Button
//             variant="secondary"
//             size="sm"
//             onClick={onView}
//             className="text-white bg-black/50 hover:bg-black/70"
//           >
//             <Eye className="h-4 w-4 mr-2" />
//             View
//           </Button>
//         </div>
//         <div className="absolute top-2 right-2">
//           <Checkbox
//             id={`select-thumbnail-${thumbnailUrl}`}
//             checked={isSelected}
//             onCheckedChange={handleSelect}
//             className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground border-white"
//           />
//         </div>
//         <div className="absolute bottom-2 left-2 right-2">
//           <Progress value={scanProgress} className="h-1 w-full bg-secondary" />
//         </div>
//       </div>

//       <div className="p-4">
//         <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
//           {Array.from(new Array(numPages), (x, i) => i + 1).map((page) => (
//             <div key={page} className="page-wrapper">
//               <div className="page-container">
//                 <Page
//                   pageNumber={page}
//                   renderTextLayer={true}
//                   renderAnnotationLayer={false}
//                 />
//                 <div className="checkbox-wrapper">
//                   <Checkbox
//                     checked={selectedPages.includes(page)}
//                     onCheckedChange={() => handlePageSelection(page)}
//                     className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground border-white"
//                   />
//                 </div>
//               </div>
//             </div>
//           ))}
//         </Document>

//         <div className="flex items-center justify-end">
//           {scanProgress === 100 && <Check className="h-4 w-4 text-green-500" />}
//         </div>
//       </div>

//       {showScrollToTop && (
//         <Button
//           className="scroll-to-top-button"
//           onClick={scrollToTop}
//         >
//           Scroll to Top
//         </Button>
//       )}
//     </div>
//   );
// }


import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DownloadIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios';

import 'pdfjs-dist/build/pdf.worker.entry'; // Ensure the worker is properly loaded

// Set the workerSrc properly based on your environment
pdfjs.GlobalWorkerOptions.workerSrc = `/pdfjs-dist/build/pdf.worker.min.js`;

interface PdfViewerProps {
  pdfFile: string;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ pdfFile }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [selectedPages, setSelectedPages] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError(null);
    console.log("Attempting to load PDF from:", pdfFile);
  }, [pdfFile]);

  // This function is called once the PDF document is loaded successfully
  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setError(null);
    console.log("PDF loaded successfully. Number of pages:", numPages);
  };

  // This function handles errors that occur when loading the PDF
  const onDocumentLoadError = (error: Error) => {
    console.error("Error loading PDF:", error);
    setError(`Failed to load PDF: ${error.message}. Please check the file path and try again.`);
  };

  // Handle selecting and deselecting pages
  const handlePageSelection = (page: number) => {
    setSelectedPages((prev) =>
      prev.includes(page) ? prev.filter((p) => p !== page) : [...prev, page]
    );
  };

  // Handle downloading the selected pages via an API
  const handleDownloadSelectedPages = async () => {
    if (selectedPages.length === 0) {
      alert("Please select at least one page to download.");
      return;
    }

    try {
      const response = await axios.post<Blob>(
        '/api/download-pdf-pages',
        {
          pdfFile: pdfFile.split('/').pop(), // Extract file name from the path
          selectedPages: selectedPages,
        },
        { responseType: 'blob' }
      );

      // Create a downloadable link and trigger download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'selected_pages.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading selected pages:", error);
      alert("Failed to download selected pages. Please try again.");
    }
  };

  // Handle UI errors by displaying an error message
  if (error) {
    return <div className="error-message text-red-500">{error}</div>;
  }

  return (
    <div className="pdf-viewer bg-gray-800 p-4 rounded-lg shadow-lg text-white">
      <div className="controls mb-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Button
            onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
            disabled={pageNumber <= 1}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span>
            Page {pageNumber} of {numPages}
          </span>
          <Button
            onClick={() => setPageNumber((prev) => Math.min(prev + 1, numPages ?? Infinity))}
            disabled={pageNumber >= (numPages ?? 0)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <Button
          onClick={handleDownloadSelectedPages}
          className="bg-green-600 hover:bg-green-700"
          disabled={selectedPages.length === 0}
        >
          <DownloadIcon className="mr-2 h-4 w-4" />
          Download Selected
        </Button>
      </div>

      <div className="pdf-container bg-white rounded-lg overflow-hidden">
        <Document
          file={pdfFile}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          className="pdf-document"
        >
          <Page
            pageNumber={pageNumber}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            className="pdf-page"
            width={600}
          />
        </Document>
      </div>

      <div className="page-selector mt-4 flex flex-wrap gap-2">
        {Array.from(new Array(numPages), (_, index) => (
          <div key={`page_${index + 1}`} className="flex items-center">
            <Checkbox
              id={`page_${index + 1}`}
              checked={selectedPages.includes(index + 1)}
              onCheckedChange={() => handlePageSelection(index + 1)}
            />
            <label htmlFor={`page_${index + 1}`} className="ml-2 text-sm">
              Page {index + 1}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PdfViewer;
