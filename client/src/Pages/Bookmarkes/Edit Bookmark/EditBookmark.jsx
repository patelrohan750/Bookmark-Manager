import React, { useState,useEffect } from 'react'
import './EditBookmark.css'
import { FaPencilAlt } from "react-icons/fa";
import { Modal, Form, Row, Col } from 'react-bootstrap'
import ContentEditable from 'react-contenteditable'
import EditCategoryModel from './EditCategoryModel';
import axios from '../../../http/index'
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { getAllBookmarksCount } from '../../../redux/Actions/bookamrk-action';
const EditBookmark = ({bookmarkId,refreshBookmark}) => {
    const [bookmark,setBookmark]=useState('')
    const [category,setCategory]=useState({
        category:'',
        id:''
    })
    const dispatch = useDispatch();
    const [title,setTitle]=useState('')
    const [desc,setDesc]=useState('')
    const [show, setShow] = useState(false);
    const [showCategory, setShowCategory] = useState(false);
    const handleCategoryClose = () => setShowCategory(false)
    const handleCategoryShow = () => setShowCategory(true)

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true)
        console.log("bokkmark id: ",bookmarkId)
        getBookamrkDetails(bookmarkId);
    };
    const editMode = (e) => {
        console.log(e.target.value);
    }
    const updateCategory=(name,id)=>{
        console.log(name,id)
        setCategory({
            category:name,
            id
        })
        handleCategoryClose()
    }
  
 

    const getBookamrkDetails=(id)=>{
        ///api/bookmark/:id
        axios.get(`/api/bookmark/${id}`).then((result)=>{
            console.log("Edit bookmark: ",result.data.bookmark)
            setBookmark(result.data.bookmark[0])
            const {category,categoryId,title,description}=result.data.bookmark[0]
            setCategory({
                category,
                id:categoryId ? categoryId:""
            })
            setTitle(title)
            setDesc(description)
        }).catch(e=>{
            console.log(e)
        })
    }

    const updateBookmarkHandler=(e)=>{
        e.preventDefault()
        axios.put(`/api/bookmark/${bookmarkId}`,{
            title,
            desc,
            category:category.category,
            categoryId:category.id

        }).then((result)=>{
            console.log("Bookmark Updated: ",result);
            refreshBookmark()
            dispatch(getAllBookmarksCount())
            toast.success('😀 Bookmark updated successfully', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              })
              handleClose()
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
    
    return (
        <div>
            <FaPencilAlt onClick={handleShow} />
            <Modal show={show} onHide={handleClose}
                size="lg"
                className='Edit_model'

            >

                <Modal.Body className='Edit_model_body'>
                    <div className="url_preview">
                        <div className="url_thumbnail">
                            <img src={bookmark.imageURL} alt="" />
                        </div>
                        <div className="url_info">

                            <ContentEditable html={title} onChange={(e)=>setTitle(e.target.value)} className='Edit_title' />
                            <ContentEditable html={desc} onChange={(e)=>setDesc(e.target.value)} className='Edit_desc' />



                        </div>
                    </div>
                    <Form className='Edit_form'>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                            <Form.Label column sm="2">
                                URL
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type='url' defaultValue={bookmark.url} readOnly/>
                            </Col>
                        </Form.Group>



                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                            <Form.Label column sm="2">
                                Collections
                            </Form.Label>
                            <Col sm="10">
                                <Form.Select onClick={handleCategoryShow}>
                                    <option>{category.category}</option>
                                </Form.Select>
                            </Col>
                        </Form.Group>
                        <EditCategoryModel showCategory={showCategory}
                            category={bookmark.category}
                            updateCategory={updateCategory}
                            handleCloseCategory={handleCategoryClose }
                        />


                        <button className='update_btn' type='submit' onClick={updateBookmarkHandler} >Update</button>
                    </Form>
                </Modal.Body>

            </Modal>
        </div>
    )
}

export default EditBookmark
