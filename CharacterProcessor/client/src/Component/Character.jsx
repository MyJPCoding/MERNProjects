import React, {useState} from 'react';
import { Link, navigate } from '@reach/router';
import axios from 'axios';
import '../App.css';

const Character = (addcharacter) => {
    const levels = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
    
    const MaxPsiDictionary = 
    {
        1:4,
        2:6,
        3:14,
        4:17,
        5:27,
        6:32,
        7:38,
        8:44,
        9:57,
        10:64,
        11:73,
        12:73,
        13:83,
        14:83,
        15:94,
        16:94,
        17:114,
        18:114,
        19:123,
        20:133
    };

    const turnPsiDictionary = 
    {
        1:2,
        2:3,
        3:3,
        4:3,
        5:3,
        6:3,
        7:4,
        8:5,
        9:6,
        10:6,
        11:6,
        12:6,
        13:7,
        14:7,
        15:7,
        16:7,
        17:7,
        18:7,
        19:7,
        20:7
    };

// Character 
    const [characterName, setCharacterName] = useState("");
    const [characterLevel, setCharacterLevel] = useState(1);
    const [characterHealth, setCharacterHealth] = useState(6);
    const [characterCurrentPsi, setcharacterCurrentPsi] = useState(4);
    const [characterPsiPerTurn, setcharacterPsiPerTurn] = useState(2);
    const [characterChannelledPsi, setcharacterChannelledPsi] = useState(0);
    const characterSpellSlots = [];
    const characterAction = true;
    const characterBonusAction = true;
    const characterReaction= true;
    const [characterErrorMessages, setCharacterErrorMessages] = useState([]);
    
    // Handler
    const characterHandler = (event) => {
        event.preventDefault();
        console.log(characterCurrentPsi);
        const newCharacter = {
            name: characterName, 
            health: characterHealth, 
            level: characterLevel, 
            current_Psi: characterCurrentPsi, 
            psi_Per_Turn: characterPsiPerTurn,
            channelled_Psi: characterChannelledPsi, 
            action: characterAction, 
            bonusAction: characterBonusAction, 
            reaction: characterReaction, 
            spellSlots: characterSpellSlots
        };

        let formErrors = false;
        let messageErrors = [];

        if(characterName.length < 2){
            formErrors = true;
            messageErrors.push("Name is too short!")
        }

        if(!formErrors){
            axios.post("http://localhost:8000/character", newCharacter)
                .then(res => {
                    console.log(res);
                    addcharacter(res.data);
                    setCharacterName("");
                    setCharacterHealth(6);
                    setCharacterLevel(1);
                    setcharacterCurrentPsi(0);
                    setcharacterChannelledPsi(0);
                    navigate("/new");
                })
                .catch(err => {
                    

                    if (err.response !== undefined){
                        console.log(err.response);

                    const {errors} = err.response;
                    setCharacterErrorMessages(Object.keys(errors).map(error => errors[error].message));
                    }
                })
        }else{
            // show errors
        }
    }

   function setLevel(level) {
    let newPsi = Number(MaxPsiDictionary[level]);
    console.log(newPsi)
    setcharacterCurrentPsi(newPsi);
    console.log(characterCurrentPsi);
    let turnPsi = Number(turnPsiDictionary[level]);
    setcharacterPsiPerTurn(turnPsi);
    setCharacterLevel(level);
    console.log(characterLevel);
   }

// ClientSide
    return (<div>
        <div className="TableWrapper">
            <h3>
                <Link to={"/"} >Show all!</Link>
            </h3>
            <div className="createTable">
                <h2>
                    Character
                </h2>
                {
                    characterErrorMessages.map((val, i) =>
                        <p key={i}>{val}</p>
                    )
                }

                <form onSubmit={characterHandler}>
                    <p>
                        Name:
                    </p>
                    <input type="text" value={characterName} onChange={e => setCharacterName(e.target.value)} />
                    <p>
                        Level:
                    </p>
                    <select value={characterLevel} onChange={e => setLevel(e.target.value)}>
                        {
                            levels.map((level, i) =>
                                <option key={i} value={level}>{level}</option>
                            )
                        }
                    </select>
                    <p>
                        Health:
                    </p>
                    <input type="number" value={characterHealth} onChange={e => setCharacterHealth(e.target.value)} />

                    <br/><input type="submit" value="Create Character" />
                </form>
            </div>

            <h1>
                current Psi: {characterCurrentPsi}
            </h1>
        </div>
    </div>)

}

export default Character;