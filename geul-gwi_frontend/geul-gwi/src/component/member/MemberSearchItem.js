import React, { useEffect, useContext, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { AxiosAddrContext } from 'contextStore/AxiosAddress';
import { useSelector } from 'react-redux'; 
import imageDataFetcher from 'service/imageDataFetcher';

const MemberSearchItem = (props) => {
    const navigate = useNavigate();
    const axiosAddr = useContext(AxiosAddrContext).axiosAddr;
    const userSeq = useSelector((state) => state.authReducer.userSeq);
    const userToken = useSelector((state) => state.authReducer.accessToken);
    const [isPending, setIsPending] = useState(false);

    const [profile, setProfile] = useState();

    const friendRequestUrl = '/friend/confirm'; // 친구 요청 주소
    const friendStatusUrl = '/friend/status'; // 친구 상태 요청 주소

    const [friendStatus, setFriendStatus] = useState(null);

    useEffect(() => {
        imageDataFetcher(axiosAddr, props.member.profile)
            .then(imageUrl => {
                setProfile(imageUrl);
            })
            .catch(error => {
                console.error(`${props.member.nickname} 프로필 이미지 가져오기에 실패했습니다.`, error);
            });
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const status = await CheckFriendStatus();
            setFriendStatus(status);
        };
        fetchData();
    }, [props.member]);

    // 친구 상태인지 체크하는 함수
    const CheckFriendStatus = async () => {
        try {
            const friendDTO = {
                'toUser': props.member.userSeq, // 확인하고 싶은 사람
                'fromUser': userSeq, // 나
            };
            //console.log(`관계 확인 : `, friendDTO);
            const response = await Axios.post(`${axiosAddr}${friendStatusUrl}`, friendDTO, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            });

            return response.data;

        } catch (error) {
            console.error('친구 상태 확인 실패 : ', error);
        }
    };

    // 프로필 클릭 => 해당 유저의 프로필로 이동한다.
    const onClickProfile = () => {
        navigate('/main/Profile', { state: { profileUserSeq: props.member.userSeq } });
        props.handleMemberClick(); // 닫기
    };

    // 친구 요청 
    const onFriendRequestAccept = async () => {
        // 이미 친구 상태인지 확인한다.
        if (friendStatus === 'friend') {
            alert("이미 친구 상태입니다.");
            return;
        }
        try {
            const friendDTO = {
                'toUser': props.member.userSeq, // 나에게 요청 보낸 사람
                'fromUser': userSeq, // 나
            };
            const response = await Axios.post(`${axiosAddr}${friendRequestUrl}`, friendDTO, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            });
            setIsPending(true); // 요청 버튼 비활성화
            alert(`${props.member.nickname}님에게 친구 요청을 보냈습니다.`);
           
        } catch (error) {
            setIsPending(false); // 요청 버튼 활성화
            console.error('친구 요청 실패 : ', error);
            alert(`${props.member.nickname}님에게 친구 요청을 실패했습니다.\n다시 시도해주세요.`);
        }
    };

    return (
        <Frame>
            <ProfileImage
                src={profile || '/img/defaultProfile.png'}
                onClick={onClickProfile}
            />
            <Content>{props.member.nickname}</Content>
            <ProfileContainer>
                {friendStatus !== 'friend' && <Button onClick={onFriendRequestAccept} disabled={isPending}>
                    {isPending ? '승인 대기' : '친구 요청'}
                </Button>}
            </ProfileContainer>
        </Frame>
    );
};

const Frame = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: auto;
    background-color: white;
    transition: background-color 0.2s;
    font-size: 15px;
    padding: 5px;
    cursor: pointer;
`;

const TopRow = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 4px;
`;

const ProfileImage = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid #ccc;
    margin-right: 10px;
    margin-left: 10px;
    cursor: pointer;
    object-fit: cover;

    &:hover {
        transform: scale(1.1);
        transition: transform 0.2s ease-in-out;
    }
`;

const ProfileContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    flex: 7;
    position: relative;
`;


const Content = styled.div`
    color: #333;
    margin-bottom: 4px;
`;

const Button = styled.button`
    position: absolute;
    right: 40px;
    background-color: "#3498db";
    color: "white"; 
    border: none;
    padding: 7px 10px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 12px;
    transition: background-color 0.3s, color 0.3s;
    
    :hover{
        background-color: rgb(230, 230, 230);
    }
`;



export default MemberSearchItem;