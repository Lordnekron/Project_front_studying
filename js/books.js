axios
  .get("https://65abd3effcd1c9dcffc71754.mockapi.io/Categories")
  .then((responce) => responce.data)
  .then((data) => {
    const filterCategory = document.querySelector(".books__filter");
    const div = document.createElement("div");
    const h2 = document.createElement("h2");
    const buttonAll = document.createElement("button");

    buttonAll.textContent = "Все";
    buttonAll.setAttribute("data-filter", `all`);
    buttonAll.classList = `btn btn--filter`;
    div.classList = `block block--flex-column block--align-flex-start`;
    h2.textContent = "Категории книг";
    div.appendChild(buttonAll);

    buttonAll.addEventListener("click", () => {
      localStorage.removeItem("category");
    });

    for (let item of data) {
      const button = document.createElement("button");

      button.textContent = item.name;
      button.setAttribute("data-filter", `.category-${item.id}`);
      button.classList = `btn btn--filter`;
      div.appendChild(button);
    }
    filterCategory.appendChild(h2);
    filterCategory.appendChild(div);
  });

axios
  .get("https://65abd3effcd1c9dcffc71754.mockapi.io/books")
  .then((responce) => responce.data)
  .then((data) => {
    const books = document.querySelector(".books__content");
    const filterCategory = document.querySelector(".books__filter");
    const button = document.createElement("button");

    button.textContent = "Все";
    button.setAttribute("data-filter", `all`);

    function checkAuthor(author, authorId) {
      this.author = author;
      this.authorId = authorId;
    }

    let listAuthors = [];

    for (let item of data) {
      let authorExists = false;

      for (let author of listAuthors) {
        if (author.author === item.author) {
          authorExists = true;
          break;
        }
      }

      if (!authorExists) {
        listAuthors.push(new checkAuthor(item.author, item.authorId));
      }
      const div = document.createElement("div");
      const p = document.createElement("p");
      const img = document.createElement("img");
      const h5 = document.createElement("h5");
      const h6 = document.createElement("h6");
      const a = document.createElement("a");

      h5.textContent = item.name;
      h6.textContent = item.author;
      a.classList = `book-item mix category-${item.CategoryId} author-${item.authorId}`;
      a.setAttribute("data", `${item.id}`);
      a.href = "/pages/book-item.html";
      div.classList = `block block--flex-column`;
      img.src = item.picture;
      img.width = 200;
      img.height = 300;
      p.textContent = `${item.price} $`;

      a.addEventListener("click", () => {
        localStorage.setItem("book", item.id);
      });

      books.appendChild(a);
      div.appendChild(img);
      div.appendChild(h5);
      div.appendChild(h6);
      div.appendChild(p);
      a.appendChild(div);
    }

    const div = document.createElement("div");
    const h2 = document.createElement("h2");
    h2.textContent = "Авторы";
    filterCategory.appendChild(h2);

    for (let item of listAuthors) {
      const button = document.createElement("button");

      button.textContent = item.author;
      button.setAttribute("data-filter", `.author-${item.authorId}`);
      button.classList = `btn btn--filter`;

      div.appendChild(button);
    }
    filterCategory.appendChild(div);

    var mixer = mixitup(".books__content");

    if (localStorage.getItem("category")) {
      mixer
        .toggleOn(`.${localStorage.getItem("category")}`)
        .then(function (state) {
          console.log(localStorage.getItem("category"));
        });
    }
  });
