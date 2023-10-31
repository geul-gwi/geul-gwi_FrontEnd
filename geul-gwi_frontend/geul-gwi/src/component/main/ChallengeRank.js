import React from 'react';
import styled from 'styled-components';

let TagList = []
TagList.push({ "tagname": "쁨벙이", "search": 2023, "postCount": 128 })
TagList.push({ "tagname": "맛탕이", "search": 11629, "postCount": 1129 })
TagList.push({ "tagname": "박연어", "search": 1722, "postCount": 298 })

// 챌린지 랭크 보여주는 폼
const ChallengeRank = () => {
    return (
        <TrendFrame>
            <Title>챌린지 랭킹</Title>
            <ItemManager>
                { TagList && TagList.map((element, idx) => (
                        <Item>
                        <ItemTagName>{idx + 1 + "등 " + element.tagname}</ItemTagName>
                            <ItemDataContainer>
                                <ItemData>좋아요 238개</ItemData>
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
    min-height : 230px;
    height : auto;
    background-color: white;
    border-radius : 8px;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    box-shadow: 0px 0px 32px 0px #FF9989;

    user-select: none;
`

const Title = styled.div`
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

export default ChallengeRank;