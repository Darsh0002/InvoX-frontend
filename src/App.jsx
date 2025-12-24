import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Menubar from "./components/Menubar";
import { Toaster } from "react-hot-toast";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import PreviewPage from "./pages/PreviewPage";
import MainPage from "./pages/MainPage";
import UserSyncHandler from "./components/UserSyncHandler";
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/clerk-react";

const App = () => {
  return (
    <BrowserRouter>
      <UserSyncHandler />
      <Menubar />
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <SignedIn>
                <Navigate to="/dashboard" replace />
              </SignedIn>
              <SignedOut>
                <LandingPage />
              </SignedOut>
            </>
          }
        />

        <Route
          path="/dashboard"
          element={
            <>
              <SignedIn>
                <Dashboard />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/generate"
          element={
            <>
              <SignedIn>
                <MainPage />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/preview"
          element={
            <>
              <SignedIn>
                <PreviewPage />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
