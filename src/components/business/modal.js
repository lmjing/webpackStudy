/**
 * @description 대여/반납을 수행하는 모달을 관리한다.
 * 모달은 index.html에 선언되어 있는 한가지 view를 공유한다.
 * 따라서, modalType을 확인해 type이 바뀌었을 경우에만 컨텐츠를 수정해주었다.
 * @author: mijeong lee
 */

import { replaceRow } from "./list";
import cancel from "./cancel";
import checkout from "./checkout";

export const Modal = () => {
    let rowIdx = -1;
    let btnType = '';
    let modalType = {cancel, checkout};

    const modalEl = document.getElementById("modal");
    const titleNode = modalEl.querySelector('.title');
    const rDateNode = document.getElementById('rDate');
    // 취소 버튼 event 등록
    document.getElementById("cancel").addEventListener("click", (e) => {
        e.preventDefault();
        modal.close();
        e = null; // 모든 변수 초기화
    }, false);

    // return 할 객체
    const modal = {
        changeContents: (evtName, action) => {
            titleNode.innerText = action.contents.title;
            rDateNode.innerText = action.contents.dateStr;

            // 대여 버튼 event 등록
            let confirmBtn = document.getElementById("confirm");
            confirmBtn.innerText = evtName;
            confirmBtn.addEventListener("click", (e) => {
                e.preventDefault();
                action.excute(rowIdx);
                replaceRow(rowIdx);
                modal.close();
                confirmBtn = null; // 변수 초기화
            }, true);
        },
        center: () => {
            // 브라우저 창의 위쪽과 왼쪽으로부터 모달 창까지의 거리를 계산한다.
            let top = Math.max(window.innerHeight - modalEl.offsetHeight, 0) / 2,
                left = Math.max(window.innerWidth - modalEl.offsetWidth, 0 ) / 2;
            modalEl.style.top = `${top + window.scrollY}px`;
            modalEl.style.left = `${left + window.scrollX}px`;
            // 모든 변수 초기화
            top = null; left = null;
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
            // 모든 변수 초기화
            i = null; btnName = null; type = null;
        },
        close: () => {
            modalEl.style.display = "none";
        },
    };

    return modal;
};
