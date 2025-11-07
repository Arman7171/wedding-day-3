import React, { useState } from "react";
import "./App.css";

interface PropsType {
  openEnvelope: () => void;
}

const EnvelopeAnimation: React.FC<PropsType> = ({ openEnvelope }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScale, setIsScale] = useState(false);
  const toggleEnvelope = () => {
    setIsOpen(!isOpen);
    openEnvelope();
    setTimeout(() => {
      setIsScale(true);
    }, 1000);
  };
  return (
    <div>
      <div
        className={`wrapper ${isOpen ? "open" : ""} ${isScale ? "scale" : ""}`}
        onClick={() => {
          toggleEnvelope();
          openEnvelope();
        }}>
        <div className="lid one"></div>
        <div className="lid two"></div>
        <div className="envelope"></div>
        <div className="letter">
          <p className="letter-text">Հրավիրում ենք մեր հարսանիքին</p>
        </div>
      </div>
    </div>
  );
};

export default EnvelopeAnimation;
