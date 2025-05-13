import React from 'react';
import CardBack from '../assets/images/cardback.jpg';
import styled, { keyframes } from 'styled-components';

// Card flip animation
const flipAnimation = keyframes`
  0% {
    transform: rotateY(180deg);
  }
  100% {
    transform: rotateY(0deg);
  }
`;

// Card highlight animation
const pulseHighlight = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(77, 182, 255, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(77, 182, 255, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(77, 182, 255, 0);
  }
`;

const StyledCard = styled.div`
  width: ${props => props.width}px;
  height: ${props => props.width * 1.4}px;
  position: relative;
  transition: all 0.3s ease;
  perspective: 1000px;
  transform-style: preserve-3d;
  border-radius: 10px;
  margin: 8px;
  
  /* Add subtle shadow for depth */
  box-shadow: ${props => 
    props.card.highlight 
      ? '0 0 15px rgba(77, 182, 255, 0.8), 0 5px 15px rgba(0, 0, 0, 0.3)' 
      : '0 5px 15px rgba(0, 0, 0, 0.3)'};
  
  /* Apply highlight animation when the card is highlighted */
  animation: ${props => props.card.highlight ? pulseHighlight : 'none'} 2s infinite;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => 
      props.card.highlight 
        ? '0 0 20px rgba(77, 182, 255, 0.9), 0 8px 20px rgba(0, 0, 0, 0.4)' 
        : '0 8px 20px rgba(0, 0, 0, 0.4)'};
  }
`;

const CardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  animation: ${flipAnimation} 0.6s ease-out;
  
  /* Card Front Face */
  background-color: ${props => props.highlighted ? '#e6f7ff' : 'white'};
  border: 1px solid #e1e1e1;
  
  /* Card Corner Radius */
  
  }
`;

const CardBackFace = styled(CardFace)`
  background-color: #215493;
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  
  &::after {
    content: '';
    position: absolute;
    width: calc(100% - 16px);
    height: calc(100% - 16px);
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    box-sizing: border-box;
  }
`;

const CardHeader = styled.div`
  padding: 5px 0 0 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const CardFooter = styled.div`
  padding: 0 10px 5px 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  transform: rotate(180deg);
`;

const CardTitle = styled.div`
  font-family: 'Pokerface', serif;
  font-size: ${props => props.width * 0.25}px;
  font-weight: bold;
  color: ${props => props.color};
  line-height: 1;
  text-shadow: ${props => props.color === 'black' ? 'none' : '0px 0px 1px rgba(0, 0, 0, 0.2)'};
`;

const CardSuit = styled.div`
  font-size: ${props => props.width * 0.22}px;
  line-height: 1;
`;

const CardCenter = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${props => props.width * 0.7}px;
  padding: 5px;
  color: ${props => props.color};
  text-shadow: ${props => props.color === 'black' ? 'none' : '0px 0px 1px rgba(0, 0, 0, 0.2)'};
`;

const Card = ({ shown = false, card, width = 100, location }) => {
  // Default to a blank card if no card object is provided
  if (!card) {
    return (
      <StyledCard width={width} card={{}}>
        <CardBack backImage={CardBack} />
      </StyledCard>
    );
  }

  const { color = 'black', short = '', suitEmoji = '', highlight = false } = card;

  // Render card back if not shown
  if (!shown) {
    return (
      <StyledCard width={width} card={card}>
        <CardBackFace>
          <img src={CardBack} alt="Card Back" width="100%" height="100%" />
        </CardBackFace>
      </StyledCard>
    );
  }

  return (
    <StyledCard width={width} card={card}>
      <CardFace highlighted={highlight}>
        <CardHeader>
          <CardTitle color={color} width={width}>
            {short}
          </CardTitle>
          <CardSuit width={width}>
            {suitEmoji}
          </CardSuit>
        </CardHeader>

        <CardCenter color={color} width={width}>
          {suitEmoji}
        </CardCenter>

        <CardFooter>
          <CardTitle color={color} width={width}>
            {short}
          </CardTitle>
          <CardSuit width={width}>
            {suitEmoji}
          </CardSuit>
        </CardFooter>
      </CardFace>
    </StyledCard>
  );
};

export default Card;