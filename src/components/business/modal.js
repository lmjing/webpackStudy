/**
 * @description 대여/반납을 수행하는 모달을 관리한다.
 * 모달은 index.html에 선언되어 있는 한가지 view를 공유한다.
 * 따라서, modalType을 확인해 type이 바뀌었을 경우에만 컨텐츠를 수정해주었다.
 * @author: mijeong lee
 */

import {__book_data} from "../data/book";
import { replaceRow } from "./list";

// 수 2자리로 만들기
const twoLength = (n) => {
    return (n < 10 ? '0' : '') + n;
};

const checkoutModal = {
    // 반납 예정일 리턴 함수
    returnDate: () => {
        // 반납일 2주 후
        let date = new Date();
        date.setDate(new Date().getDate() + 14);
        // 자바스크립트의 월은 0부터 시작하기 때문에 1을 더해야 정상적인 월이 됩니다.
        return `${date.getFullYear()}-${twoLength(date.getMonth() + 1)}-${twoLength(date.getDate())}`;
    },
    confirm: (index) => {
        __book_data[index].rtn_dt = checkoutModal.returnDate();
        __book_data[index].sttus = '반납예정';
    },
    contents: (titleNode, rDateNode) => {
        // 모달 내용 변경
        titleNode.innerText = '대여하시겠습니까?';
        rDateNode.innerText = '대여시 반납 예정일 : ' + checkoutModal.returnDate();
    }
};

const cancleModal = {
    confirm: (index) => {
        __book_data[index].rtn_dt = '';
        __book_data[index].sttus = '대여가능';
    },
    contents: (titleNode, rDateNode) => {
        // 모달 내용 변경
        titleNode.innerText = '반납하시겠습니까?';
        rDateNode.innerText = '';
    },
};

export const Modal = () => {
    let rowIdx = -1;
    let btnType = '';
    let modalType = {
        cancel: cancleModal,
        checkout: checkoutModal,
    };
    let modalEl = document.getElementById("modal");
    // 취소 버튼 event 등록
    document.getElementById("cancel").addEventListener("click", (e) => {
        e.preventDefault();
        modal.close();
    }, false);

    // return 할 객체
    const modal = {
        changeContents: (evtName, modalType) => {
            // 모달 내용 변경
            let titleNode = modalEl.querySelector('.title');
            let rDateNode = document.getElementById('rDate');
            modalType.contents(titleNode, rDateNode);
            // 대여 버튼 event 등록
            let confirmBtn = document.getElementById("confirm");
            confirmBtn.innerText = evtName;
            confirmBtn.addEventListener("click", (e) => {
                e.preventDefault();
                modalType.confirm(rowIdx);
                replaceRow(rowIdx);
                modal.close();
            }, true);
        },
        center: () => {
            // 브라우저 창의 위쪽과 왼쪽으로부터 모달 창까지의 거리를 계산한다.
            var top = Math.max(window.innerHeight - modalEl.offsetHeight, 0) / 2,
                left = Math.max(window.innerWidth - modalEl.offsetWidth, 0 ) / 2;
            modalEl.style.top = `${top + window.scrollY}px`;
            modalEl.style.left = `${left + window.scrollX}px`;
        },
        open: (i, btnName) => {
            rowIdx = i;
            let type = btnName === '대여' ? 'checkout' : 'cancel';
            // 타입 바뀌었으면 내용 바꿔준다. or 초기상태일 때
            if (btnType !== type || btnType === '') {
                modal.changeContents(btnName, modalType[type]);
            }
            // 모달 보이게 변경
            modalEl.style.display = "block";
            // center 위치하도록 조정
            modal.center();
            window.addEventListener('resize', modal.center);
            document.addEventListener('scroll', modal.center);
            // 변수 마지막 값으로 변경
            btnType = type;
        },
        close: () => {
            modalEl.style.display = "none";
        },
    };

    return modal;
}
