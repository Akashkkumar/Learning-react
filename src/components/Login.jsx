import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authLogin } from "../redux/features/authSlice";
import authService from "../appwrite/auth_service";
import { Button, Input, Logo } from "./index";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const isDark = useSelector((state) => state.theme.isDark);

  // handle form submit
  const handleLogin = async (data) => {
    setError("");
    setLoading(true);
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        setLoading(false);
        navigate("/");
      }
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="flex items-center justify-center w-full px-3">
      <div
        className={`mx-auto w-full max-w-lg ${
          isDark ? "bg-gray-700 border-white" : "bg-gray-100 border-black/10"
        } rounded-xl p-10 border `}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo />
          </span>
        </div>
        <h2 className={` text-center text-2xl font-bold leading-tight`}>
          Sign in to your account
        </h2>
        <p className={`mt-2 text-center text-base `}>
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className={`font-medium text-primary transition-all duration-200 hover:underline `}
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(handleLogin)} className="mt-8">
          <div className="space-y-5">
            <Input
              className={`${isDark ? "bg-black/10" : null}`}
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              className={`${isDark ? "bg-black/10" : null}`}
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />

            {loading ? (
              <h2 className="text-center text-sm font-bold leading-tight">
                Please Wait...
              </h2>
            ) : null}
            <Button
              type="submit"
              className="w-full bg-teal-700 text-white hover:bg-teal-600 active:bg-green-600"
            >
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
