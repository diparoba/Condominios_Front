import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Main from "@modules/main/Main";
import Login from "@modules/login/Login";
import Register from "@modules/register/Register";
import ForgetPassword from "@modules/forgot-password/ForgotPassword";
import RecoverPassword from "@modules/recover-password/RecoverPassword";
import { useWindowSize } from "@app/hooks/useWindowSize";
import { calculateWindowSize } from "@app/utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { setWindowSize } from "@app/store/reducers/ui";

import Dashboard from "@pages/Dashboard";
import Blank from "@pages/Blank";
import SubMenu from "@pages/SubMenu";
import Profile from "@pages/profile/Profile";
import UsuariosForm from "./pages/UsuariosForm";

import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
import { setAuthentication } from "./store/reducers/auth";
import {
  GoogleProvider,
  getAuthStatus,
  getFacebookLoginStatus,
} from "./utils/oidc-providers";
import ResidentesForm from "./pages/ResidentesForm";
import PropietariosForm from "./pages/PropietariosForm";
import ResidenciasForm from "./pages/ResidenciasForm";
import UsuariosTable from "./pages/UsuariosTable";
import ResidentesTable from "./pages/ResidentesTable";
import PropietariosTable from "./pages/PropietariosTable";
import ResidenciasTable from "./pages/ResidenciasTable";

declare const FB: any;

const App = () => {
  const windowSize = useWindowSize();
  const screenSize = useSelector((state: any) => state.ui.screenSize);
  const dispatch = useDispatch();
  const [isAppLoading, setIsAppLoading] = useState(true);

  const checkSession = async () => {
    try {
      let responses: any = await Promise.all([
        getFacebookLoginStatus(),
        GoogleProvider.getUser(),
        getAuthStatus(),
      ]);

      responses = responses.filter((r: any) => Boolean(r));

      if (responses && responses.length > 0) {
        dispatch(setAuthentication(responses[0]));
      }
    } catch (error: any) {
      console.log("error", error);
    }
    setIsAppLoading(false);
  };

  useEffect(() => {
    checkSession();
  }, []);

  useEffect(() => {
    const size = calculateWindowSize(windowSize.width);
    if (screenSize !== size) {
      dispatch(setWindowSize(size));
    }
  }, [windowSize]);

  if (isAppLoading) {
    return <p>Loading</p>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/register" element={<PublicRoute />}>
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="/forgot-password" element={<PublicRoute />}>
          <Route path="/forgot-password" element={<ForgetPassword />} />
        </Route>
        <Route path="/recover-password" element={<PublicRoute />}>
          <Route path="/recover-password" element={<RecoverPassword />} />
        </Route>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Main />}>
            <Route path="/sub-menu-2" element={<Blank />} />
            <Route path="/sub-menu-1" element={<SubMenu />} />
            <Route path="/blank" element={<Blank />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/" element={<Dashboard />} />
          </Route>
          <Route path="/" element={<Main />}>
            <Route path="/usuariosForm" element={<UsuariosForm />} />
            <Route path="/residentesForm" element={<ResidentesForm />} />
            <Route path="/propietariosForm" element={<PropietariosForm />} />
            <Route path="/residenciasForm" element={<ResidenciasForm />} />
          </Route>

          <Route path="/" element={<Main />}>
            <Route path="/usuariosTable" element={<UsuariosTable />} />
            <Route path="/residentesTable" element={<ResidentesTable />} />
            <Route path="/propietariosTable" element={<PropietariosTable />} />
            <Route path="/residenciasTable" element={<ResidenciasTable />} />
          </Route>

          <Route path="/" element={<Main />} />
        </Route>
      </Routes>
      <ToastContainer
        autoClose={3000}
        draggable={false}
        position="top-right"
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnHover
      />
    </BrowserRouter>
  );
};

export default App;
