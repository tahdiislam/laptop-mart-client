import axios from "axios";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../Context/AuthProvider";

const AdminAction = () => {
  const { logOut } = useContext(UserContext);
  const navigate = useNavigate();
  // image bb api key
  const imageBbApiKey = import.meta.env.VITE_IMAGE_BB_API_KEY;
  // add category handler
  const handleAddCategory = (event) => {
    event.preventDefault();
    const category = event.target.category.value;
    const image = event.target.image.files[0];
    const formData = new FormData();
    formData.append("image", image);
    // same image to db
    axios
      .post(`https://api.imgbb.com/1/upload?key=${imageBbApiKey}`, formData)
      .then((res) => {
        if (res.data.success) {
          const imageUrl = res.data.data.medium.url;
          axios
            .post(
              `${import.meta.env.VITE_server_url}category`,
              {
                category,
                imageUrl,
              },
              {
                headers: {
                  authorization: `Bearer ${localStorage.getItem("lmt")}`,
                },
              }
            )
            .then((res) => {
              // category post done
              if (res.data.result.acknowledged) {
                toast.success("Category added successfully!");
              }
            })
            .catch((err) => {
              console.log(err);
              if (err.response.status === 401 || err.response.status === 403) {
                logOut()
                  .then(() => {
                    toast.error("Session Expired Please login again");
                    navigate("/login");
                  })
                  .catch((err) => {
                    console.log(err.message);
                  });
              }
            });
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401 || err.response.status === 403) {
          logOut()
            .then(() => {
              toast.error("Session Expired Please login again");
              navigate("/login");
            })
            .catch((err) => {
              console.log(err.message);
            });
        }
      });
  };

  /*  */

  return (
    <div>
      <h1 className="text-4xl font-bold text-start ml-4 mb-4 text-primary">
        Admin Action
      </h1>
      <div className="flex flex-col items-center md:flex-row-reverse">
        <div className="w-3/4 md:w-1/2 flex flex-col items-center mb-4">
          <h3 className="text-2xl font-semibold text-primary text-center mb-2">
            Add Category
          </h3>
          <div className="form-control">
            <form
              onSubmit={handleAddCategory}
              className="grid grid-cols-1 gap-4"
            >
              <div className="form-control mx-auto">
                <input
                  name="image"
                  type="file"
                  className="file-input file-input-bordered file-input-primary"
                />
              </div>

              <div className="input-group">
                <input
                  name="category"
                  type="text"
                  placeholder="add category"
                  className="input input-bordered input-primary"
                />
                <button type="submit" className="btn btn-square btn-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="w-3/4 md:w-1/2 overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th className="text-center">No</th>
                <th className="text-center">Brand</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className="text-center">1</th>
                <th className="text-center">Apple</th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminAction;
