import React, { useState, useRef } from 'react'
import { GoPrimitiveDot } from "react-icons/go";
import { NavLink } from 'react-router-dom';
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { NavDropdown, Form } from 'react-bootstrap'
import OutsideClickHandler from 'react-outside-click-handler';
import axios from '../../../http/index'
import moment from 'moment'
import { toast } from 'react-toastify';
import CategoryDeleteModel from './CategoryDeleteModel';
import {useDispatch} from 'react-redux'
import { setCategoriesRedux,getAllBookmarks,getBookmarkByCategory,selectdCategory } from '../../../redux/Actions/bookamrk-action';
import {useHistory,useParams} from 'react-router-dom'
const Category = ({ category,getBookmarkCount }) => {
    const [deleteModelShow, setDeleteModelShow] = useState(false);
    const dispatch = useDispatch();
    const history=useHistory()
    const {id}=useParams()
    const deleteModelhandleClose = () => setDeleteModelShow(false);
    const deleteModelhandleShow = () => setDeleteModelShow(true);
    const [isInEditMode, setIsInEditMode] = useState(false)
    const editCategory = useRef(null)
    const chnageEditMode = () => {
        console.log("edit category mode on");
        setIsInEditMode(!isInEditMode)
    }
    const onEditCategoryHandler = (e) => {
        e.preventDefault()
        axios.put(`/api/category/${category._id}`, {
            category: editCategory.current.value,
            lastUpdate: moment().format('MMM D YYYY hh:mm:ss A'),
        }).then((result) => {
            console.log('updated result',result.data);
            setIsInEditMode(false)
            dispatch(setCategoriesRedux())
            refreshBookmarks()
            
        }).catch((e) => {
            console.log(e);
        })
       

    }
    const refreshBookmarks=()=>{
        if(category._id===id){
            dispatch(getBookmarkByCategory(id))
            dispatch(selectdCategory(id))
            
        }
    }
    const deleteCategory = () => {
        console.log("delete category");
        axios.delete(`/api/category/${category._id}`).then((result) => {
            console.log(result);
            dispatch(setCategoriesRedux())
            
        }).catch((e) => {
            console.log(e);
        })
    }
    const renderEditView = () => {
        return (
            <OutsideClickHandler onOutsideClick={() => setIsInEditMode(!isInEditMode)}>
                <Form onSubmit={onEditCategoryHandler}>
                    <div className="add_category_input">
                        <GoPrimitiveDot className='all_icon' />
                        <Form.Control type="text" defaultValue={category.category} ref={editCategory} required />
                    </div>
                </Form>
            </OutsideClickHandler>
        )
    }
   
    const deleteBookmarksByCategory=(id)=>{
        console.log("deleted",id)
        axios.delete(`/api/category/bookmarks/${id}`).then((result)=>{
            console.log(result.data.message)
          
            toast.success('😀 deleted successfully', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              })
              deleteModelhandleClose()
              dispatch(setCategoriesRedux())
              dispatch(getAllBookmarks())
              getBookmarkCount('')
              history.push('/bookmarks')
             
        }).catch(e=>{
            console.log(e)
            toast.error('⚠️please try again ', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
        })
    }
    
    const renderDefaultView = () => {
        return (
            <div>

                <NavLink exact activeClassName='active_category_link' to={`/api/category/${category._id}`} className='category_links'>
                    <div className='d-flex align-items-center justify-content-between category_section'>
                        <div className='category_name'>
                            <GoPrimitiveDot className='all_icon' />{category.category}

                        </div>


                        <div className='category_actions'>
                            <div className='count category_count'>
                                {getBookmarkCount(category._id)}
                            </div>
                            <div className="action_dropdwon">
                                <NavDropdown

                                    id="nav-dropdown-dark-example"
                                    title={<BiDotsHorizontalRounded />}
                                    menuVariant="dark"
                                    className='category_threedot'
                                >
                                    <NavDropdown.Item onClick={chnageEditMode}>Rename</NavDropdown.Item>
                                    <NavDropdown.Item 
                                    onClick={getBookmarkCount(category._id) > 0 ? deleteModelhandleShow : deleteCategory}
                                    
                                    >Delete</NavDropdown.Item>

                                </NavDropdown>
                                <CategoryDeleteModel show={deleteModelShow} handleClose={deleteModelhandleClose} category={category} deleteBookmarksByCategory={deleteBookmarksByCategory}/>
                            </div>

                        </div>


                    </div>
                </NavLink>
            </div>
        )
    }


    return isInEditMode ? renderEditView() : renderDefaultView()
}

export default Category




