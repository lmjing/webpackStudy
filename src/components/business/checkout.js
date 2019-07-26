import {__book_data} from "../data/book";
import { replaceRow } from "./list";

/**
 * @description 도서 대여를 수행 (반납일 : 대여일로부터 2주 후)
 * @author: mijeong lee
 */


const Modal = (index) => {
    let modalEl = document.getElementById("modal");
    // 취소 버튼 event 등록
    document.getElementById("cancel").addEventListener("click", (e) => {
        e.preventDefault();
        modal.close();
    }, false);

    const modal = {
        center: () => {
            // 브라우저 창의 위쪽과 왼쪽으로부터 모달 창까지의 거리를 계산한다.
            var top = Math.max(window.innerHeight - modalEl.offsetHeight, 0) / 2,
                left = Math.max(window.innerWidth - modalEl.offsetWidth, 0 ) / 2;
            modalEl.style.top = `${top + window.scrollY}px`;
            modalEl.style.left = `${left + window.scrollX}px`;
        },
        open: () => {
            // 모달 보이게 변경
            modalEl.style.display = "block";
            modal.center();

            window.addEventListener('resize', modal.center);
            document.addEventListener('scroll', modal.center);
        },
        close: () => {
            modalEl.style.display = "none";
        },
        init: () => {
            mod
        },
    };
    return modal;
};

export const CheckoutModal = (index) => {
    // 수 2자리로 만들기
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

    const checkout = () => {
        __book_data[index].rtn_dt = rDate;
        __book_data[index].sttus = '반납예정';
    };

    let modal = Modal(index);
    let modalEl = document.getElementById("modal");
    let rDate = returnDate();

    // 대여 버튼 event 등록
    let confirmBtn = document.getElementById("confirm");
    confirmBtn.innerText = '대여';
    confirmBtn.addEventListener("click", (e) => {
        e.preventDefault();
        checkout();
        replaceRow(index);
        modal.close();
    }, true);

    // 모달 내용 변경
    let titleNode = modalEl.querySelector('.title');
    titleNode.innerText = '대여하시겠습니까?';
    let rDateNode = document.getElementById('rDate');
    rDateNode.innerText = '대여시 반납 예정일 : ' + rDate;

    return modal;
};

export const ReturnModal = (index) => {
    let modalEl = document.getElementById("modal");
    // 취소 버튼 event 등록
    document.getElementById("cancel").addEventListener("click", (e) => {
        e.preventDefault();
        modal.close();
    }, false);
    // 대여 버튼 event 등록
    let confirmBtn = document.getElementById("confirm");
    confirmBtn.innerText = '반납';
    confirmBtn.addEventListener("click", (e) => {
        e.preventDefault();
        __book_data[index].rtn_dt = '';
        __book_data[index].sttus = '대여가능';
        replaceRow(index);
        modal.close();
    }, true);

    const modal = {
        center: () => {
            // 브라우저 창의 위쪽과 왼쪽으로부터 모달 창까지의 거리를 계산한다.
            var top = Math.max(window.innerHeight - modalEl.offsetHeight, 0) / 2,
                left = Math.max(window.innerWidth - modalEl.offsetWidth, 0 ) / 2;
            modalEl.style.top = `${top + window.scrollY}px`;
            modalEl.style.left = `${left + window.scrollX}px`;
        },
        open: () => {
            let titleNode = modalEl.querySelector('.title');
            titleNode.innerText = '반납하시겠습니까?';
            // 모달 보이게 변경
            modalEl.style.display = "block";
            console.log('test');
            modal.center();

            window.addEventListener('resize', modal.center);
            document.addEventListener('scroll', modal.center);
        },
        close: () => {
            modalEl.style.display = "none";
        },
    };
    return modal;
};

// export const CheckoutModal = (index) => {
//     // 수 2자리로 만들기
//     const twoLength = (n) => {
//         return (n < 10 ? '0' : '') + n;
//     };
//     // 반납 예정일 리턴 함수
//     const returnDate = () => {
//         // 반납일 2주 후
//         let date = new Date();
//         date.setDate(new Date().getDate() + 14);
//         // 자바스크립트의 월은 0부터 시작하기 때문에 1을 더해야 정상적인 월이 됩니다.
//         return `${date.getFullYear()}-${twoLength(date.getMonth() + 1)}-${twoLength(date.getDate())}`;
//     };
//
//     let modalEl = document.getElementById("modal");
//     let rDate = returnDate();
//     // 취소 버튼 event 등록
//     document.getElementById("cancel").addEventListener("click", (e) => {
//         e.preventDefault();
//         modal.close();
//     }, false);
//     // 대여 버튼 event 등록
//     let confirmBtn = document.getElementById("confirm");
//     confirmBtn.innerText = '대여';
//     confirmBtn.addEventListener("click", (e) => {
//         e.preventDefault();
//         __book_data[index].rtn_dt = rDate;
//         __book_data[index].sttus = '반납예정';
//         replaceRow(index);
//         modal.close();
//     }, true);
//
//     const modal = {
//         center: () => {
//             // 브라우저 창의 위쪽과 왼쪽으로부터 모달 창까지의 거리를 계산한다.
//             var top = Math.max(window.innerHeight - modalEl.offsetHeight, 0) / 2,
//                 left = Math.max(window.innerWidth - modalEl.offsetWidth, 0 ) / 2;
//             modalEl.style.top = `${top + window.scrollY}px`;
//             modalEl.style.left = `${left + window.scrollX}px`;
//         },
//         open: () => {
//             let titleNode = modalEl.querySelector('.title');
//             titleNode.innerText = '대여하시겠습니까?';
//             let rDateNode = document.getElementById('rDate');
//             rDateNode.innerText = '대여시 반납 예정일 : ' + rDate;
//             // 모달 보이게 변경
//             modalEl.style.display = "block";
//             modal.center();
//
//             window.addEventListener('resize', modal.center);
//             document.addEventListener('scroll', modal.center);
//         },
//         close: () => {
//             modalEl.style.display = "none";
//         },
//     };
//     return modal;
// };
//
// export const ReturnModal = (index) => {
//     let modalEl = document.getElementById("modal");
//     // 취소 버튼 event 등록
//     document.getElementById("cancel").addEventListener("click", (e) => {
//         e.preventDefault();
//         modal.close();
//     }, false);
//     // 대여 버튼 event 등록
//     let confirmBtn = document.getElementById("confirm");
//     confirmBtn.innerText = '반납';
//     confirmBtn.addEventListener("click", (e) => {
//         e.preventDefault();
//         __book_data[index].rtn_dt = '';
//         __book_data[index].sttus = '대여가능';
//         replaceRow(index);
//         modal.close();
//     }, true);
//
//     const modal = {
//         center: () => {
//             // 브라우저 창의 위쪽과 왼쪽으로부터 모달 창까지의 거리를 계산한다.
//             var top = Math.max(window.innerHeight - modalEl.offsetHeight, 0) / 2,
//                 left = Math.max(window.innerWidth - modalEl.offsetWidth, 0 ) / 2;
//             modalEl.style.top = `${top + window.scrollY}px`;
//             modalEl.style.left = `${left + window.scrollX}px`;
//         },
//         open: () => {
//             let titleNode = modalEl.querySelector('.title');
//             titleNode.innerText = '반납하시겠습니까?';
//             // 모달 보이게 변경
//             modalEl.style.display = "block";
//             console.log('test');
//             modal.center();
//
//             window.addEventListener('resize', modal.center);
//             document.addEventListener('scroll', modal.center);
//         },
//         close: () => {
//             modalEl.style.display = "none";
//         },
//     };
//     return modal;
// };
