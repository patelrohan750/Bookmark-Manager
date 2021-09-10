import React, { useState,useEffect } from 'react'
import './AddBookmark.css'
import { Button, Modal, Form, InputGroup, FormControl } from 'react-bootstrap'
import { useForm } from "react-hook-form";
import { AiOutlinePlus } from "react-icons/ai";
import { BsLink45Deg } from "react-icons/bs";
import { FcFolder } from "react-icons/fc";
import axios from '../../../http/index'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Notification from '../../../components/shared/Notification/Notification';

const AddBookmark = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const {user} = useSelector(state => state.user)
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmitHandler = (data, e) => {
        e.preventDefault()
        console.log(data);
        axios.post('/api/bookmark',{
            url:data.link,
            category:data.category,
            userBy:user._id
        }).then((result)=>{
            console.log(result);
            toast.success('😀 Bookmark saved successfully',{
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }).catch((e)=>{
            console.log(e);
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
        reset('', {
            keepValues: false,
        })
        e.target.reset();
        handleClose();
    }
    console.log(errors);
    return (
        <React.Fragment>
            <Notification/>
            <div className="add__circle" onClick={handleShow}>
                <AiOutlinePlus className="circle__icon text-white" />
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Bookmark</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit(onSubmitHandler)}>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>URL</Form.Label>
                            <InputGroup className="mb-3">

                                <InputGroup.Text id="basic-addon1">
                                    <BsLink45Deg className='link_icon' />
                                </InputGroup.Text>
                                <FormControl
                                    type='url'
                                    placeholder="Type or paste here"


                                    {
                                    ...register('link', {
                                        required: "URL is required"

                                    })
                                    }
                                    isInvalid={errors.link}
                                />
                                <Form.Control.Feedback type="invalid">
                                   {errors.link?.message}
                                </Form.Control.Feedback>

                            </InputGroup>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Category</Form.Label>
                            <InputGroup className="mb-3">

                                <InputGroup.Text id="basic-addon1">
                                    <FcFolder className='folder_icon' />
                                </InputGroup.Text>
                                <FormControl
            
                                    type='text'
                                    placeholder="category"
                                    {
                                    ...register('category', {
                                        required: "category is required"

                                    }) 
                                    } isInvalid={errors.category}
                                />
                              <Form.Control.Feedback type="invalid">
                                   {errors.category?.message}
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>


                        <Modal.Footer>
                            <Button variant="primary" type='submit' >
                                Save
                            </Button>
                            {/* <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button> */}

                        </Modal.Footer>
                    </Form>
                </Modal.Body>

            </Modal>

        </React.Fragment>
    )
}

export default AddBookmark
