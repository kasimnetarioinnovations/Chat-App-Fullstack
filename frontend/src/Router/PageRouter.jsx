import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ChatPage from '../page/chatpage/ChatPage';

const PageRouter = () => {
    const router =createBrowserRouter([
       {
      path: "/",
      element: (
        <>
          <ChatPage/>
        </>
      ),
    },
    ])
  return (

    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default PageRouter;
