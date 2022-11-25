import React from "react";

const MyProduct = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold text-left ml-4 text-primary">
        My Product
      </h1>
      <div>
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Delete</th>
                <th>Name</th>
                <th>Price</th>
                <th>Status</th>
                <th>Advertise</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>
                  <button className="btn btn-square">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </th>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src=""
                          alt=""
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">Title</div>
                    </div>
                  </div>
                </td>
                <td>
                </td>
                <td>
                </td>
                <td><button className="btn text-primary btn-ghost btn-sm">Advertise</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyProduct;
