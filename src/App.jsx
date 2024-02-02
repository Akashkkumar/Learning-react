import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import authService from "./appwrite/auth_service";
import { authLogin, authLogout } from "./redux/features/authSlice";
import { Header, Footer, Container } from "./components/index";
import { Outlet } from "react-router-dom";
import { darkMode } from "./redux/features/themeSlice";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(authLogin(userData));
        } else {
          dispatch(authLogout());
        }
      })
      .catch((error) => {
        console.log("Error while calling getCurrentUser() in App.jsx ", error);
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  const isDark = useSelector((state) => state.theme.isDark);

  return !loading ? (

  <div className= {`min-h-screen w-full ${isDark ? "bg-[#212121]" : null}`}>
      <Header />
      <Container className={`flex justify-end`}>
        <button
          onClick={() => dispatch(darkMode())}
          className={`p-2 rounded-full text-xl ${isDark ? 'bg-white' : "bg-black"}`}
        >
          {
            isDark ? "☀️" :
          "🌙"
          }
        </button>
      </Container>
      <main className={` min-h-[90vh] ${isDark ? "bg-[#212121] text-white" : null}`}>
        <Outlet />
      </main>
      <Footer />
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
    </div>
  );
}

export default App;
