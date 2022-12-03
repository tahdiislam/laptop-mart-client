import axios from "axios";
import React, { useContext, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/AuthProvider";
import useAccessToken from "../../Hooks/useAccessToken";
import RegisterImg from "../../assets/login.png";

const Register = () => {
  const [role, setRole] = useState("buyer");
  const [userEmail, setUserEmail] = useState("");
  const { createUserWithEmailPassword, updateUserProfile, signInWithProvider } =
    useContext(UserContext);
  const navigate = useNavigate();

  // get the access token
  const [token] = useAccessToken(userEmail);

  if (token) {
    toast.success("Account created successfully");
    navigate("/");
  }
  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // image bb api key
  const imageBbApiKey = import.meta.env.VITE_IMAGE_BB_API_KEY;

  const handleLogin = (data) => {
    const name = data.name;
    const email = data.email;
    const password = data.password;
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);
    // same image to db
    axios
      .post(`https://api.imgbb.com/1/upload?key=${imageBbApiKey}`, formData)
      .then((res) => {
        if (res.data.success) {
          const imageUrl = res.data?.data?.image?.url;

          // create user
          createUserWithEmailPassword(email, password)
            .then((result) => {
              console.log();
              const userInfo = {
                displayName: name,
                photoURL: imageUrl,
              };
              // update user profile
              updateUserProfile(userInfo)
                .then(() => {
                  // user profile updated
                  // save user information to server
                  const userDetails = {
                    email,
                    name,
                    role,
                    userVerified: false,
                    image: imageUrl,
                    uid: result.user.uid,
                  };
                  const url = `${import.meta.env.VITE_server_url}users`;
                  axios
                    .post(url, userDetails)
                    .then((result) => {
                      if (result.data.result.acknowledged) {
                        setUserEmail(email);
                      }
                    })
                    .catch((err) => console.log(err.message));
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
        }
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
        <div className="hero-content px-0 md:px-4 flex-col lg:flex-row">
          <div className="w-full md:w-1/2 text-center lg:text-left">
            <img src={RegisterImg} alt="" />
          </div>
          <div className="card w-full md:w-1/2 shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(handleLogin)} className="card-body">
              <h3 className="text-3xl font-semibold text-center">Register</h3>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Full Name</span>
                </label>
                <input
                  type="text"
                  placeholder="name"
                  className="input input-bordered input-primary"
                  {...register("name", { required: "Name is required!" })}
                />
                {errors?.name && (
                  <p className="text-red-500 mt-2">{errors.name.message}</p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Upload a photo</span>
                  </label>
                  <input
                    {...register("image", { required: "Photo is required!" })}
                    type="file"
                    className="file-input file-input-bordered file-input-primary w-full"
                  />
                  {errors?.image && (
                    <p className="text-red-500 mt-2">{errors.image.message}</p>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Select you role</span>
                  </label>
                  <select
                    name="role"
                    onChange={(event) => setRole((prev) => event.target.value)}
                    required
                    className="select select-primary w-full max-w-xs"
                  >
                    <option value="buyer" defaultValue="selected">
                      Buyer
                    </option>
                    <option value="seller">Seller</option>
                  </select>
                </div>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered input-primary"
                  {...register("email", { required: "Email is required!" })}
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
                  className="input input-bordered input-primary"
                  {...register("password", {
                    required: "Password is required!",
                    minLength: {
                      value: 8,
                      message: "Password must be 8 character or more",
                    },
                    pattern: {
                      value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/,
                      message: "Password must be strong",
                    },
                  })}
                />
                {errors?.password && (
                  <p className="text-red-500 mt-2">{errors.password.message}</p>
                )}
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  Register
                </button>
              </div>
              <p className="text-center mt-3">
                Already have an account?{" "}
                <Link
                  className="text-primary underline hover:no-underline"
                  to="/login"
                >
                  Login
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

export default Register;
