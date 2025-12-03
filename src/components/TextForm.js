import React, { useState } from "react";

export default function TextForm(props) {
  const [text, setText] = useState("");
  const [color, setColor] = useState("black");

  const handleUpClick = () => {
    let newText = text.toUpperCase();
    setText(newText);
    props.showAlert("Converted to uppercase","success");
  };

  const handleLoClick = () => {
    let newText = text.toLowerCase();
    setText(newText);
    props.showAlert("Converted to lowercase","success");
  };

  const handleClearClick = () => {
    setText("");
    props.showAlert("Text cleared","success");
  };

  const handleColorChange = () => {
    const newColor = color === "black" ? "red" : "black";
    setColor(newColor);
    props.showAlert("Text color changed","success");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    props.showAlert("Text copied to clipboard","success");
  };

  const handleExtraSpaces = () => {
    let newText = text.split(/[ ]+/).join(" ");
    setText(newText);
    props.showAlert("Extra spaces removed","success");
  };

  const handleOnChange = (event) => {
    setText(event.target.value);
  };

  const handleDownload = () => {
    const file = new Blob([text], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(file);
    link.download = "text.txt";
    link.click();
  };

  return (
    <>
      <div className="container" style={{ color: props.mode === 'dark'? 'white' : 'black' }}>
        <h1>{props.heading}</h1>

        <div className="mb-3">
          <textarea className="form-control" value={text} onChange={handleOnChange} id="myBox" rows="8"
          style={{ backgroundColor: props.mode === 'dark'? 'gray' : 'white',  color: props.mode === "dark" && color === "black" ? "white" : color }}>
          </textarea>

        </div>

        <button className="btn btn-primary mx-1" onClick={handleUpClick}>Convert to uppercase</button>
        <button className="btn btn-primary mx-1" onClick={handleLoClick}>Convert to lowercase</button>
        <button className="btn btn-danger mx-1" onClick={handleColorChange}>Change Text Color</button>
        <button className="btn btn-primary mx-1" onClick={handleClearClick}>Clear Text</button>
        <button className="btn btn-success mx-1" onClick={handleDownload}>Download Text</button>
        <button className="btn btn-primary mx-1" onClick={handleCopy}>Copy text</button>
        <button className="btn btn-primary mx-1" onClick={handleExtraSpaces}>Remove Extra Spaces</button>
      </div>

      <div className="container my-3" style={{ color: props.mode === 'dark'? 'white' : 'black' }}>
        <h1>Your text summary</h1>
        <p>
          {text.trim().length === 0 ? 0 : text.split(/\s+/).length} words,{" "}
          {text.length} characters
        </p>
        <p>{0.008 * text.split(" ").length} Minutes read</p>
        <h2>Preview</h2>
        <p style={{
          color: props.mode === "dark" && color === "black" ? "white" : color
          }}>{text.length > 0 ? text : "Enter something to preview here!"}
        </p>
      </div>
    </>
  );
}

