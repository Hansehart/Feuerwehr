import "./ProgressBallStyke.css";

function Speedometer() {
  return (
    <div className="main">
      <div className="speedometer">
        <div className="circle"></div>
        <div className="stick" id="stick-1"></div>
        <div className="stick" id="stick-2"></div>
        <div className="stick" id="stick-3"></div>
      </div>
    </div>
  );
}

export default Speedometer;
