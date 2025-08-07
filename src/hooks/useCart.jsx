import { useState, useEffect } from 'react'
import {db} from '../data/db'

export const useCart = () => {
  const data = db
  
  // Inicializar el carrito con datos del localStorage
  const getInitialCart = () => {
    const savedCart = localStorage.getItem('cart')
    return savedCart ? JSON.parse(savedCart) : []
  }

  const [cart, setCart] = useState(getInitialCart)

  // Guardar datos cuando cambie
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (item) => {
    const itemExist = cart.findIndex(automovil => automovil.id === item.id)
    if (itemExist >= 0) {
      const updateCart = [...cart]
      updateCart[itemExist].quantity++
      setCart(updateCart)
    } else {
      item.quantity = 1
      console.log('Todavia no existe...')
      setCart([...cart, item])
    }
  }

  const removeFromCart = (IdEliminar) => {
    setCart(preCart => preCart.filter(automovil => automovil.id !== IdEliminar))
  }

  const decreaseQuantity = (itemId) => {
    setCart(prevCart => 
      prevCart.map(item => {
        if (item.id === itemId) {
          if (item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 }
          } else {
            return null // Para eliminarlo si llega a 0
          }
        }
        return item
      }).filter(item => item !== null) // Elimina los null
    )
  }

  const increaseQuantity = (itemId) => {
    setCart(prevCart => 
      prevCart.map(item => {
        if (item.id === itemId) {
          return { ...item, quantity: item.quantity + 1 }
        }
        return item
      })
    )
  }

  const clearCart = () => {
    setCart([])
  }
  
  const cartTotal = cart.reduce((total, { quantity, price }) => {
    return total + (quantity * price);
  }, 0);

  return {
    data,
    cart,
    cartTotal,
    addToCart,
    removeFromCart,
    decreaseQuantity,
    increaseQuantity,
    clearCart
  }
} 