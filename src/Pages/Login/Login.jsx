import axios from "axios";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/AuthProvider";
import useAccessToken from "../../Hooks/useAccessToken";
import login from "../../assets/login.png";

const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const { signInUser, signInWithProvider } = useContext(UserContext);
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const navigate = useNavigate();
  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [token] = useAccessToken(userEmail);

  if (token) {
    toast.success("Login successfully");
    navigate(from, { replace: true });
  }
  // get the access token

  // login handler
  const handleLogin = (data) => {
    const email = data.email;
    const password = data.password;

    signInUser(email, password)
      .then(() => {
        setUserEmail(email);
      })
      .catch((err) => {
        toast.error(
          err.message
            .split("Firebase: ")
            .join("")
            .split(" (")
            .join(": ")
            .split("/")
            .join(" ")
            .split("-")
            .join(" ")
            .split(")")
            .join("")
        );
      });
  };

  const hanleGoogleSignIn = () => {
    signInWithProvider()
      .then((res) => {
        console.log(res.user);
        const email = res.user.email;
        const user = {
          email: res.user.email,
          name: res.user.displayName,
          role: "buyer",
          userVerified: false,
          image: res.user.photoURL,
          uid: res.user.uid,
        };
        console.log(user);
        if (user) {
          axios
            .put(`${import.meta.env.VITE_server_url}user-google`, user)
            .then((result) => {
              console.log(result.data.result);
              if (result.data.result) {
                setUserEmail(email);
              }
            })
            .catch((err) => console.log(err.message));
        }
      })
      .catch((err) =>
        toast.error(
          err.message
            .split("Firebase: ")
            .join("")
            .split(" (")
            .join(": ")
            .split("/")
            .join(" ")
            .split("-")
            .join(" ")
            .split(")")
            .join("")
        )
      );
  };

  return (
    <section className="w-full px-4 md:px-0">
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <div className="w-full md:w-1/2 text-center lg:text-left">
            <img src={login} alt="" />
          </div>
          <div className="card w-full md:w-1/2 shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(handleLogin)} className="card-body">
              <h3 className="text-3xl font-semibold text-center">Login</h3>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  {...register("email", { required: "Email is required" })}
                />
                {errors?.email && (
                  <p className="text-red-500 mt-2">{errors.email.message}</p>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  {...register("password", { required: "Password is required" })}
                />
                {errors?.password && (
                  <p className="text-red-500 mt-2">{errors.password.message}</p>
                )}
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </div>
              <p className="text-center mt-3">
                New in Laptop Mart?{" "}
                <Link
                  className="text-primary underline hover:no-underline"
                  to="/register"
                >
                  Sign Up
                </Link>{" "}
                here.
              </p>
            </form>
            <div className="divider mt-[-6px]">OR</div>
            <div className="flex justify-center mb-4">
              <button
                onClick={hanleGoogleSignIn}
                className="btn btn-ghost w-1/2"
              >
                Continue with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
