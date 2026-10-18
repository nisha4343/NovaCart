
import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Cart from './Cart'

const products = [
  { id: 1, name: 'Classic Sneakers', category: 'Fashion', price: 2499, emoji: '👟' },
  { id: 2, name: 'Wireless Headphones', category: 'Electronics', price: 3999, emoji: '🎧' },
  { id: 3, name: 'Smart Watch', category: 'Electronics', price: 2999, emoji: '⌚' },
  { id: 4, name: 'Everyday Backpack', category: 'Fashion', price: 1799, emoji: '🎒' },
  { id: 5, name: 'Coffee Maker', category: 'Home', price: 2199, emoji: '☕' },
  { id: 6, name: 'Desk Lamp', category: 'Home', price: 999, emoji: '💡' },
]

function Home({ addToCart }) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase())

    const matchesCategory =
      category === 'All' || product.category === category

    return matchesSearch && matchesCategory
  })

  return (
    <main>
      <section className="hero" id="home">
        <p className="eyebrow">YOUR EVERYDAY, UPGRADED</p>

        <h1>
          Find your next
          <br />
          favourite thing.
        </h1>

        <p>
          Thoughtfully picked essentials for your life, style and space.
        </p>

        <a className="hero-button" href="#products">
          Explore collection ↗
        </a>
      </section>

      <section className="products-section" id="products">
        <div className="section-heading">
          <div>
            <p className="eyebrow">THE COLLECTION</p>
            <h2>Shop our favourites</h2>
          </div>

          <span>{filteredProducts.length} products</span>
        </div>

        <input
          className="search-input"
          type="search"
          placeholder="Search products..."
          aria-label="Search products"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <div className="filters" aria-label="Filter by category">
          {['All', 'Fashion', 'Electronics', 'Home'].map((item) => (
            <button
              key={item}
              type="button"
              className={category === item ? 'filter active' : 'filter'}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="product-grid">
          {filteredProducts.map((product) => (
            <article className="product-card" key={product.id}>
              <div className="product-image" aria-hidden="true">
                {product.emoji}
              </div>

              <div className="product-info">
                <p className="product-category">{product.category}</p>
                <h3>{product.name}</h3>

                <div className="product-bottom">
                  <strong>
                    ₹{product.price.toLocaleString('en-IN')}
                  </strong>

                  <button
                    type="button"
                    onClick={() => addToCart(product)}
                  >
                    Add +
                  </button>
                </div>
              </div>
            </article>
          ))}

          {filteredProducts.length === 0 && (
            <p>No products found. Try another search.</p>
          )}
        </div>
      </section>
    </main>
  )
}

function App() {
  // Load the saved cart when the application starts.
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('novacart-cart')
      return savedCart ? JSON.parse(savedCart) : []
    } catch {
      return []
    }
  })

  // Save cart items and quantities whenever the cart changes.
  useEffect(() => {
    try {
      localStorage.setItem('novacart-cart', JSON.stringify(cart))
    } catch {
      // The cart can still work during the current session.
    }
  }, [cart])

  function addToCart(product) {
    setCart((currentCart) => {
      const existing = currentCart.find(
        (item) => item.id === product.id
      )

      if (existing) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      return [...currentCart, { ...product, quantity: 1 }]
    })
  }

  function updateQuantity(id, change) {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + change }
            : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  function removeFromCart(id) {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== id)
    )
  }

  const cartCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  )

  return (
    <BrowserRouter basename="/NovaCart">
      <div className="app">
        <header className="navbar">
          <Link className="logo" to="/">
            Nova<span>Cart</span>.
          </Link>

          <nav aria-label="Main navigation">
            <Link to="/">Home</Link>
            <Link to="/#products">Products</Link>
          </nav>

          <Link className="cart-count" to="/cart">
            🛍️ Cart ({cartCount})
          </Link>
        </header>

        <Routes>
          <Route
            path="/"
            element={<Home addToCart={addToCart} />}
          />

          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
              />
            }
          />

          <Route
            path="*"
            element={
              <main className="products-section">
                <h1>Page not found</h1>
                <Link to="/">Return Home</Link>
              </main>
            }
          />
        </Routes>

        <footer>
          NovaCart © 2026 · Good things, thoughtfully chosen.
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App;
