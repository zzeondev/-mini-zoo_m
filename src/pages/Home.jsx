import styled from "@emotion/styled";
import colors from "../styles/colors";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAccessToken, getMemberWithAccessToken } from "../kko/kkoapi";
import { GoogleSvg } from "./SignForm";
import { getGoogleToken, getGoogleUserInfo } from "../google/googleapi";
import { userEmailAtom, userNameAtom } from "../atoms/userInfoAtom ";
import { useRecoilState } from "recoil";

const Header = styled.div`
  max-height: 47px;
  height: 100vw;
  background-color: #fff;
  padding: 5px 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
const HomeTop = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const TopTitle = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 30px 0;
  font-size: 16px;
  color: ${colors.gray[700]};
  line-height: 27px;
  letter-spacing: 10%;
`;

const TopButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const HomeTopButton = styled.button`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 14px 60px;
  border: none;
  border-radius: 8px;
  background-color: #8ab9ff;
  color: #fff;
  line-height: 27px;
  cursor: pointer;
`;

const MainText = styled.span`
  font-size: 16px;
`;

const SubText = styled.span`
  font-size: 13px;
`;

const TopImageWrapper = styled.div`
  max-height: 228px;
  max-width: 152px;
  display: flex;
  justify-content: center;
`;

const HomeTopImg = styled.img`
  width: 100%;
  height: 100%;
`;
const HomeBottomSection = styled.div``;

const HomeRecent = styled.div`
  display: flex;
  gap: 7px;
  margin-bottom: 16px;
  margin-left: 22px;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 10%;
  color: ${colors.gray[900]};
`;

const RecordList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  list-style: none;
  padding: 0;
`;

const RecordListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 10px;
  background-color: #fff;
  margin: 0 22px;
  border: 1px solid #bdd7ff;
  border-radius: 8px;
  cursor: pointer;
`;

const RecordInfoWrapper = styled.div`
  display: flex;
  gap: 11px;
`;
const RecordImage = styled.img`
  width: 36px;
  height: 36px;
`;
const RecordTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 3px;
`;
const RecordTextTitle = styled.span`
  font-size: 13px;
  color: ${colors.gray[700]};
  letter-spacing: 10%;
`;
const RecordTextDate = styled.span`
  font-size: 10px;
  color: ${colors.gray[500]};
  letter-spacing: 10%;
`;

const RecordSvgWrap = styled.div`
  width: 32px;
  height: 32px;
  background-color: #ffdb64;
  padding: 11px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ViewAllButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 16px auto;
`;

const ViewAllButton = styled.button`
  padding: 14px 30px;
  display: flex;
  align-items: center;
  gap: 5px;
  background-color: #fff;
  border: 1px solid #dbdbdb;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;
const ViewAllText = styled.span`
  font-size: 13px;
  letter-spacing: 10%;
  color: ${colors.gray[700]};
`;
const Footer = styled.div``;

const NavigationBar = styled.ul`
  display: flex;
  width: 100%;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NavItemFocus = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 14px 0;
  width: 25%;
  cursor: pointer;
  background-color: #bdd7ff;
  color: #579aff;
`;
const NavItem = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 14px 0;
  width: 25%;
  background-color: #fff;
  color: #a8a8a8;
  cursor: pointer;
`;

function Home() {
  //js
  const [userInfo, setUserInfo] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [searchParams] = useSearchParams();
  const authCode = searchParams.get("code");
  const provider = searchParams.get("provider") || searchParams.get("state");
  const getAccessTokenCall = async () => {
    try {
      const accesskey = await getGoogleToken(authCode);
      if (accesskey) {
        setAccessToken(accesskey.access_token);
        const googleuserinfo = await getGoogleUserInfo(accesskey.access_token);
        // console.log("구글의 사용자 정보 : ", googleuserinfo);
        setUserInfo(googleuserinfo);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // // 사용자 정보 관리
  // const [userInfo, setUserInfo] = useState(null);
  // // 카카오 인증키 알아내기
  // const [URLSearchParams, setURLSearchParams] = useSearchParams();
  // const kkoAuthCode = URLSearchParams.get("code");
  // // 카카오 인가 키를 받아서 엑세스 토큰을 요청한다.
  const getKkoAccessTokenCall = async () => {
    const accesskey = await getAccessToken(authCode);
    //   // 사용자 정보 호출
    const kkouserinfo = await getMemberWithAccessToken(accesskey);
    // console.log("카카오의 사용자 정보 : ", kkouserinfo);
    setUserInfo(kkouserinfo);
  };

  const navigate = useNavigate();

  const handleClickToday = () => {
    navigate("/today");
  };
  const handleClickDaily = () => {
    navigate("/history/daily");
  };

  const handleClickMonth = () => {
    navigate("/history/month");
  };

  // useEffect(() => {
  //   if (kkoAuthCode) {
  //     getAccessTokenCall();
  //   } else {
  //     return;
  //   }
  // }, [kkoAuthCode]);
  const [userName, setUserName] = useRecoilState(userNameAtom);
  const [userEmail, setUserEmail] = useRecoilState(userEmailAtom);
  // const userName =
  //   userInfo?.kakao_account?.profile?.nickname || userInfo?.name || "OO";
  // const userEmail =
  //   userInfo?.kakao_account?.email || userInfo?.email || "example@email.com";

  useEffect(() => {
    if (!authCode) return;

    if (provider === "google") {
      getAccessTokenCall(); // 구글만 실행
    } else if (provider === "kakao") {
      getKkoAccessTokenCall(); // 카카오만 실행
    }
  }, [authCode, provider]);
  useEffect(() => {
    if (userInfo) {
      const name =
        userInfo?.kakao_account?.profile?.nickname || userInfo?.name || "OO";

      const email =
        userInfo?.kakao_account?.email ||
        userInfo?.email ||
        "example@email.com";

      setUserName(name);
      setUserEmail(email);
    }
  }, [userInfo]);
  //jsx
  return (
    <div style={{ backgroundColor: "#F0F6FF" }}>
      <Header>
        <img src="./images/logotxt.svg" alt="logo" />
      </Header>
      <div>
        <HomeTop>
          <TopTitle>
            <span>
              {userName}
              님의 오늘 하루 어땟나요?
            </span>
            <span>오늘의 기분은 어때요?</span>
          </TopTitle>
          <TopButtonWrapper onClick={handleClickToday}>
            <HomeTopButton>
              <MainText>오늘의 순간을 기록하세요</MainText>
              <SubText>동물 친구들과 함께 감정을 기록해보세요</SubText>
            </HomeTopButton>
          </TopButtonWrapper>
          <TopImageWrapper>
            <HomeTopImg src="./images/happydog 1.png" alt="#" />
          </TopImageWrapper>
        </HomeTop>
        <HomeBottomSection>
          <HomeRecent>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M8.99984 17.3332C4.39734 17.3332 0.666504 13.6023 0.666504 8.99984C0.666504 4.39734 4.39734 0.666504 8.99984 0.666504C13.6023 0.666504 17.3332 4.39734 17.3332 8.99984C17.3332 13.6023 13.6023 17.3332 8.99984 17.3332ZM8.99984 15.6665C10.7679 15.6665 12.4636 14.9641 13.7139 13.7139C14.9641 12.4636 15.6665 10.7679 15.6665 8.99984C15.6665 7.23173 14.9641 5.53603 13.7139 4.28579C12.4636 3.03555 10.7679 2.33317 8.99984 2.33317C7.23173 2.33317 5.53603 3.03555 4.28579 4.28579C3.03555 5.53603 2.33317 7.23173 2.33317 8.99984C2.33317 10.7679 3.03555 12.4636 4.28579 13.7139C5.53603 14.9641 7.23173 15.6665 8.99984 15.6665ZM9.83317 8.99984H13.1665V10.6665H8.1665V4.83317H9.83317V8.99984Z"
                fill="#8AB9FF"
              />
            </svg>
            <span>최근 기록</span>
          </HomeRecent>
          <div>
            <RecordList>
              <RecordListItem onClick={handleClickDaily}>
                <RecordInfoWrapper>
                  <RecordImage src="./images/Untitled-1.png" alt="#" />
                  <RecordTextContainer>
                    <RecordTextTitle>행복한 하루</RecordTextTitle>
                    <RecordTextDate>12월 15일</RecordTextDate>
                  </RecordTextContainer>
                </RecordInfoWrapper>
                <RecordSvgWrap>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                  >
                    <path
                      d="M4.875 0.125C3.91082 0.125 2.96829 0.410914 2.1666 0.946586C1.36491 1.48226 0.740067 2.24363 0.371089 3.13442C0.00211226 4.02521 -0.094429 5.00541 0.093674 5.95107C0.281777 6.89672 0.746076 7.76536 1.42786 8.44715C2.10964 9.12893 2.97828 9.59323 3.92394 9.78133C4.86959 9.96943 5.84979 9.87289 6.74058 9.50391C7.63137 9.13494 8.39274 8.51009 8.92842 7.7084C9.46409 6.90671 9.75 5.96418 9.75 5C9.74864 3.70749 9.23458 2.46831 8.32064 1.55436C7.4067 0.640418 6.16751 0.126365 4.875 0.125ZM3.1875 3.5C3.29875 3.5 3.40751 3.53299 3.50001 3.5948C3.59251 3.65661 3.66461 3.74446 3.70718 3.84724C3.74976 3.95002 3.7609 4.06312 3.73919 4.17224C3.71749 4.28135 3.66392 4.38158 3.58525 4.46025C3.50658 4.53891 3.40635 4.59249 3.29724 4.61419C3.18813 4.6359 3.07503 4.62476 2.97224 4.58218C2.86946 4.53961 2.78161 4.46751 2.7198 4.37501C2.65799 4.28251 2.625 4.17375 2.625 4.0625C2.625 3.91332 2.68427 3.77024 2.78975 3.66475C2.89524 3.55926 3.03832 3.5 3.1875 3.5ZM7.07438 6.3125C6.59203 7.14641 5.79047 7.625 4.875 7.625C3.95953 7.625 3.15797 7.14687 2.67563 6.3125C2.64849 6.26982 2.63028 6.22209 2.62207 6.17218C2.61386 6.12228 2.61583 6.07123 2.62786 6.0221C2.6399 5.97298 2.66174 5.9268 2.69208 5.88634C2.72243 5.84587 2.76064 5.81197 2.80443 5.78666C2.84822 5.76135 2.89667 5.74516 2.94688 5.73906C2.99708 5.73296 3.04801 5.73708 3.09658 5.75117C3.14515 5.76526 3.19037 5.78903 3.22952 5.82105C3.26867 5.85308 3.30093 5.89269 3.32438 5.9375C3.67453 6.54266 4.22485 6.875 4.875 6.875C5.52516 6.875 6.07547 6.54219 6.42563 5.9375C6.44907 5.89269 6.48134 5.85308 6.52048 5.82105C6.55963 5.78903 6.60485 5.76526 6.65343 5.75117C6.702 5.73708 6.75292 5.73296 6.80313 5.73906C6.85333 5.74516 6.90179 5.76135 6.94558 5.78666C6.98936 5.81197 7.02758 5.84587 7.05792 5.88634C7.08826 5.9268 7.11011 5.97298 7.12214 6.0221C7.13417 6.07123 7.13615 6.12228 7.12794 6.17218C7.11973 6.22209 7.10151 6.26982 7.07438 6.3125ZM6.5625 4.625C6.45125 4.625 6.3425 4.59201 6.24999 4.5302C6.15749 4.46839 6.08539 4.38054 6.04282 4.27776C6.00025 4.17498 5.98911 4.06188 6.01081 3.95276C6.03251 3.84365 6.08609 3.74342 6.16475 3.66475C6.24342 3.58609 6.34365 3.53251 6.45276 3.51081C6.56188 3.4891 6.67498 3.50024 6.77776 3.54282C6.88054 3.58539 6.9684 3.65749 7.0302 3.74999C7.09201 3.84249 7.125 3.95125 7.125 4.0625C7.125 4.21168 7.06574 4.35476 6.96025 4.46025C6.85476 4.56574 6.71169 4.625 6.5625 4.625Z"
                      fill="white"
                    />
                  </svg>
                </RecordSvgWrap>
              </RecordListItem>
              <RecordListItem onClick={handleClickDaily}>
                <RecordInfoWrapper>
                  <RecordImage src="./images/catsky.png" alt="#" />
                  <RecordTextContainer>
                    <RecordTextTitle>슬펐던 하루</RecordTextTitle>
                    <RecordTextDate>12월 16일</RecordTextDate>
                  </RecordTextContainer>
                </RecordInfoWrapper>
                <RecordSvgWrap style={{ backgroundColor: "#6B9DFA" }}>
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.875 0.125C3.91082 0.125 2.96829 0.410914 2.1666 0.946586C1.36491 1.48226 0.740067 2.24363 0.371089 3.13442C0.00211226 4.02521 -0.094429 5.00541 0.093674 5.95107C0.281777 6.89672 0.746076 7.76536 1.42786 8.44715C2.10964 9.12893 2.97828 9.59323 3.92394 9.78133C4.86959 9.96943 5.84979 9.87289 6.74058 9.50391C7.63137 9.13494 8.39275 8.51009 8.92842 7.7084C9.46409 6.90671 9.75 5.96418 9.75 5C9.74864 3.70749 9.23458 2.46831 8.32064 1.55436C7.4067 0.640418 6.16751 0.126365 4.875 0.125ZM3.1875 3.5C3.29875 3.5 3.40751 3.53299 3.50001 3.5948C3.59251 3.65661 3.66461 3.74446 3.70718 3.84724C3.74976 3.95002 3.7609 4.06312 3.73919 4.17224C3.71749 4.28135 3.66392 4.38158 3.58525 4.46025C3.50658 4.53891 3.40635 4.59249 3.29724 4.61419C3.18813 4.6359 3.07503 4.62476 2.97224 4.58218C2.86946 4.53961 2.78161 4.46751 2.7198 4.37501C2.65799 4.28251 2.625 4.17375 2.625 4.0625C2.625 3.91332 2.68427 3.77024 2.78975 3.66475C2.89524 3.55926 3.03832 3.5 3.1875 3.5ZM6.9375 7.57438C6.85145 7.62401 6.74922 7.63748 6.65325 7.61182C6.55728 7.58615 6.47542 7.52346 6.42563 7.4375C6.07547 6.83234 5.52516 6.5 4.875 6.5C4.22485 6.5 3.67453 6.83281 3.32438 7.4375C3.30093 7.48231 3.26867 7.52192 3.22952 7.55395C3.19037 7.58597 3.14515 7.60974 3.09658 7.62383C3.04801 7.63792 2.99708 7.64204 2.94688 7.63594C2.89667 7.62984 2.84822 7.61365 2.80443 7.58834C2.76064 7.56303 2.72243 7.52913 2.69208 7.48866C2.66174 7.4482 2.6399 7.40202 2.62786 7.3529C2.61583 7.30377 2.61386 7.25272 2.62207 7.20282C2.63028 7.15291 2.64849 7.10518 2.67563 7.0625C3.15797 6.22859 3.95953 5.75 4.875 5.75C5.79047 5.75 6.59203 6.22813 7.07438 7.0625C7.12402 7.14855 7.13748 7.25078 7.11182 7.34675C7.08616 7.44272 7.02346 7.52458 6.9375 7.57438ZM6.5625 4.625C6.45125 4.625 6.3425 4.59201 6.24999 4.5302C6.15749 4.46839 6.08539 4.38054 6.04282 4.27776C6.00025 4.17498 5.98911 4.06188 6.01081 3.95276C6.03251 3.84365 6.08609 3.74342 6.16475 3.66475C6.24342 3.58609 6.34365 3.53251 6.45276 3.51081C6.56188 3.4891 6.67498 3.50024 6.77776 3.54282C6.88054 3.58539 6.9684 3.65749 7.0302 3.74999C7.09201 3.84249 7.125 3.95125 7.125 4.0625C7.125 4.21168 7.06574 4.35476 6.96025 4.46025C6.85476 4.56574 6.71169 4.625 6.5625 4.625Z"
                      fill="white"
                    />
                  </svg>
                </RecordSvgWrap>
              </RecordListItem>
              <RecordListItem onClick={handleClickDaily}>
                <RecordInfoWrapper>
                  <RecordImage src="./images/tigersky.png" alt="#" />
                  <RecordTextContainer>
                    <RecordTextTitle>화가났던 하루</RecordTextTitle>
                    <RecordTextDate>12월 17일</RecordTextDate>
                  </RecordTextContainer>
                </RecordInfoWrapper>
                <RecordSvgWrap style={{ backgroundColor: "#FA6B6B" }}>
                  <svg
                    width="9"
                    height="12"
                    viewBox="0 0 9 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.75 11C6.80875 11 8.5 9.3685 8.5 7.2745C8.5 6.7605 8.47375 6.2095 8.18875 5.353C7.90375 4.4965 7.8465 4.386 7.54525 3.857C7.4165 4.93625 6.72775 5.38625 6.55275 5.52075C6.55275 5.38075 6.13625 3.834 5.5045 2.90825C4.88425 2 4.04075 1.40425 3.54625 1C3.54625 1.7675 3.3305 2.9085 3.02125 3.49C2.71225 4.07125 2.65425 4.0925 2.268 4.525C1.88175 4.9575 1.70475 5.09125 1.38175 5.61625C1.05875 6.14125 1 6.8405 1 7.3545C1 9.4485 2.69125 11 4.75 11Z"
                      fill="white"
                      stroke="white"
                      strokeLinejoin="round"
                    />
                  </svg>
                </RecordSvgWrap>
              </RecordListItem>
            </RecordList>
          </div>
          <ViewAllButtonWrapper onClick={handleClickMonth}>
            <ViewAllButton>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
              >
                <path
                  d="M3.97816 14.8751C3.65186 14.8751 3.37962 14.766 3.16145 14.5478C2.94329 14.3296 2.83397 14.0574 2.8335 13.7311V4.68568C2.8335 4.35985 2.94282 4.08785 3.16145 3.86968C3.38009 3.65151 3.65233 3.54219 3.97816 3.54172H5.2312V2.34322C5.2312 2.23319 5.26733 2.14206 5.33958 2.06981C5.41183 1.99756 5.50273 1.96143 5.61229 1.96143C5.72184 1.96143 5.81298 1.99756 5.8857 2.06981C5.95843 2.14206 5.99455 2.23319 5.99408 2.34322V3.54172H11.0615V2.31631C11.0615 2.21525 11.0953 2.13072 11.1628 2.06272C11.2303 1.99472 11.3146 1.96096 11.4157 1.96143C11.5167 1.9619 11.6008 1.99567 11.6678 2.06272C11.7349 2.12978 11.7689 2.21407 11.7698 2.3156V3.54172H13.0229C13.3487 3.54172 13.6209 3.65104 13.8396 3.86968C14.0582 4.08832 14.1673 4.36056 14.1668 4.68639V13.7311C14.1668 14.0569 14.0577 14.3292 13.8396 14.5478C13.6214 14.7664 13.3489 14.8755 13.0222 14.8751H3.97816ZM3.97816 14.1667H13.0229C13.1315 14.1667 13.2314 14.1214 13.3225 14.0307C13.4136 13.9401 13.459 13.8399 13.4585 13.7304V7.51972H3.54183V13.7311C3.54183 13.8397 3.58716 13.9396 3.67783 14.0307C3.7685 14.1219 3.86837 14.1672 3.97745 14.1667"
                  fill="#A8A8A8"
                />
              </svg>
              <ViewAllText>모든 기록 보기</ViewAllText>
            </ViewAllButton>
          </ViewAllButtonWrapper>
        </HomeBottomSection>
      </div>
      <Footer>
        <NavigationBar>
          <NavItemFocus>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M6 19H9.692V13.923C9.692 13.6943 9.76967 13.5027 9.925 13.348C10.0797 13.1927 10.2713 13.115 10.5 13.115H13.5C13.7287 13.115 13.9207 13.1927 14.076 13.348C14.2307 13.5027 14.308 13.6943 14.308 13.923V19H18V10.308C18 10.2053 17.9777 10.112 17.933 10.028C17.8883 9.94399 17.8273 9.87066 17.75 9.80799L12.366 5.74999C12.2633 5.66066 12.1413 5.61599 12 5.61599C11.8587 5.61599 11.737 5.66066 11.635 5.74999L6.25 9.80799C6.17333 9.87199 6.11233 9.94532 6.067 10.028C6.02167 10.1107 5.99933 10.204 6 10.308V19ZM5 19V10.308C5 10.052 5.05733 9.80966 5.172 9.58099C5.28667 9.35232 5.44467 9.16399 5.646 9.01599L11.031 4.93799C11.313 4.72266 11.635 4.61499 11.997 4.61499C12.359 4.61499 12.683 4.72266 12.969 4.93799L18.354 9.01499C18.556 9.16299 18.714 9.35166 18.828 9.58099C18.9427 9.80966 19 10.052 19 10.308V19C19 19.268 18.9003 19.5017 18.701 19.701C18.5017 19.9003 18.268 20 18 20H14.116C13.8867 20 13.6947 19.9227 13.54 19.768C13.3853 19.6127 13.308 19.4207 13.308 19.192V14.116H10.692V19.192C10.692 19.4213 10.6147 19.6133 10.46 19.768C10.3053 19.9227 10.1137 20 9.885 20H6C5.732 20 5.49833 19.9003 5.299 19.701C5.09967 19.5017 5 19.268 5 19Z"
                fill="#579AFF"
              />
            </svg>
            <span>홈</span>
          </NavItemFocus>
          <NavItem to="/today">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
            >
              <path
                d="M11.75 16.5H12.75V12.5H16.75V11.5H12.75V7.5H11.75V11.5H7.75V12.5H11.75V16.5ZM12.253 21C11.0083 21 9.83833 20.764 8.743 20.292C7.64767 19.8193 6.69467 19.178 5.884 18.368C5.07333 17.558 4.43167 16.606 3.959 15.512C3.48633 14.418 3.25 13.2483 3.25 12.003C3.25 10.7577 3.48633 9.58767 3.959 8.493C4.431 7.39767 5.07133 6.44467 5.88 5.634C6.68867 4.82333 7.641 4.18167 8.737 3.709C9.833 3.23633 11.003 3 12.247 3C13.491 3 14.661 3.23633 15.757 3.709C16.8523 4.181 17.8053 4.82167 18.616 5.631C19.4267 6.44033 20.0683 7.39267 20.541 8.488C21.0137 9.58333 21.25 10.753 21.25 11.997C21.25 13.241 21.014 14.411 20.542 15.507C20.07 16.603 19.4287 17.556 18.618 18.366C17.8073 19.176 16.8553 19.8177 15.762 20.291C14.6687 20.7643 13.499 21.0007 12.253 21ZM12.25 20C14.4833 20 16.375 19.225 17.925 17.675C19.475 16.125 20.25 14.2333 20.25 12C20.25 9.76667 19.475 7.875 17.925 6.325C16.375 4.775 14.4833 4 12.25 4C10.0167 4 8.125 4.775 6.575 6.325C5.025 7.875 4.25 9.76667 4.25 12C4.25 14.2333 5.025 16.125 6.575 17.675C8.125 19.225 10.0167 20 12.25 20Z"
                fill="#A8A8A8"
              />
            </svg>
            <span>추가</span>
          </NavItem>
          <NavItem to="/history/week">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M5.616 21C5.15533 21 4.771 20.846 4.463 20.538C4.155 20.23 4.00067 19.8457 4 19.385V6.61505C4 6.15505 4.15433 5.77105 4.463 5.46305C4.77167 5.15505 5.156 5.00072 5.616 5.00005H7.385V3.30805C7.385 3.15272 7.436 3.02405 7.538 2.92205C7.64 2.82005 7.76833 2.76905 7.923 2.76905C8.07767 2.76905 8.20633 2.82005 8.309 2.92205C8.41167 3.02405 8.46267 3.15272 8.462 3.30805V5.00005H15.616V3.27005C15.616 3.12738 15.6637 3.00805 15.759 2.91205C15.8543 2.81605 15.9733 2.76838 16.116 2.76905C16.2587 2.76972 16.3773 2.81738 16.472 2.91205C16.5667 3.00672 16.6147 3.12572 16.616 3.26905V5.00005H18.385C18.845 5.00005 19.2293 5.15438 19.538 5.46305C19.8467 5.77172 20.0007 6.15605 20 6.61605V19.385C20 19.845 19.846 20.2294 19.538 20.538C19.23 20.8467 18.8453 21.0007 18.384 21H5.616ZM5.616 20H18.385C18.5383 20 18.6793 19.9361 18.808 19.8081C18.9367 19.6801 19.0007 19.5387 19 19.3841V10.616H5V19.385C5 19.5384 5.064 19.6794 5.192 19.8081C5.32 19.9367 5.461 20.0007 5.615 20"
                fill="#A8A8A8"
              />
            </svg>
            <span>히스토리</span>
          </NavItem>
          <NavItem to="/profile">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="27"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
            >
              <path
                d="M13.5833 12.3339C12.6892 12.3339 11.924 12.0154 11.2877 11.3784C10.6515 10.7414 10.3333 9.97657 10.3333 9.08391C10.3333 8.19124 10.6515 7.42569 11.2877 6.78724C11.924 6.1488 12.6892 5.83138 13.5833 5.83499C14.4774 5.8386 15.2426 6.15638 15.8789 6.78832C16.5152 7.42027 16.8333 8.18582 16.8333 9.08499C16.8333 9.98416 16.5152 10.749 15.8789 11.3795C15.2426 12.01 14.4774 12.3274 13.5833 12.3339ZM6 20.1675V18.3843C6 17.9264 6.13253 17.5054 6.39758 17.1212C6.66264 16.7369 7.01075 16.4372 7.44192 16.222C8.41403 15.7641 9.41431 15.4044 10.4427 15.143C11.4712 14.8815 12.5195 14.7512 13.5877 14.7519C14.6558 14.7526 15.7027 14.883 16.7282 15.143C17.7538 15.4044 18.7526 15.7641 19.7247 16.222C20.1559 16.4372 20.504 16.7369 20.7691 17.1212C21.0341 17.5054 21.1667 17.9261 21.1667 18.3832V20.1664L6 20.1675ZM7.08333 19.0842H20.0833V18.3843C20.0833 18.1164 20.0003 17.8806 19.8342 17.6769C19.6666 17.4725 19.4579 17.3042 19.208 17.1721C18.3291 16.7308 17.418 16.3975 16.4747 16.1722C15.5322 15.9475 14.5684 15.8352 13.5833 15.8352C12.5982 15.8352 11.6341 15.9475 10.6908 16.1722C9.74761 16.3968 8.83689 16.7301 7.95867 17.1721C7.70878 17.3042 7.50042 17.4725 7.33358 17.6769C7.16675 17.8806 7.08333 18.1164 7.08333 18.3843V19.0842ZM13.5833 11.2517C14.1792 11.2517 14.6894 11.0393 15.1141 10.6147C15.5387 10.19 15.7507 9.67938 15.75 9.08282C15.7493 8.48627 15.5373 7.97638 15.1141 7.55316C14.6909 7.12994 14.1806 6.9176 13.5833 6.91616C12.9861 6.91471 12.4762 7.12705 12.0537 7.55316C11.6312 7.97927 11.4188 8.48916 11.4167 9.08282C11.4145 9.67649 11.6268 10.1867 12.0537 10.6136C12.4805 11.0404 12.9904 11.2524 13.5833 11.2495"
                fill="#A8A8A8"
              />
            </svg>
            <span>프로필</span>
          </NavItem>
        </NavigationBar>
      </Footer>
    </div>
  );
}

export default Home;
