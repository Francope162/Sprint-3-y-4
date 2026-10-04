import { useState, useEffect } from 'react';
import ProductCard from './ProductCard.jsx';
// Importamos la función de tu compañero para traer los productos
import { getProducts } from '../services/productService.js';

export function Home({ onVerCatalogo, onVerContacto, onVerDetalle, onAgregarAlCarrito }) {
    // Definimos los estados para guardar los productos, la carga y los posibles errores
    const [productosDestacados, setProductosDestacados] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    // useEffect se ejecuta una sola vez al cargar el componente
    useEffect(() => {
        let activo = true;
        getProducts()
            .then(data => {
                if (!activo) return;
                // Tomamos solo los primeros 4 productos para la sección destacada
                setProductosDestacados(data.slice(0, 4));
                setCargando(false);
            })
            .catch(err => {
                if (!activo) return;
                setError(err.message);
                setCargando(false);
            });
        return () => { activo = false; };
    }, []);

    return (
        <>
            {/* HERO BANNER PRINCIPAL */}
            <section className="hero" aria-labelledby="hero-title">
                <div className="hero-content">
                    <p className="hero-eyebrow">Mueblería artesanal</p>
                    <h1 id="hero-title">HERMANOS JOTA</h1>
                    <p className="hero-description">Tradición que perdura. Diseño que trasciende.</p>
                    <p className="hero-text">
                        Cada pieza cuenta una historia de artesanía que honra el pasado mientras abraza el futuro.
                    </p>
                    <button onClick={onVerCatalogo} className="btn-primary">Nuestros Productos</button>
                </div>
                <div className="hero-image-container">
                    <img src="/img/Aparador Uspallata.png" alt="Aparador artesanal Hermanos Jota" className="hero-img" />
                </div>
            </section>

            {/* PRODUCTOS DESTACADOS */}
            <section className="destacados-container" aria-labelledby="destacados-title">
                <div className="destacados-header">
                    <p className="section-eyebrow">Nuestra selección</p>
                    <h2 id="destacados-title" className="seccion-titulo">PRODUCTOS DESTACADOS</h2>
                    <p className="section-description">
                        Descubrí nuestra selección de piezas favoritas, seleccionadas para formar parte de tu hogar.
                    </p>
                </div>
                
                <div aria-live="polite">
                    {/* Manejo de estados de carga y error exigidos por la consigna */}
                    {cargando && <p style={{ textAlign: 'center', gridColumn: '1 / -1' }}>Cargando productos destacados...</p>}
                    
                    {error && <p style={{ textAlign: 'center', gridColumn: '1 / -1', color: '#c0392b' }}>{error}</p>}
                    
                    {/* Renderizado de lista con .map() y keys cuando hay éxito */}
                    {!cargando && !error && productosDestacados.length === 0 && <p>No hay productos disponibles.</p>}
                    {!cargando && !error && <ul id="productos-destacados" className="productos-grid">{productosDestacados.map((producto) => (
                        <li key={producto.id}>
                        <ProductCard
                            product={producto}
                            onSelect={onVerDetalle}
                            onAddToCart={onAgregarAlCarrito}
                            headingLevel={3}
                        />
                        </li>
                    ))}</ul>}
                </div>

                <div className="destacados-action">
                    <button onClick={onVerCatalogo} className="btn-secondary">Ver catálogo completo</button>
                </div>
            </section>

            {/* NUESTROS COMPROMISOS */}
            <section className="beneficios-container" aria-labelledby="beneficios-title">
                <div className="destacados-header">
                    <p className="section-eyebrow">Compromiso de Longevidad</p>
                    <h2 id="beneficios-title" className="seccion-titulo">PROGRAMA "HERENCIA VIVA"</h2>
                </div>
                <div className="beneficios-grid">
                    <article className="beneficio-card">
                        <h3>Garantía extendida</h3>
                        <p>10 años en estructura, 5 años en acabados.</p>
                    </article>
                    <article className="beneficio-card">
                        <h3>Servicio de restauración</h3>
                        <p>Recuperamos y renovamos piezas antiguas.</p>
                    </article>
                    <article className="beneficio-card">
                        <h3>Taller de cuidados</h3>
                        <p>Capacitación gratuita para clientes.</p>
                    </article>
                    <article className="beneficio-card">
                        <h3>Recompra garantizada</h3>
                        <p>Hasta 40% del valor en piezas bien cuidadas.</p>
                    </article>
                    <article className="beneficio-card">
                        <h3>Certificado de trazabilidad</h3>
                        <p>Origen de cada material utilizado.</p>
                    </article>
                </div>
            </section>

            {/* OPINIONES DE CLIENTES */}
            <section className="testimonios-container" aria-labelledby="testimonios-title">
                <div className="destacados-header">
                    <p className="section-eyebrow">Sus Valoraciones</p>
                    <h2 id="testimonios-title" className="seccion-titulo">OPINIONES DE NUESTROS CLIENTES</h2>
                </div>
                <div className="testimonios-grid">
                    <article className="testimonio-card">
                        <p className="testimonio-texto">"El aparador que compramos superó nuestras expectativas. La atención al detalle en la madera es notable."</p>
                        <p className="testimonio-nombre">María F.</p>
                    </article>
                    <article className="testimonio-card">
                        <p className="testimonio-texto">"Muebles con historia y calidad real. Se nota que hay generaciones de oficio detrás de cada pieza."</p>
                        <p className="testimonio-nombre">Esteban A.</p>
                    </article>
                    <article className="testimonio-card">
                        <p className="testimonio-texto">"El servicio de restauración le dio una segunda vida a un mueble familiar. Excelente trabajo."</p>
                        <p className="testimonio-nombre">Lucía G.</p>
                    </article>
                </div>
                <div className="destacados-action">
                    <button onClick={onVerContacto} className="btn-primary">Contacta con Nosotros</button>
                </div>
            </section>
        </>
    );
}
