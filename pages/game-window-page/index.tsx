import GameWindow from '@components/games/game-window';
import Head from 'next/head';

const Home: React.FC = () => {
  return (
    <div>
      {/* Embed the game window component */}
      <GameWindow />
    </div>
  );
};

export default Home;
