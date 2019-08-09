/**
 * @description 반납과 관련된 부분을 처리한다.
 * @author: mijeong lee
 */

let books = JSON.parse(localStorage.getItem('books') || "[]");

export default {
    confirm: (index) => {
        books[index].rtn_dt = '';
        books[index].sttus = '대여가능';
        // localStorage에 책 리스트 저장
        localStorage.setItem('books', JSON.stringify(books));
        index = null; // 모든 변수 초기화
    },
    setContents: (titleNode, rDateNode) => {
        // 모달 내용 변경
        titleNode.innerText = '반납하시겠습니까?';
        rDateNode.innerText = '';
        // 모든 변수 초기화
        titleNode = null; rDateNode = null;
    },
};
