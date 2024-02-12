const template = document.getElementById("template");
let priceText = 0;

function addDataTemplate() {
  const templateContent = document.getElementById("template_content");
  templateContent.replaceChildren();
  for (let i = 0; i < localStorage.length; i++) {
    if (!isNaN(parseInt(localStorage.key(i)))) {
      const data = JSON.parse(localStorage.getItem(localStorage.key(i)));

      const div = document.createElement("div");
      const p = document.createElement("p");
      const span = document.createElement("span");
      const img = document.createElement("img");
      const button = document.createElement("button");

      const price = document.querySelector(".cart__button__text");
      let priceInt = price.textContent.split(" ");

      if (priceInt[1]) {
        priceText = parseFloat(priceInt[1]) + parseFloat(data.price);
      } else {
        priceText = data.price;
      }

      price.textContent = `Cart: ${parseFloat(priceText).toFixed(2)} $`;

      div.classList = "block block--justify-space-between cart__element";
      p.textContent = data.name;
      span.textContent = `${data.price} $`;
      span.style.textWrap = "no-wrap";
      img.src = data.picture;
      img.width = 30;
      img.height = 50;
      button.classList =
        "cart__item__remove btn btn__nav btn__nav--sm-text btn__nav--light";
      button.textContent = "remove";
      button.setAttribute("data", data.id);

      div.appendChild(img);
      div.appendChild(p);
      div.appendChild(span);
      div.appendChild(button);
      templateContent.appendChild(div);
    }
  }
}

function putEventListener() {
  const buttons = document.querySelectorAll(".cart__item__remove");
  for (let button of buttons) {
    button.addEventListener("click", () => {
      const priceSet = localStorage.getItem(button.getAttribute("data"));

      const price = document.querySelector(".cart__button__text");
      let priceInt = price.textContent.split(" ");

      priceText = parseFloat(priceInt[1]) - parseFloat(priceSet.price);

      price.textContent = `Cart: ${parseFloat(priceText).toFixed(2)} $`;

      button.parentElement.remove();
      localStorage.removeItem(button.getAttribute("data"));
    });
  }
}

let popover;

function onInitCart() {
  addDataTemplate();
  popover = tippy(".cart__button", {
    content: "Tooltip",
    placement: "bottom",
    trigger: "click",
    content: template.innerHTML,
    allowHTML: true,
    maxWidth: 500,
    interactive: true,
    onShown(instance) {
      putEventListener();
    },
  });
}

function onUpdateCart() {
  const tippy = document.querySelector(".cart__button");
  addDataTemplate();
  tippy._tippy.setProps({});
}

onInitCart();

export { onUpdateCart };
