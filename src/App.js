import React, { useState, useEffect } from 'react';

function Elevator() {
  const [currentFloor, setCurrentFloor] = useState(0); // Initial floor
  const [targetFloor, setTargetFloor] = useState(null); // Target floor
  const [isMoving, setIsMoving] = useState(false); // Is the elevator moving?
  const [doorsOpen, setDoorsOpen] = useState(false); // Is the elevator door open?

  const floors = [0, 1, 2, 3, 4]; // Example for 5 floors

  useEffect(() => {
    if (targetFloor !== null && currentFloor !== targetFloor) {
      setIsMoving(true);
      setDoorsOpen(false); // Close doors before moving
      const moveInterval = setInterval(() => {
        setCurrentFloor(prevFloor => {
          if (prevFloor < targetFloor) {
            return prevFloor + 1;
          } else if (prevFloor > targetFloor) {
            return prevFloor - 1;
          } else {
            clearInterval(moveInterval);
            setIsMoving(false);
            setTargetFloor(null);
            setDoorsOpen(true); // Open doors when reaching the target floor
            return prevFloor;
          }
        });
      }, 1000); // Move the lift every second
    }
  }, [targetFloor, currentFloor]);

  const handleFloorRequest = (floor) => {
    if (!isMoving) {
      setTargetFloor(floor);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Elevator Simulation</h1>
      <div style={styles.buttonsContainer}>
        {floors.map(floor => (
          <button 
            key={floor} 
            onClick={() => handleFloorRequest(floor)}
            disabled={isMoving || currentFloor === floor}
            style={{
              ...styles.button,
              backgroundColor: isMoving ? '#d3d3d3' : '#007bff',
              cursor: isMoving ? 'not-allowed' : 'pointer',
            }}
          >
            Go to Floor {floor}
          </button>
        ))}
      </div>
      <div style={styles.infoContainer}>
        <p style={styles.infoText}>Current Floor: {currentFloor}</p>
        <p style={styles.infoText}>{isMoving ? 'Elevator is moving...' : 'Elevator is stationary.'}</p>
      </div>
      <div style={styles.elevatorContainer}>
        <div style={{ ...styles.elevator, top: `${currentFloor * 100}px`, transition: 'top 1s ease-in-out' }}>
          <div style={{ ...styles.doors, left: doorsOpen ? '0' : '-50px' }} />
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    color: '#333',
    marginBottom: '20px',
  },
  buttonsContainer: {
    marginBottom: '20px',
  },
  button: {
    padding: '10px 20px',
    margin: '5px',
    border: 'none',
    borderRadius: '4px',
    color: '#fff',
    fontSize: '16px',
    transition: 'background-color 0.3s',
  },
  infoContainer: {
    marginBottom: '20px',
  },
  infoText: {
    fontSize: '18px',
  },
  elevatorContainer: {
    position: 'relative',
    width: '120px',
    height: '500px',
    margin: 'auto',
    border: '2px solid #000',
    borderRadius: '5px',
    backgroundColor: '#f0f0f0',
    overflow: 'hidden',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
  },
  elevator: {
    position: 'absolute',
    width: '100px',
    height: '100px',
    backgroundColor: '#007bff',
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
    transition: 'top 1s ease-in-out',
  },
  doors: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: '5px',
    transition: 'left 0.5s ease-in-out',
    border: '2px solid #000',
  },
};

export default Elevator;
