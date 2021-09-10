import React from 'react'
import { Zoom } from 'react-reveal'
const AboutSection = () => {
    return (
        <Zoom cascade>
            <div className='about_section container'>
                <h2> Designed for ✐ creatives, built for <strong className='coders'>{"{coders}"}</strong> </h2>
                <h4>This is the best place to keep all your favorite books, songs, articles or whatever else you come across while browsing.</h4>
                <p>
                    We're not trying to reinvent the wheel; we're working on a tool that does everything you expect from a modern bookmark manager.
                </p>
            </div>
        </Zoom>

    )
}

export default AboutSection
