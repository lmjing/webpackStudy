/**
 * 도서 목록을 세팅하는 화면이다.
 *
 * @author yejin kim
 */
import { CheckoutModal, ReturnModal } from "./checkout.js"
import { Modal } from "./modal";


let modal = new Modal();

const addButtonEvent = (buttons, row) => {
  let btn = buttons[row];
  btn.addEventListener("click", () => {
    modal.open(row, btn.innerHTML);
  }, false);
};

export const makeList = () => {
  let template = "";
  let books = JSON.parse(localStorage.getItem('books') || "[]");
  let book = books.map((book, i) => {
    template +=
        `<div class="row row__list">
        <div class="col-md-1">${book.num}</div>
        <div class="col-md-4">${book.name}</div>
        <div class="col-md-2">${book.auth}</div>
        <div class="col-md-2">${book.pub}</div>
        <div class="col-md-1"><button class="bookBtn">${book.rtn_dt !== "" ? '반납' : '대여'}</button></div>
        <div class="col-md-2">${book.rtn_dt}</div>
      </div>`;
  });
  document.getElementById("result").innerHTML = template;
  let buttons = document.getElementsByClassName("bookBtn");
  for(let i = 0; i < buttons.length; i++) {
    addButtonEvent(buttons, i);
  }
};

export const replaceRow = (index) => {
  let template = "";
  let books = JSON.parse(localStorage.getItem('books') || "[]");
  let book = books[index];
  template +=
      `<div class="col-md-1">${book.num}</div>
       <div class="col-md-4">${book.name}</div>
       <div class="col-md-2">${book.auth}</div>
       <div class="col-md-2">${book.pub}</div>
       <div class="col-md-1"><button class="bookBtn">${book.rtn_dt !== "" ? '반납' : '대여'}</button></div>
       <div class="col-md-2">${book.rtn_dt}</div>`;

  document.getElementById("result").childNodes[index].innerHTML = template;
  let buttons = document.getElementsByClassName("bookBtn");
  addButtonEvent(buttons, index);
};
