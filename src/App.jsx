import PlayerInfo from "./components/playerInfo"

function App() {
  return (
    <main>
      <div id="game-container">
        <ol id="players">
          <PlayerInfo name="Player 1" symbol="X"/>
          <PlayerInfo name="Player 2" symbol="0"/>
        </ol>
        Game board
      </div>
    </main>
  )
}

export default App
