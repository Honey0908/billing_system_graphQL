import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { useAuth } from "./hooks/useAuth";
import { LoadingPage } from "./components/ui/loading";

function App() {
  const { loading } = useAuth();

  // Wait for authentication to be checked before rendering router
  if (loading) {
    return <LoadingPage />;
  }

  return <RouterProvider router={router} />;
}

export default App;
