import React from 'react';
import "./Footer.css";
import { assets } from '../../../assets/assets/assets';


const Footer = () => {

    const backToTop = ()=>{
        window.scrollTo({top:0,left:0, behavior:"smooth"});
    }
        return (
        <div className='footer' id='footer'>
            <div className="footer-content">
                <div className="footer-content-left">
                    <img onClick={backToTop}  src={assets.logo} alt="" />
                    <p>A restaurant is a place where you can sit down and relax,
                     and let someone else do the cooking for you.Food is more than just 
                     sustenance; it is a language that speaks to our senses and brings people 
                     together. Whether you're a food enthusiast, a passionate chef, or simply
                     someone who appreciates the art of cuisine, sharing your culinary adventures
                     on Instagram has become a delightful ritual. However, finding the perfect words
                     to accompany your mouthwatering food photos can sometimes be a challenging task. 
                     Fear."</p>
                    <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />

                    </div>
                </div>
                <div className="footer-content-center">
                     <h2>COMPANY</h2>
                     <ul>
                        <li>Home</li>
                        <li>About-Us</li>
                        <li>Delivery</li>
                        <li>Privecy_Policy</li>
                     </ul>
                    
                </div>
                <div className="footer-content-right">
                  <h2>GET-IN-TOUCH</h2>
                  <ul>
                    <li>476458745637</li>
                    <li>Email-dgdh@gmail.com</li>
                  </ul>
                </div>
             
            </div>

            
        </div>
    );
}

export default Footer;
