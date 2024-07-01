import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../pages/HomePage/Home";
import TextToSpeech from "../pages/TextToSpeech/TextToSpeech";

const router = createBrowserRouter([
   {
      path: "/",
      element: <Main />,
      children: [
         {
            path: "/",
            element: <Home />,
         },
         {
            path: "/text-speech",
            element: <TextToSpeech />,
         }
      ],
   },
//    {
//       path: "login",
//       element: <Login></Login>,
//    },
]);

export default router;
