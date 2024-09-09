import NavBar from "./navBar";
import { Outlet } from "react-router-dom";
import Footer from "./footer";


function HeaderLayout() {
  
    return (
        <div className="flex flex-col min-h-screen ">
            <header className="bg-stone-200 sticky top-0">
            <NavBar />
            </header>
            <div className="bg-stone-300 min-h-full grow">
            <Outlet />
            </div>
            <footer className="bg-stone-300">
            <Footer />
            </footer>
        </div>
    )
  }
  
  export default HeaderLayout
  