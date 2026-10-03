// Vistas de prueba: no sustituyen las entregas asignadas al resto del grupo.
// La consulta está aislada aquí para retirarla junto con estos componentes.
import { useEffect, useState } from 'react'
import { formatoPrecio } from '../utils/carrito.js'

function useDatos(ruta) {
  const [estado, setEstado] = useState({ datos: null, error: '', cargando: true })
  const [intento, setIntento] = useState(0)
  useEffect(() => {
    const controller = new AbortController()
    setEstado({ datos: null, error: '', cargando: true })
    async function cargar() {
      try {
        const respuesta = await fetch(ruta, { signal: controller.signal })
        if (!respuesta.ok) throw new Error(respuesta.status === 404 ? 'Producto no encontrado.' : 'No se pudieron cargar los productos.')
        const datos = await respuesta.json()
        if (!controller.signal.aborted) setEstado({ datos, error: '', cargando: false })
      } catch (error) {
        if (!controller.signal.aborted) setEstado({ datos: null, error: error.message, cargando: false })
      }
    }
    cargar()
    return () => controller.abort()
  }, [ruta, intento])
  return { ...estado, reintentar: () => setIntento(actual => actual + 1) }
}

export function Navbar({ cantidadCarrito, vista, onNavegar }) {
  return <header className="integration-header"><strong>Hermanos Jota</strong>
    <nav aria-label="Navegación principal">{[['inicio', 'Inicio'], ['catalogo', 'Catálogo'], ['contacto', 'Contacto'], ['carrito', `Carrito (${cantidadCarrito})`]].map(([destino, etiqueta]) =>
      <button type="button" key={destino} aria-current={vista === destino ? 'page' : undefined} onClick={() => onNavegar(destino)}>{etiqueta}</button>)}
    </nav>
  </header>
}
export function Home({ onVerCatalogo }) {
  return <section><h1>Hermanos Jota</h1><p>Inicio provisional para comprobar la integración del equipo.</p><button type="button" onClick={onVerCatalogo}>Explorar catálogo</button></section>
}
function Estado({ cargando, error, reintentar }) {
  if (cargando) return <p role="status">Cargando productos…</p>
  if (error) return <div role="alert"><p>{error}</p><button type="button" onClick={reintentar}>Reintentar</button></div>
  return null
}
export function ProductList({ onVerDetalle, onAgregarAlCarrito }) {
  const estado = useDatos('/api/products')
  return <section><h1>Catálogo provisional</h1><Estado {...estado} />
    {Array.isArray(estado.datos) && (estado.datos.length === 0 ? <p>No hay productos disponibles.</p> : <ul className="integration-products">
      {estado.datos.map(producto => <li key={producto.id}><article><h2>{producto.name}</h2><p>{formatoPrecio(producto.price)}</p>
        <button type="button" onClick={() => onVerDetalle(producto.id)} aria-label={`Ver detalle de ${producto.name}`}>Ver detalle</button>
        <button type="button" onClick={() => onAgregarAlCarrito(producto)} aria-label={`Agregar ${producto.name} al carrito`}>Agregar</button>
      </article></li>)}
    </ul>)}
  </section>
}
export function ProductDetail({ id, onVolver, onAgregarAlCarrito }) {
  const estado = useDatos(`/api/products/${encodeURIComponent(id)}`)
  return <section><button type="button" onClick={onVolver}>Volver al catálogo</button><Estado {...estado} />
    {estado.datos && <article><h1>{estado.datos.name}</h1><p>{estado.datos.desc}</p><p>{formatoPrecio(estado.datos.price)}</p><button type="button" onClick={() => onAgregarAlCarrito(estado.datos)}>Agregar al carrito</button></article>}
  </section>
}
export function Footer() { return <footer>Proyecto educativo — Integración en desarrollo</footer> }
