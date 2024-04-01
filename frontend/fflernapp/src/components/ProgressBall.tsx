import "./ProgressBallStyke.css";

function ProgressBall() {
  return (
    <div className="container">
      <div className="ball" id="route"></div>
      <div className="ball" id="bar"></div>
      <div id="circle">
        <h2>25%</h2>
      </div>
    </div>
  );
}

export default ProgressBall;
