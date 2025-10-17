import { Route, Routes } from "react-router-dom";
import LandingPage from "../pages/global.pages/landing.page";
import AboutUs from "../pages/global.pages/about.page";
import ContactUs from "../pages/global.pages/contact.page";
import DonatePage from "../pages/global.pages/donate.page";
import LoginPage from "../pages/auth.pages/login.page";
import RegisterPage from "../pages/auth.pages/register.page";
import ResidentDashboard from "../pages/resident.pages/ResidentDashboard";
import CollectionPersonnelDashboard from "../pages/personnel.pages/PersonnelDashboard";
// import TncPage from "../pages/global.pages/tnc.page"; --- IGNORE ---

export default function GlobalRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />}></Route>
      <Route path="/about" element={<AboutUs />}></Route>
      <Route path="/contact" element={<ContactUs />}></Route>
      <Route path="/donate" element={<DonatePage />}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="register/*" element={<RegisterPage />}></Route>
      <Route path="/resident" element={<ResidentDashboard />}></Route>
      <Route
        path="/personnel"
        element={<CollectionPersonnelDashboard />}
      ></Route>
      {/* <Route path='/tnc' element={<TncPage />}></Route>
            <Route path='/privacy' element={<PrivacyPolicyPage />}></Route> */}
      {/* 

            <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
                <Route path="admin/*" element={<AdminRoutes />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={["donor"]} />}>
                <Route path="donor/*" element={<DonorRoutes />} />
            </Route> */}
    </Routes>
  );
}
