export function Navbar({ cantidadCarrito, vista, onNavegar }) {
  return <header className="integration-header"><strong>Hermanos Jota</strong>
    <nav aria-label="Navegación principal">{[['inicio', 'Inicio'], ['catalogo', 'Catálogo'], ['contacto', 'Contacto'], ['carrito', `Carrito (${cantidadCarrito})`]].map(([destino, etiqueta]) =>
      <button type="button" key={destino} aria-current={vista === destino ? 'page' : undefined} onClick={() => onNavegar(destino)}>{etiqueta}</button>)}
    </nav>
  </header>
}
