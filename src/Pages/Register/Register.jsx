import axios from "axios";
import React, { useContext, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/AuthProvider";

const Register = () => {
  const [role, setRole] = useState("");
  const { createUserWithEmailPassword, updateUserProfile } =
    useContext(UserContext);
  const navigate = useNavigate();
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
          const imageUrl = res.data.data.medium.url;

          // create user
          createUserWithEmailPassword(email, password)
            .then((result) => {
              console.log(result.user);
              const userInfo = {
                displayName: name,
                photoURL: imageUrl,
              };
              // update user profile
              updateUserProfile(userInfo)
                .then(() => {
                  // user profile updated
                  toast.success("Account created successfully")
                  navigate("/")
                })
                .catch((err) => console.log(err.message));
            })
            .catch((err) => console.log(err.message));
        }
      });
  };
  return (
    <section>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <div className="w-1/2 text-center lg:text-left">
            <h1 className="text-5xl font-bold">Register</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card w-1/2 shadow-2xl bg-base-100">
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
                    onChange={(event) => setRole(event.target.value)}
                    required
                    className="select select-primary w-full max-w-xs"
                  >
                    <option defaultValue="selected">Buyer</option>
                    <option>Seller</option>
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
              <button className="btn btn-ghost w-1/2">
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