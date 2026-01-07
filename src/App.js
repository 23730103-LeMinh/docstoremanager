import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import MainLayout from "./MainLayout";
import Login from "./pages/Login";
import About from "./pages/About";
import DocStores from "./pages/DocStores";
import Dashboard from "./pages/Dashbroad";
import Users from "./pages/Users";

function App() {
  return (
    <BrowserRouter className="container-fluid">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/docstores" element={<DocStores />} />
          <Route path="/about" element={<About />} />
          <Route path="/users" element={<Users />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
