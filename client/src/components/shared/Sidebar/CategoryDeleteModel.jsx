import React from 'react'
import { Modal } from 'react-bootstrap'
const CategoryDeleteModel = ({ show, handleClose,category,deleteBookmarksByCategory }) => {
    return (
        <React.Fragment>
      

       
            <Modal show={show} onHide={handleClose}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                
            >

                <Modal.Body className='delete_model_body'>
                   <p className='fs-5 fw-bold mb-2'>⚠ Are you sure?</p>
                   <p>
                   Are you sure you want to delete this category? All bookmarks within the category will be deleted.
                   </p>
                   <div className="delete_model_actions_btn">
                       <button type='submit' onClick={()=>deleteBookmarksByCategory(category._id)}>Delete {category.category}</button>
                       <button type='submit' onClick={handleClose}>Close</button>
                   </div>
                </Modal.Body>

            </Modal>
        

        </React.Fragment>
    )
}

export default CategoryDeleteModel
