import axios from "axios";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../Context/AuthProvider";

const AddProduct = () => {
  const [condition, setCondition] = useState("Good");
  const [category, setCategory] = useState("HP");
  const { logOut, user } = useContext(UserContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const imageBbApiKey = import.meta.env.VITE_IMAGE_BB_API_KEY;

  // add product handler
  const handleAddProduct = (data) => {
    // product info
    const name = data.name;
    const price = data.price;
    const image = data.image[0];
    const phoneNumber = data.phoneNumber;
    const color = data.color;
    const cpuModel = data.cpuModel;
    const description = data.description;
    const graphicsModel = data.graphicsModel;
    const hardDiskSize = data.hardDiskSize;
    const operatingSystem = data.operatingSystem;
    const originalPrice = data.originalPrice;
    const purchaseDate = data.purchaseDate;
    const ram = data.ram;
    const screenSize = data.screenSize;
    const location = data.location;
    const formData = new FormData();
    formData.append("image", image);

    // same image to db
    axios
      .post(`https://api.imgbb.com/1/upload?key=${imageBbApiKey}`, formData)
      .then((res) => {
        if (res.data.success) {
          const imageUrl = res.data?.data?.image?.url;
          const product = {
            name,
            price,
            imageUrl,
            phoneNumber,
            color,
            cpuModel,
            description,
            graphicsModel,
            hardDiskSize,
            operatingSystem,
            originalPrice,
            purchaseDate,
            ram,
            screenSize,
            location,
            condition,
            category,
            data: new Date().toISOString().slice(0, 10),
            sellerImg: user.photoURL,
            sold: false,
            advertise: false,
          };
          // send product to the server
          const url = `${import.meta.env.VITE_server_url}products`;
          axios
            .post(url, product, {
              headers: {
                "content-type": "application/json",
                authorization: `Bearer ${localStorage.getItem("lmt")}`,
              },
            })
            .then((res) => {
              if (res.data.result.acknowledged) {
                toast.success("Product added successfully");
              }
            })
            .catch((err) => {
              if (err.response.status) {
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
      .catch((err) => console.log(err.message));
  };
  return (
    <div>
      <h1 className="text-4xl font-bold text-center text-primary mb-4">
        Add products
      </h1>
      <div className="w-full h-full px-4 md:px-0">
        <div className="w-full md:w-2/3 lg: 1/2 mx-auto">
          <form
            onSubmit={handleSubmit(handleAddProduct)}
            className="p-4 rounded"
            style={{ background: "#00e28017" }}
          >
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="product Name"
                className="input input-bordered input-primary"
                {...register("name", { required: "Product name is required!" })}
              />
              {errors?.name && (
                <p className="text-red-500 mt-2">{errors.name.message}</p>
              )}
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Price</span>
                </label>
                <input
                  type="number"
                  placeholder="price"
                  className="input input-bordered input-primary"
                  {...register("price", { required: "Price is required!" })}
                />
                {errors?.price && (
                  <p className="text-red-500 mt-2">{errors.price.message}</p>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Product Condition</span>
                </label>
                <select
                  name="role"
                  onChange={(event) =>
                    setCondition((prev) => event.target.value)
                  }
                  required
                  className="select select-primary w-full"
                >
                  <option value="Good" defaultValue="selected">
                    Good
                  </option>
                  <option value="Fair">Fair</option>
                  <option value="Excellent">Excellent</option>
                </select>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Category</span>
                </label>
                <select
                  name="role"
                  onChange={(event) =>
                    setCategory((prev) => event.target.value)
                  }
                  required
                  className="select select-primary w-full"
                >
                  <option value="Apple">Apple</option>
                  <option value="HP">HP</option>
                  <option value="Lenovo">Lenovo</option>
                  <option value="Dell">Dell</option>
                  <option value="Acer">Acer</option>
                  <option value="Asus">Asus</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Phone Number</span>
                </label>
                <input
                  type="number"
                  placeholder="phone number"
                  className="input input-bordered input-primary"
                  {...register("phoneNumber", {
                    required: "Phone number is required!",
                  })}
                />
                {errors?.phoneNumber && (
                  <p className="text-red-500 mt-2">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Location</span>
                </label>
                <input
                  type="text"
                  placeholder="location"
                  className="input input-bordered input-primary"
                  {...register("location", {
                    required: "Location is required!",
                  })}
                />
                {errors?.location && (
                  <p className="text-red-500 mt-2">{errors.location.message}</p>
                )}
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                type="text"
                placeholder="description"
                className="textarea textarea-primary"
                {...register("description", {
                  required: "Description is required!",
                })}
              />
              {errors?.description && (
                <p className="text-red-500 mt-2">
                  {errors.description.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Product Image</span>
                </label>
                <input
                  {...register("image", { required: "Image is required!" })}
                  type="file"
                  className="file-input file-input-bordered file-input-primary w-full"
                />
                {errors?.image && (
                  <p className="text-red-500 mt-2">{errors.image.message}</p>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Original Price</span>
                </label>
                <input
                  type="number"
                  placeholder="original price"
                  className="input input-bordered input-primary"
                  {...register("originalPrice", {
                    required: "Original Price is required!",
                  })}
                />
                {errors?.originalPrice && (
                  <p className="text-red-500 mt-2">
                    {errors.originalPrice.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Purchase Date</span>
                </label>
                <input
                  type="date"
                  placeholder="purchase date"
                  className="input input-bordered input-primary"
                  {...register("purchaseDate", {
                    required: "Purchase Date is required!",
                  })}
                />
                {errors?.purchaseDate && (
                  <p className="text-red-500 mt-2">
                    {errors.purchaseDate.message}
                  </p>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">CPU Model</span>
                </label>
                <input
                  type="text"
                  placeholder="cpu model"
                  className="input input-bordered input-primary"
                  {...register("cpuModel", {
                    required: "CPU model is required!",
                  })}
                />
                {errors?.cpuModel && (
                  <p className="text-red-500 mt-2">{errors.cpuModel.message}</p>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">RAM</span>
                </label>
                <input
                  type="text"
                  placeholder="ram"
                  className="input input-bordered input-primary"
                  {...register("ram", { required: "RAM is required!" })}
                />
                {errors?.ram && (
                  <p className="text-red-500 mt-2">{errors.ram.message}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Hard Disk Size</span>
                </label>
                <input
                  type="text"
                  placeholder="hard disk size"
                  className="input input-bordered input-primary"
                  {...register("hardDiskSize", {
                    required: "Hard Disk Size is required!",
                  })}
                />
                {errors?.hardDiskSize && (
                  <p className="text-red-500 mt-2">
                    {errors.hardDiskSize.message}
                  </p>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Graphics Model</span>
                </label>
                <input
                  type="text"
                  placeholder="graphics model"
                  className="input input-bordered input-primary"
                  {...register("graphicsModel", {
                    required: "Graphics Model is required!",
                  })}
                />
                {errors?.graphicsModel && (
                  <p className="text-red-500 mt-2">
                    {errors.graphicsModel.message}
                  </p>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Screen Size</span>
                </label>
                <input
                  type="text"
                  placeholder="screen size"
                  className="input input-bordered input-primary"
                  {...register("screenSize", {
                    required: "Screen Size is required!",
                  })}
                />
                {errors?.screenSize && (
                  <p className="text-red-500 mt-2">
                    {errors.screenSize.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Operating System</span>
                </label>
                <input
                  type="text"
                  placeholder="operating system"
                  className="input input-bordered input-primary"
                  {...register("operatingSystem", {
                    required: "Operating System is required!",
                  })}
                />
                {errors?.operatingSystem && (
                  <p className="text-red-500 mt-2">
                    {errors.operatingSystem.message}
                  </p>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Color</span>
                </label>
                <input
                  type="text"
                  placeholder="color"
                  className="input input-bordered input-primary"
                  {...register("color", { required: "Color is required!" })}
                />
                {errors?.color && (
                  <p className="text-red-500 mt-2">{errors.color.message}</p>
                )}
              </div>
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
