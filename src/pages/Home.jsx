
import { Link } from 'react-router-dom'
import React from 'react';

import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import EmailIcon from '@material-ui/icons/Email';

export function Home() {
    return (
        <section className="home flex column align-center justify-center" >
            <section className="start-home-page">
                <h1>koral</h1>
                <div className="img-home"></div>
            </section>

            <h1>HOME PAGE!!!</h1>
            <h1>HOME PAGE!!!</h1>
            <Link to={`/board/`} className="tryit">Try It now!</Link>
            <h1>HOME PAGE!!!</h1>
            <h1>HOME PAGE!!!</h1>
            <h1>after img!!!</h1>
            <h1>HOME PAGE!!!</h1>
            <p className="about-us">Meet the Team</p>
            <div className="about-us-container">
                <section></section>
                <div className="about-me-container">
                    <div className="about-me koral"></div>
                    <span>Koral Sabbah</span>
                    <p>bla bla bla, nanana kokoko</p>
                    <div className="links-container">
                        <a href="https://www.facebook.com/koral.benabu.5" target="blank"><FacebookIcon className="facebook-icon" /></a>
                        <a href="https://www.linkedin.com/in/%F0%9D%90%8A%F0%9D%90%A8%F0%9D%90%AB%F0%9D%90%9A%F0%9D%90%A5-%F0%9D%90%92%F0%9D%90%9A%F0%9D%90%9B%F0%9D%90%9B%F0%9D%90%9A%F0%9D%90%A1-%F0%91%81%8D-%F0%9D%90%81%F0%9D%90%9E%F0%9D%90%A7-%F0%9D%90%9A%F0%9D%90%9B%F0%9D%90%AE-%F0%91%81%8D-2b8172188/" target="blank"><LinkedInIcon className="linkedin-icon" /></a>
                        <a href="mailto:koral762@gmail.com" target="blank"><EmailIcon className="mail-icon" /></a>
                    </div>
                </div>
                <div className="about-me-container">
                    <div className="about-me miriam"></div>
                    <span>Miriam Baranovska</span>
                    <p>bla bla bla, nanana kokoko</p>
                    <div className="links-container">
                        <a href="https://www.facebook.com" target="blank"><FacebookIcon className="facebook-icon" /></a>
                        <a href="https://www.linkedin.com" target="blank"><LinkedInIcon className="linkedin-icon" /></a>
                        <a href="mailto:maryam1649@gmail.com" target="blank"><EmailIcon className="mail-icon" /></a>
                    </div>
                </div>
                <div className="about-me-container">
                    <div className="about-me ksenia"></div>
                    <span>Ksenia Braginsky</span>
                    <p>bla bla bla, nanana kokoko</p>
                    <div className="links-container">
                        <a href="https://www.facebook.com" target="blank"><FacebookIcon className="facebook-icon" /></a>
                        <a href="https://www.linkedin.com" target="blank"><LinkedInIcon className="linkedin-icon" /></a>
                        <a href="mailto:ksu0593@gmail.com" target="blank"><EmailIcon className="mail-icon" /></a>
                    </div>
                </div>

            </div>
            <div className="contact-us">k</div>
        </section>
    )
}