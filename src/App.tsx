import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { Toaster } from "react-hot-toast";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./App.css";

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster
        containerStyle={{
          zIndex: 99999,
        }}
      />
    </>
  );
}

export default App;
