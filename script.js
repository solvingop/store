const wrapper = document.querySelector(".sliderWrapper");
const menuItems = document.querySelectorAll(".menuItem");

const products1 = [
  {
    id: 1,
    title: "Air Force",
    price: 119,
    colors: [
      {
        code: "black",
        img: "./img/air.png",
      },
      {
        code: "darkblue",
        img: "./img/air2.png",
      },
    ],
  },
  {
    id: 2,
    title: "Air Jordan",
    price: 149,
    colors: [
      {
        code: "lightgray",
        img: "./img/jordan.png",
      },
      {
        code: "green",
        img: "./img/jordan2.png",
      },
    ],
  },
  {
    id: 3,
    title: "Blazer",
    price: 109,
    colors: [
      {
        code: "lightgray",
        img: "./img/blazer.png",
      },
      {
        code: "green",
        img: "./img/blazer2.png",
      },
    ],
  },
  {
    id: 4,
    title: "Crater",
    price: 129,
    colors: [
      {
        code: "black",
        img: "./img/crater.png",
      },
      {
        code: "lightgray",
        img: "./img/crater2.png",
      },
    ],
  },
  {
    id: 5,
    title: "Hippie",
    price: 99,
    colors: [
      {
        code: "gray",
        img: "./img/hippie.png",
      },
      {
        code: "black",
        img: "./img/hippie2.png",
      },
    ],
  },
];

let choosenProduct = products1[0];

// const currentProductImg = document.querySelector(".productImg");
// const currentProductTitle = document.querySelector(".productTitle");
// const currentProductPrice = document.querySelector(".productPrice");
// const currentProductColors = document.querySelectorAll(".color");
// const currentProductSizes = document.querySelectorAll(".size");

menuItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    //change the current slide
    wrapper.style.transform = `translateX(${-100 * index}vw)`;

    //change the choosen product
    choosenProduct = products1[index];

    //change texts of currentProduct
    currentProductTitle.textContent = choosenProduct.title;
    currentProductPrice.textContent = "$" + choosenProduct.price;
    currentProductImg.src = choosenProduct.colors[0].img;

    //assing new colors
    currentProductColors.forEach((color, index) => {
      color.style.backgroundColor = choosenProduct.colors[index].code;
    });
  });
});

// currentProductColors.forEach((color, index) => {
//   color.addEventListener("click", () => {
//     currentProductImg.src = choosenProduct.colors[index].img;
//   });
// });

// currentProductSizes.forEach((size, index) => {
//   size.addEventListener("click", () => {
//     currentProductSizes.forEach((size) => {
//       size.style.backgroundColor = "white";
//       size.style.color = "black";
//     });
//     size.style.backgroundColor = "black";
//     size.style.color = "white";
//   });
// });

// const productButton = document.querySelector(".productButton");
// const payment = document.querySelector(".payment");
// const close = document.querySelector(".close");

// productButton.addEventListener("click", () => {
//   payment.style.display = "flex";
// });

// close.addEventListener("click", () => {
//   payment.style.display = "none";
// });
let listProductHTML = document.querySelector('.listProduct');
let listCartHTML = document.querySelector('.listCart');
let iconCart = document.querySelector('.icon-cart');
let iconCartSpan = document.querySelector('.icon-cart span');
let body = document.querySelector('body');
let closeCart = document.querySelector('.close');
let products = [];
let cart = [];


iconCart.addEventListener('click', () => {
  body.classList.toggle('showCart');
})
closeCart.addEventListener('click', () => {
  body.classList.toggle('showCart');
})

const addDataToHTML = () => {
  // remove datas default from HTML

  // add new datas
  if (products.length > 0) // if has data
  {
    products.forEach(product => {
      let newProduct = document.createElement('div');
      newProduct.dataset.id = product.id;
      newProduct.classList.add('item');
      newProduct.innerHTML =
        `<img src=" ${product.image}" alt="">
          <h2> ${product.name}</h2>
          <div class="price">$${product.price}</div>
          <button class="addCart">
          Add To Cart </button>
        `;
      listProductHTML.appendChild(newProduct);
    });
  }
}
listProductHTML.addEventListener('click', (event) => {
  let positionClick = event.target;
  if (positionClick.classList.contains('addCart')) {
    let id_product = positionClick.parentElement.dataset.id;
    addToCart(id_product);
  }
})
const addToCart = (product_id) => {
  let positionThisProductInCart = cart.findIndex((value) => value.product_id == product_id);
  if (cart.length <= 0) {
    cart = [{
      product_id: product_id,
      quantity: 1
    }];
  } else if (positionThisProductInCart < 0) {
    cart.push({
      product_id: product_id,
      quantity: 1
    });
  } else {
    cart[positionThisProductInCart].quantity = cart[positionThisProductInCart].quantity + 1;
  }
  addCartToHTML();
  addCartToMemory();
}
const addCartToMemory = () => {
  localStorage.setItem('cart', JSON.stringify(cart));
}
const addCartToHTML = () => {
  listCartHTML.innerHTML = '';
  let totalQuantity = 0;
  if (cart.length > 0) {
    cart.forEach(item => {
      totalQuantity = totalQuantity + item.quantity;
      let newItem = document.createElement('div');
      newItem.classList.add('item');
      newItem.dataset.id = item.product_id;

      let positionProduct = products.findIndex((value) => value.id == item.product_id);
      let info = products[positionProduct];
      listCartHTML.appendChild(newItem);
      newItem.innerHTML = `
            <div class="image">
                    <img src="${info.image}">
                </div>
                <div class="name">
                ${info.name}
                </div>
                <div class="totalPrice">$${info.price * item.quantity}</div>
                <div class="quantity">
                    <span class="minus"><</span>
                    <span>${item.quantity}</span>
                    <span class="plus">></span>
                </div>
            `;
    })
  }
  iconCartSpan.innerText = totalQuantity;
}

listCartHTML.addEventListener('click', (event) => {
  let positionClick = event.target;
  if (positionClick.classList.contains('minus') || positionClick.classList.contains('plus')) {
    let product_id = positionClick.parentElement.parentElement.dataset.id;
    let type = 'minus';
    if (positionClick.classList.contains('plus')) {
      type = 'plus';
    }
    changeQuantityCart(product_id, type);
  }
})
const changeQuantityCart = (product_id, type) => {
  let positionItemInCart = cart.findIndex((value) => value.product_id == product_id);
  if (positionItemInCart >= 0) {
    let info = cart[positionItemInCart];
    switch (type) {
      case 'plus':
        cart[positionItemInCart].quantity = cart[positionItemInCart].quantity + 1;
        break;

      default:
        let changeQuantity = cart[positionItemInCart].quantity - 1;
        if (changeQuantity > 0) {
          cart[positionItemInCart].quantity = changeQuantity;
        } else {
          cart.splice(positionItemInCart, 1);
        }
        break;
    }
  }
  addCartToHTML();
  addCartToMemory();
}

const initApp = () => {
  // get data product
  fetch('products.json')
    .then(response => response.json())
    .then(data => {
      products = data;
      addDataToHTML();

      // get data cart from memory
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
        addCartToHTML();
      }
    })
}
initApp();


