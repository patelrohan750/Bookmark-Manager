import React, { useEffect, useRef } from 'react'
import lottie from 'lottie-web'
import { FaRegFolder } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import { Fade } from 'react-reveal'
const FeatureSection = () => {
    const category_svg = useRef(null)
    useEffect(() => {
        lottie.loadAnimation({
            container: category_svg.current, // the dom element
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: require('./category.json'), // the animation data
        })
    }, [])
    return (

        <div className='container'>
            <div className='row mt-4'>
                <div className="col-md-6 ">
                    <div className="category_svg" ref={category_svg} />

                </div>
                <div className="col-md-6 feature_section" >
                    <Fade right cascade>
                        <h2 className='home_title'>Organize with ease</h2>

                        <p className='home_text'>Bookmark Manager is not just a pretty interface, it can help you untangle your bookmarks mess.</p>



                        <div className="category_feature">
                            <strong><FaRegFolder className='me-2' />Categories</strong>
                            <p className='mt-2'>We take great pride in providing you with an accessible site that's both fast and easy to use. Organize your bookmarks in categories. </p>
                        </div>


                        <div className="category_feature">
                            <strong ><BiSearch className='me-2' /> Filters</strong>
                            <p className='mt-2'>Search efficiently by category, title, or domain. Easily search and filter on both. </p>
                        </div>

                    </Fade>



                </div>

            </div>

        </div>
    )
}

export default FeatureSection
