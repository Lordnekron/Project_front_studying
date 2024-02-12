import { onUpdateCart } from "./cart.js";

async function query() {
  await axios
    .get(`https://65abd3effcd1c9dcffc71754.mockapi.io/books`)
    .then((responce) => responce.data)
    .then((data) => {
      let bookItem;
      for (let item of data) {
        item.id.toString() === localStorage.getItem("book")
          ? (bookItem = item)
          : "";
      }
      const book = document.querySelector(".book-item__book");
      const img = document.querySelector(".book-item__img");

      const h3 = document.createElement("h3");
      const p = document.createElement("p");
      const span = document.createElement("span");
      const button = document.createElement("button");

      h3.textContent = bookItem.name;
      p.textContent = bookItem.description;
      span.textContent = `${bookItem.price} $`;
      img.src = bookItem.picture;
      button.classList = "btn add_to_cart";
      button.textContent = "add to cart";
      button.setAttribute("data", JSON.stringify(bookItem));

      book.appendChild(h3);
      book.appendChild(p);
      book.appendChild(span);
      book.appendChild(button);
    });
}

async function addToCart() {
  const cartButton = document.querySelector(".add_to_cart");
  let cartButtonContext = cartButton.getAttribute("data");
  cartButtonContext = JSON.parse(cartButtonContext);

  cartButton.addEventListener("click", () => {
    localStorage.setItem(
      cartButtonContext.id,
      JSON.stringify(cartButtonContext)
    );
    onUpdateCart();
  });
}

async function onInit() {
  await query();
  await addToCart();
}

onInit();
