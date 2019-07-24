/**
 * 도서 목록을 세팅하는 화면이다.
 *
 * @author yejin kim
 */
import { __book_data } from "../data/book.js"
import { CheckoutModal, ReturnModal } from "./checkout.js"

let ableChoutRows = [];
let ableReturnRows = [];

const Item = (book, i) => {
  const item = {
    template:  `<div class="row row__list">
        <div class="col-md-1">${book.num}</div>
        <div class="col-md-4">${book.name}</div>
        <div class="col-md-2">${book.auth}</div>
        <div class="col-md-2">${book.pub}</div>
        <div class="col-md-1">${book.rtn_dt !== "" ? `<button class="return">반납</button>` : `<button class="checkout">대여</button>`}</div>
        <div class="col-md-2">${book.rtn_dt}</div>
      </div>`,
    modal: book.rtn_dt !== "" ? ReturnModal(i) : CheckoutModal(i),
  };
  return item;
};

let itemList = [];
export const makeList = () => {
  let template = "";
  let book = __book_data.map((book, i) => {
    let item = Item(book, i);
    itemList.push(item);
    template += item.template;
  });
  document.getElementById("result").innerHTML = template;
  let buttons = document.getElementsByTagName('button');
  for(let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", () => {
      let modal = itemList[i].modal;
      modal.open();
    }, false);
  }
};

export const replaceRow = (index) => {
  let template = "";
  let book = __book_data[index];
  template +=
      `<div class="col-md-1">${book.num}</div>
       <div class="col-md-4">${book.name}</div>
       <div class="col-md-2">${book.auth}</div>
       <div class="col-md-2">${book.pub}</div>
       <div class="col-md-1">${book.rtn_dt != "" ? `<button class="return">반납</button>` : `<button class="checkout">대여</button>`}</div>
       <div class="col-md-2">${book.rtn_dt}</div>`;

  document.getElementById("result").childNodes[index].innerHTML = template;
};

