import { Placeholder } from "react-bootstrap";

export default function PlaceholderText() {
  function randomPlaceholderLength(isMainText) {
    const mainText = [8, 10, 12];
    const subText = [4, 6, 8];

    function getRandom(max) {
      return Math.floor(Math.random() * max);
    }

    return isMainText ? mainText[getRandom(2)] : subText[getRandom(2)];
  }

  return (
    <>
      <div>
        <Placeholder className="d-grid m-1" animation="glow">
          <Placeholder xs={randomPlaceholderLength(true)} />
        </Placeholder>
      </div>
      <div>
        <Placeholder className="d-grid m-1" animation="glow">
          <Placeholder xs={randomPlaceholderLength(false)} />
        </Placeholder>
      </div>
    </>
  );
}
