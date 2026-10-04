import React from 'react';

export function Navbar({ cantidadCarrito, vista, onNavegar }) {
    return (
        <header className="site-header">
            <div className="header-container">
                <div className="logo">
                    {/* Al estar en public/img, React resuelve la ruta directamente desde la raíz */}
                    <a href="#inicio" onClick={(e) => { e.preventDefault(); onNavegar('inicio'); }} aria-label="Mueblería Hermanos Jota - Inicio">
                        <img src="/img/logo.svg" alt="Logo Mueblería Hermanos Jota" className="logo-img" />
                    </a>
                </div>
                <nav className="main-nav" aria-label="Menú de navegación principal">
                    <ul className="nav-list">
                        <li>
                            <a href="#inicio" onClick={(e) => { e.preventDefault(); onNavegar('inicio'); }} aria-current={vista === 'inicio' ? 'page' : undefined}>Inicio</a>
                        </li>
                        <li>
                            <a href="#catalogo" onClick={(e) => { e.preventDefault(); onNavegar('catalogo'); }} aria-current={vista === 'catalogo' ? 'page' : undefined}>Catálogo</a>
                        </li>
                        <li>
                            <a href="#contacto" onClick={(e) => { e.preventDefault(); onNavegar('contacto'); }} aria-current={vista === 'contacto' ? 'page' : undefined}>Contacto</a>
                        </li>
                    </ul>
                </nav>
                <div className="cart-widget">
                    <a href="#carrito" onClick={(e) => { e.preventDefault(); onNavegar('carrito'); }} id="cart-link" aria-label="Ver carrito de compras">
                        <span className="cart-icon" aria-hidden="true">🛒</span>
                        <span id="cart-counter" aria-live="polite">{cantidadCarrito}</span>
                    </a>
                </div>
            </div>
        </header>
    );
}