import React, { useState,useEffect } from 'react'
import './BookmarkHeader.css'
import { BiSearchAlt2 } from "react-icons/bi";
import { Modal, Form } from 'react-bootstrap'
import { AiFillStar } from "react-icons/ai";
import { useSelector,useDispatch } from 'react-redux';
import {useParams} from 'react-router-dom'
import { selectdCategory } from '../../../redux/Actions/bookamrk-action';

const BookmarkHeader = ({  saveBookmark, searchBookmarkes }) => {
    
    const {id}=useParams()
    const [show, setShow] = useState(false);
    const [url, setUrl] = useState('')
    const [searchText, setSearchText] = useState('')
    const { bookmarks,categorySelect } = useSelector(state => state.bookmark)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(selectdCategory(id))
    }, [id])


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const bookmarkSubmitHandler = (e) => {
        e.preventDefault();
        saveBookmark(url)
        setUrl('')
        handleClose()
    }
    const onChangeSearch = (e) => {
        setSearchText(e.target.value)
        searchBookmarkes(e.target.value)
    }
    const renderSerachingHeaderText = () => {
        if (bookmarks.length === 0) {
            return `Nothing found in ${categorySelect}`
        } else if (bookmarks.length > 0) {
            return `found ${bookmarks.length} result in ${categorySelect}`
        } else {
            return `search in ${categorySelect}`
        }
    }

    return (
        <React.Fragment>
            <div className='sticky_bookamrk_header'>


                <div className='d-flex align-items-center bookmark_header'>

                    <div className="bookmark_search_section">
                        <div className="bookmark_search">
                            <div className="search_icon">
                                <BiSearchAlt2 />
                            </div>
                            <div className="search_input">
                                <input type="text" placeholder="search..."
                                    onChange={onChangeSearch}
                                />

                            </div>
                        </div>

                    </div>
                    <div className='bookmark_add_section'>
                        <button className='add_btn' onClick={handleShow}>
                            <AiFillStar /> Add
                        </button>
                        <Modal show={show} onHide={handleClose} className='add_boomark_model'

                            aria-labelledby="contained-modal-title-vcenter"
                            centered
                        >

                            <Modal.Body className='add_bookmark_model_body'>
                                <Form onSubmit={bookmarkSubmitHandler}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>URL</Form.Label>
                                        <Form.Control type="url" placeholder="https://" className='url_input' value={url}
                                            onChange={(e) => setUrl(e.target.value)}
                                        />

                                    </Form.Group>
                                    <button className={`${url ? "add_save_btn" : "add_save_disbled"}`} type='submit' disabled={!url}>
                                        Save
                                    </button>
                                </Form>

                            </Modal.Body>

                        </Modal>
                    </div>


                </div>
                <div className="category_header">
                    {
                        searchText ? renderSerachingHeaderText() : categorySelect
                    }
                </div>
                <div className="header_divider" />
            </div>
        </React.Fragment>
    )
}

export default BookmarkHeader
