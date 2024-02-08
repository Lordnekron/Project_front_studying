axios
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

    h3.textContent = bookItem.name;
    p.textContent = bookItem.description;
    span.textContent = `${bookItem.price} $`;
    img.src = bookItem.picture;

    book.appendChild(h3);
    book.appendChild(p);
    book.appendChild(span);
  });
