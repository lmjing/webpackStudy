/**
 * 도서 목록을 세팅하는 화면이다.
 *
 * @author yejin kim
 */
import { CheckoutModal, ReturnModal } from "./checkout.js"
import { Modal } from "./modal";

const modal = new Modal();

// row 내의 html 정의
const rowTemplate = (book) => {
  return  `<div class="col-md-1">${book.num}</div>
       <div class="col-md-4">${book.name}</div>
       <div class="col-md-2">${book.auth}</div>
       <div class="col-md-2">${book.pub}</div>
       <div class="col-md-1"><button class="bookBtn">${book.rtn_dt !== "" ? '반납' : '대여'}</button></div>
       <div class="col-md-2">${book.rtn_dt}</div>`;
};

// list row 내의 버튼에 클릭 이벤트(모달 오픈) 지정
const addButtonEvent = (buttons, row) => {
  let btn = buttons[row];
  btn.addEventListener("click", () => {
    modal.open(row, btn.innerText);
    // 모든 변수 초기화
    btn = null; buttons = null; row = null;
  }, false);
};

// 데이터를 불러와 모든 리스트 설정
export const makeList = () => {
  let template = "";
  let books = JSON.parse(localStorage.getItem('books') || "[]");
  books.map((book) => {
    template += `<div class="row row__list">${rowTemplate(book)}</div>`;
  });
  document.getElementById("result").innerHTML = template;
  // 모든 버튼에 이벤트를 등록한다.
  let buttons = document.getElementsByClassName("bookBtn");
  for(let i = 0; i < buttons.length; i++) {
    addButtonEvent(buttons, i);
  }

  // 모든 변수 초기화
  template = null; books = null; buttons = null;
};

// 대여/반납 과정 이후 특정 row 데이터 재설정
export const replaceRow = (index) => {
  let books = JSON.parse(localStorage.getItem('books') || "[]");
  let book = books[index];

  document.getElementById("result").childNodes[index].innerHTML = rowTemplate(book);
  let buttons = document.getElementsByClassName("bookBtn");
  addButtonEvent(buttons, index);

  // 모든 변수 초기화
  books = null; book = null; buttons = null; index = null;
};
