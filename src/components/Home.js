import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled, { keyframes } from "styled-components";

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(2deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

// Styled Components
const PageBackground = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background: linear-gradient(135deg, #0a0a0a 0%, #111111 100%);
  position: relative;
  overflow: hidden;
  opacity: ${props => props.visible ? 1 : 0};
  transition: opacity 0.8s ease-in-out;
`;

const CardSymbol = styled.div`
  position: absolute;
  font-size: ${props => props.size || "60px"};
  color: ${props => props.color || "rgba(173, 255, 47, 0.08)"};
  animation: ${float} 6s ease-in-out infinite;
  animation-delay: ${props => props.delay || "0s"};
  z-index: 1;
  
  &:nth-child(odd) {
    animation-duration: 8s;
  }
  
  top: ${props => props.top || "auto"};
  left: ${props => props.left || "auto"};
  right: ${props => props.right || "auto"};
  bottom: ${props => props.bottom || "auto"};
`;

const CardContainer = styled.div`
  position: relative;
  max-width: 450px;
  width: 100%;
  z-index: 2;
  animation: ${fadeIn} 0.8s ease-out forwards;
`;

const CardDecoration = styled.div`
  position: absolute;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(173, 255, 47, 0.15);
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  
  &.top-left {
    top: -40px;
    left: -20px;
    transform: rotate(-15deg);
  }
  
  &.bottom-right {
    bottom: -40px;
    right: -20px;
    transform: rotate(15deg);
  }
`;

const CardSuit = styled.div`
  font-size: 3rem;
  color: ${props => props.color};
  font-weight: bold;
`;

const MainCard = styled.div`
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 3rem;
  border: 1px solid rgba(173, 255, 47, 0.2);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.35), 
              0 0 15px rgba(173, 255, 47, 0.15);
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
  background: linear-gradient(to right, #adff2f, #e50000, #adff2f);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  animation: ${shimmer} 3s linear infinite;
`;

const CardSuitRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const SuitIcon = styled.span`
  font-size: 2rem;
  color: ${props => props.color};
  text-shadow: 0 0 5px rgba(173, 255, 47, 0.5);
`;

const Subtitle = styled.p`
  color: #adff2f;
  text-align: center;
  margin-bottom: 2.5rem;
  font-size: 1.1rem;
  letter-spacing: 0.5px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const ActionButton = styled.button`
  width: 100%;
  padding: 1rem;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.1);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
    
    &:after {
      opacity: 1;
    }
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const CreateButton = styled(ActionButton)`
  background: linear-gradient(135deg, #adff2f 0%, #9acd32 100%);
  box-shadow: 0 4px 15px -3px rgba(173, 255, 47, 0.5);
  animation: ${pulse} 5s infinite ease-in-out;
  color: black;
`;

const JoinButton = styled(ActionButton)`
  background: linear-gradient(135deg, #e50000 0%, #b30000 100%);
  box-shadow: 0 4px 15px -3px rgba(229, 0, 0, 0.5);
`;

const ButtonIcon = styled.span`
  margin-right: 0.75rem;
  font-size: 1.25rem;
`;

const LinksContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
`;

const StyledLink = styled.a`
  color: #adff2f;
  text-decoration: none;
  font-size: 1rem;
  display: flex;
  align-items: center;
  transition: color 0.2s ease;
  
  &:hover {
    color: #e50000;
    text-decoration: underline;
  }
`;

const LinkIcon = styled.span`
  margin-right: 0.5rem;
`;

const Footer = styled.div`
  margin-top: 1rem;
  text-align: center;
  color: rgba(173, 255, 47, 0.6);
  font-size: 0.85rem;
`;

const GitHubLink = styled.a`
  color: #e50000;
  text-decoration: none;
  transition: color 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
  
  &:hover {
    color: #adff2f;
    text-decoration: underline;
  }
`;

const Home = () => {
  const history = useHistory();
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    setVisible(true);
  }, []);

  const createRoom = () => {
    const roomId = Math.random().toString(36).substring(2, 8);
    history.push(`/room/${roomId}`);
  };

  const joinRoom = () => {
    const id = prompt("Введите ID комнаты:");
    if (id) {
      history.push(`/room/${id}`);
    }
  };

  return (
    <PageBackground visible={visible}>
      {/* Background card symbols */}
      <CardSymbol size="100px" top="10%" left="10%" delay="0.2s" color="rgba(173, 255, 47, 0.08)">♠</CardSymbol>
      <CardSymbol size="80px" top="20%" right="15%" delay="0.5s" color="rgba(229, 0, 0, 0.08)">♦</CardSymbol>
      <CardSymbol size="120px" bottom="10%" left="15%" delay="0.8s" color="rgba(173, 255, 47, 0.08)">♣</CardSymbol>
      <CardSymbol size="90px" bottom="20%" right="10%" delay="1.2s" color="rgba(229, 0, 0, 0.08)">♥</CardSymbol>
      
      <CardContainer>
        {/* Card decorations */}
        <CardDecoration className="top-left">
          <CardSuit color="#adff2f">♠</CardSuit>
        </CardDecoration>
        
        <CardDecoration className="bottom-right">
          <CardSuit color="#e50000">♥</CardSuit>
        </CardDecoration>
        
        {/* Main card */}
        <MainCard>
          <Title>Poker Room</Title>
          
          <CardSuitRow>
            <SuitIcon color="#e50000">♥</SuitIcon>
            <SuitIcon color="#e50000">♦</SuitIcon>
            <SuitIcon color="#adff2f">♠</SuitIcon>
            <SuitIcon color="#adff2f">♣</SuitIcon>
          </CardSuitRow>
          
          <Subtitle>Онлайн покер для вас и ваших друзей</Subtitle>
          
          <ButtonsContainer>
            <CreateButton onClick={createRoom}>
              <ButtonIcon>🎲</ButtonIcon>
              Создать комнату
            </CreateButton>
            
            <JoinButton onClick={joinRoom}>
              <ButtonIcon>🔗</ButtonIcon>
              Присоединиться к комнате
            </JoinButton>
          </ButtonsContainer>
          
          <LinksContainer>
            <StyledLink href="/rules">
              <LinkIcon>📘</LinkIcon>
              Правила игры
            </StyledLink>
            
            <StyledLink href="/about">
              <LinkIcon>ℹ️</LinkIcon>
              О проекте
            </StyledLink>
          </LinksContainer>
          
          <Footer>
            © 2025 Poker Room
            <GitHubLink href="https://github.com/sulta24/S-poker" target="_blank" rel="noopener noreferrer">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
              GitHub Repository
            </GitHubLink>
          </Footer>
        </MainCard>
      </CardContainer>
    </PageBackground>
  );
};

export default Home;