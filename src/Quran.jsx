import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Navbar.css';
import 'font-awesome/css/font-awesome.min.css';
import Footer from './Footer';
import Hero from './Hero';
import './App.css'; // Pastikan ini ada untuk styling

// Komponen untuk menampilkan daftar Surah
const SurahList = ({ surahs, fetchAyahs, searchTerm }) => {
    const filteredSurahs = surahs.filter((surah) =>
        surah.englishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        surah.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="surah-grid">
            {filteredSurahs.map((surah) => (
                <div className="surah-item" key={surah.number} onClick={() => fetchAyahs(surah.number, surah.name)}>
                    <div className="surah-info">
                        <h2>{surah.number}. {surah.englishName}</h2>
                        <p className="translation">{surah.englishNameTranslation}</p>
                    </div>
                    <div className="surah-arabic">
                        <h3 className="arabic-text">{surah.name}</h3>
                        <p className="ayah-count">{surah.numberOfAyahs} ayat</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

// Komponen untuk menampilkan ayat
const AyahList = ({ ayahs, selectedSurahNameArabic, setIsAyahVisible, setIsHeroVisible, convertToArabicNumbers }) => (
    <div className="ayahs-container">
        <button onClick={() => {
            setIsAyahVisible(false);
            setIsHeroVisible(true); // Tampilkan Hero kembali saat kembali
        }} className="back-button">
            <i className="fa fa-arrow-left"></i>
        </button>

        <h2 className="surah-title">{selectedSurahNameArabic}</h2>

        {selectedSurahNameArabic !== "Al-Fatiha" && (
            <h3 className="bismillah">بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</h3>
        )}

        <ul>
            {ayahs.map((ayah) => (
                <li key={ayah.numberInSurah} style={{ position: 'relative', paddingLeft: '30px' }}>
                    <span className="arabic-number" style={{ position: 'absolute', left: '0', top: '0' }}>
                        {convertToArabicNumbers(ayah.numberInSurah.toString())}.
                    </span>
                    <div>
                        <span className="arabic-text">{ayah.arabic}</span>
                        <p className="indonesian-translation">{ayah.indonesian}</p>
                    </div>
                </li>
            ))}
        </ul>
    </div>
);

// Komponen Navbar dengan Dropdown untuk Juz
const Navbar = ({ isMenuOpen, toggleMenu, searchTerm, setSearchTerm, fetchAyahsForJuz }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <div className="hamburger" onClick={toggleMenu}>
                    <span className="line"></span>
                    <span className="line"></span>
                    <span className="line"></span>
                </div>
                <img src="./src/assets/Quran-removebg-preview.png" alt="Logo" className="logo" />
                <h5>iQuran</h5>
            </div>
            <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
                <ul>
                    <li><a href="#surat">Surat</a></li>
                    <li 
                        className="juz-dropdown"
                        onMouseEnter={toggleDropdown}
                        onMouseLeave={toggleDropdown}
                    >
                        <a href="#juz">Juz</a>
                        {isDropdownOpen && (
                            <ul className="dropdown-content">
                                {Array.from({ length: 30 }, (_, i) => i + 1).map((juzNumber) => (
                                    <li key={juzNumber} onClick={() => fetchAyahsForJuz(juzNumber)}>
                                        Juz {juzNumber}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                    <li>
                        <div className="search-container">
                            <input 
                                type="text" 
                                placeholder="Cari..." 
                                className="search-input" 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <span className="search-icon">
                                <i className="fa fa-search"></i>
                            </span>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

// Komponen Utama Quran
const Quran = () => {
    const [surahs, setSurahs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [ayahs, setAyahs] = useState([]);
    const [isAyahVisible, setIsAyahVisible] = useState(false);
    const [selectedSurahNameArabic, setSelectedSurahNameArabic] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isHeroVisible, setIsHeroVisible] = useState(true);

    // Toggle menu untuk mobile view
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Fetch data surah dari API
    useEffect(() => {
        axios.get('https://api.alquran.cloud/v1/surah')
            .then(response => {
                setSurahs(response.data.data);
                setLoading(false);
            })
            .catch(err => {
                setError(err);
                setLoading(false);
            });
    }, []);

    // Fetch ayat dari surah
    const fetchAyahs = (surahNumber, surahNameArabic) => {
        axios.get(`http://api.alquran.cloud/v1/surah/${surahNumber}/editions/quran-uthmani,id.indonesian`)
            .then(response => {
                const arabicAyahs = response.data.data[0].ayahs;
                const indonesianAyahs = response.data.data[1].ayahs;

                const combinedAyahs = arabicAyahs.map((ayah, index) => ({
                    arabic: ayah.text,
                    indonesian: indonesianAyahs[index].text,
                    numberInSurah: ayah.numberInSurah
                }));

                setSelectedSurahNameArabic(surahNameArabic);
                setAyahs(combinedAyahs);
                setIsAyahVisible(true);
                setIsHeroVisible(false); // Sembunyikan Hero saat surat diklik
            })
            .catch(err => {
                setError(err);
            });
    };

    // Fetch ayat dari Juz
    const fetchAyahsForJuz = (juzNumber) => {
        axios.get(`http://api.alquran.cloud/v1/juz/${juzNumber}/quran-uthmani`)
            .then(response => {
                const arabicAyahs = response.data.data.ayahs; 
                const combinedAyahs = arabicAyahs.map(ayah => ({
                    arabic: ayah.text,
                    numberInSurah: ayah.numberInSurah
                }));

                const uniqueSurahs = [...new Set(arabicAyahs.map(ayah => ayah.surah.name))];

                setSelectedSurahNameArabic(`Juz ${juzNumber} (${uniqueSurahs.join(', ')})`);
                setAyahs(combinedAyahs);
                setIsAyahVisible(true);
                setIsHeroVisible(false); // Sembunyikan Hero saat juz diklik
            })
            .catch(err => {
                setError(err);
            });
    };
    
    // Konversi nomor ayat ke angka Arab
    const convertToArabicNumbers = (text) => {
        const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
        return text.replace(/\d/g, (digit) => arabicNumbers[digit]);
    };

    // Render loading, error, atau konten utama
    if (loading) return (
        <div className="loading-container">
            <i className="fa fa-spinner loading-icon"></i>
        </div>
    );
    if (error) return <p>Terjadi kesalahan!</p>;

    return (
        <div className="app">
            <Navbar 
                fetchAyahsForJuz={fetchAyahsForJuz}
                isMenuOpen={isMenuOpen} 
                toggleMenu={toggleMenu} 
                searchTerm={searchTerm} 
                setSearchTerm={setSearchTerm} 
            />
            
            {isHeroVisible && <Hero />}

            {isAyahVisible ? (
                <AyahList 
                    ayahs={ayahs} 
                    selectedSurahNameArabic={selectedSurahNameArabic} 
                    setIsAyahVisible={setIsAyahVisible} 
                    setIsHeroVisible={setIsHeroVisible} 
                    convertToArabicNumbers={convertToArabicNumbers} 
                />
            ) : (
                <SurahList 
                    surahs={surahs} 
                    fetchAyahs={fetchAyahs} 
                    searchTerm={searchTerm} 
                />
            )}
            
            <Footer />
        </div>
    );
};

export default Quran;
