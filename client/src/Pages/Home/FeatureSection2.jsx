import React,{useEffect,useRef} from 'react'
import lottie from 'lottie-web'

const FeatureSection2 = () => {
    const available_svg=useRef(null)
    useEffect(() => {
        lottie.loadAnimation({
            container: available_svg.current, // the dom element
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: require('./available.json'), // the animation data
        })
    }, [])
    return (
        <div className='container'>
            <div className="row">
                <div className="col-md-6 about_intro">
                <h5 className='home_title'>Available everywhere.</h5>
                <p className='home_text'>Your bookmarks can be accessed and managed from anywhere on all your devices.this is a special bookmark manager that with the power of JavaScript lets you save any website without navigating away from it.</p>
                </div>
                <div className="col-md-6">
                    <div className='available_svg' ref={available_svg}/>

                    
                </div>
            </div>
        </div>
    )
}

export default FeatureSection2
