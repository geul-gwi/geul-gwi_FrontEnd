// 글 작성 페이지
import '../../../css/post/Post.css';

import React, { useState } from 'react';
import styled from 'styled-components';

import Header from '../../common/header/Header';
import LeftNavbar from '../../common/leftNav/LeftNavbar';
import ImageUpload from './ImageUpload';

import path from 'img/back_gradient.jpg';

function PostForm() {
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleImageChange = (image) => {
    setSelectedImage(image);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (content) {
      // 서버로 데이터 전송하는 로직 추가
    }
  };

  return (
    <div className='PostForm'>
      <LeftNavbar />
      <HeadBackImg/>
      <Header />
      <div className='main-container'>
       {/* 글 작성 폼 */}
        <div className='top-container'>
          <h1>글 쓰기</h1>
          <form onSubmit={handleSubmit}>
            <textarea
              placeholder="글 귀를 작성해 보세요"
              value={content}
              onChange={handleContentChange}
            />
          </form>
        </div>
        {/* 이미지 업로드 폼 */}
        <div className='bottom-container'>
          <h1>이미지</h1>
          <ImageUpload onImageChange={handleImageChange} />
          <button className='post-button' type="submit" onClick={handleSubmit}>완료</button>
        </div>
      </div>
    </div>
  );
}

const HeadBackImg = styled.div`
    position : absolute;
    width : 100%;
    height : 1400px;
    top: 0;
    left : 0;
    z-index: -1;
    background-image: url(${path});
    background-position : "center";
    background-repeat : "no-repeat";
    background-size: cover;
`

export default PostForm;