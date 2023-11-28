import React from 'react';

const CodeReplay = () => {
  // Define the long text you want to display
  const longText = `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute 
    irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
    deserunt mollit anim id est laborum.
  `;

  // Define the style for the container
  const containerStyle = {
    padding: '1rem',
    backgroundColor: '#a4aba6', 
    height: '100%', // Fill the height of the container
    overflowY: 'auto' // Enable scrolling if content is too long
  };

  // Define the style for the heading
  const headingStyle = {
    marginTop: '0',
    color: '#333', 
  };

  // Define the style for the paragraph content
  const paragraphStyle = {
    color: '#333', 
  };

   //blob styling 
   const blobStyle = {
    backgroundColor: '#fcfcfc', 
    borderRadius: "15px",
    padding: "20px", 
    marginBottom: "30px"
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Code Replay</h1>
      <div style={blobStyle}>
        <h2>Heading</h2>
        <p style={paragraphStyle}>{longText}</p>
      </div>
      <div style={blobStyle}>
        <h2>Heading</h2>
        <p style={paragraphStyle}>{longText}</p>
      </div>
      <div style={blobStyle}>
        <h2>Heading</h2>
        <p style={paragraphStyle}>{longText}</p>
      </div>
    </div>
  );
};

export default CodeReplay;
