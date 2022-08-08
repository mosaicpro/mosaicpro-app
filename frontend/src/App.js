import "./App.css";
import React, { useState, useRef, useEffect,  } from "react";
import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import HomeScreen from "./components/Screens/HomeScreen";
import Footer from "./components/Elements/Footer";
import OverviewScreen from "./components/Screens/OverviewScreen";
import WorkIndexScreen from "./components/Screens/WorkIndexScreen";
import BlogIndexScreen from "./components/Screens/BlogIndexScreen";
import CustomModal from "./components/Elements/CustomModal";
import ContactForm from "./components/Elements/ContactForm";
import CustomNavbar from "./components/Elements/CustomNavbar";
import BlogPostScreen from "./components/Screens/BlogPostScreen";
import WorkProjectScreen from "./components/Screens/WorkProjectScreen";
import ScrollToTop from "./components/Elements/ScrollToTop";
import AdminLoginScreen from "./components/Screens/Admin/AdminLoginScreen";
import PageNotFound from "./components/Screens/PageNotFound";
import AdminDashboardScreen from "./components/Screens/Admin/AdminDashboardScreen";
import CreateBlogPostScreen from "./components/Screens/Admin/CreateBlogPostScreen";
import ViewBlogPostScreen from "./components/Screens/Admin/ViewBlogPostScreen";
import CreateWorkProjectScreen from "./components/Screens/Admin/CreateWorkProjectScreen";
import ProfileSettingsScreen from "./components/Screens/Admin/ProfileSettingsScreen";
import ManageUsersScreen from "./components/Screens/Admin/ManageUsersScreen";
import ViewWorkProjectScreen from "./components/Screens/Admin/ViewWorkProjectScreen";



function App() {
  const listenToScroll = () => {
    let heightToHideFrom = 1000;
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    if (winScroll > heightToHideFrom) {
      isVisible && setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  };




  const homeSection = useRef(null);
  const aboutSection = useRef(null);
  const servicesSection = useRef(null);
  const workSection = useRef(null);
  const blogSection = useRef(null);
  const [modalShow, setModalShow] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [selected, setSelected] = useState(1);
  const [showNavbar, setShowNavbar] = useState(true);
  const pathname = window.location.pathname
  const isAdminSection = pathname.includes('admin')

  return (
    <Router>
      <ScrollToTop>
        <CustomNavbar
          ref1={homeSection}
          ref2={aboutSection}
          ref3={servicesSection}
          ref4={workSection}
          ref5={blogSection}
          setModal={setModalShow}
          setSelect={setSelected}
          selected={selected}
          showNavbar={showNavbar}
        />
        <CustomModal title="Get in touch" show={modalShow}>
          <ContactForm onHide={() => setModalShow(false)} />
        </CustomModal>
        <main onScroll={listenToScroll}>
          <Routes>
            <Route
              path="/"
              element={
                <HomeScreen
                  ref1={homeSection}
                  ref2={aboutSection}
                  ref3={servicesSection}
                  ref4={workSection}
                  ref5={blogSection}
                  setModalShow={setModalShow}
                  setSelect={setSelected}
                  setNavbar={setShowNavbar}
                />
              }
              exact
            />
            <Route
              path="/admin/login"
              element={<AdminLoginScreen setNavbar={setShowNavbar} exact />}
            />
            <Route
              path="/admin/dashboard"
              element={<AdminDashboardScreen setNavbar={setShowNavbar} exact />}
            />
            <Route
              path="/admin/blog/"
              element={<ViewBlogPostScreen setNavbar={setShowNavbar} exact />}
            />

            <Route
              path="/admin/blog-create"
              element={<CreateBlogPostScreen setNavbar={setShowNavbar} exact />}
            />
            <Route
              path="/admin/project"
              element={
                <ViewWorkProjectScreen setNavbar={setShowNavbar} exact />
              }
            />
            <Route
              path="/admin/project-create"
              element={
                <CreateWorkProjectScreen setNavbar={setShowNavbar} exact />
              }
            />
            <Route
              path="/admin/users"
              element={<ManageUsersScreen setNavbar={setShowNavbar} exact />}
            />
            <Route
              path="/admin/profile"
              element={
                <ProfileSettingsScreen setNavbar={setShowNavbar} exact />
              }
            />
            <Route
              path="/overview/"
              element={<OverviewScreen />}
              setNavbar={setShowNavbar}
            />
            <Route
              path="/work/"
              element={
                <WorkIndexScreen
                  setSelect={setSelected}
                  setNavbar={setShowNavbar}
                />
              }
            />
            <Route
              path="/work/:id"
              element={
                <WorkProjectScreen
                  setSelect={setSelected}
                  setNavbar={setShowNavbar}
                />
              }
            />
            <Route
              path="/blog/"
              element={
                <BlogIndexScreen
                  setSelect={setSelected}
                  setNavbar={setShowNavbar}
                />
              }
            />
            <Route
              path="/blog/:id"
              element={
                <BlogPostScreen
                  setSelect={setSelected}
                  setNavbar={setShowNavbar}
                />
              }
            />
            <Route path="/404" element={<PageNotFound />} />
            <Route path="*" element={<Navigate replace to="/404" />} />
          </Routes>
        </main>
        {!isAdminSection && <Footer />}
      </ScrollToTop>
    </Router>
  );
}

export default App;
