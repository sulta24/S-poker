import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

const StyledInfoPanel = styled.div`
  width: 100%;
  grid-area: infopanel;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background: linear-gradient(180deg, #121924 0%, #0a0f16 100%);
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.08);
  max-height: 200px;
  overflow-y: auto;
  scroll-behavior: smooth;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.2) rgba(0, 0, 0, 0.3);
  padding: 8px 0;
  position: relative;
  
  /* Custom scrollbar styling for webkit browsers */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
    
    &:hover {
      background: rgba(255, 255, 255, 0.3);
    }
  }
  
  /* Title for the panel */
  &:before {
    content: 'Game Log';
    position: absolute;
    top: -22px;
    left: 10px;
    font-family: 'Contrail One', sans-serif;
    color: rgba(255, 255, 255, 0.7);
    font-size: 14px;
    letter-spacing: 0.5px;
  }
`;

const MessageContainer = styled.div`
  padding: 2px 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.03);
  
  &:last-child {
    border-bottom: none;
    animation: highlightNew 1.5s ease-out;
  }
  
  @keyframes highlightNew {
    0% { background-color: rgba(255, 255, 255, 0.1); }
    100% { background-color: transparent; }
  }
`;

const Message = styled.p`
  font-size: 12px;
  margin: 4px 0;
  color: ${props => getMessageColor(props.type)};
  font-family: 'Roboto', sans-serif;
  line-height: 1.4;
  
  /* Time stamp styling */
  &:before {
    content: '${props => props.time || ""}';
    color: rgba(255, 255, 255, 0.4);
    font-size: 10px;
    margin-right: 6px;
  }
`;

// Helper function to determine message color based on content
const getMessageColor = (type) => {
  switch(type) {
    case 'action':
      return '#ffd700';
    case 'warning':
      return '#ff6b6b';
    case 'win':
      return '#69db7c';
    default:
      return '#e9ecef';
  }
};

// Helper function that attempts to detect message type by content
const detectMessageType = (message) => {
  if (!message) return 'default';
  
  const lowerMsg = message.toLowerCase();
  if (lowerMsg.includes('fold') || lowerMsg.includes('raise') || lowerMsg.includes('check') || lowerMsg.includes('call')) {
    return 'action';
  }
  if (lowerMsg.includes('win') || lowerMsg.includes('takes the pot')) {
    return 'win';
  }
  if (lowerMsg.includes('warning') || lowerMsg.includes('error') || lowerMsg.includes('invalid')) {
    return 'warning';
  }
  return 'default';
};

// Helper function to get current time in HH:MM:SS format
const getCurrentTime = () => {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
};

const InfoPanel = ({ messages }) => {
  const panelRef = useRef(null);

  useEffect(() => {
    if (panelRef.current) {
      panelRef.current.scrollTop = panelRef.current.scrollHeight;
    }
  }, [messages]); // Scroll to bottom when messages update

  return (
    <StyledInfoPanel ref={panelRef}>
      {messages && messages.toArray().map((msg, index) => {
        // Extract message type for styling
        const messageType = detectMessageType(msg);
        const timeStamp = getCurrentTime();
        
        return (
          <MessageContainer key={`infomsg-${index}`}>
            <Message type={messageType} time={timeStamp}>
              {msg}
            </Message>
          </MessageContainer>
        );
      })}
    </StyledInfoPanel>
  );
};

export default InfoPanel;