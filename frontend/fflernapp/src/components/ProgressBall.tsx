import "./ProgressBallStyke.css";

function ProgressBall() {
  return (
    <div className="container">
      <div className="ball" id="route"></div>
      <div className="ball" id="bar"></div>
      <div id="circle">
        <h3>25%</h3>
      </div>
    </div>
  );
}

export default ProgressBall;
