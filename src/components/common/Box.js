import styled from "styled-components";
import { COLORS } from "../../utils/theme";
import { SmallButton } from "../common/Button";
import { StyledText } from "../common/Text";
import { TwoButtonContainer } from "../common/Container";

const ItemBoxContainer = styled.div`
  display: flex;
  width: calc(100% - 40px);
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border: 1px solid ${COLORS.green};
  border-radius: 5px;
  background-color: ${COLORS.black};
`;

const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemField = styled.div`
  margin-bottom: 10px;
`;

const ItemBox = ({ item, itemDetails, itemActions }) => {
    return (
      <ItemBoxContainer>
        <ItemDetails>
          {itemDetails.map((detail, index) => (
            <ItemField key={index}>
              <StyledText content={detail.content} fontSize={detail.fontSize} weight={detail.weight} />
            </ItemField>
          ))}
        </ItemDetails>
        <TwoButtonContainer>
          {itemActions.map((action, index) => (
            <SmallButton
              key={index}
              content={action.content}
              onClick={() => action.onClick(item)}
            />
          ))}
        </TwoButtonContainer>
      </ItemBoxContainer>
    );
  };
export  { ItemBox };