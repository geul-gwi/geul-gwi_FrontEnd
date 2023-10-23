import Axios from 'axios';
import { useContext } from 'react';
import { AxiosAddrContext } from 'contextStore/AxiosAddress';

export const useFetchImageData = () => {
    const axiosAddr = useContext(AxiosAddrContext).axiosAddr;

    return async (path) => {
        try {
            const encodedPath = encodeURIComponent(path);
            const response = await Axios.get(`${axiosAddr}/file?file=${encodedPath}`, {
                responseType: 'blob',
            });

            if (response) {
                const newFile = new File([response.data], 'image');
                const reader = new FileReader();

                return new Promise((resolve, reject) => {
                    reader.onload = (event) => {
                        const profileImageUrl = event.target.result;
                        resolve(profileImageUrl);
                    };
                    reader.onerror = (error) => {
                        reject(error);
                    };
                    reader.readAsDataURL(newFile);
                });
            }
        } catch (error) {
            console.error('이미지 가져오기 실패.', error);
            return null;
        }
    }
}