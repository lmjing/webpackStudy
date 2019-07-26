/**
 * @description 반납과 관련된 부분을 처리한다.
 * @author: mijeong lee
 */

import {__book_data} from "../data/book";

export default {
    confirm: (index) => {
        __book_data[index].rtn_dt = '';
        __book_data[index].sttus = '대여가능';
    },
    setContents: (titleNode, rDateNode) => {
        // 모달 내용 변경
        titleNode.innerText = '반납하시겠습니까?';
        rDateNode.innerText = '';
    },
};
