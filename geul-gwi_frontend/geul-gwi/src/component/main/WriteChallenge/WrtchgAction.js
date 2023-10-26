import React, { Fragment, useEffect, useState } from 'react';

// Import Component
import WrtchgComponent from 'component/main/WriteChallenge/WrtchgComponent';

const WrtchgAction = () => {
    const listUrl = '/challenge/admin/{challengeSeq}'; // 챌린지 목록 요청
    const [challenges, setChallenges] = useState([]); // 챌린지 목록
    // Challenge list State => 임시로 데이터를 넣어놓음
    const [challengeList, setChallengeList] = useState([
        {"challengeName" : "제 1회 챌린지","challengeState" : "inActive" , "desc":"이번주제는 의지와 열정입니다 \n 작가님들의 의지를 잘 표현하여 모두에게 힘이되는 말을 해주세요!", "startDay" : "2023.03.02"},
        {"challengeName" : "제 2회 챌린지","challengeState" : "inActive", "desc" : "제 2회 챌린지 desc", "startDay" : "2023.05.01"},
        {"challengeName" : "제 3회 챌린지","challengeState" : "active", "desc" : "요즘 사회가 많이 삭막해져 가고 있습니다 \n 정겨웠던 옛날을 생각하며 따뜻한 정을 같이 공유해봅시다 :)", "startDay":"2023.08.01"}
    ]);
    // Challenge의 글 List State => 해당 챌린지의 글들을 담아놓습니다.
    const [challengePosts, setChallengePosts] = useState([
        {"postNumber" : 12021, "postUser" : "한작가", "mainText" : "한 번 사는 인생이다, 남에게 휘물리지 말며 원하는 것을 마음껏 이루어라.", "likeCount" : 12400 , "isLikeClicked" : false},
        {"postNumber" : 12022, "postUser" : "안작가", "mainText" : "사람들 정말 열심히 살잖아요, 잠까지 줄여가며, 그렇다고 너무 조급해하지 말아요. 당신은 꾸준히 나아가고 있으니까", "likeCount" : 3260 , "isLikeClicked" : false},
        {"postNumber" : 12023, "postUser" : "박작가", "mainText" : "가끔 혹은 자주 마음이 진정되지 않을 때는 어디한 곳을 바라봅니다. 저는 하늘을 바라보고 있으면 진정되더라구요", "likeCount" : 9274 , "isLikeClicked" : false},
        {"postNumber" : 12024, "postUser" : "김작가", "mainText" : "이상한 글 올리지 마요, 당신만 이상해져요", "likeCount" : 112345 , "isLikeClicked" : false},
        {"postNumber" : 12025, "postUser" : "허망", "mainText" : "허망해요, 정말너무 허망해요, 이렇게 살다가 삶이 끝났을 때 무슨 의미가 남을까 싶어요.. 여러분도 그런생각하나요? 우린 같은 생각을 하네요, 그만그만그만그만그만그만그마아아아아", "likeCount" : 99999 , "isLikeClicked" : false},
        {"postNumber" : 12026, "postUser" : "허망한작가", "mainText" : "이상한 글 올리지 마요, 당신만 이상해져요", "likeCount" : 70229, "isLikeClicked" : false}
    ])
    // 선택된 Challenge
    const [selectedIndex, setSeletedIndex] = useState(0);
    const [selectedChallenge,setSelectedChallenge] = useState([]);
    // ModelState
    const [ModalState, setModalState] = useState(false);
    const [ModalData, setModalData] = useState(null);
    


    // Index값이 바뀌면 Challenge를 재할당 해준다 + 맨 처음(초기화) 에도 호출이 됨
    useEffect(() =>{
        setSelectedChallenge(challengeList[selectedIndex]);
    }, [selectedIndex]);



    // Function --------------------------------------------------
    // 이전 버튼
    const PrevButtonClick = () => {
        if (selectedIndex > 0){
            setSeletedIndex(selectedIndex => selectedIndex - 1);
        }

    }
    // 다음 버튼
    const NextButtonClick = () => {
        if (selectedIndex < (challengeList.length-1)){
            setSeletedIndex(selectedIndex => selectedIndex + 1);
        }
    }
    // 백엔드와의 추가적인 작업 요망
    const LikeButtonClick = (postNumber) => {
        // !!! 추가 작업 !!!
        // 좋아요 버튼 State에 따라 , 좋아요 취소 / 좋아요 클릭 됨  => 백엔드에게 전달하기
        const index = challengePosts.indexOf(challengePosts.find((post) => post.postNumber === postNumber));

        setChallengePosts((prevPosts) => {
            // 해당 인덱스의 post 객체를 복사합니다.
            const updatedPost = { ...prevPosts[index] };

            // isLikeClicked 값을 토글합니다.
            updatedPost.isLikeClicked = !updatedPost.isLikeClicked;
        
            // 상태를 업데이트한 후, 해당 인덱스를 포함한 나머지 post 객체는 이전 상태를 그대로 사용합니다.
            const updatedPosts = [...prevPosts];
            updatedPosts[index] = updatedPost;
        
            return updatedPosts;
          });
    }

    // 모달창을 띄우는 함수
    const ModalOpen = (element) => {
        setModalState(true);
        setModalData(element);
    }
    // 모달창을 닫는 함수
    const ModalClosed = () => {
        setModalState(false);
    }

    // LikeCount를 1000단위로 k로 표시함
    const LikeCountConverter = (number) => {
        if (number >= 1000){
            const convertedNumber = (number/1000).toFixed(1);
            return `${convertedNumber}k`;
        }
        else{
            return number.toString();
        }
    }


    return (
        <Fragment>
            <WrtchgComponent 
            prevButtonClick={PrevButtonClick}
            nextButtonClick={NextButtonClick}

            challengeList = {challengeList}
            selectedChallenge = {selectedChallenge}
            
            postList = {challengePosts}
            likeBtnClick = {LikeButtonClick}

            ModalOpen = {ModalOpen}     // 모달을 여는 함수
            ModalClosed = {ModalClosed} // 모달 닫는 함수
            ModalState = {ModalState}   // 모달의 현재 상태를 알리는 State 변수
            ModalData = {ModalData}     // 모달이 열릴 때, 전달할 Object State 함수
            
            LikeCountConverter={LikeCountConverter}
            />
        </Fragment>
    );
};

export default WrtchgAction;