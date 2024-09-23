import React from 'react';
import './Footer.css'; // Buat file CSS terpisah untuk styling footer
import 'font-awesome/css/font-awesome.min.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-left">
                <h4><b>iQuran</b></h4>
                <p>
                iQuran adalah platform digital yang memudahkan akses dan pemahaman Al-Quran. Dengan fitur pencarian yang efisien, pengguna dapat menemukan surah dan ayat dengan cepat. Teks Arab disertai terjemahan dalam berbagai bahasa, termasuk bahasa Indonesia, serta fitur audio yang memungkinkan pengguna mendengarkan pembacaan Al-Quran. iQuran bertujuan untuk menjadi sumber pengetahuan dan inspirasi bagi semua kalangan, membantu pengguna mendalami ajaran Islam dengan mudah.
                </p>
            </div>
            <div className="footer-right">
                <h4>Ikuti Kami</h4>
                <div className="social-icons">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <i className="fa fa-facebook"></i>
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <i className="fa fa-twitter"></i>
                    </a>
                    <a href="https://www.instagram.com/ghzi.co/" target="_blank" rel="noopener noreferrer">
                        <i className="fa fa-instagram"></i>
                    </a>
                    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                        <i className="fa fa-youtube"></i>
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
