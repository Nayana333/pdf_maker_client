// import { useState } from 'react';
// import { Eye, Check } from 'lucide-react';
// import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Progress } from "@/components/ui/progress";
// import { Document, Page } from "react-pdf";
// import axios from 'axios';
// import { useRef } from 'react';

// interface PDFThumbnailViewerProps {
//   thumbnailUrl: string;
//   onSelect: (isSelected: boolean) => void;
//   onView: () => void;
//   scanProgress: number; 
// }

// export default function PdfComp({ thumbnailUrl, onSelect, onView, scanProgress,props }: PDFThumbnailViewerProps) {
//   const [isSelected, setIsSelected] = useState(false);
//   const [numPages, setNumPages] = useState(0);
//   const [pageNumber, setPageNumber] = useState(1);
//   const [selectedPages, setSelectedPages] = useState([]);
//   const containerRef = useRef(null);
//   const [showScrollToTop, setShowScrollToTop] = useState(false);

//   const handleSelect = () => {
//     setIsSelected(!isSelected);
//     onSelect(!isSelected);
//   };


//   useEffect(() => {
//     const handleScroll = () => {
//       if (containerRef.current.scrollTop > 300) {
//         setShowScrollToTop(true);
//       } else {
//         setShowScrollToTop(false);
//       }
//     };

//     const container = containerRef.current;
//     container.addEventListener('scroll', handleScroll);

//     return () => {
//       container.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   function onDocumentLoadSuccess({ numPages }) {
//     setNumPages(numPages);
//   }


//   return (
//     <div className="w-48 bg-card text-card-foreground rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl">
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
//         <div className="flex items-center justify-end">
//           {scanProgress === 100 && (
//             <Check className="h-4 w-4 text-green-500" />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
