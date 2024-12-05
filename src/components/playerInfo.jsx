import { useState } from "react";

function PlayerInfo({name, symbol}) {

    const [isEditing, setIsEditing] = useState(false);

    function editButtonHandler() {
        setIsEditing((previousState)=> {
            return !previousState;
        });
    }

    return (
        <li>
            <span className="player">
                {!isEditing ? <span className="player-name">{name}</span> : <input type="text" alt=""></input>}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={editButtonHandler}>{isEditing ? "save" : "Edit"}</button>
        </li>
    );
}
export default PlayerInfo;