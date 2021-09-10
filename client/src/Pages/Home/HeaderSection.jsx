import React, { useEffect, useRef } from 'react'
import lottie from 'lottie-web'
import { Link } from 'react-router-dom'
import { Bounce, Fade } from 'react-reveal'
const HeaderSection = () => {
    const office_svg = useRef(null)


    useEffect(() => {
        lottie.loadAnimation({
            container: office_svg.current, // the dom element
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: require('./office.json'), // the animation data
        })

    }, [])
    return (
        <div className='container home_header_section'>
            <div className="row">
                <Fade left cascade>
                    <div className="col-md-6 header_info">

                        <div className=" mb-3">
                            <h1>All-in-one bookmark manager</h1>
                            <h4 className='mt-2'>Intuitive. Powerful. Runs everywhere</h4>
                        </div>
                        <div>
                           
                                <Link to='/register' className='headerSection_btn'>Get Started Now</Link>
                           

                        </div>


                    </div>
                </Fade>
                <Fade right>
                    <div className="col-md-6">
                        <div className="office_svg" ref={office_svg} />

                    </div>

                </Fade>

            </div>

        </div>
    )
}

export default HeaderSection
