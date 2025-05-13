import React from 'react';
import PlayerHand from '../components/PlayerHand';
import OptionsPanel from '../components/OptionsPanel';
import styled from 'styled-components';

const StyledPlayerDashboard = styled.div`
  grid-area: player;
  display: grid;
  grid-template-columns: 25% 50% 25%;
  grid-template-areas: 'playerName playerCards playerOptions';
  background: linear-gradient(180deg, #1a2236 0%, #0d1320 100%);
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
  padding: 15px 0;
  margin-top: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, #e6b324, #ffd700, #e6b324);
    opacity: 0.7;
  }
`;

const PlayerStatusWrapper = styled.div`
  grid-area: playerName;
  padding: 15px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  border-right: 1px solid rgba(255, 255, 255, 0.08);
`;

const PlayerName = styled.h4`
  margin: 0;
  font-family: 'Contrail One', sans-serif;
  font-size: 1.4em;
  color: ${props => props.folded ? '#a0a0a0' : '#ffffff'};
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  
  ${props => props.folded && `
    text-decoration: line-through;
    opacity: 0.7;
  `}
`;

const PlayerBalance = styled.div`
  margin: 10px 0 0 0;
  font-family: 'Contrail One', sans-serif;
  font-size: 1.1em;
  display: flex;
  align-items: center;
  color: #e6b324;
  text-shadow: 0 0 5px rgba(230, 179, 36, 0.3);
`;

const BalanceAmount = styled.span`
  font-weight: bold;
  margin-left: 5px;
`;

const PlayerStatus = styled.div`
  background: ${props => props.active ? '#3a9d23' : '#9d232d'};
  border-radius: 50%;
  width: 12px;
  height: 12px;
  margin-right: 8px;
  box-shadow: 0 0 5px ${props => props.active ? 'rgba(58, 157, 35, 0.7)' : 'rgba(157, 35, 45, 0.7)'};
`;

const HandWrapper = styled.div`
  grid-area: playerCards;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 15px;
`;

const OptionsWrapper = styled.div`
  grid-area: playerOptions;
  border-left: 1px solid rgba(255, 255, 255, 0.08);
`;

const PlayerDashboard = ({ data, options, callbacks }) => {
  const isActive = data && data.active;
  
  return (
    <StyledPlayerDashboard>
      <PlayerStatusWrapper>
        <PlayerName folded={!isActive}>
          <PlayerStatus active={isActive} />
          Player {!isActive && "(folded)"}
        </PlayerName>
        <PlayerBalance>
          Balance: <BalanceAmount>${data ? data.balance : 0}</BalanceAmount>
        </PlayerBalance>
      </PlayerStatusWrapper>
      
      <HandWrapper>
        <PlayerHand hand={data ? data.hand : []} />
      </HandWrapper>
      
      <OptionsWrapper>
        <OptionsPanel options={options} callbacks={callbacks} />
      </OptionsWrapper>
    </StyledPlayerDashboard>
  );
};

export default PlayerDashboard;