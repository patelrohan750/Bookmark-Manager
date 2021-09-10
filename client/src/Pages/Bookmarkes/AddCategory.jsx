import React, { useState } from "react";
import { IoIosAdd } from "react-icons/io";
import {Form} from 'react-bootstrap'
import axios from '../../http/index'

const AddCategory = ({ shouldShow,addCategory }) => {
  
    const [show, setShow] = useState(shouldShow);
  
    const onSubmitHandler=(e)=>{
     
        addCategory(e)
       
        setShow(false)
    }
   
    return (
        <div className="add_category">
            {
                show && (
                    <div className="add_category_form" >
                        <Form onSubmit={onSubmitHandler}>
                            <div className="add_category_input">
                                <IoIosAdd className='add_category_icon'/>
                                <Form.Control type="text" placeholder="New Collection" required/>
                            </div>
                        </Form>
                    </div>
                )
            }

        </div>
    );
};

export default AddCategory;
