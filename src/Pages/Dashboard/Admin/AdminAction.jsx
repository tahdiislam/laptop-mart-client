import React from "react";

const AdminAction = () => {
  // add category handler
  const handleAddCategory = (event) => {
    event.preventDefault();
    console.log(event.target.category.value);
  };
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
            <form onSubmit={handleAddCategory} className="input-group">
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
