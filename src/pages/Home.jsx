
import { Link, NavLink } from 'react-router-dom'
import React from 'react';

import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import EmailIcon from '@material-ui/icons/Email';
import HeroImg from '../assets/imgs/homenew.jpg'
import Logo from '../assets/imgs/logo.png'


export function Home() {
    return (
        <section className="home flex column align-center justify-center" >

                <header className="home-pg-header flex justify-space-between align-center">
                     <img src={Logo} className="logo-img-left"/>

                    <div className="flex">
                        <NavLink to='/' className="login-btn">Log in</NavLink>
                        <NavLink to='/' className="signup-btn">Sign up</NavLink>
                    </div>
                </header>
                

            <section className="hero flex justify-space-between">
                <div className="introduction slide-right">
                    <h1>Welcome to Treelo</h1>
                    <div className="intro-text">
                        <p>Manage projects, organize tasks, and build team spirit—all in one place. Explore our many features of project and task oriented management for higher efficiency.</p>
                    </div>
                    <NavLink to={ `/board/` } className="tryit">Try It now! &#x2192;</NavLink>
                </div>
                <div className="img-container">
                <img src={HeroImg} className="slide-left" />
                </div>
            </section>

            <section className="home-pg-text">
                <img src="https://i.ibb.co/BVwnK1J/kisspng-environmentally-friendly-recycling-image-sustainab-government-flooring-flooring-concepts-inc.png" className="img-container earth-img"></img>
                <h2>Sick of replacing white board markers every week?</h2>
                <h2>Lost in the paper-towers? Save a tree, and your time!</h2>
                <h2>Be innovative, increase productivity by bringing new technology and tools into your organization.</h2>
                <h2>Receive live updates from team-mates and make faster progress then ever.</h2>
{/* https://hbr.org/2015/03/convincing-skeptical-employees-to-adopt-new-technology
https://zapier.com/learn/project-management/kanban-board/ */}
            </section>

        <section className="about-wrapper flex column">
            <h2 className="about-us-title">Contact us</h2>
            <div className="about-us-container flex justify-center align-center wrap">
              
                <div className="about-me-container">
                    <div className="about-me koral"></div>
                    <h3>Koral Sabbah</h3>
                    <div className="links-container">
                        <a href="https://www.facebook.com/koral.benabu.5" target="blank"><FacebookIcon className="facebook-icon" /></a>
                        <a href="https://www.linkedin.com/in/%F0%9D%90%8A%F0%9D%90%A8%F0%9D%90%AB%F0%9D%90%9A%F0%9D%90%A5-%F0%9D%90%92%F0%9D%90%9A%F0%9D%90%9B%F0%9D%90%9B%F0%9D%90%9A%F0%9D%90%A1-%F0%91%81%8D-%F0%9D%90%81%F0%9D%90%9E%F0%9D%90%A7-%F0%9D%90%9A%F0%9D%90%9B%F0%9D%90%AE-%F0%91%81%8D-2b8172188/" target="blank"><LinkedInIcon className="linkedin-icon" /></a>
                        <a href="mailto:koral762@gmail.com" target="blank"><EmailIcon className="mail-icon" /></a>
                    </div>
                </div>
                <div className="about-me-container">
                    <div className="about-me miriam"></div>
                    <h3>Miriam Baranovska</h3>
                    <div className="links-container">
                        <a href="https://www.facebook.com" target="blank"><FacebookIcon className="facebook-icon" /></a>
                        <a href="https://www.linkedin.com" target="blank"><LinkedInIcon className="linkedin-icon" /></a>
                        <a href="mailto:maryam1649@gmail.com" target="blank"><EmailIcon className="mail-icon" /></a>
                    </div>
                </div>
                <div className="about-me-container">
                    <div className="about-me ksenia"></div>
                    <h3>Ksenia Braginsky</h3>
                    <div className="links-container">
                        <a href="https://www.facebook.com" target="blank"><FacebookIcon className="facebook-icon" /></a>
                        <a href="https://www.linkedin.com" target="blank"><LinkedInIcon className="linkedin-icon" /></a>
                        <a href="mailto:ksu0593@gmail.com" target="blank"><EmailIcon className="mail-icon" /></a>
                    </div>
                </div>
            </div>
            {/* <div className="contact-us">k</div> */ }
        </section>
        </section>
    )
}