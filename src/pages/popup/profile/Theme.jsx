import styled from "@emotion/styled";
import colors from "../../../styles/colors";
import "../../../css/radio.css";

// const AlertPopUp = styled.div`
//   display: flex;
//   position: fixed;
//   z-index: 99999;
//   width: 394px;
//   height: 100%;
//   justify-content: center;
//   align-items: center;
//   background-color: rgba(0, 0, 0, 0.6);
// `;
const AlertPopUpBox = styled.div`
  width: 286px;
  height: auto;
  background-color: ${colors.white};
  border-radius: 16px;
  padding: 20px 20px 10px 20px;
`;

const Title = styled.p`
  font-size: 16px;
  font-weight: 700;
  padding-bottom: 17px;
`;

const ModeText = styled.p`
  font-size: 16px;
`;

const EXText = styled.p`
  font-size: 10px;
  font-weight: 400;
  color: ${colors.gray[500]};
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  padding: 10px;
`;

const ButtonWrap = styled.div`
  display: flex;
  width: 203px;
  height: 21px;
  justify-content: center;
  align-items: center;
`;

const ButtonOK = styled.button`
  border: none;
  background: none;
  color: ${colors.blue[500]};
  text-align: center;
  font-size: 16px;
  cursor: pointer;
  width: 101px;
`;
const ButtonCC = styled.button`
  border: none;
  background: none;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
  width: 101px;
`;

const Span = styled.span`
  width: 1px;
  height: 21px;
  background: ${colors.gray[400]};
`;
const ThemeRadioLabel = styled.label`
  display: flex;
  gap: 10px;
  align-items: center;
  cursor: pointer;
`;
const ThemeRadioWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: 20px;
`;

function Theme({ onClose }) {
  return (
    <>
      {/* <AlertPopUp> */}
      <AlertPopUpBox>
        <Title>테마설정</Title>
        <ThemeRadioWrap>
          <ThemeRadioLabel htmlFor="light">
            <input
              type="radio"
              id="light"
              value="light"
              name="theme"
              className="custom-radio"
            />
            <div>
              <ModeText>라이트 모드</ModeText>
              <EXText>밝고 산뜻한 기본 테마</EXText>
            </div>
          </ThemeRadioLabel>

          <ThemeRadioLabel htmlFor="dark">
            <input
              type="radio"
              id="dark"
              value="dark"
              name="theme"
              className="custom-radio"
            />
            <div>
              <ModeText>다크 모드</ModeText>
              <EXText>눈이 편안한 어두운 테마</EXText>
            </div>
          </ThemeRadioLabel>
          <ThemeRadioLabel htmlFor="system">
            <input
              type="radio"
              id="system"
              value="system"
              name="theme"
              className="custom-radio"
            />
            <div>
              <ModeText>시스템 설정 따름</ModeText>
              <EXText>현재 기기의 설정에 따른 테마</EXText>
            </div>
          </ThemeRadioLabel>
        </ThemeRadioWrap>
        <ButtonContainer>
          <ButtonWrap>
            <ButtonOK onClick={onClose}>확인</ButtonOK>
            <Span />
            <ButtonCC onClick={onClose}>취소</ButtonCC>
          </ButtonWrap>
        </ButtonContainer>
      </AlertPopUpBox>
    </>
    // </AlertPopUp>
  );
}

export default Theme;
