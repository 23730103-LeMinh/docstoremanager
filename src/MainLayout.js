import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function MainLayout() {
  return (
    <div>
      <Header />
      <div className="container-fluid px-5 mt-4" style={{ height: "85vh" }}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
