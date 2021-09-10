import React from 'react'
import './Home.css'
import CustomCard from '../../components/shared/CustomCard/CustomCard'
import { Link, useHistory } from 'react-router-dom'
import CustomButton from '../../components/shared/Custom Button/CustomButton'
import CustomNavbar from '../../components/shared/Navbar/CustomNavbar'
import HeaderSection from './HeaderSection'
import AboutHeader from './AboutHeader'
import AboutInto from './AboutInto'
import FeatureSection from './FeatureSection'
import FeatureSection2 from './FeatureSection2'
import MisionSection from './MisionSection'
import { Fade } from 'react-reveal'
const Home = () => {
    const history = useHistory();
    function startRegister() {
        console.log("Register!!");
        history.push('/register')
    }
    return (

        <div className='home'>
            <Fade top>
                <CustomNavbar />
            </Fade>

            {/* <CustomCard title="Welcome to Bookmark Manager" icon="hand">
                <p className="card__text">Bookmark manager software saves and organizes web content and websites so users can refer to it later. This is  the best place to keep all your favorite  articles or whatever else you come across while browsing.</p>
                <div>
                  <CustomButton text="Let's Go" onClick={startRegister}>
                  <img src="/images/Emoji.png" alt="" style={{marginRight:"10px"}} />
                  </CustomButton>
                </div>
                <div className="signin__wrapper">
                    <span className="have__account">Have an Account?</span>
                    <Link to="/login" className="signin__link">
                        Sign In
                    </Link>
                </div>

            </CustomCard> */}
            <HeaderSection />
          
                <AboutHeader />
           
            <Fade left>
                <AboutInto />
            </Fade>
            <Fade right>
                <FeatureSection />
            </Fade>
            <Fade left>
                <FeatureSection2 />
            </Fade>
            <Fade right>
                <MisionSection />
            </Fade>




        </div>
    )
}

export default Home
