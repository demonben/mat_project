const addToCartBtn = document.querySelector(".constructor-footer__button");
const overlayCart = document.querySelector(".overlay");
const cart = document.querySelector(".cart");
const cartBtn = document.querySelector(".header__cart");
const cartInfo = cart.querySelector(".cart__wr");
// cart buttons
const cart__button = cart.querySelector(".cart__button");
const cartIconCount = document.querySelector(".cart-icon");
const cartClose = cart.querySelector(".cart__close");

const customerData = `
<section>
<div class="cart__info">
<div class="page-wrapper">
<fieldset>
  <legend>Контактная информация</legend>

   <p><label for="first-name"> Имя*: </label>
      <input type="text" id="first-name" name="first-name" placeholder="имя" class="_req _name"> 

   <p><label for="last-name"> Фамилия:  </label>
  <input type="text" id="last-name" name="last-name" placeholder="фамилия"> 

  <p> <label>Номер телефона*:</label>
            <input type="text" id="phone" name="phone" placeholder="+7962222222" class="_req _phone">

   <p><label for="email"> Email: </label>
  <input type="email" id="email" name="email" placeholder="user-email@gmail.com"> 
  </fieldset>
  </div>
</div>
</section>
`;

let createItem;
let orderIsReady = false;

const customerCartData = {
  goods: "",
  personalData: { name: "", lastName: "", phone: "" },
};
let customerName;
let customerLastName;
let customerPhone;
let count = 0;

window.addEventListener("storage", () => {
  location.reload();
});

cart__button.addEventListener("click", () => {
  if (orderIsReady) {
    customerName = document.querySelector("#first-name");
    customerLastName = document.querySelector("#last-name");
    customerPhone = document.querySelector("#phone");
    if (!formValidate(customerName.value, customerPhone.value)) {
      return;
    }
    collectingCustomerData(
      customerName.value,
      customerLastName.value,
      customerPhone.value
    );
    sendingCartData();
    orderIsReady = false;
  } else {
    orderButton();

    orderIsReady = true;
  }
});

let orderButton = () => {
  overlayCart.classList.remove("overlay_active");
  cartInfo.innerHTML = "";
  overlayCart.classList.add("overlay_active");
  createItem = document.createElement("div");
  createItem.classList.add("cart_customer_name");
  createItem.innerHTML = customerData;
  cartInfo.append(createItem);
  orderIsReady = true;
};

let counter = () => {
  if (JSON.parse(localStorage.getItem("cart"))) {
    let cartGoodsArray = Object.values(
      JSON.parse(localStorage.getItem("cart"))
    );
    count = 0;
    cartGoodsArray.forEach((i) => {
      count++;
    });
  }
  cartIconCount.innerHTML = count;
};
counter();

const collectingCustomerData = (name, lastName, phone) => {
  let storage = JSON.parse(localStorage.getItem("cart"));
  customerCartData.goods = storage;

  customerCartData.personalData.name = name;
  customerCartData.personalData.lastName = lastName;
  customerCartData.personalData.phone = phone;
};

const sendingCartData = async () => {
  let cart = localStorage.getItem("cart");
  let reqBody = JSON.stringify({ a: 1, b: "Textual content" });
  console.log(reqBody);
  const response = await fetch(
    `https://the-mat.ru/mail/?data=${cart}&customer_data=${customerCartData}`,
    {
      mode: "no-cors",
      method: "POST",
      headers: {
        // "Accept": "application/json",
        "Content-Type": "text/plain",
      },
      body: "hello body",
    }
  );
  const content = await response.json();

  console.log(content);
};

const formValidate = (name, phone) => {
  if (!name) {
    alert("введите имя");
    return false;
  } else if (!phone) {
    alert("введите номер");
    return false;
  }
  return true;
};

const addToCartProduct = () => {
  const createItem = (data) => {
    cartInfo.innerHTML = "";
    data.forEach((item) => {
      const createItem = document.createElement("div");
      createItem.classList.add("cart__item");
      createItem.innerHTML = `
                        <div class="cart__info">
                            <h3 class="cart__name">
                                ${item.name}
                            </h3>
                            <span class="cart__color">
                                Цвет: ${item.skinColor}<br>Строчка: ${
        item.strColor
      }
                            </span>
                            <span class="cart__id">
                                id: <span class="cart__id_num">${item.id}</span>
                            </span>
                        </div>
                        <div class="cart-counter">
                            <div class="cart-counter__btn cart-counter__btn_minus">
                                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none"> <path d="M14 31H50" stroke="#E42E3A" stroke-width="2" stroke-miterlimit="10"/> <path d="M32 62.999C49.1203 62.999 62.999 49.1203 62.999 32C62.999 14.8797 49.1203 1.00098 32 1.00098C14.8797 1.00098 1.00101 14.8797 1.00101 32C1.00101 49.1203 14.8797 62.999 32 62.999Z" stroke="#E42E3A" stroke-width="2" stroke-miterlimit="10"/> </svg>
                            </div>
                            <div class="cart-counter__count">
                                ${item.count}
                            </div>
                            <div class="cart-counter__btn cart-counter__btn_plus">
                                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none"> <path d="M32 50V14" stroke="#E42E3A" stroke-width="2" stroke-miterlimit="10"/> <path d="M14 32H50" stroke="#E42E3A" stroke-width="2" stroke-miterlimit="10"/> <path d="M32 62.999C49.1203 62.999 62.999 49.1203 62.999 32C62.999 14.8797 49.1203 1.00098 32 1.00098C14.8797 1.00098 1.00101 14.8797 1.00101 32C1.00101 49.1203 14.8797 62.999 32 62.999Z" stroke="#E42E3A" stroke-width="2" stroke-miterlimit="10"/> </svg>
                            </div>
                        </div>
                        <div class="cart__price">
                            ${+item.price * +item.count}
                        </div>
                        <button class="cart__del">
                            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none"> <path d="M18.947 17.1533L45.045 43.0563" stroke="#E42E3A" stroke-width="2" stroke-miterlimit="10"/> <path d="M19.045 43.1527L44.947 17.0557" stroke="#E42E3A" stroke-width="2" stroke-miterlimit="10"/> <path d="M32 62.999C49.1203 62.999 62.999 49.1203 62.999 32C62.999 14.8797 49.1203 1.00098 32 1.00098C14.8797 1.00098 1.00101 14.8797 1.00101 32C1.00101 49.1203 14.8797 62.999 32 62.999Z" stroke="#E42E3A" stroke-width="2" stroke-miterlimit="10"/> </svg>
                        </button>
                   `;
      cartInfo.append(createItem);
    });
  };

  const addProductToCart = () => {
    let getCart = JSON.parse(localStorage.getItem("cart"));

    if (getCart) {
      const idProduct = appData.imageNumber;

      const variantRugs = appData.numberRugs;

      const clickedGoods = Object.keys(getCart).find(
        (good) => good === idProduct
      );

      const variantGoods = Object.keys(getCart).find(
        (good) => good === variantRugs
      );

      if (clickedGoods && variantGoods) {
        getCart[idProduct]["count"] += 1;
      } else {
        getCart[appData.imageNumber] = {
          count: 1,

          id: appData.imageNumber,

          name: appData.numberRugs,

          price: appData.fullPrice,

          color: appData.skinColorName,

          colorStr: appData.colorStrName,

          addOptions: appData.otherServiceName,
        };
      }
    } else {
      getCart = {
        [appData.imageNumber]: {
          count: 1,

          id: appData.imageNumber,

          name: appData.numberRugs,

          price: appData.fullPrice,

          color: appData.skinColorName,

          colorStr: appData.colorStr,

          addOptions: appData.otherServiceName,
        },
      };
    }

    localStorage.setItem("cart", JSON.stringify(getCart));

    createItem(Object.values(getCart));
  };

  cart.addEventListener("click", (e) => {
    if (e.target.closest(".cart__close")) {
      counter();
      overlayCart.classList.remove("overlay_active");
    }

    if (e.target.closest(".cart__item")) {
      const cartID = e.target
        .closest(".cart__item")
        .querySelector(".cart__name")
        .textContent.trim();
      if (e.target.closest(".cart-counter__btn_plus")) {
        const getCart = JSON.parse(localStorage.getItem("cart"));

        const clickedGoods = Object.keys(getCart).find(
          (good) => good === cartID
        );

        if (clickedGoods) {
          getCart[cartID]["count"] += 1;
        }
        localStorage.setItem("cart", JSON.stringify(getCart));
        createItem(Object.values(getCart));
      }
      if (e.target.closest(".cart-counter__btn_minus")) {
        const getCart = JSON.parse(localStorage.getItem("cart"));

        const clickedGoods = Object.keys(getCart).find(
          (good) => good === cartID
        );

        if (clickedGoods && getCart[cartID]["count"] > 1) {
          getCart[cartID]["count"] -= 1;
        } else {
          delete getCart[cartID];
        }
        localStorage.setItem("cart", JSON.stringify(getCart));
        createItem(Object.values(getCart));
      }
      if (e.target.closest(".cart__del")) {
        const getCart = JSON.parse(localStorage.getItem("cart"));

        const clickedGoods = Object.keys(getCart).find(
          (good) => good === cartID
        );

        if (clickedGoods) {
          delete getCart[cartID];
        }
        localStorage.setItem("cart", JSON.stringify(getCart));
        createItem(Object.values(getCart));
      }
    }
  });

  cartBtn.addEventListener("click", () => {
    if (JSON.parse(localStorage.getItem("cart"))) {
      const keys = Object.values(JSON.parse(localStorage.getItem("cart")));
      createItem(keys);
    }
    overlayCart.classList.add("overlay_active");
  });

  cartClose.addEventListener("click", () => {
    overlayCart.classList.remove("overlay_active");
    counter();
  });

  addToCartBtn.addEventListener("click", (e) => {
    e.preventDefault();
    addProductToCart();
    counter()
  });
};

addToCartProduct();
cartIconCount.innerHTML = count;
