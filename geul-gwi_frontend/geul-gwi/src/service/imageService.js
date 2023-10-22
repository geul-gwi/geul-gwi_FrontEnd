// import Axios from 'axios';
// import React, { useState, useEffect, useContext } from 'react';
// import { AxiosAddrContext } from 'contextStore/AxiosAddress';

// // 서버에게서 받은 사진 주소 프론트에 쓸 수 있게 변환해 주는 함수
// // img 태그에 src 바로 적용하면 된다.
// export const fetchImageData = async (path) => {
//     try {
//         const axiosAddress = useContext(AxiosAddrContext).axiosAddr;
//         const encodedPath = encodeURIComponent(path);
//         const response = await Axios.get(`${axiosAddress}/file?file=${encodedPath}`, {
//             responseType: 'blob',
//         });

//         if (response) {
//             let profileImageUrl; // 변수를 let으로 선언
//             const newFile = new File([response.data], 'profile');
//             const reader = new FileReader();

//             // FileReader 이벤트 핸들러를 Promise로 감싸서 async/await 사용
//             await new Promise((resolve) => {
//                 reader.onload = (event) => {
//                     profileImageUrl = event.target.result;
//                     resolve();
//                 };
//                 reader.readAsDataURL(newFile);
//             });

//             return profileImageUrl;
//         }
//     } catch (error) {
//         console.error('이미지 가져오기 실패.', error);
//         return null;
//     }
// }
