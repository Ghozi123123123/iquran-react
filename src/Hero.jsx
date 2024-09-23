import React from 'react';
import './Hero.css'; // Buat file CSS terpisah untuk styling hero
import QuranImage from './assets/Quran-removebg-preview.png'; 

const Hero = () => {
    return (
        <section className="hero">
            <div className="hero-content">
                <h1>
                    Satu ayat bisa mengubah hidupmu.<br />
                    Temukan makna mendalam di <br /> setiap ayat yang dibaca
                </h1>
                <p>Temukan inspirasi dalam setiap surah yang dibaca hari ini.</p>
            </div>
            <img src={QuranImage} alt="Ilustrasi Quran" className="hero-image" />
        </section>
    );
};

export default Hero;
