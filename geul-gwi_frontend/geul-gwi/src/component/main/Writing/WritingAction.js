import React, { useEffect, Fragment, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 페이지 이동용 라이브러리
import { AxiosAddrContext } from 'contextStore/AxiosAddress';
import WritingComponent from 'component/main/Writing/WritingComponent';
import { useSelector } from 'react-redux';
import axios from 'axios';

const WritingAction = () => {
    const { axiosAddr } = useContext(AxiosAddrContext);
    const { userSeq, accessToken } = useSelector((state) => state.authReducer);

    const writingUrl = "/geulgwi/register/"; // 일반 글 작성 요청 주소
    const challengeWriteUrl = '/challenge/register'; // 챌린지 글 작성 요청 주소
    const challengeOngoingSeq = '/challenge/ongoing'; // 진행 중인 챌린지 정보 요청 주소

    // State
    const [FormMainText,setFormMainText] = useState(''); // 본문의 내용을 담는 State
    const [fnTags,setFnTags] = useState([]); // 최종적으로 선택된 태그를 담는 List State 
    const [urlImages,setUrlImages] = useState([]); // Url로 변환된 이미지 주소 Array
    // Object
    const navigate = useNavigate(); // React Navigate = 페이지 이동

    const [challenge, setChallenge] = useState(null);

    const [selectedTab, setSelectedTab] = useState("geulgwi");

    useEffect(() => {
        const getOngoingChallenge = async () => {
            try {
                const response = await axios.get(`${axiosAddr}${challengeOngoingSeq}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                console.log("진행 중인 회차 가져오기: ", response.data);
                setChallenge(response.data); // 진행중인 챌린지 정보 반환
            } catch (error) {
                console.error("진행 중인 회차 가져오기: ", error);
            }
        }
        getOngoingChallenge();
    }, []);


    // 받은 메시지와 보낸 메시지 메뉴 클릭 이벤트 핸들러
    const handleTabClick = (tab) => {
        setSelectedTab(tab); // 선택한 탭 설정
    }

    // Handler
    const FormMainTextHandler = (e) => {
        setFormMainText(e.target.value);
    };

    // Function
    // 하위 컴포넌트에서 이미지 리스트의 최신정보를 받기 위함
    const ReturnImageList = () => {
        return urlImages;
    }

    // 이미지 추가 - 상대 경로 저장
    const ImageAddHandler = (event) => {
        const selectedImages = event.target.files;
        // 이미지 개수 제한 3개
        let imageUrlList = Array.from(selectedImages).slice(0, 3);
        setUrlImages((prevImages) => [...prevImages, ...imageUrlList]);
    }

    // 이미지 삭제
    const ImageDeleteHandler = (idx) => {
        setUrlImages(urlImages.filter((_, index) => index !== idx));
        //console.log(idx);
    }

    // 태그 선택 후 완료 버튼 누르면 호출
    const FnTagSetHandler = (taglist) => {
        //console.log("선택한 태그 :", taglist);
        setFnTags(taglist);
    }

    // 글 귀 작성 처리
    const submitGeulgwi = async () => {
        try {
            const geulgwiRegDTO = {
                geulgwiContent: FormMainText,
                tagSeqs: fnTags.map(tag => tag.tagSeq),
            };

            const formData = new FormData();
            formData.append("geulgwiRegDTO", new Blob([JSON.stringify(geulgwiRegDTO)], { type: "application/json" }));
            
            // 사진이 존재할 때만 formData에 추가
            if (urlImages.length > 0) {
                urlImages.forEach(image => formData.append("files", image));
            }

            // FormData의 내용을 콘솔에 출력
            // formData.forEach((value, key) => {
            //     console.log(key, value);
            // });

            const response = await axios.post(`${axiosAddr}${writingUrl}${userSeq}`, formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            //console.log("글 작성 완료: ", response);
            alert("작성이 완료되었습니다.");
            navigate("/main");
        } catch (error) {
            console.error("글 작성 실패: ", error);
        }
    }

    // 챌린지 작성 처리 
    const submitChallenge = async () => {
        try {
            if (challenge.challengeAdminSeq) {
                const ChallengeRegDTO = {
                    challengeContent: FormMainText,
                    challengeAdminSeq: challenge.challengeAdminSeq,
                    userSeq: userSeq
                };
                console.log("ChallengeRegDTO", ChallengeRegDTO);
                const response = await axios.post(`${axiosAddr}${challengeWriteUrl}`, ChallengeRegDTO, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                alert("작성이 완료되었습니다.");
                navigate("/main/WritingChallenge");
                
            } else {
                console.log("진행중인 챌린지가 없습니다.");
            }
        } catch (error) {
            console.error("챌린지 작성: ", error);
            if(error.data.errorcode === 'c-001')
            {
                alert("키워드가 누락되었습니다.");
            }
        }
    }

    return (
        <Fragment>
            <WritingComponent
                FormMainTextChange={FormMainTextHandler}
                ReturnImg={ReturnImageList}
                ImageAdd={ImageAddHandler}
                ImageDelete={ImageDeleteHandler}
                FnTagSetHandler={FnTagSetHandler}
                fnTags={fnTags}
                selectedTab={selectedTab}
                handleTabClick={handleTabClick}
                submitGeulgwi={submitGeulgwi}
                submitChallenge={submitChallenge}
                challenge={challenge}
            />
        </Fragment>
    );
};

export default WritingAction;