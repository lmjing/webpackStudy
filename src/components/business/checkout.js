import {__book_data} from "../data/book";

/**
 * @description 대여와 관련된 부분을 처리한다.
 * @author: mijeong lee
 */

let books = JSON.parse(localStorage.getItem('books') || "[]");

// 한 자리 숫자 -> 두 자리 숫자
const twoLength = (n) => {
    return (n < 10 ? '0' : '') + n;
};

// 반납 예정일 리턴 함수
const returnDate = () => {
    // 반납일 2주 후
    let date = new Date();
    date.setDate(new Date().getDate() + 14);
    // 자바스크립트의 월은 0부터 시작하기 때문에 1을 더해야 정상적인 월이 됩니다.
    return `${date.getFullYear()}-${twoLength(date.getMonth() + 1)}-${twoLength(date.getDate())}`;
};

export default {
    confirm: (index) => {
        books[index].rtn_dt = returnDate();
        books[index].sttus = '반납예정';
        // localStorage에 책 리스트 저장
        localStorage.setItem('books', JSON.stringify(books));
    },
    setContents: (titleNode, rDateNode) => {
        // 모달 내용 변경
        titleNode.innerText = '대여하시겠습니까?';
        rDateNode.innerText = '대여시 반납 예정일 : ' + returnDate();
    }
};
