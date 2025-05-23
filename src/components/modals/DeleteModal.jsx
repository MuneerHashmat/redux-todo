import toast from "react-hot-toast";
import "./DeleteModal.css"
import PropTypes from "prop-types";

const DeleteModal = ({isDeleteModalOpen, currId, deleteTodo, toggleDeleteModal}) => {
 const handleYes=()=>{
    deleteTodo(currId)
    toggleDeleteModal();
    toast.success("todo deleted");
 }
  return (
    <div className={`modal-container ${isDeleteModalOpen && "visible"}`}>
        <div className="delete-modal-window">
            <hr/>
            <h3>Delete this Todo?</h3>
            <div className="delete-modal-buttons">
                <button 
                onClick={handleYes}
                className="btn-primary">Yes</button>
                <button 
                onClick={toggleDeleteModal}
                className="btn-primary">No</button>
            </div>
        </div>
    </div>
  )
}

DeleteModal.propTypes={
    isDeleteModalOpen: PropTypes.bool,
    currId: PropTypes.string,
    deleteTodo: PropTypes.func,
    toggleDeleteModal: PropTypes.func
}

export default DeleteModal