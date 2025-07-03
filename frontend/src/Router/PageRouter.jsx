import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ChatPage from '../page/chatpage/ChatPage';
import Chat_list from '../components/chatuser_list/Chat_list';
import RegistrationForm from '../components/Registration';

const PageRouter = () => {
    const router =createBrowserRouter([
       {
      path: "/",
      element: (
        <>
          <ChatPage/>
        </>
      ),
    },{
      path: "/chatlist",
      element: (
        <>
          <Chat_list/>
        </>
      ),
    },
    {
      path: "/register",
      element: (
        <>
          <RegistrationForm/>
        </>
      ),
    }
    ])
  return (

    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default PageRouter;
