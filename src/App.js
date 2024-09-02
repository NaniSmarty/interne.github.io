import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Left from './Component/Left';
import Header from './Component/Header';
import Footer from './Component/Footer';
import LoginWrapper from './Component/LoginWrapper';
import Home from './Component/Home';
import Addquestion from './Component/Addquestion';
import Salaryadvances from './Component/Salaryadvances';
import Notification from './Component/Notification';
import Register from './Component/Register';
import { NavigationProvider } from './Component/NavigationContext';

const Layout = ({ children }) => {
  const location = useLocation();
  const hideHeaderFooter = location.pathname === '/' || location.pathname === '/Login' || location.pathname === '/Register';
  return (
    <div className={hideHeaderFooter ? "" : "d-flex flex-column min-vh-100"}>
      {!hideHeaderFooter && (
        <aside className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 bg-gradient-dark" id="sidenav-main">
          <Left />
        </aside>
      )}
      <main className="main-content position-relative flex-fill border-radius-lg">
        {!hideHeaderFooter && <Header />}
        <div className="">
          {children}
        </div>
        {!hideHeaderFooter && <Footer />}
      </main>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <NavigationProvider>
        <Routes>
          <Route path="/" element={<Layout><LoginWrapper /></Layout>} />
          <Route path="/login" element={<Layout><LoginWrapper /></Layout>} />
          <Route path="/Home" element={<Layout><Home /></Layout>} />
          <Route path="/Addquestion" element={<Layout><Addquestion /></Layout>} />
          <Route path="/Salaryadvances" element={<Layout><Salaryadvances /></Layout>} />
          <Route path="/Notification" element={<Layout><Notification /></Layout>} />
          <Route path="/Register" element={<Layout><Register /></Layout>} />
        </Routes>
      </NavigationProvider>
    </Router>
  );
};

export default App;