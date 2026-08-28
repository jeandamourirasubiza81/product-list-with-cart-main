
const products = [
  {
    name: "Waffle with Berries",
    category: "Waffle",
    price: 6.50,
    image: "./assets/images/image-waffle-thumbnail.jpg"
  },

  {
    name: "Vanilla Bean Crème Brûlée",
    category: "Crème Brûlée",
    price: 7.00,
    image: "./assets/images/image-creme-brulee-thumbnail.jpg"
  },

  {
    name: "Macaron Mix of Five",
    category: "Macaron",
    price: 8.00,
    image: "./assets/images/image-macaron-thumbnail.jpg"
  },

  {
    name: "Classic Tiramisu",
    category: "Tiramisu",
    price: 5.50,
    image: "./assets/images/image-tiramisu-thumbnail.jpg"
  },

  {
    name: "Pistachio Baklava",
    category: "Baklava",
    price: 4.00,
    image: "./assets/images/image-baklava-thumbnail.jpg"
  },

  {
    name: "Lemon Meringue Pie",
    category: "Pie",
    price: 5.00,
    image: "./assets/images/image-meringue-thumbnail.jpg"
  },

  {
    name: "Red Velvet Cake",
    category: "Cake",
    price: 4.50,
    image: "./assets/images/image-cake-thumbnail.jpg"
  },

  {
    name: "Salted Caramel Brownie",
    category: "Brownie",
    price: 4.50,
    image: "./assets/images/image-brownie-thumbnail.jpg"
  },

  {
    name: "Vanilla Panna Cotta",
    category: "Panna Cotta",
    price: 6.50,
    image: "./assets/images/image-panna-cotta-thumbnail.jpg"
  }
];




let cart = [];



const productContainer = document.querySelector(".Product");

const cartContainer = document.getElementById("cartContainer");

const cartCount = document.getElementById("cartCount");

const cartTotal = document.getElementById("cartTotal");

const confirmBtn = document.getElementById("confirmBtn");


// ===============================
// 4. DISPLAY PRODUCTS
// ===============================

function displayProducts() {

  productContainer.innerHTML = `
    <h1>Desserts</h1>
  `;


  products.forEach((product, index) => {

    const productElement = document.createElement("div");

    productElement.classList.add("product");


    productElement.innerHTML = `
      
      <img 
        src="${product.image}" 
        alt="${product.name}" 
        class="img"
      >

      <button class="add-cart" data-index="${index}">
        <img 
          src="./assets/images/icon-add-to-cart.svg" 
          alt=""
        >
        Add to Cart
      </button>

      <p class="para">
        ${product.category}
      </p>

      <h3 class="header">
        ${product.name}
      </h3>

      <strong class="price">
        $${product.price.toFixed(2)}
      </strong>

    `;


    productContainer.appendChild(productElement);

  });


  // Add event to all buttons
  const addButtons = document.querySelectorAll(".add-cart");


  addButtons.forEach(button => {

    button.addEventListener("click", () => {

      const index = button.dataset.index;

      addToCart(index);

    });

  });

}


// ===============================
// 5. ADD TO CART
// ===============================

function addToCart(index) {

  const product = products[index];


  // Check if product already exists
  const existingProduct = cart.find(
    item => item.name === product.name
  );


  if (existingProduct) {

    existingProduct.quantity++;

  } else {

    cart.push({
      ...product,
      quantity: 1
    });

  }


  updateCart();

}


// ===============================
// 6. UPDATE CART
// ===============================

function updateCart() {

  cartContainer.innerHTML = "";


  // Empty cart
  if (cart.length === 0) {

    cartContainer.innerHTML = `
      
      <img
        src="./assets/images/illustration-empty-cart.svg"
        alt=""
        class="empty-img"
      >

      <p>
        Your added items will appear here
      </p>

    `;

  } else {


    // Display cart items
    cart.forEach((item, index) => {

      const cartItem = document.createElement("div");

      cartItem.classList.add("cart-item");


      cartItem.innerHTML = `

        <div>

          <strong>
            ${item.name}
          </strong>

          <p>
            ${item.quantity} × $${item.price.toFixed(2)}
          </p>

          <p>
            $${(item.price * item.quantity).toFixed(2)}
          </p>

        </div>

        <button 
          class="remove-btn"
          data-index="${index}"
        >
          ×
        </button>

      `;


      cartContainer.appendChild(cartItem);

    });


    // Remove buttons

    const removeButtons =
      document.querySelectorAll(".remove-btn");


    removeButtons.forEach(button => {

      button.addEventListener("click", () => {

        const index = button.dataset.index;

        removeFromCart(index);

      });

    });

  }


  updateCartCount();

  updateCartTotal();

}


// ===============================
// 7. UPDATE CART COUNT
// ===============================

function updateCartCount() {

  let totalItems = 0;


  cart.forEach(item => {

    totalItems += item.quantity;

  });


  cartCount.textContent = totalItems;

}


// ===============================
// 8. UPDATE TOTAL PRICE
// ===============================

function updateCartTotal() {

  let total = 0;


  cart.forEach(item => {

    total += item.price * item.quantity;

  });


  cartTotal.textContent =
    `$${total.toFixed(2)}`;

}


// ===============================
// 9. REMOVE FROM CART
// ===============================

function removeFromCart(index) {

  cart.splice(index, 1);

  updateCart();

}


// ===============================
// 10. CONFIRM ORDER
// ===============================

confirmBtn.addEventListener("click", () => {

  if (cart.length === 0) {

    alert("Your cart is empty!");

    return;

  }


  alert("Order confirmed! 🎉");

});


// ===============================
// 11. START WEBSITE
// ===============================

displayProducts();

updateCart();