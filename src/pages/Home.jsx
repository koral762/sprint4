
import { Link } from 'react-router-dom'
import React from 'react';



export function Home() {
    return (
        <section className="home flex column align-center justify-center" >
            <img src="../../assets/images/home.svg" />
                <h1>koral</h1>
                <h1>HOME PAGE!!!</h1>
                <h1>HOME PAGE!!!</h1>
                <h1>HOME PAGE!!!</h1>
                <h1>HOME PAGE!!!</h1>
                <h1>after img!!!</h1>
                <h1>HOME PAGE!!!</h1>
                <p className="aboutas">About us</p>
                <div className="about-us-container">
                    <section></section>
                    <div className="about-me-container">
                        <div className="about-me koral"></div>
                        <span>Koral Sabbah</span>
                        <p>bla bla bla, nanana kokoko</p>
                    </div>
                    <div className="about-me-container">
                        <div className="about-me miriam"></div>
                        <span>Koral Sabbah</span>
                        <p>bla bla bla, nanana kokoko</p>
                    </div>
                    <div className="about-me-container">
                        <div className="about-me ksenia"></div>
                        <span>Ksenia Braginsky</span>
                        <p>bla bla bla, nanana kokoko</p>
                    </div>

                </div>
                <div className="contact-us">k</div>
        </section>
    )
}