import Axios from 'axios';

const imageDataFetcher = async (axiosAddr, path) => {
    try {
        const encodedPath = encodeURIComponent(path);
        const response = await Axios.get(`${axiosAddr}/file?file=${encodedPath}`, {
            responseType: 'blob',
        });

        if (response.status === 200) {
            const newFile = new File([response.data], 'image');
            const reader = new FileReader();

            return new Promise((resolve, reject) => {
                reader.onload = (event) => {
                    const imageUrl = event.target.result;
                    resolve(imageUrl);
                };
                reader.onerror = (error) => {
                    console.error('이미지 읽기 오류:', error);
                    reject(error);
                };
                reader.readAsDataURL(newFile);
            });
        } else {
            console.error('이미지 가져오기 실패. HTTP 상태 코드:', response.status);
            return null;
        }
    } catch (error) {
        console.error('이미지 가져오기에 실패했습니다.', error);
        return null;
    }
};

export default imageDataFetcher;