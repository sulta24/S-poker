import React, { Component } from 'react';
import styled from 'styled-components';

import { InfoMessagesQueue } from './util/infoMessagesQueue';
import { getWinner, getScore } from './util/engine.js';
import { clonePlayerData, shouldHighlight, addToTableCards } from './util/helpers';
import { deck } from './util/deck.js';

import PlayerDashboard from './components/PlayerDashboard';
import Table from './components/Table.js';
import AI from './components/AI';
import InfoPanel from './components/InfoPanel';

// Main game container with enhanced styling
const StyledPoker = styled.div`
  height: 140vh;
  width: 100vw;
  display: grid;
  color: white;
  grid-template-columns: 20% 60% 20%;
  grid-template-rows: auto auto auto auto;
  grid-row-gap: 15px;
  grid-template-areas:
    'infopanel infopanel infopanel'
    '. ai2 .'
    'ai1 table ai3'
    'player player player';
  background: linear-gradient(135deg, #0a370a 0%, #115c11 50%, #0a370a 100%);
  border-radius: 0;
  box-shadow: none;
  position: relative;
  overflow: hidden;
`;


// Poker table felt texture overlay
const TableFelt = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 0;
`;

// Poker table edge accent
const TableEdge = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 8px;
  background: linear-gradient(90deg, #8b5a2b, #d4a76a, #8b5a2b);
  border-radius: 20px 20px 0 0;
`;

// Game status display for pot and stage
const GameStatus = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  padding: 8px 12px;
  font-family: 'Contrail One', sans-serif;
  font-size: 14px;
  display: flex;
  align-items: center;
  z-index: 10;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
`;

const PotAmount = styled.span`
  color: #ffd700;
  font-weight: bold;
  margin-left: 5px;
  text-shadow: 0 0 5px rgba(255, 215, 0, 0.5);
`;

const StageIndicator = styled.div`
  display: flex;
  margin-left: 15px;
  
  span {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin: 0 3px;
    background: ${props => props.stage > props.index ? '#4caf50' : 'rgba(255, 255, 255, 0.2)'};
    box-shadow: ${props => props.stage > props.index ? '0 0 5px rgba(76, 175, 80, 0.7)' : 'none'};
  }
`;

const fullNames = {
  ai1: 'AI Opponent 1',
  ai2: 'AI Opponent 2',
  ai3: 'AI Opponent 3',
  player: 'Player',
};

// Game stage names for better user feedback
const stageNames = [
  'Pre-Deal',
  'Pre-Flop',
  'Flop',
  'Turn',
  'River',
  'Showdown'
];

class Poker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerData: {
        player: { id: 'player', active: true, hand: [], balance: 1000, currentBet: 0 },
        ai1: { id: 'ai1', active: true, hand: [], balance: 1000, currentBet: 0 },
        ai2: { id: 'ai2', active: true, hand: [], balance: 1000, currentBet: 0 },
        ai3: { id: 'ai3', active: true, hand: [], balance: 1000, currentBet: 0 },
      },
      tableCards: [],
      playerOptions: { Fold: false, Call: false, Deal: true, Raise: false, 'New Game': false },
      displayAICards: false,
      gameStage: 0,
      playerIsActive: true,
      infoMessages: new InfoMessagesQueue(),
      pot: 0,
      currentMaxBet: 0,
      lastAction: null,
    };
  }

  deal = () => {
    const { gameStage, playerIsActive } = this.state;
    let infoMessages = this.state.infoMessages.copy();

    if (gameStage === 0) {
      infoMessages.add('🃏 Hole cards dealt.');
      const newPlayerData = clonePlayerData(this.state.playerData);
      Object.values(newPlayerData).forEach(playerObj => {
        playerObj.hand = [deck.dealCard(), deck.dealCard()];
        playerObj.currentBet = 0;
      });
      this.setState({
        playerData: newPlayerData,
        playerOptions: {
          Deal: false,
          Fold: playerIsActive,
          Call: playerIsActive,
          Raise: playerIsActive,
          'New Game': false,
        },
        pot: 0,
        currentMaxBet: 0,
        gameStage: gameStage + 1,
        infoMessages,
        lastAction: 'deal',
      });
    }

    if (gameStage === 1) {
      infoMessages.add('🃏 Flop dealt.');
      const newTableCards = addToTableCards(this.state.tableCards, 3);
      this.setState({
        tableCards: newTableCards,
        gameStage: gameStage + 1,
        infoMessages,
        lastAction: 'deal',
      });
    }

    if (gameStage === 2 || gameStage === 3) {
      infoMessages.add(gameStage === 2 ? '🃏 Turn dealt.' : '🃏 River dealt.');
      const newTableCards = addToTableCards(this.state.tableCards, 1);
      this.setState({
        tableCards: newTableCards,
        gameStage: gameStage + 1,
        infoMessages,
        lastAction: 'deal',
      });
    }

    if (gameStage === 4) {
      let gameResult;
      let displayAICards = true;
      let playerData = this.state.playerData;
      let tableCards = this.state.tableCards;
      gameResult = getWinner(this.state.playerData, this.state.tableCards);
      infoMessages.add(`🏆 ${gameResult.notify}`);

      if (!gameResult.error) {
        if (gameResult.winners.length < 1) throw new Error('No winners in gameResult!');
        const highlights = this.getHighlightedWinningCards(gameResult);
        playerData = highlights.playerData;
        tableCards = highlights.tableCards;
      }

      this.setState({
        playerData,
        tableCards,
        displayAICards,
        gameStage: gameStage + 1,
        playerOptions: { Fold: false, Call: false, Deal: false, Raise: false, 'New Game': true },
        infoMessages,
        lastAction: 'showdown',
      });
    }

    if (!playerIsActive && gameStage < 4) setTimeout(this.deal, 1000);
  };

  getHighlightedWinningCards = gameResult => {
    const usedCards = new Set();
    gameResult.winners.forEach(scoreObj => {
      scoreObj.cardsUsed.forEach(card => {
        usedCards.add(card.displayName);
      });
    });

    const tableCards = this.state.tableCards.map(card => shouldHighlight(card, usedCards));

    const playerData = clonePlayerData(this.state.playerData);
    gameResult.winners.forEach(scoreObj => {
      playerData[scoreObj.owner].hand = playerData[scoreObj.owner].hand.map(card =>
        shouldHighlight(card, usedCards)
      );
    });
    return { tableCards, playerData };
  };

  newGame = () => {
    deck.reset();
    this.setState({
      playerData: {
        player: { id: 'player', active: true, hand: [], balance: 1000, currentBet: 0 },
        ai1: { id: 'ai1', active: true, hand: [], balance: 1000, currentBet: 0 },
        ai2: { id: 'ai2', active: true, hand: [], balance: 1000, currentBet: 0 },
        ai3: { id: 'ai3', active: true, hand: [], balance: 1000, currentBet: 0 },
      },
      tableCards: [],
      playerOptions: { Fold: false, Call: false, Deal: true, Raise: false, 'New Game': false },
      displayAICards: false,
      gameStage: 0,
      playerIsActive: true,
      infoMessages: new InfoMessagesQueue(),
      pot: 0,
      currentMaxBet: 0,
      lastAction: 'reset',
    });
  };

  fold = playerID => {
    const newPlayerData = clonePlayerData(this.state.playerData);
    newPlayerData[playerID].active = false;
    const playerIsActive = playerID === 'player' ? false : this.state.playerIsActive;
    const infoMessages = this.state.infoMessages.copy().add(`❌ ${fullNames[playerID]} folds.`);
    this.setState(
      {
        playerData: newPlayerData,
        playerIsActive,
        playerOptions: { Fold: false, Call: false, Deal: false, Raise: false, 'New Game': false },
        infoMessages,
        lastAction: 'fold',
      },
      this.deal
    );
  };

  call = playerID => {
    const playerData = clonePlayerData(this.state.playerData);
    const player = playerData[playerID];
    const callAmount = this.state.currentMaxBet - player.currentBet;

    if (player.balance >= callAmount) {
      player.balance -= callAmount;
      player.currentBet += callAmount;

      const pot = this.state.pot + callAmount;
      const infoMessages = this.state.infoMessages.copy().add(`✅ ${fullNames[playerID]} calls $${callAmount}.`);

      this.setState({ 
        playerData, 
        pot, 
        infoMessages,
        lastAction: 'call',
      }, this.deal);
    } else {
      this.fold(playerID);
    }
  };

  raise = (playerID, raiseAmount) => {
    const playerData = clonePlayerData(this.state.playerData);
    const player = playerData[playerID];
    const totalAmount = this.state.currentMaxBet - player.currentBet + raiseAmount;

    if (player.balance >= totalAmount) {
      player.balance -= totalAmount;
      player.currentBet += totalAmount;

      const pot = this.state.pot + totalAmount;
      const currentMaxBet = player.currentBet;
      const infoMessages = this.state.infoMessages.copy().add(`🔼 ${fullNames[playerID]} raises by $${raiseAmount}.`);

      this.setState({ 
        playerData, 
        pot, 
        currentMaxBet, 
        infoMessages,
        lastAction: 'raise',
      }, () => {
        this.deal();
      });
    } else {
      this.fold(playerID);
    }
  };

  // Helper function to count active players
  getActivePlayerCount = () => {
    return Object.values(this.state.playerData).filter(player => player.active).length;
  }

  render() {
    const { playerData, tableCards, displayAICards, playerOptions, pot, gameStage } = this.state;
    const activePlayers = this.getActivePlayerCount();
    
    return (
      <StyledPoker>
        <TableFelt />
        <TableEdge />
        
        <GameStatus>
          <div>Pot: <PotAmount>${pot}</PotAmount></div>
          <StageIndicator stage={gameStage}>
            {[0, 1, 2, 3, 4].map(index => (
              <span key={`stage-${index}`} stage={gameStage} index={index} />
            ))}
          </StageIndicator>
        </GameStatus>
        
        <InfoPanel messages={this.state.infoMessages} />
        <AI data={playerData.ai1} tableCards={tableCards} key={playerData.ai1.id} showCards={displayAICards} />
        <AI data={playerData.ai2} tableCards={tableCards} key={playerData.ai2.id} showCards={displayAICards} />
        <AI data={playerData.ai3} tableCards={tableCards} key={playerData.ai3.id} showCards={displayAICards} />
        <Table cards={tableCards} />
        <PlayerDashboard
          data={playerData.player}
          callbacks={{
            Fold: this.fold,
            Call: this.call,
            Deal: this.deal,
            Raise: (amount) => this.raise('player', amount),
            'New Game': this.newGame,
          }}
          options={playerOptions}
        />
      </StyledPoker>
    );
  }
}

export default Poker;