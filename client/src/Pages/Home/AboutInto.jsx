import React,{useEffect,useRef} from 'react'
import lottie from 'lottie-web'
import { Bounce } from 'react-reveal'
const AboutInto = () => {
    const save_svg=useRef(null)
    useEffect(() => {
        lottie.loadAnimation({
            container: save_svg.current, // the dom element
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: require('./save.json'), // the animation data
        })
    }, [])
    return (
        <div className='container'>
            <div className='row mt-4'>
            <div className="col-md-6 about_intro">
                <h5 className='home_title'>Save Anything</h5>
             
                <p className='home_text'>you can save anything online as a visual bookmark. Organize your visual bookmarks with categories and filters. Never loose anything again.You can bookmark / favorite any site directly from your browser without leaving the page you're reading. Easily filter and search your saved sites later.</p>
            
              

            </div>
            <div className="col-md-6">
                <div className="save" ref={save_svg} />
            </div>

            </div>
        </div>
    )
}

export default AboutInto
