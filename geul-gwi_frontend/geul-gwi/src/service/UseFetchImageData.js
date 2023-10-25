import Axios from 'axios';

const fetchImageData = async (axiosAddr, path) => {
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
                    const imageUrl = event.target.result;
                    resolve(imageUrl);
                };
                reader.onerror = (error) => {
                    reject(error);
                };
                reader.readAsDataURL(newFile);
            });
        }
    } catch (error) {
        console.error('이미지 가져오기에 실패했습니다.', error);
        return null;
    }
};

export default fetchImageData;