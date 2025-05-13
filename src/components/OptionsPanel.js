import React, { useState } from 'react';
import styled from 'styled-components';

// Main container for options panel
const StyledOptionsPanel = styled.div`
  grid-area: playerOptions;
  padding: 8px 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

// Game button styling
const GameButton = styled.button`
  background: ${props => 
    props.type === 'Deal' || props.type === 'New Game' 
      ? 'linear-gradient(135deg, #264653 0%, #2a9d8f 100%)' 
      : props.type === 'Call' 
        ? 'linear-gradient(135deg, #264653 0%, #2a9d8f 100%)' 
        : props.type === 'Fold' 
          ? 'linear-gradient(135deg, #9d2a2a 0%, #c44536 100%)' 
          : 'linear-gradient(135deg, #9c6644 0%, #e9c46a 100%)'
  };
  color: white;
  border: none;
  border-radius: 4px;
  padding: 6px 0;
  width: 100%;
  margin: 3px 0;
  font-family: 'Contrail One', sans-serif;
  font-size: 12px;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  opacity: ${props => (props.disabled ? 0.5 : 1)};
  transition: all 0.2s ease;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
  height: 28px;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 50%;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0));
    border-radius: 4px 4px 0 0;
  }
  
  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  }
  
  &:active:not(:disabled) {
    transform: translateY(0px);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  }

  /* Icon for buttons */
  &:after {
    content: ${props => 
      props.type === 'Deal' ? '"🃏"' : 
      props.type === 'New Game' ? '"🔄"' : 
      props.type === 'Call' ? '"✅"' : 
      props.type === 'Fold' ? '"❌"' : 
      props.type === 'Raise' ? '"🔼"' : '""'
    };
    margin-left: 4px;
    font-size: 10px;
  }
`;

// Container for raise input and button
const RaiseContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 3px 0;
`;

// Input for raise amount
const RaiseInput = styled.input`
  width: 100%;
  padding: 4px;
  border-radius: 4px 4px 0 0;
  border: 1px solid #264653;
  margin-bottom: 0px;
  text-align: center;
  font-family: 'Contrail One', sans-serif;
  font-size: 12px;
  background: rgba(255, 255, 255, 0.9);
  height: 20px;
  
  &:focus {
    outline: none;
    border-color: #2a9d8f;
    box-shadow: 0 0 0 1px rgba(42, 157, 143, 0.3);
  }
`;

const RaiseButton = styled(GameButton)`
  border-radius: 0 0 4px 4px;
  margin-top: 0;
`;

// Component for compact design
const CompactButtonRow = styled.div`
  display: flex;
  width: 100%;
  gap: 4px;
  margin: 2px 0;
`;

const OptionsPanel = ({ options, callbacks }) => {
  const [raiseAmount, setRaiseAmount] = useState(10);
  
  // Handle raise amount change
  const handleRaiseChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value) || 0);
    setRaiseAmount(value);
  };

  // Handle raise button click
  const handleRaise = () => {
    if (callbacks.Raise && raiseAmount > 0) {
      callbacks.Raise(raiseAmount);
    }
  };

  // Group buttons for more compact design
  const renderButtons = () => {
    const buttonElements = [];
    const actionButtons = [];
    
    Object.entries(options).forEach(([option, enabled]) => {
      if (option === 'Raise') {
        buttonElements.push(
          enabled ? (
            <RaiseContainer key={option}>
              <RaiseInput 
                type="number" 
                min="1"
                value={raiseAmount} 
                onChange={handleRaiseChange}
                placeholder="Amount"
              />
              <RaiseButton 
                type={option}
                disabled={!enabled} 
                onClick={handleRaise}
              >
                Raise
              </RaiseButton>
            </RaiseContainer>
          ) : null
        );
      } else if (option === 'Call' || option === 'Fold') {
        actionButtons.push(
          <GameButton
            key={option}
            type={option}
            disabled={!enabled}
            onClick={enabled && callbacks[option] ? () => callbacks[option]('player') : null}
          >
            {option}
          </GameButton>
        );
      } else {
        buttonElements.push(
          <GameButton
            key={option}
            type={option}
            disabled={!enabled}
            onClick={enabled && callbacks[option] ? () => callbacks[option]('player') : null}
          >
            {option}
          </GameButton>
        );
      }
    });
    
    // Group Call and Fold buttons in one row if both exist
    if (actionButtons.length === 2) {
      buttonElements.push(
        <CompactButtonRow key="actionButtons">
          {actionButtons}
        </CompactButtonRow>
      );
    } else {
      buttonElements.push(...actionButtons);
    }
    
    return buttonElements;
  };

  return (
    <StyledOptionsPanel>
      {renderButtons()}
    </StyledOptionsPanel>
  );
};

export default OptionsPanel;