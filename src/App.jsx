import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import DetailRestaurant from "./pages/DetailRestaurant";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/detail-restaurant/:location_id",
      element: <DetailRestaurant />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
