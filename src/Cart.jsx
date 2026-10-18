function Cart({ cart, updateQuantity, removeFromCart }) {
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <main className="cart-page">
      <h1>Your Shopping Cart</h1>

      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty. Add something you love!</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <article className="cart-item" key={item.id}>
                <div className="cart-item-emoji">{item.emoji}</div>

                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>₹{item.price.toLocaleString('en-IN')}</p>

                  <div className="quantity-controls">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      aria-label={`Decrease ${item.name} quantity`}
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      aria-label={`Increase ${item.name} quantity`}
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="remove-button"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>

                <strong>
                  ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                </strong>
              </article>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            <p>
              <span>Total</span>
              <strong>₹{total.toLocaleString('en-IN')}</strong>
            </p>
            <button
              className="checkout-button"
              onClick={() => alert('Checkout can be added in a future version!')}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </main>
  )
}

export default Cart