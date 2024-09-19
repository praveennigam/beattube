import React, { useContext } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Login";
import Browse from "./Browse";
import Header from "./Header";
import Account from "./Account"; 
import ManageProfile from "./ManageProfile"; 
import HelpCenter from "./HelpCenter"; 
import { AuthContext } from "../context/AuthContext";
import VideoPlayer from "./VideoPlayer";
import ResetPassword from "./ResetPassword"; // Import the ResetPassword component

const Body = () => {
  const { isLoggedIn } = useContext(AuthContext);

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Header />
          {isLoggedIn ? <Browse /> : <Login />}
        </>
      ),
    },
    {
      path: "/video",
      element: (
        <>
          <Header />
          {isLoggedIn ? <VideoPlayer /> : <Login />}
        </>
      ),
    },
    {
      path: "/account",
      element: (
        <>
          <Header />
          {isLoggedIn ? <Account /> : <Login />}
        </>
      ),
    },
    {
      path: "/manage-profile",
      element: (
        <>
          <Header />
          {isLoggedIn ? <ManageProfile /> : <Login />}
        </>
      ),
    },
    {
      path: "/help-center",
      element: (
        <>
          <Header />
          {isLoggedIn ? <HelpCenter /> : <Login />}
        </>
      ),
    },
    {
      path: "/reset-password/:token", 
      element: (
        <>
          <Header />
          <ResetPassword />
        </>
      ),
    },
  ]);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
