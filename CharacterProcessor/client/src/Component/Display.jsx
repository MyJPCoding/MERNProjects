import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link, navigate } from '@reach/router';


const Display = ({type, id, deleteCharacterById, deleteActionById, deleteBonusActionById, deleteReactionById}) => {

    const [character, setCharacter] = useState({});
    const [action, setAction] = useState({});
    const [bonusAction, setBonusAction] = useState({});
    const [reaction, setReaction] = useState({});

    useEffect(() => {
            axios.get(`http://localhost:8000/${type}/${id}`)
                .then(res => {
                    if (type === "character"){setCharacter(res.data)}
                    if (type === "action"){setAction(res.data)}
                    if (type === "bonusAction"){setBonusAction(res.data)}
                    if (type === "reaction"){setReaction(res.data)}
                })
        }, [id]);

    const deleteHandler = id => {
        if (type === "character"){deleteCharacterById(id)};
        if (type === "action"){deleteActionById(id)};
        if (type === "bonusAction"){deleteBonusActionById(id)};
        if (type === "reaction"){deleteReactionById(id)};
        navigate("/");
    }


    return (
        <div>
            <Link to={'/'}>Go back!</Link>

            {type==="character" && <div>
            <p>Name: {character.name}</p>
            <p>_id: {character._id}</p>
            <p>Level: {character.level}</p>
            <p>Psi: {character.current_Psi}</p>
            <button onClick={e => deleteHandler(id)}>Delete me!</button> </div>}

            {type==="action" && <div>
            <p>Name: {action.name}</p>
            <p>_id: {action._id}</p>
            <p>Level: {action.level}</p>
            <button onClick={e => deleteHandler(id)}>Delete me!</button> </div>}

            {type==="bonusAction" && <div>
            <p>Name: {bonusAction.name}</p>
            <p>_id: {bonusAction._id}</p>
            <p>Level: {bonusAction.level}</p>
            <button onClick={e => deleteHandler(id)}>Delete me!</button> </div>}

            {type==="reaction" && <div>
            <p>Name: {reaction.name}</p>
            <p>_id: {reaction._id}</p>
            <p>Level: {reaction.level}</p>
            <button onClick={e => deleteHandler(id)}>Delete me!</button> </div>}
        </div>
    )
}

export default Display;