//Footer.jsx

import React from 'react'
import './Footer.css'
import facebook from '../../assets/images/facebook.png'
import instagram from '../../assets/images/instagram.png'
import x from '../../assets/images/x.png'
import whatsapp from '../../assets/images/whatsapp.png'
import carta from '../../assets/images/carta.png'

function FooterHomepage() {
  return (
    <div className='footer-father'>
        <div className="footer-container">
    <div className="footer-icon-strecher">
    <div className="footer-icon-container"><img className="footer-fb-pic" src={facebook} alt="facebook" /></div>
    <div className="footer-icon-container"><img className="footer-insta-pic" src={instagram} alt="instagram" /></div>
    <div className="footer-icon-container"><img className="footer-x-pic" src={x} alt="twitter" /></div>
    <div className="footer-icon-container"><img className="footer-whatsapp-pic" src={whatsapp} alt="whatsapp" /></div>
</div>
    <div className="footer-contact-container">
        <div className="footer-text-container">
            <p className="footer-text-contact">Contacta con nosotros</p>
            <p className="footer-text-email">correo@correo.com</p>            
        </div>
        <img className="footer-contact-pic" src={carta} alt="carta" />
    </div>
</div>
    </div>
  )
}

export default FooterHomepage