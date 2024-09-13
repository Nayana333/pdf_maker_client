
import { useEffect, useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "sonner";


function App() {

  return (
    <>
        <div>       
          <div className="home-main">
            <div className="hidden lg:block home-section-1" id="mobile-menu-2">         
            </div>
            <Outlet />
          </div>
        </div>
    </>
  );
}

export default App;