import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; // [NEW] Footer 불러오기

// --- Public Pages ---
import Home from "./pages/Home";
import Work from "./pages/Work";
import ProjectDetail from "./pages/ProjectDetail";
import Equipment from "./pages/Equipment";
import Contact from "./pages/Contact";

// --- Admin Pages ---
import AdminAuth from "./components/AdminAuth";
import AdminMenu from "./pages/admin/AdminMenu";
import AdminWorkAdd from "./pages/admin/AdminWorkAdd";
import AdminWorkManage from "./pages/admin/AdminWorkManage";
import AdminEquipment from "./pages/admin/AdminEquipment";

// Footer 제어를 위한 레이아웃 컴포넌트
const Layout = ({ children }) => {
  const location = useLocation();
  // admin 페이지에서는 Footer를 숨김 (화면 꽉 차게 쓰기 위해)
  const isAdminPage = location.pathname.startsWith("/admin");

  // 데이터 프리로드 - 페이지 이동 전에 미리 캐시
  useQuery(api.functions.getEquipments);
  useQuery(api.functions.getWorks);

  return (
    <div className="flex flex-col min-h-screen bg-ode-navy text-white">
      {/* Navbar는 어디에나 존재 (원하면 admin에서 숨길 수도 있음) */}
      {!isAdminPage && <Navbar />}

      {/* 메인 콘텐츠 */}
      <main className="flex-1">{children}</main>

      {/* Footer는 Admin이 아닐 때만 표시 */}
      {!isAdminPage && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/work/:id" element={<ProjectDetail />} />
          <Route path="/equipment" element={<Equipment />} />
          <Route path="/contact" element={<Contact />} />

          {/* Admin Routes - 비밀번호 보호 */}
          <Route path="/admin" element={<AdminAuth><AdminMenu /></AdminAuth>} />
          <Route path="/admin/work/add" element={<AdminAuth><AdminWorkAdd /></AdminAuth>} />
          <Route path="/admin/work/manage" element={<AdminAuth><AdminWorkManage /></AdminAuth>} />
          <Route path="/admin/equipment" element={<AdminAuth><AdminEquipment /></AdminAuth>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
