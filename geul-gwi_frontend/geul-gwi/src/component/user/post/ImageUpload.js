import React, { useState } from 'react';
import '../../../css/post/ImageUpload.css';

function ImageUpload() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setSelectedPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewURL(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // const handleUpload = () => {
  //   // 사진 업로드 로직 추가
  //   // selectedPhoto 변수를 사용하여 선택한 파일을 업로드 가능하다.
  //   // ex) 서버에 AJAX 요청을 보내거나 FormData 사용
  // };

  const handleDelete = () => {
    setSelectedPhoto(null);
    setPreviewURL(null);
  };

  return (
    <div className='ImageUpload'>
      <div className='image-div'>
        {previewURL && (
          <div>
            <img src={previewURL}/>
          </div>
        )}
      </div>
      <input type="file" onChange={handlePhotoChange} />

      {/* {selectedPhoto && <button onClick={handleUpload} className='img-upload-button'>저장</button>} */}
      <button onClick={handleDelete} className='img-delete-button'>삭제</button>
    </div>
  );
}

export default ImageUpload;