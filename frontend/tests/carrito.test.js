import test from 'node:test'
import assert from 'node:assert/strict'
import { agregarProducto, quitarProducto, contarUnidades, calcularTotal } from '../src/utils/carrito.js'
const producto = { id: 0, name: 'Aparador', price: 2000 }
test('agregar ID 0 y repetirlo acumula cantidades sin mutar el estado previo', () => {
  const vacio = []
  const primero = agregarProducto(vacio, producto)
  const segundo = agregarProducto(primero, producto)
  assert.deepEqual(vacio, [])
  assert.equal(primero[0].cantidad, 1)
  assert.equal(segundo.length, 1)
  assert.equal(segundo[0].cantidad, 2)
})
test('contador suma unidades y total suma subtotales', () => {
  let items = agregarProducto([], producto)
  items = agregarProducto(items, producto)
  items = agregarProducto(items, { id: 1, name: 'Biblioteca', price: 3000 })
  assert.equal(contarUnidades(items), 3)
  assert.equal(calcularTotal(items), 7000)
})
test('quitar elimina toda la línea y conserva los otros productos', () => {
  const items = agregarProducto(agregarProducto([], producto), { id: 1, name: 'Biblioteca', price: 3000 })
  const resultado = quitarProducto(items, 0)
  assert.equal(items.length, 2)
  assert.deepEqual(resultado.map(p => p.id), [1])
  const vacio = quitarProducto(resultado, 1)
  assert.equal(contarUnidades(vacio), 0)
  assert.equal(calcularTotal(vacio), 0)
})
