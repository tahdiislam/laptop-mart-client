import React from "react";
import { useForm } from "react-hook-form";

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // add product handler
  const handleAddProduct = (data) => {
    console.log(data);
  };
  return (
    <div>
      <h1 className="text-4xl font-bold text-center text-primary mb-4">
        Add products
      </h1>
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
          <div className="grid grid-cols-2 gap-4">
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
            {errors?.email && (
              <p className="text-red-500 mt-2">{errors.email.message}</p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
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
          </div>
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary">
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
