import React, { useState, useEffect } from 'react';

export function Footer({ onNavegar }) {
    // 1. Estado para controlar si el botón es visible
    const [isVisible, setIsVisible] = useState(false);

    // 2. Efecto para escuchar el scroll
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    // 3. Función para subir suavemente al inicio
    const scrollToTop = (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <footer className="site-footer">
            <div className="footer-container">
                <div className="footer-showroom">
                    <h3>Showroom y Taller</h3>
                    <address style={{ fontStyle: 'normal' }}>
                        <p>Hermanos Jota — Casa Taller</p>
                        <p>Av. San Juan 2847, C1232AAB</p>
                        <p>Barrio de San Cristóbal, CABA, Argentina</p>
                        <p>Lun a Vie: 10:00–19:00 · Sáb: 10:00–14:00</p>
                    </address>
                </div>
                <div className="footer-contacto">
                    <h3>Contacto Digital</h3>
                    <p><a href="https://www.hermanosjota.com.ar" target="_blank" rel="noopener noreferrer">www.hermanosjota.com.ar</a></p>
                    <p><a href="mailto:info@hermanosjota.com.ar">info@hermanosjota.com.ar</a></p>
                    <p><a href="mailto:ventas@hermanosjota.com.ar">ventas@hermanosjota.com.ar</a></p>
                    <p>Instagram: @hermanosjota_ba</p>
                    <p>WhatsApp: +54 11 4567-8900</p>
                </div>
                <ul className="footer-links">
                    <li>
                        <a href="#inicio" onClick={(e) => { e.preventDefault(); if(onNavegar) onNavegar('inicio'); }}>Inicio</a>
                    </li>
                    <li>
                        <a href="#catalogo" onClick={(e) => { e.preventDefault(); if(onNavegar) onNavegar('catalogo'); }}>Catálogo</a>
                    </li>
                    <li>
                        <a href="#contacto" onClick={(e) => { e.preventDefault(); if(onNavegar) onNavegar('contacto'); }}>Contacto</a>
                    </li>
                </ul>
            </div>
            
            {/* BOTÓN VOLVER ARRIBA */}
            <a 
                href="#top" 
                className={isVisible ? "back-to-top visible" : "back-to-top"} 
                aria-label="Volver al inicio de la página"
                onClick={scrollToTop}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="m18 15-6-6-6 6" />
                </svg>
            </a>
        </footer>
    );
}