import {Automovil} from './Automovil'
import { useState } from 'react'




const Header = ({ cart = [], removeFromCart, decreaseQuantity, increaseQuantity, clearCart, cartTotal = 0 }) => {
  
  return (
    <header className="py-3 header">
    <div className="container-xl">
      <div className="row justify-content-center justify-content-md-between">
        <div className="col-8 col-md-3">
          <a href="index.html">
            <img className="img-fluid" src="/img/Mustang-LOGO.svg" alt="imagen logo" />
          </a>
        </div>
        <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
          <div className="carrito-container">
            <div className="carrito">
              <img className="img-fluid" src="/img/carrito.png" alt="imagen carrito" />
              
              <div id="carrito-content" className="carrito-content">
  {
    cart.length === 0 ? (
      <p className="text-center">El carrito está vacío</p>
    ) : (
      <>
        <table className="w-100 table">
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Cantidad</th>
            </tr>
          </thead>
          <tbody>
            {cart.map(({ id, name, image, price, quantity }) => (
              <tr key={id}>
                <td className="align-middle">
                  <img className="img-fluid" src={`/img/${image}.jpg`} alt="imagen automóvil" />
                </td>
                <td className="align-middle">{name}</td>
                <td className="fw-bold align-middle">${price.toLocaleString()}</td>
                <td className="align-middle">
                  <div className="d-flex align-items-center gap-4">
                  <button 
  type="button" 
  className="btn btn-dark"
  onClick={() => decreaseQuantity(id)}
>-</button>
                    {quantity}
                    <button 
  type="button" 
  className="btn btn-dark"
  onClick={() => increaseQuantity(id)}
>+</button>
                  </div>
                </td>
                <td className="align-middle border-top-0">
                  <button type="button" className="btn-close" aria-label="Close" onClick={() => removeFromCart(id)}></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className="text-end">
          Total a pagar: <span className="fw-bold">${cartTotal.toLocaleString()}</span>
        </p>
     

  <button 
  className="btn btn-dark w-100 mt-3 p-2"
  onClick={clearCart}
  >Vaciar Carrito</button>  </>
    )
  }
</div>

            </div>
          </div>
        </nav>
      </div>
    </div>
  </header> 
  )
}

export {Header} 