import React from 'react';
import Card from './Card';
import styled from 'styled-components';

// Main table container with felt texture
const TableContainer = styled.div`
  position: relative;
  grid-area: table;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`;

// The actual poker table with felt styling
const PokerTable = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  border-radius: 150px;
  background: #0d734d; /* Poker felt green */
  background-image: radial-gradient(circle, #10825a 0%, #0a5c3e 100%);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), inset 0 0 10px rgba(0, 0, 0, 0.3);
  border: 15px solid #5d4037; /* Wood-like border */
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

// Wooden rim around the table
const TableRim = styled.div`
  position: absolute;
  width: calc(100% + 30px);
  height: calc(100% + 30px);
  border-radius: 175px;
  background: #5d4037;
  background-image: linear-gradient(45deg, #5d4037 0%, #795548 100%);
  z-index: 0;
  top: -15px;
  left: -15px;
`;

// Container for the cards on the table
const CardsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  padding: 10px;
  min-height: 100px;
  position: relative;
  z-index: 2;
`;

// Table marking
const TableCenter = styled.div`
  position: absolute;
  width: 120px;
  height: 120px;
  border-radius: 60px;
  background: rgba(0, 0, 0, 0.15);
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(255, 255, 255, 0.7);
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 14px;
  z-index: 1;
`;

// Light reflection on the table
const TableHighlight = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    ellipse at center,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0) 60%
  );
  z-index: 1;
`;

const Table = ({ cards = [], fold }) => {
  // Check if there are any cards to display
  const hasCards = cards && cards.length > 0;

  return (
    <TableContainer>
      <PokerTable>
        <TableHighlight />
        <TableCenter>Poker Table</TableCenter>
        <CardsContainer>
          {hasCards ? (
            cards.map((card, index) => (
              <Card 
                key={`table${card.displayName || index}`} 
                width={80} 
                shown={true} 
                card={card} 
              />
            ))
          ) : (
            <div style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
            </div>
          )}
        </CardsContainer>
      </PokerTable>
    </TableContainer>
  );
};

export default Table;