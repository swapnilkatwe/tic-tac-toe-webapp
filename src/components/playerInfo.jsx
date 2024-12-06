import { useState } from "react";

function PlayerInfo({ initialName, symbol, isActive }) {

    const [isEditing, setIsEditing] = useState(false);
    const [inputName, setInputName] = useState(initialName);
    
    function editButtonHandler() {
        setIsEditing((previousState) => {
            return !previousState;
        });

    }
    function handleInputEvent(event) {
        setInputName(event.target.value);
    }

    let playerName = <span className="player-name">{inputName}</span>;
    if (isEditing) {
        playerName = <input type="text" value={inputName} required onChange={handleInputEvent}></input>
    }

    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                {playerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={editButtonHandler}>{isEditing ? "save" : "Edit"}</button>
        </li>
    );
}
export default PlayerInfo;