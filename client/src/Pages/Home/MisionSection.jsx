import React,{useEffect,useRef} from 'react'
import lottie from 'lottie-web'

const MisionSection = () => {
    const mision_svg=useRef(null)
    useEffect(() => {
        lottie.loadAnimation({
            container: mision_svg.current, // the dom element
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: require('./mision.json'), // the animation data
        })
    }, [])
    return (
        <div className='container'>
            <div className="row">
                <div className="col-md-6">
                        <div className='mision_svg' ref={mision_svg}/>

                        
                </div>
                <div className="col-md-6 about_intro">
                <h5 className='home_title'>We want to make it refreshingly easy for you to craft your own collection of Internet knowledge & resources.</h5>
                <p className='home_text'>You can discover, learn and be inspired by almost anything on the Internet. Bookmark Manager helps you effortlessly save and organize all that awesome stuff. And then easily find and rediscover it later.</p>
                </div>
            </div>
        </div>
    )
}

export default MisionSection
