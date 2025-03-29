import { useState } from 'react';
import './App.css';
import GameScreen from './components/GameScreen';
import RulesModal from './components/RulesModal';
import StatsModal from './components/StatsModal';

function App() {
  const [showRules, setShowRules] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [stats, setStats] = useState({ stayWins: 0, switchWins: 0, totalGames: 0 });

  const updateStats = (didWin, strategy) => {
    setStats(prev => {
      const newStats = { ...prev, totalGames: prev.totalGames + 1 };
      if (didWin) {
        newStats[strategy === 'stay' ? 'stayWins' : 'switchWins'] += 1;
      }
      return newStats;
    });
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Monty Hall Problem Simulator</h1>
        <nav className="nav-menu">
          <button onClick={() => setShowRules(true)}>Rules</button>
          <button onClick={() => setShowStats(true)}>Stats</button>
        </nav>
      </header>

      <main className="game-container">
        <GameScreen updateStats={updateStats} />
      </main>

      {showRules && <RulesModal onClose={() => setShowRules(false)} />}
      {showStats && <StatsModal stats={stats} onClose={() => setShowStats(false)} />}
    </div>
  );
}

export default App;