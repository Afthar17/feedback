import { useEffect } from "react";
import Approuter from "./routes/Approuter";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./store/useUserStore";

const App = () => {
  const { checkAuth } = useUserStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  return (
    <>
      <Toaster />
      <Approuter />
    </>
  );
};

export default App;
