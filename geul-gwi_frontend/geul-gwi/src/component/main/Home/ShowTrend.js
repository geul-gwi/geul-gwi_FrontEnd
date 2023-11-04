import React from 'react';
import styled from 'styled-components';
import { Tag } from 'component/common/button/Tag';

let tags = []
tags.push({ "value": "웜무드", "search": 2023, "postCount": 128 })
tags.push({ "value": "새벽워킹", "search": 11629, "postCount": 1129 })
tags.push({ "value": "운동 동기부여", "search": 1722, "postCount": 298 })
tags.push({ "value": "불타올라", "search": 891, "postCount": 129 })
tags.push({ "value": "심신안정", "search": 4110, "postCount": 516 })
tags.push({ "value": "연인사랑", "search": 8929, "postCount": 832 })

const ShowTrend = () => {
    return (
        <TrendFrame>
            <TitleName>태그 트렌드</TitleName>
            <ItemManager>
                {tags && tags.map((tag, idx) => (
                        <Item>
                        <Rank>{idx + 1 + "위"}</Rank>
                            <ItemDataContainer>
                                <Tag
                                    fontColor={'white'}
                                    backColor={'yellow'}
                                >
                                    {"#" + tag.value}
                                </Tag>
                                <ItemData>{tag.postCount + "개의 글"}</ItemData>
                            </ItemDataContainer>
                        </Item>
                ))}
            </ItemManager>
        </TrendFrame>
    );
};

const TrendFrame = styled.div`
    display: flex;
    width: 100%;
    min-height: 500px;
    height: auto;
    background-color: #FAFAFA;
    border-radius: 16px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
`;

const TitleName = styled.div`
    display: flex;
    width: 100%;
    height: 50px;
    justify-content: center;
    align-items: center;
    font-family: "Nanum Square";
    font-weight: bold;
    font-size: 18px;
    color: #3AEEC3;
    text-transform: uppercase;
`;

const ItemManager = styled.div`
    width: 80%;
    min-height: calc(100% - 70px);
    height: auto;
`;

const Item = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    margin: 0px 0px 20px 0px;
    background-color: #f5f5f5;
    padding: 10px;
    border-radius: 12px;
`;

const ItemDataContainer = styled.div`
    display: flex;
    width: 100%;
    height: auto;
    justify-content: space-between; 
    align-items: center;
`;

const ItemData = styled.div`
    font-size: 13px;
    color: #8E8B8B;
    text-align: right;
`;

const Rank = styled.div`
    width: 35%;
    height: 20px;
    font-size: 14px;
    color: #3AEEC3;
    font-weight: bold;
    text-transform: uppercase;
`;

export default ShowTrend;