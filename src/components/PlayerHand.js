import React from 'react';
import Card from './Card.js';
import styled from 'styled-components';

const StyledPlayerHand = styled.div`
  position: relative;
  margin: 0 auto;
  border-radius: 10px;
  height: 93%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 350px;
  background-color: rgba(13, 46, 23, 0.7);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3), inset 0 0 20px rgba(0, 0, 0, 0.2);
  padding: 10px 15px;
  backdrop-filter: blur(4px);
  border: 2px solid rgba(156, 136, 55, 0.4);
  
  /* Card arrangement for better visual effect */
  & > div {
    transition: transform 0.2s ease-in-out;
    margin: 0 -10px;
    
    &:hover {
      transform: translateY(-15px) scale(1.05);
      z-index: 10;
    }
  }
  
  /* Subtle glow/lighting effect */
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 40%;
    background: linear-gradient(to bottom, 
      rgba(255, 255, 255, 0.1) 0%, 
      rgba(255, 255, 255, 0) 100%);
    border-radius: 10px 10px 0 0;
    pointer-events: none;
  }
  
  /* Empty state styling */
  &:empty {
    &:before {
      content: 'Waiting for cards...';
      color: rgba(255, 255, 255, 0.5);
      font-family: 'Contrail One', sans-serif;
      font-style: italic;
    }
  }
`;

const CardContainer = styled.div`
  position: relative;
  perspective: 1000px;
  
  /* Card appearance delay for animation effect */
  animation: dealCard 0.5s ease-out forwards;
  animation-delay: ${props => props.index * 0.1}s;
  opacity: 0;
  transform: translateY(20px);
  
  @keyframes dealCard {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const PlayerHand = ({ hand = [] }) => {
  return (
    <StyledPlayerHand>
      {hand && hand.length > 0 ? (
        hand.map((card, index) => (
          <CardContainer key={`player${card.displayName}`} index={index}>
            <Card
              width={120}
              shown
              card={card}
              location="player"
            />
          </CardContainer>
        ))
      ) : null}
    </StyledPlayerHand>
  );
};

export default PlayerHand;