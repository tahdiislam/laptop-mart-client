import React from "react";

const ConfirmModal = ({ handler, deleteProduct, text, setDeleteProduct }) => {
  const { name } = deleteProduct;
  return (
    <div>
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="confirm-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <div className="flex justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-20 h-20 text-red-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
          </div>
          <h3 className="font-bold text-lg text-center">{name}</h3>
          <p className="py-4 text-center">{text}</p>
          <div className="modal-action w-full flex justify-center">
            <label onClick={handler} className="btn btn-error">
              Confirm
            </label>
            <label
              onClick={() => setDeleteProduct(null)}
              className="btn btn-primary"
            >
              Cancel
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
