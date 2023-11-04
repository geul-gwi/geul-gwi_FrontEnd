import styled from 'styled-components';
import React, { useEffect, useContext, useState } from 'react';
import Axios from 'axios';
import { AxiosAddrContext } from 'contextStore/AxiosAddress';
import { useSelector } from 'react-redux';
import { Tag } from 'component/common/button/Tag';

const ShowTrend = () => {
    const axiosAddr = useContext(AxiosAddrContext).axiosAddr;
    const userToken = useSelector((state) => state.authReducer.accessToken);

    const tagTrandUrl = '/geulgwi/tagTrend';
    const [datas, setDatas] = useState([]); 

    useEffect(() => {
        const fetchChallenges = async () => {
            try {
                const response = await Axios.get(`${axiosAddr}${tagTrandUrl}`, {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    }
                });

                if (response) {
                    //console.log("태그 트렌드: ", response.data);
                    setDatas(response.data);
                }
            } catch (error) {
                console.error('인기 태그:', error);
                if (error.response.errorCode === 'A-001' 
                    || error.response.errorCode === 'A-002')
                {
                    alert("세션이 만료되었습니다. 로그인을 다시 시도해주세요.");
                }
            }
        };

        fetchChallenges();
    }, []);
    
    return (
        <TrendFrame>
            <TitleName>인기 태그</TitleName>
            <ItemManager>
                {datas && datas.map((tag, idx) => (
                        <Item>
                            <ItemDataContainer>
                                <Tag
                                    key={idx}
                                    fontColor={tag.fontColor}
                                    backColor={tag.backColor}
                                >
                                    {"#" + tag.value}
                                </Tag>
                                <ItemData>{tag.count + "개의 글"}</ItemData>
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
    min-height: 400px;
    height: auto;
    background-color: white;
    border-radius: 16px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 0px 16px 0px #ccebb5;
`;

const TitleName = styled.div`
    padding: 10px 5px 10px 5px;
    display: flex;
    width: 100%;
    height: 50px;
    justify-content: center;
    align-items: center;
    font-family: "Nanum Square";
    font-size: 18px;
    color: #FFAA5C;
`;

const ItemManager = styled.div`
    width: 60%;
    min-height: calc(100% - 70px);
    height: auto;
`;

const Item = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    margin: 0px 0px 20px 0px;
    background-color: #ffffff;
    padding: 5px;
    border-radius: 12px;
`;

const ItemDataContainer = styled.div`
    display: flex;
    width: 90%;
    height: auto;
    justify-content: space-between; 
    align-items: center;
`;

const ItemData = styled.div`
    font-size: 13px;
    color: #8E8B8B;
`;

export default ShowTrend;