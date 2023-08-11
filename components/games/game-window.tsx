import React, { useEffect } from 'react';

const GameWindow: React.FC = () => {
  useEffect(() => {
    const iframe = document.getElementById('gameFrame') as HTMLIFrameElement;
    if (iframe) {
      iframe.style.position = 'fixed';
      iframe.style.top = '0';
      iframe.style.left = '0';
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.style.border = 'none';
    }
  }, []);

  return <iframe id="gameFrame" src="http://localhost:9000" title="Game Window" />;
};

export default GameWindow;