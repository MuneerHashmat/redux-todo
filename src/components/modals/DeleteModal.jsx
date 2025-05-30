import toast from "react-hot-toast";
import PropTypes from "prop-types";

const DeleteModal = ({
  isDeleteModalOpen,
  currId,
  deleteTodo,
  toggleDeleteModal,
}) => {
  const handleYes = () => {
    deleteTodo(currId);
    toggleDeleteModal();
    toast.success("todo deleted");
  };
  return (
    <div className={`modal-container ${!isDeleteModalOpen && "hidden"}`}>
      <div className="relative bg-[var(--dark-bg)] px-[50px] py-[30px] flex flex-col justify-center items-center gap-[50px]">
        <hr className="w-full absolute top-0 left-0 border-t-3 border-[var(--brown-light)]" />
        <h3 className="text-lg font-semibold">Delete this Todo?</h3>
        <div className="flex gap-[20px] sm:gap-[30px] items-center">
          <button onClick={handleYes} className="btn-primary w-[80px] py-[5px] rounded-[5px]">
            Yes
          </button>
          <button
            onClick={toggleDeleteModal}
            className="btn-primary w-[80px] py-[5px] rounded-[5px]"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

DeleteModal.propTypes = {
  isDeleteModalOpen: PropTypes.bool,
  currId: PropTypes.string,
  deleteTodo: PropTypes.func,
  toggleDeleteModal: PropTypes.func,
};

export default DeleteModal;
