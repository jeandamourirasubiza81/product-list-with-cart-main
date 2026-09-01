

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



const buttons = document.querySelectorAll(".add-to-cart");

const cartContainer = document.getElementById("cartContainer");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

const confirmBtn = document.getElementById("confirmBtn");

const orderModal = document.getElementById("orderModal");
const orderItems = document.getElementById("orderItems");
const orderTotal = document.getElementById("orderTotal");

const newOrderBtn = document.getElementById("newOrderBtn");


buttons.forEach((button, index) => {

  button.addEventListener("click", () => {

    const product = products[index];

    const found = cart.find(item => item.name === product.name);

    if (found) {

      found.quantity++;

    } else {

      cart.push({
        ...product,
        quantity: 1
      });

    }

    update();

  });

});


function update() {

  updateCart();

  updateButtons();

}



function updateButtons() {

  buttons.forEach((button, index) => {

    const product = products[index];

    const item = cart.find(
      item => item.name === product.name
    );


  

    if (!item) {

      button.classList.remove("active");

      button.innerHTML = `
        <img
          src="./assets/images/icon-add-to-cart.svg"
          alt=""
        >
        Add to Cart
      `;

      return;
    }


    button.classList.add("active");

    button.innerHTML = `

      <span class="minus">−</span>

      <span class="button-quantity">
        ${item.quantity}
      </span>

      <span class="plus">+</span>

    `;




    button.querySelector(".minus").addEventListener(
      "click",
      function(event) {

        event.stopPropagation();

        item.quantity--;

        if (item.quantity <= 0) {

          cart = cart.filter(
            x => x.name !== item.name
          );

        }

        update();

      }
    );


    button.querySelector(".plus").addEventListener(
      "click",
      function(event) {

        event.stopPropagation();

        item.quantity++;

        update();

      }
    );

  });

}


function updateCart() {

  cartContainer.innerHTML = "";



  if (cart.length === 0) {

    cartContainer.innerHTML = `

      <div class="empty-cart">

        <img
          src="./assets/images/illustration-empty-cart.svg"
          alt="Empty cart"
          class="empty-img"
        >

        <p>
          Your added items will appear here
        </p>

      </div>

    `;

    cartCount.textContent = "0";

    cartTotal.textContent = "$0.00";

    return;
  }


  let totalItems = 0;
  let totalPrice = 0;



  cart.forEach((item, index) => {

    totalItems += item.quantity;

    totalPrice += item.price * item.quantity;


    const div = document.createElement("div");

    div.className = "cart-item";


    div.innerHTML = `

  <div class="cart-item-top">

    <img
      src="${item.image}"
      class="cart-image"
      alt="${item.name}"
    >

    <div class="cart-info">

      <span class="cart-item-name">
        ${item.name}
      </span>

      <div class="cart-details">

        <span class="quantity">
          ${item.quantity}x
        </span>

        <span class="unit-price">
          $${item.price.toFixed(2)}
        </span>

        <span class="item-total">
          $${(item.price * item.quantity).toFixed(2)}
        </span>

      </div>

    </div>

    <button
      class="delete-btn"
      data-index="${index}"
    >
      ×
    </button>

  </div>

`;


    cartContainer.appendChild(div);

  });


  cartCount.textContent = totalItems;


  cartTotal.textContent =
    `$${totalPrice.toFixed(2)}`;



  const deleteButtons =
    document.querySelectorAll(".delete-btn");


  deleteButtons.forEach(button => {

    button.addEventListener("click", () => {

      const index = button.dataset.index;

      cart.splice(index, 1);

      update();

    });

  });

}


confirmBtn.addEventListener("click", () => {

  if (cart.length === 0) {

    alert("Your cart is empty!");

    return;

  }


  orderItems.innerHTML = "";
659506
  let total = 0;


  cart.forEach(item => {

    const itemTotal =
      item.price * item.quantity;

    total += itemTotal;


    const div =
      document.createElement("div");

    div.className = "order-item";


    div.innerHTML = `

      <img
        src="${item.image}"
        alt="${item.name}"
      >

      <div class="order-item-info">

        <span class="order-item-name">
          ${item.name}
        </span>

        <div class="order-item-details">

          <span class="qty">
            ${item.quantity}x
          </span>

          <span class="unit">659506
            $${item.price.toFixed(2)}
          </span>

        </div>

      </div>

      <strong class="order-item-price">
        $${itemTotal.toFixed(2)}
      </strong>

    `;


    orderItems.appendChild(div);

  });


  orderTotal.textContent =
    `$${total.toFixed(2)}`;


  orderModal.classList.add("show");

});


newOrderBtn.addEventListener("click", () => {

  cart = [];

  update();

  orderModal.classList.remove("show");

});



update();