//import axios from "axios";

axios
  .get("https://65abd3effcd1c9dcffc71754.mockapi.io/Categories")
  .then((responce) => responce.data)
  .then((data) => {
    for (let item of data) {
      const nameBooks = document.querySelector(".book-categories");

      const a = document.createElement("a");
      const div = document.createElement("div");
      const p = document.createElement("p");
      const img = document.createElement("img");
      const h5 = document.createElement("h5");

      h5.textContent = item.name;
      a.classList = "swiper-slide";
      a.addEventListener("click", () => {
        localStorage.setItem("category", `category-${item.id}`);
      });
      a.href = "/pages/books.html";
      div.classList = "block block--flex-column slide";
      img.src = item.image;
      img.width = 380;
      img.height = 250;
      p.textContent = item.description;

      nameBooks.appendChild(a);
      a.appendChild(div);
      div.appendChild(img);
      div.appendChild(h5);
      div.appendChild(p);
    }

    const swiper = new Swiper(".swiper", {
      // Optional parameters
      direction: "horizontal",
      loop: true,
      speed: 400,
      spaceBetween: 50,
      slidesPerView: 3,

      // Navigation arrows
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  });

const randomNum = Math.floor(Math.random() * 50);
const btnRandomBook = document
  .querySelector(".btn__book-random")
  .addEventListener("click", () => {
    localStorage.setItem("book", randomNum);
  });

axios
  .get(`https://65abd3effcd1c9dcffc71754.mockapi.io/books`)
  .then((responce) => responce.data)
  .then((data) => {
    for (let item of data) {
      item.id === randomNum ? (data = item) : "";
    }
    const book = document.querySelector(".book-random__book-item");
    const img = document.querySelector(".book-random__img");

    const h3 = document.createElement("h3");
    const p = document.createElement("p");
    const span = document.createElement("span");

    h3.textContent = data.name;
    p.textContent = data.description;
    span.textContent = `${data.price} $`;
    img.src = data.picture;

    book.appendChild(h3);
    book.appendChild(p);
    book.appendChild(span);
  });
