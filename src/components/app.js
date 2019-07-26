
/*
index.html -> app.js -> list.js -> book.js import로 호출
브라우저는 이를 인식할 수가 없어 index.html만 띄우면 아무것도 뜨지 않는다.
 */
import "../asset/scss/theme.scss";
import { makeList } from "./business/list.js"
import {__book_data} from "./data/book";

// localStorage에서 데이터를 가져온다.
if (localStorage.getItem('books') === null) {
    localStorage.setItem('books', JSON.stringify(__book_data));
}
//도서 목록 호출
makeList();
