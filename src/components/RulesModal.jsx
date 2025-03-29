const RulesModal = ({ onClose }) => {
    return (
      <div className="modal-overlay">
        <div className="modal">
          <button className="close-button" onClick={onClose}>×</button>
          <h2>Monty Hall Problem Rules</h2>
          <ol>
            <li>There are 3 doors. Behind one is a car, behind the others, goats.</li>
            <li>You pick a door (but it isn't opened yet).</li>
            <li>The host, who knows what's behind the doors, opens one of the remaining doors, always revealing a goat.</li>
            <li>You can choose to either stay with your original choice or switch to the other unopened door.</li>
            <li>Statistically, you have a 2/3 chance of winning if you switch!</li>
          </ol>
        </div>
      </div>
    );
  };
  
  export default RulesModal;