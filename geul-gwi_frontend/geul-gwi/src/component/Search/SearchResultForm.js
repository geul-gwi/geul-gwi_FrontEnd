import React, { useState} from 'react';
import styled from 'styled-components';
import axios from 'axios';


// Component
import ResultItem from 'component/Search/ResultItem';
import ModalPage from 'component/common/modal/ModalPage';



const SearchResultForm = (props) => {
  // public Env => 정적인 이미지
  const imagePath = process.env.PUBLIC_URL + '/img/';
  const [data, setData] = useState(props.posts);

  return (
    <Container>
      {
        data.map((element) => (
              element.imgPath === null ?
              // 이미지가 없는 경우
              <Item onClick={() => props.ModalOpen(element)}>
                <HoveredContainer>
                  {/* 작성자 명 */}
                  <HoveredContainer_tutor>
                    {element.postUser}
                  </HoveredContainer_tutor>
                  {/* 작성 내용 */}
                  <HoveredContainer_Content>
                    {element.mainText}
                  </HoveredContainer_Content>
                </HoveredContainer>
              </Item> 
              :
              // 이미지가 있는 경우
              <Item onClick={() => props.ModalOpen(element)}>
                {/* 글의 이미지 */}
                <ItemImg src={imagePath + element.imgPath} alt={element.imgPath}></ItemImg>
                <HoveredContainer>
                  {/* 작성자 명 */}
                  <HoveredContainer_tutor>
                    {element.postUser}
                  </HoveredContainer_tutor>
                  {/* 작성 내용 */}
                  <HoveredContainer_Content>
                    {element.mainText}
                  </HoveredContainer_Content>
                </HoveredContainer>

                <HoveredBack/>
              </Item>
        ))
      }

      {/* 모달 띄우기 */}
      {
        props.ModalState?
        <ModalPage
          ModalClosed={props.ModalClosed} // 모달 닫는 함수
          ModalData={props.ModalData}     // 모달이 열릴 때, 전달할 Object State 함수
          // likeBtnClick = {props.likeBtnClick} // 좋아요 처리 함수
          // LikeCountConverter={props.LikeCountConverter}
        />
        :
        ""
      }
       
    </Container>
  )
};

const Container = styled.div`
  margin-top: 20px;
  display: flex;
  width: 100%;
  height: auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background-color: white;
  user-select: none;
  padding: 20px;
  margin-bottom: 50px;

  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;
  gap : 15px;
`;

// 하나의 글
const Item = styled.div`
  position : relative;
  display : flex;
  width : 190px;
  height : 190px;
  border-radius : 12px;
  background-color : white;
  box-shadow: 1px 1px 10px 2px rgba(50,50,50,0.2);
  overflow : hidden;

  justify-content: center;
  align-items: center;
  cursor : pointer;
  transition : 0.3s;

  &:hover{
    box-shadow : 10px 10px 10px 2px rgba(50,50,50,0.5);
  }
`
const ItemImg = styled.img`
  width : 100%;
  height : 100%;
  object-fit: cover;
  object-position: center center;
`

// 하얀색 블라인드 배경
const HoveredBack = styled.div`
  position : absolute;
  width : 100%;
  height : 100%;
  background-color: rgba(255,255,255,0.3);
  z-index : 1;
`

const HoveredContainer = styled.div`
  display : flex;
  position : absolute;
  width : 90%;
  max-height : 90%; height : auto;
  z-index : 2;
  flex-direction: column;
  justify-content : center;
  align-items : flex-start;
  gap : 10px;
`
const HoveredContainer_tutor = styled.div`
  display : flex;
  width : 100%;
  height : 10px;
  padding : 5px 0px 5px 0px;
  font-size : 15px;
  font-family: "Nanum Square";
  font-style : "bold";

  justify-content: center;
`
const HoveredContainer_Content = styled.div`
  display : flex;
  width : 100%;
  max-height : calc(100% - 10px); height : auto;
  font-size : 13px;
  font-family: "Nanum Square Round";
  font-style : "normal";

  justify-content: center;
  text-align: center;
`


export default SearchResultForm;