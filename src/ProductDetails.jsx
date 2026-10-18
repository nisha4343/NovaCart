import { Link, useParams } from 'react-router-dom'

const productDetails = {
  1: {
    description: 'Everyday sneakers designed for comfort, versatility, and effortless style.',
    features: ['Comfortable fit', 'Versatile everyday style', 'Lightweight design'],
  },
  2: {
    description: 'Enjoy your favourite music with these stylish wireless headphones.',
    features: ['Wireless listening', 'Comfortable ear cushions', 'Everyday music companion'],
  },
  3: {
    description: 'Keep track of your day with a modern smartwatch made for everyday use.',
    features: ['Modern design', 'Daily activity tracking', 'Comfortable strap'],
  },
  4: {
    description: 'A practical backpack for carrying your daily essentials wherever you go.',
    features: ['Spacious storage', 'Everyday versatility', 'Easy to carry'],
  },
  5: {
    description: 'Make your morning routine easier with this compact coffee maker.',
    features: ['Compact design', 'Simple daily routine', 'Kitchen essential'],
  },
  6: {
    description: 'Brighten up your workspace with a simple, modern desk lamp.',
    features: ['Minimal design', 'Suitable for workspaces', 'Compact footprint'],
  },
}

function ProductDetails({ products, addToCart }) {
  const { id } = useParams()
  const product = products.find((item) => item.id === Number(id))

  if (!product) {
    return (
      <main className="product-detail">
        <h1>Product not found</h1>
        <Link to="/">Back to shopping</Link>
      </main>
    )
  }

  const details = productDetails[product.id]

  return (
    <main className="product-detail">
      <Link className="back-link" to="/">← Back to shopping</Link>

      <div className="detail-layout">
        <div className="detail-image" aria-hidden="true">{product.emoji}</div>

        <section className="detail-info">
          <p className="product-category">{product.category}</p>
          <h1>{product.name}</h1>
          <p className="detail-price">
            ₹{product.price.toLocaleString('en-IN')}
          </p>
          <p className="detail-description">{details.description}</p>

          <h2>Product highlights</h2>
          <ul>
            {details.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>

          <button
            className="detail-add-button"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </section>
      </div>
    </main>
  )
}

export default ProductDetails