"use strict";
const cartIconCount = document.querySelector(".cart-icon");

window.addEventListener("storage", () => {
  location.reload();
});

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

  console.log(customerCartData);
};

const sendingCartData = async () => {
  let customerCartDataRequest = JSON.stringify(customerCartData)
  let cart = localStorage.getItem("cart")
  let reqBody = JSON.stringify({ a: 1, b: "Textual content" });
  console.log(reqBody);
  const response = await fetch(`https://the-mat.ru/mail/?data=${cart}&customer_data=${customerCartDataRequest}`, {
    mode: "no-cors",
    method: "POST",
    headers: {
      // "Accept": "application/json",
      "Content-Type": "text/plain",
    },
    body: "hello body",
  });
  window.localStorage.removeItem("cart")
  alert("Заказ оформлен успешно, менеджер скоро свяжется с вами");
  counter();
  location.reload();
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

const boxCart = () => {
  const skinColorItem = document.querySelector(".box-constructor__item_skin");
  const strColorItem = document.querySelector(".box-constructor__item_str");
  const endingColorItem = document.querySelector(
    ".box-constructor__item_edging"
  );
  const buttonBuy = document.querySelector(".box-constructor-price__button");
  const errorMess = document.querySelector(".constructor__error");
  const addToCartBtn = document.querySelector(".constructor-footer__button");
  const overlayCart = document.querySelector(".overlay");
  const cart = document.querySelector(".cart");
  const cartBtn = document.querySelector(".header__cart");
  const cartInfo = cart.querySelector(".cart__wr");
  const cartClose = cart.querySelector(".cart__close");
  const cart__button = cart.querySelector(".cart__button");

  cartIconCount.innerHTML = count;

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

  const settings = {
    skinColor: "",
    strColor: "",
    endingColor: "",
    size: "",
    name: "",
    price: "",
    id: "231",
  };

  const validate = () => {
    if (
      settings.skinColor &&
      settings.strColor &&
      settings.endingColor !== "" &&
      sumOut.textContent !== "0"
    ) {
      errorMess.classList.remove("constructor__error_active");
      buttonBuy.classList.add("box-constructor-price__button_active");
    } else {
      buttonBuy.classList.remove("box-constructor-price__button_active");
      errorMess.classList.add("constructor__error_active");
    }
  };

  const createItemBox = (data) => {
    cartInfo.innerHTML = "";
    data.forEach((item) => {
      createItem = document.createElement("div");
      createItem.classList.add("cart__item");
      if (!item.endingColor) {
        item.endingColor = "";
      }
      createItem.innerHTML = `
                        <div class="cart__info">
                            <h3 class="cart__name">
                                ${item.name}
                            </h3>
                            <span style="margin: 0;" class="cart__color">
                                ${item.skinColor}<br>${item.strColor}
                            </span>
                            <span class="cart__id">
                                <span class="cart__id_num">${
                                  item.endingColor
                                }</span>
                            </span>
                            <div class="cart_id">
                        ${item.id}
                             </div>
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
      const idProduct = settings.size;
      const clickedGoods = Object.keys(getCart).find(
        (good) => good === idProduct
      );

      if (clickedGoods) {
        getCart[idProduct]["count"] += 1;
      } else {
        getCart[idProduct] = {
          count: 1,
          skinColor: settings.skinColor,
          strColor: settings.strColor,
          endingColor: settings.endingColor,
          size: settings.size,
          name: settings.size,
          price: settings.price,
          id: settings.size,
        };
      }
    } else {
      getCart = {
        [settings.size]: {
          count: 1,
          skinColor: settings.skinColor,
          strColor: settings.strColor,
          endingColor: settings.endingColor,
          size: settings.size,
          name: settings.size,
          price: settings.price,
          id: settings.size,
        },
      };
    }

    localStorage.setItem("cart", JSON.stringify(getCart));
    createItemBox(Object.values(getCart));
  };

  cart.addEventListener("click", (e) => {
    if (e.target.closest(".cart__close")) {
      overlayCart.classList.remove("overlay_active");
    }

    if (e.target.closest(".cart__item")) {
      const cartID = e.target
        .closest(".cart__item")
        .querySelector(".cart_id")
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
        createItemBox(Object.values(getCart));
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
        createItemBox(Object.values(getCart));
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
        createItemBox(Object.values(getCart));
      }
    }
  });

  skinColorItem.onclick = (e) => {
    if (e.target.checked) {
      settings.skinColor = e.target.value;
      validate();
    }
  };

  strColorItem.onclick = (e) => {
    if (e.target.checked) {
      settings.strColor = e.target.value;
      validate();
    }
  };

  endingColorItem.onclick = (e) => {
    if (e.target.checked) {
      settings.endingColor = e.target.value;
      validate();
    }
  };

  selects.forEach((item) => {
    item.addEventListener("change", (e) => {
      validate();
      settings.size =
        e.target.options[e.target.selectedIndex].getAttribute("aria-label");
      settings.price = e.target.value;
    });
  });

  cartBtn.addEventListener("click", () => {
    if (JSON.parse(localStorage.getItem("cart"))) {
      const keys = Object.values(JSON.parse(localStorage.getItem("cart")));
      createItemBox(keys);
    }
    overlayCart.classList.add("overlay_active");
  });

  cartClose.addEventListener("click", () => {
    overlayCart.classList.remove("overlay_active");
    counter();
  });

  buttonBuy.addEventListener("click", (e) => {
    e.preventDefault();
    addProductToCart();
    counter();
  });
};

boxCart();
