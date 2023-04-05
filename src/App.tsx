import NavBar from "@/components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";
import RoutesComponent from "./components/RoutesComponent";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          theme="colored"
        />
        <NavBar />
        <RoutesComponent />
      </BrowserRouter>
    </div>
  );
};

export default App;
