import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../pages/HomePage/Home";

const router = createBrowserRouter([
   {
      path: "/",
      element: <Main />,
      children: [
         {
            path: "/",
            element: <Home />,
         },
      ],
   },
//    {
//       path: "login",
//       element: <Login></Login>,
//    },
]);

export default router;
