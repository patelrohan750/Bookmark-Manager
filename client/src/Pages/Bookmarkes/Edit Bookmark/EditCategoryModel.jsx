import React from 'react'
import { Modal,Form } from 'react-bootstrap'
import { BsFillQuestionSquareFill } from "react-icons/bs";
import { FaFolder } from "react-icons/fa";
import { useSelector,useDispatch } from 'react-redux'
import { IoIosAdd } from "react-icons/io";
import axios from '../../../http/index'
import moment from 'moment'
import { setCategoriesRedux } from '../../../redux/Actions/bookamrk-action';
const EditCategoryModel = ({ showCategory, handleCloseCategory,category,updateCategory }) => {
    const { categories } = useSelector(state => state.bookmark)
    const {user}=useSelector(state=>state.user)
    const dispatch = useDispatch();
    const submitHandler=(e)=>{
        e.preventDefault()
        console.log(e.target[0].value)
        axios.post('/api/category',{
            created:moment().format('MMM D YYYY hh:mm:ss A'),
            category:e.target[0].value,
            userBy:user._id
        }).then((result)=>{
            console.log(result);
            const {_id,category}=result.data.category
            dispatch(setCategoriesRedux([...categories,{_id,category}]))
            updateCategory(category,_id)
            handleCloseCategory()
        }).catch(e=>{
            console.log(e);
        })
      
    }
 
    return (
        <Modal show={showCategory} onHide={handleCloseCategory} >

            <Modal.Body className='Edit_category_model_body'>
                <p>Select collection</p>
                <ul className='Edit_category_list'>
                    <li onClick={()=> updateCategory("Uncategorized","")} 
                    className={`${category==="Uncategorized" ? "edit_category_active" : ""} `}><BsFillQuestionSquareFill className='edit_category_icons' />Uncategorized</li>
                    <div>Collections</div>
                    {categories.map((item) => {
                        return (
                            <li key={item._id}
                            onClick={()=>updateCategory(item.category,item._id)}
                            className={`${category===item.category ? "edit_category_active" : ""}`}
                            ><FaFolder className='edit_category_icons' />{item.category}</li>
                        )
                    })}
                </ul>
                <div className="edit_new_category">
                    <Form onSubmit={submitHandler}>
                        <div className="add_category_input">
                            <IoIosAdd className='add_category_icon' />
                            <Form.Control type="text" placeholder="New Collection" required />
                        </div>
                    </Form>
                </div>

            </Modal.Body>

        </Modal>
    )
}

export default EditCategoryModel
