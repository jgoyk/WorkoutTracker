import NavBar from "./navBar";
import { Outlet } from "react-router-dom";
import Footer from "./footer";


function HeaderLayout() {
  
    return (
        <div className="flex flex-col min-h-screen ">
            <header className="bg-zinc-200 sticky top-0 shadow-lg">
            <NavBar />
            </header>
            <div className="bg-zinc-300 min-h-full grow">
            <Outlet />
            </div>
            <footer className="bg-zinc-200">
            <Footer />
            </footer>
        </div>
    )
  }
  
  export default HeaderLayout
  