import { useState } from 'react';
import goatImage from '../assets/goat.png';
import carImage from '../assets/car.png';

const GameScreen = ({ updateStats }) => {
  const [gameState, setGameState] = useState('initial');
  const [userChoice, setUserChoice] = useState(null);
  const [carDoor, setCarDoor] = useState(null);
  const [revealedDoor, setRevealedDoor] = useState(null);
  const [result, setResult] = useState(null);

  const startNewGame = () => {
    const newCarDoor = Math.floor(Math.random() * 3) + 1;
    setCarDoor(newCarDoor);
    setUserChoice(null);
    setRevealedDoor(null);
    setResult(null);
    setGameState('initial');
  };

  const selectDoor = (door) => {
    if (gameState !== 'initial') return;
    
    setUserChoice(door);
    
    let revealDoor;
    do {
      revealDoor = Math.floor(Math.random() * 3) + 1;
    } while (revealDoor === door || revealDoor === carDoor);
    
    setRevealedDoor(revealDoor);
    setGameState('revealed');
  };

  const makeFinalDecision = (strategy) => {
    if (gameState !== 'revealed') return;
    
    let finalDoor = strategy === 'stay' 
      ? userChoice 
      : [1, 2, 3].find(door => door !== userChoice && door !== revealedDoor);
    
    const didWin = finalDoor === carDoor;
    setResult({ didWin, strategy });
    updateStats(didWin, strategy);
    setGameState('result');
  };

  return (
    <div className="game-screen">
      {gameState === 'initial' && (
        <div className="door-selection">
          <h2 className="game-title">Choose a door to begin</h2>
          <div className="door-container">
            {[1, 2, 3].map(door => (
              <button 
                key={door} 
                className={`door door-${door}`}
                onClick={() => selectDoor(door)}
              >
                <span className="door-number">Door #{door}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {gameState === 'revealed' && (
        <div className="decision-phase">
          <p className="reveal-message">
            The host reveals a goat behind <strong>Door #{revealedDoor}</strong>.
            The car is either behind your original choice (<strong>Door #{userChoice}</strong>) 
            or <strong>Door {[1, 2, 3].find(door => door !== userChoice && door !== revealedDoor)}</strong>.
          </p>
          
          <div className="decision-buttons">
            <button 
              className="decision-button stay-button"
              onClick={() => makeFinalDecision('stay')}
            >
              Stay with Door #{userChoice}
            </button>
            <button 
              className="decision-button switch-button"
              onClick={() => makeFinalDecision('switch')}
            >
              Switch to Door {[1, 2, 3].find(door => door !== userChoice && door !== revealedDoor)}
            </button>
          </div>
        </div>
      )}

      {gameState === 'result' && (
        <div className="result-phase">
          <h2 className={`result-title ${result.didWin ? 'win' : 'lose'}`}>
            {result.didWin ? '🎉 You won the car! 🎉' : '🐐 You got a goat! 🐐'}
          </h2>
          
          <div className="prize-reveal">
            <img 
              src={result.didWin ? carImage : goatImage} 
              alt={result.didWin ? 'Car' : 'Goat'} 
              className="prize-image"
            />
            <p className="car-location">The car was behind <strong>Door #{carDoor}</strong></p>
            <p className="strategy-used">
              You {result.strategy === 'stay' ? 'stayed' : 'switched'} and {' '}
              {result.didWin ? 'won!' : 'lost.'}
            </p>
          </div>
          
          <button 
            onClick={startNewGame} 
            className="play-again-button"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default GameScreen;