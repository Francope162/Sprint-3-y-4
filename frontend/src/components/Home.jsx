import { useEffect, useState } from 'react'
import { getProducts } from '../services/productService'
import ProductCard from './ProductCard'

export default function Home({ onVerCatalogo, onVerContacto, onVerDetalle, onAgregarAlCarrito }) {
  const [destacados, setDestacados] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    setLoading(true)
    setError(null)

    getProducts()
      .then((data) => {
        if (!cancelled) setDestacados(Array.isArray(data) ? data.slice(0, 3) : [])
      })
      .catch((err) => {
        if (!cancelled) setError(err.message)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section aria-labelledby="titulo-inicio">
      <h1 id="titulo-inicio" className="seccion-titulo">Hermanos Jota</h1>
      <p>
        Muebles de autor en madera maciza. Explorá el catálogo o escribinos para una consulta.
      </p>
      <div className="home-acciones">
        <button type="button" className="btn-primary" onClick={onVerCatalogo}>
          Explorar catálogo
        </button>
        {onVerContacto && (
          <button type="button" className="btn-secondary" onClick={onVerContacto}>
            Escribinos
          </button>
        )}
      </div>

      <h2 className="seccion-subtitulo">Destacados</h2>
      {loading && (
        <div className="estado-catalogo" role="status" aria-live="polite">
          <span className="loader" aria-hidden="true" />
          <p>Cargando productos...</p>
        </div>
      )}
      {error && (
        <p className="estado-catalogo estado-error" role="alert">{error}</p>
      )}
      {!loading && !error && destacados.length > 0 && (
        <ul className="productos-grid">
          {destacados.map((product) => (
            <li key={product.id}>
              <ProductCard
                product={product}
                headingLevel={3}
                onSelect={onVerDetalle}
                onAddToCart={onAgregarAlCarrito}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
