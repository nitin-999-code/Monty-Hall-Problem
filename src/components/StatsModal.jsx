const StatsModal = ({ stats, onClose }) => {
    const stayWinRate = stats.totalGames > 0 
      ? Math.round((stats.stayWins / stats.totalGames) * 100) 
      : 0;
    const switchWinRate = stats.totalGames > 0 
      ? Math.round((stats.switchWins / stats.totalGames) * 100) 
      : 0;
  
    return (
      <div className="modal-overlay">
        <div className="modal">
          <button className="close-button" onClick={onClose}>×</button>
          <h2>Game Statistics</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <h3>Total Games</h3>
              <p>{stats.totalGames}</p>
            </div>
            <div className="stat-item">
              <h3>Stay Wins</h3>
              <p>{stats.stayWins} ({stayWinRate}%)</p>
            </div>
            <div className="stat-item">
              <h3>Switch Wins</h3>
              <p>{stats.switchWins} ({switchWinRate}%)</p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default StatsModal;