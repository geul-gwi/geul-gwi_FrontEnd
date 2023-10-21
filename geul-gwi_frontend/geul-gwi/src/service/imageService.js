import Axios from 'axios';
import React, { useContext } from 'react';
import { AxiosAddrContext } from 'contextStore/AxiosAddress';

// 이미지 데이터를 가져오는 함수
export  const fetchImageData = async (path) => {
    const axiosAddress = useContext(AxiosAddrContext).axiosAddr;

    try {
        console.log('fetchImageData 요쳥한 주소 : ' + `${axiosAddress}/file${path}`);
        const response = await Axios.get(`${axiosAddress}/file${path}`, {
            responseType: 'blob', // Blob 형식으로 데이터를 받습니다.
        });
        if (response) {
            // Blob 데이터를 이미지 URL로 변환
            const imageUrl = URL.createObjectURL(response.data);
            console.log('blob : ' + response.data);
            console.log('완성된 이미지 주소 : ' + imageUrl);

            return imageUrl;

            setUserInfo({ ...userInfo, profile: imageUrl });
        }
    } catch (error) {
        console.error('이미지 가져오기에 실패했습니다.', error);
    }
}