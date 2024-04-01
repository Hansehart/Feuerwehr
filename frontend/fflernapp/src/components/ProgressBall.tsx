import "./ProgressBallStyke.css";

function ProgressBall() {
  return (
    <div className="container">
      <div id="route"></div>
      <div id="bar"></div>
      <div id="circle">
        <h2>100%</h2>
      </div>
    </div>
  );
}

export default ProgressBall;
