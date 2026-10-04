import { useEffect, useRef, useState } from 'react'
import Cart from './components/Cart.jsx'
import { agregarProducto, quitarProducto, contarUnidades } from './utils/carrito.js'
import ContactForm from './components/ContactForm.jsx'
import Footer from './components/Footer.jsx'
import Home from './components/Home.jsx'
import ProductDetail from './components/ProductDetail.jsx'
import ProductList from './components/ProductList.jsx'
import { Navbar } from './integracion/Temporales.jsx'
import { Navbar } from './components/Navbar.jsx'
import { Home }from './components/Home.jsx'
import { Footer } from './components/Footer.jsx'
import {ProductList, ProductDetail} from './integracion/Temporales.jsx'
import './App.css'

const titulos = { inicio: 'Inicio', catalogo: 'Catálogo', detalle: 'Detalle', carrito: 'Carrito', contacto: 'Contacto' }

export default function App() {
  const [vista, setVista] = useState('inicio')
  const [productoId, setProductoId] = useState(null)
  const [carrito, setCarrito] = useState([])
  const [aviso, setAviso] = useState('')
  const principal = useRef(null)
  const vistaAnterior = useRef('inicio:null')

  useEffect(() => {
    document.title = `${titulos[vista]} | Hermanos Jota`
    const actual = `${vista}:${productoId}`
    if (actual !== vistaAnterior.current) {
      principal.current?.focus()
      window.scrollTo(0, 0)
      vistaAnterior.current = actual
    }
  }, [vista, productoId])

  function navegar(destino) {
    if (!['inicio', 'catalogo', 'carrito', 'contacto'].includes(destino)) return
    setVista(destino)
    setProductoId(null)
    setAviso('')
  }

  function verDetalle(id) {
    setProductoId(id) // 0 es un ID válido; null significa sin selección.
    setVista('detalle')
    setAviso('')
  }

  function agregar(producto) {
    setCarrito(actual => agregarProducto(actual, producto))
    setAviso(`${producto.name} agregado al carrito.`)
  }

  function quitar(id) {
    setCarrito(actual => quitarProducto(actual, id))
    setAviso('Producto quitado del carrito.')
  }

  return <>
    <a href="#contenido" className="skip-link">Saltar al contenido</a>
    <Navbar cantidadCarrito={contarUnidades(carrito)} vista={vista} onNavegar={navegar} />
    <main id="contenido" ref={principal} tabIndex={-1}>
      <p role="status" aria-live="polite" aria-atomic="true">{aviso}</p>
      {vista === 'inicio' && <Home onVerCatalogo={() => navegar('catalogo')} onVerContacto={() => navegar('contacto')} onVerDetalle={verDetalle} onAgregarAlCarrito={agregar} />}
      {vista === 'catalogo' && <ProductList onVerDetalle={verDetalle} onAgregarAlCarrito={agregar} />}
      {vista === 'detalle' && productoId !== null && <ProductDetail id={productoId} onVolver={() => navegar('catalogo')} onAgregarAlCarrito={agregar} />}
      {vista === 'carrito' && <Cart items={carrito} onQuitar={quitar} onVolver={() => navegar('catalogo')} />}
      {vista === 'contacto' && <ContactForm />}
    </main>
    <Footer onNavegar="{navegar}"/>
  </>
}
