import { Suspense, useEffect, useSelector } from "react";
import axios from "axios"
import SharedLayout from "../SharedLayout/SharedLayout";
import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";;
import { lazy } from "react";
import Loader from "../Loader/Loader";
import css from "./App.module.css";

// const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
// const SignInPage = lazy(() => import("../../pages/SignInPage/SignInPage"));
// const SignUpPage = lazy(() => import("../../pages/SignUpPage/SignUpPage"));
const WelcomePage = lazy(() => import("../../pages/WelcomePage/WelcomePage"));
// const NotFoundPage = lazy(() => import("../../pages/NotFoundPage/NotFoundPage"));

export default function App() {


    return (
    <div className={css.container}>
      <Suspense fallback={<Loader />}>
        <SharedLayout>
          <Routes>
            {/* <Route path="/"/> */}
            <Route path="/" element={<WelcomePage />}></Route>
            {/* <Route path="/signin" element={<SignInPage />}></Route> */}
            {/* <Route path="/signup" element={<SignUpPage />}></Route> */}
            {/* <Route path="/home" element={<HomePage />}></Route> */}
            {/* <Route path="/*" element={<NotFoundPage />}></Route> */}
          </Routes>
        </SharedLayout>
      </Suspense>
    </div>
  );
}
