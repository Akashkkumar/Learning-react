import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function AuthLayout({ children, authentication = true }) {
  const [loading, setLoading] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      navigate("/login");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }

    setLoading(false);
  }, [authentication, authStatus, navigate]);

  return loading ? <h1>Loading...</h1> : <>{children}</>;
}

export default AuthLayout;
