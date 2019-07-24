/**
 * 도서 목록을 세팅하는 화면이다.
 *
 * @author yejin kim
 */
import { __book_data } from "../data/book.js"
import { makeModal } from "./checkout.js"

export const makeList = () => {
  let template = "";
  let btnRows = [];
  let book = __book_data.map((book, i) => {
    if (book.rtn_dt === "") { btnRows.push(i); }
    template +=
      `<div class="row row__list">
        <div class="col-md-1">${book.num}</div>
        <div class="col-md-4">${book.name}</div>
        <div class="col-md-2">${book.auth}</div>
        <div class="col-md-2">${book.pub}</div>
        <div class="col-md-1">${book.rtn_dt != "" ? `${book.sttus}` : `<button class="checkout">대여</button>`}</div>
        <div class="col-md-2">${book.rtn_dt}</div>
      </div>`;
  });
  document.getElementById("result").innerHTML = template;
  let buttons = document.getElementsByClassName("checkout");
  for(let i = 0; i < buttons.length; i++) {
    let row = btnRows[i];
    buttons[i].addEventListener("click", () => {
      let modal = makeModal(row);
      modal.open("settings");
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
       <div class="col-md-1">${book.rtn_dt !== "" ? `${book.sttus}` : `<button class="checkout">대여</button>`}</div>
       <div class="col-md-2">${book.rtn_dt}</div>`;

  document.getElementById("result").childNodes[index].innerHTML = template;
};

