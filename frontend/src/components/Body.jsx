import React, { useContext } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Login";
import Browse from "./Browse";
import Header from "./Header";
import Account from "./Account"; // Import Account page
import ManageProfile from "./ManageProfile"; // Import Manage Profile page
import HelpCenter from "./HelpCenter"; // Import Help Center page
import { AuthContext } from "../context/AuthContext";
import VideoPlayer from "./VideoPlayer";

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
          {isLoggedIn ? <Browse /> : <Login />}
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
      path: "/",
      element: (
        <>
          <Header />
          {isLoggedIn ? <VideoPlayer /> : <Login />}
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

  ]);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
