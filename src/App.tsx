// import { useEffect, useRef } from "react";
// import { Outlet, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { toast } from "sonner";
// import { pdfjs } from 'react-pdf';
// import * as pdfjsDist from 'pdfjs-dist';

// pdfjs.GlobalWorkerOptions.workerSrc = pdfjsDist.GlobalWorkerOptions.workerSrc;

// function App() {
//   return (
//     <>
//       <div>       
//         <div className="home-main">
//           <div className="hidden lg:block home-section-1" id="mobile-menu-2">         
//           </div>
//           <Outlet />
//         </div>
//       </div>
//     </>
//   );
// }

// export default App;


// //
// import { useEffect } from 'react';
// import { pdfjs } from 'react-pdf';
// import * as pdfjsDist from 'pdfjs-dist';

// // Set up the PDF.js worker
// pdfjs.GlobalWorkerOptions.workerSrc = pdfjsDist.GlobalWorkerOptions.workerSrc;

// function App() {
//   useEffect(() => {
//     // Any additional setup or side effects
//   }, []);

//   return (
//     <div>
//       <div className="home-main">
//         <div className="hidden lg:block home-section-1" id="mobile-menu-2"></div>
//         {/* Other components */}
//       </div>
//     </div>
//   );
// }

// export default App;





import { useEffect } from 'react';
import { pdfjs } from 'react-pdf';

// Use a CDN URL for the worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function App() {
  useEffect(() => {
    // Any additional setup or side effects
  }, []);

  return (
    <div>
      <div className="home-main">
        {/* Other components */}
      </div>
    </div>
  );
}

export default App;