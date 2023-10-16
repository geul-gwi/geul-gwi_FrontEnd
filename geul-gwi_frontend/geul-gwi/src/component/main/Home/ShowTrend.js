import React from 'react';
import styled from 'styled-components';

let TagList = []
TagList.push({"tagname" : "웜무드", "search" : 2023, "postCount" : 128})
TagList.push({"tagname" : "새벽워킹", "search" : 11629, "postCount" : 1129})
TagList.push({"tagname" : "운동 동기부여", "search" : 1722, "postCount" : 298})
TagList.push({"tagname" : "불타올라", "search" : 891, "postCount" : 129})
TagList.push({"tagname" : "심신안정", "search" : 4110, "postCount" : 516})
TagList.push({"tagname" : "연인사랑", "search" : 8929, "postCount" : 832})

const ShowTrend = () => {
    return (
        <TrendFrame>
            {/* 타이틀 이름 */}
            <TitleName>태그 트렌드</TitleName>
            
            {/* Item관리 Container (flex) */}
            <ItemManager>
                {
                    TagList.map((element,idx) => (
                        <Item>
                            <ItemTagName>{"#"+element.tagname}</ItemTagName>
                            <ItemDataContainer>
                                <ItemData>{element.search+" 검색"}</ItemData>
                                <ItemData>{element.postCount+"개의 글"}</ItemData>
                            </ItemDataContainer>
                        </Item>
                    ))
                }
            </ItemManager>

        </TrendFrame>
    );
};

const TrendFrame = styled.div`
    display : flex;
    width : 100%;
    min-height : 500px;
    height : auto;
    background-color: white;
<<<<<<< HEAD
    border-radius : 16px;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;

    box-shadow: 0px 0px 32px 0px #FF9989;
    transition : 0.5s;
    opacity : 0.85;
=======
    opacity : 0.85;
    border-radius : 16px;

    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    box-shadow: 0px 0px 32px 0px #FF9989;
    transition : 0.5s;
>>>>>>> 5dda5c908a35d94689ed2c5ba26832d7a69f59ce
    &:hover { 
        opacity: 1;
    }
`

const TitleName = styled.div`
    display : flex;
    width : 100%;
    height : 50px;
    
    justify-content : center;
    align-items : center;

    font-family: "Nanum Square" ;
    font-style: "bold";
    font-size : 18px;
    color : #3AEEC3;
`

const ItemManager = styled.div`
    width: 80%;
    min-height : calc(100% - 70px);
    height : auto;
`

const Item = styled.div`
    display : flex;
    width : 100%;
    height : 50px;

    flex-direction: column;
    justify-content : space-evenly;
    align-items: flex-start;

    margin : 0px 0px 5px 0px;
`
const ItemTagName = styled.div`
    width : 100%;
    height : 20px;
    font-size : 16px;
    color : #404040;
`
const ItemDataContainer = styled.div`
    display : flex;
    width : 100%;
    min-height : 10px;
    height : auto;
`
const ItemData = styled.div`
    width : 35%;
    height : 20px;
    font-size : 12px;
    color : #8E8B8B;
`

export default ShowTrend;