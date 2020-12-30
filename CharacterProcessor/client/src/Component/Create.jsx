import React, {useState} from 'react';
import { Link, navigate } from '@reach/router';
import axios from 'axios';
import '../App.css';

const Create = (addcharacter, addAction, addBonusAction, addReaction) => {
    const levels = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
    const spellLevelList = [0,1,2,3,4,5,6,7,8,9];
    const [entryChoice, setEntryChoice] = useState("character");
    const [isSpell, setisSpell] = useState(false);

// Character 
    const [characterName, setCharacterName] = useState("");
    const [characterLevel, setCharacterLevel] = useState(1);
    const [characterHealth, setCharacterHealth] = useState(6);
    const [characterCurrentPsi, setcharacterCurrentPsi] = useState(4);
    const [characterChannelledPsi, setcharacterChannelledPsi] = useState(0);
    const [characterSpellSlots, setCharacterSpellSlots] = useState([]);
    const [characterAction, setcharacterAction] = useState(true);
    const [characterBonusAction, setcharacterBonusAction] = useState(true);
    const [characterReaction, setcharacterReaction] = useState(true);
    const [characterErrorMessages, setCharacterErrorMessages] = useState([]);
    
    // Handler
    const characterHandler = (event) => {
        event.preventDefault();
        const newCharacter = {
            name: characterName, 
            health: characterHealth, 
            level: characterLevel, 
            current_Psi: characterCurrentPsi, 
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

// Action
    const [actionName, setActionName] = useState("");
    const [actionDescription, setActionDescription] = useState("");
    const [actionSpellLevel, setActionSpellLevel] = useState(-1);
    const [actionUsesPsi, setActionUsesPsi] = useState(false);
    const [actionPsiMinCost, setActionPsiMinCost] = useState(0);
    const [actionPsiMaxCost, setActionPsiMaxCost] = useState(0);
    const [actionErrorMessages, setActionErrorMessages] = useState([]);

    const actionHandler = (event) => {
        event.preventDefault();
        const newAction = {
            name: actionName, 
            description: actionDescription, 
            spellLevel: actionSpellLevel, 
            uses_psi: actionUsesPsi,
            min_psi_cost: actionPsiMinCost,
            max_psi_cost: actionPsiMaxCost
        };

        let formErrors = false;
        let messageErrors = [];

        if(actionName.length < 2){
            formErrors = true;
            messageErrors.push("Name is too short!")
        }

        if(!formErrors){
            axios.post("http://localhost:8000/action", newAction)
                .then(res => {
                    console.log(res);
                    addAction(res.data);
                    setActionName("");
                    setActionDescription("");
                    setisSpell(false);
                    setActionErrorMessages("");
                    setActionSpellLevel(-1);
                    setActionUsesPsi(false);
                    setActionPsiMinCost(0);
                    setActionPsiMaxCost(0);
                    navigate("/new");
                })
                .catch(err => {
                    if (err.response !== undefined){
                        console.log(err.response);
                    const {errors} = err.response;
                    setActionErrorMessages(Object.keys(errors).map(error => errors[error].message));
                    }
                })
        }else{
            // show errors
        }

    }

// Bonus Action
    const [BonusActionName, setBonusActionName] = useState("");
    const [BonusActionDescription, setBonusActionDescription] = useState("");
    const [BonusActionSpellLevel, setBonusActionSpellLevel] = useState(-1);
    const [bonusActionUsesPsi, setBonusActionUsesPsi] = useState(false);
    const [bonusActionPsiMinCost, setBonusActionPsiMinCost] = useState(0);
    const [bonusActionPsiMaxCost, setBonusActionPsiMaxCost] = useState(0);
    const [BonusActionErrorMessages, setBonusActionErrorMessages] = useState([]);

    const bonusActionHandler = (event) => {
        event.preventDefault();
        const newBonusAction = {
            name: BonusActionName, 
            description: BonusActionDescription, 
            spellLevel: BonusActionSpellLevel, 
            uses_psi: bonusActionUsesPsi,
            min_psi_cost: bonusActionPsiMinCost,
            max_psi_cost: bonusActionPsiMaxCost
        };

        let formErrors = false;
        let messageErrors = [];

        if(BonusActionName.length < 2){
            formErrors = true;
            messageErrors.push("Name is too short!")
        }

        if(!formErrors){
            axios.post("http://localhost:8000/bonusAction", newBonusAction)
                .then(res => {
                    console.log(res);
                    addBonusAction(res.data);
                    setBonusActionName("");
                    setBonusActionDescription("");
                    setisSpell(false);
                    setBonusActionErrorMessages("");
                    setBonusActionSpellLevel(-1);
                    setBonusActionUsesPsi(false);
                    setBonusActionPsiMinCost(0);
                    setBonusActionPsiMaxCost(0);
                    navigate("/new");
                })
                .catch(err => {
                    if (err.response !== undefined){
                        console.log(err.response);
                    const {errors} = err.response;
                    setBonusActionErrorMessages(Object.keys(errors).map(error => errors[error].message));
                    }
                })
        }else{
            // show errors
        }
    }

// Reaction
    const [ReactionName, setReactionName] = useState("");
    const [ReactionDescription, setReactionDescription] = useState("");
    const [ReactionSpellLevel, setReactionSpellLevel] = useState(-1);
    const [reactionUsesPsi, setReactionUsesPsi] = useState(false);
    const [reactionPsiMinCost, setReactionPsiMinCost] = useState(0);
    const [reactionPsiMaxCost, setReactionPsiMaxCost] = useState(0);
    const [ReactionErrorMessages, setReactionErrorMessages] = useState([]);

    const reactionHandler = (event) => {
        event.preventDefault();
        const newReaction = {
            name: ReactionName, 
            description: ReactionDescription, 
            spellLevel: ReactionSpellLevel, 
            uses_psi: reactionUsesPsi,
            min_psi_cost: reactionPsiMinCost,
            max_psi_cost: reactionPsiMaxCost
        };

        let formErrors = false;
        let messageErrors = [];

        if(ReactionName.length < 2){
            formErrors = true;
            messageErrors.push("Name is too short!")
        }

        if(!formErrors){
            axios.post("http://localhost:8000/reaction", newReaction)
                .then(res => {
                    console.log(res);
                    addReaction(res.data);
                    setReactionName("");
                    setReactionDescription("");
                    setisSpell(false);
                    setReactionErrorMessages("");
                    setReactionSpellLevel(-1);
                    setReactionUsesPsi(false);
                    setReactionPsiMinCost(0);
                    setReactionPsiMaxCost(0);
                    navigate("/new");
                })
                .catch(err => {
                    if (err.response !== undefined){
                        console.log(err.response);
                    const {errors} = err.response;
                    setReactionErrorMessages(Object.keys(errors).map(error => errors[error].message));
                    }
                })
        }else{
            // show errors
        }
    }

// Spell Sort

    function SpellDropDown() {
        if (isSpell) {
            return ( 
                spellLevelList.map((level, i) =>
                    <option key={i} value={level}>
                        {level}
                    </option>
                )
            )
        } else {
            return ( 
                <p>
                    Not a Spell
                </p>
            )
        }
    }

    function ChangeEntry(chosenEntry) {
        setEntryChoice(chosenEntry);
        setisSpell(false);
    }


// ClientSide
return (
    <div>
        <div className="TableWrapper">
            <h3>
                <Link to={"/"} >Show all!</Link>
            </h3>
            <div>
                <h4>
                    Type of Entry:
                
                    <select value={entryChoice} onChange={e => ChangeEntry(e.target.value)}>
                        <option value="character">Character</option>
                        <option value="action">Action</option>
                        <option value="bonusAction">Bonus Action</option>
                        <option value="reaction">Reaction</option>
                    </select>
                </h4>
            </div> 

            {entryChoice==="character" && <div className="createTable">
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
                    <select value={characterLevel} onChange={e => setCharacterLevel(e.target.value)}>
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
            }
            
            {entryChoice==="action" && <div className="CreateTable">
                <h2>
                    Action
                </h2>
                {
                    actionErrorMessages.map((val, i) =>
                        <p key={i}>{val}</p>
                    )
                }

                <form onSubmit={actionHandler}>
                    <p>
                        Name: 
                    </p>
                    <input type="text" value={actionName} onChange={e => setActionName(e.target.value)} />
                    <p>
                        Description:
                    </p>
                    <input type="text" value={actionDescription} onChange={e => setActionDescription(e.target.value)} />
                    <p>
                        Spell: 

                        <input
                            type="checkbox"
                            defaultChecked={isSpell}
                            onChange={() => setisSpell(!isSpell)}
                        />
                    </p>
                    {isSpell===true && <div> 
                        <p>
                            Level: 

                            <select value={actionSpellLevel} onChange={e => setActionSpellLevel(e.target.value)}>
                                    <SpellDropDown/>
                            </select>
                        </p> 
                    </div>}
                    <p>
                        Uses Psi: 

                        <input
                            type="checkbox"
                            defaultChecked={actionUsesPsi}
                            onChange={() => setActionUsesPsi(!actionUsesPsi)}
                        />
                    </p>
                    {actionUsesPsi===true && <div> 
                        
                        <p>
                            Minimum Psi Cost:

                            <input type="number" value={actionPsiMinCost} onChange={e => setActionPsiMinCost(e.target.value)} />
                        </p>


                        <p>
                            Maximum Psi Cost:

                            <input type="number" value={actionPsiMaxCost} onChange={e => setActionPsiMaxCost(e.target.value)} />
                        </p>

                    </div> }

                    <br/>
                    <input type="submit" value="Create Action" />
                </form>
            </div>}

            {entryChoice==="bonusAction" && <div className="createTable">
                <h2>
                    Bonus Action
                </h2> 

                <form onSubmit={bonusActionHandler}>
                    <p>
                        Name:
                    </p>
                    <input type="text" value={BonusActionName} onChange={e => setBonusActionName(e.target.value)} />
                    <p>
                        Description:
                    </p>
                    <input type="text" value={BonusActionDescription} onChange={e => setBonusActionDescription(e.target.value)} />
                    <p>
                        Spell: 

                        <input
                            type="checkbox"
                            defaultChecked={isSpell}
                            onChange={() => setisSpell(!isSpell)}
                        />
                    </p>
                    {isSpell===true && <div> 
                        <p>
                            Level:
                        
                            <select value={BonusActionSpellLevel} onChange={e => setBonusActionSpellLevel(e.target.value)}>
                                <SpellDropDown/>
                            </select>
                         </p> 
                    </div>}

                    <p>
                        Uses Psi:

                        <input
                            type="checkbox"
                            defaultChecked={bonusActionUsesPsi}
                            onChange={() => setBonusActionUsesPsi(!bonusActionUsesPsi)}
                        />
                    </p>

                    {bonusActionUsesPsi===true && <div> 
                        <p>
                            Minimum Psi Cost: 

                            <input type="number" value={bonusActionPsiMinCost} onChange={e => setBonusActionPsiMinCost(e.target.value)} />
                        </p>

                        <p>
                            Maximum Psi Cost: 

                            <input type="number" value={bonusActionPsiMaxCost} onChange={e => setBonusActionPsiMaxCost(e.target.value)} />
                        </p>
                    </div>}

                    <br/>
                    <input type="submit" value="Create BonusAction" />
                </form>

            </div>}

            {entryChoice==="reaction" && <div className="createTable">
                <h2>
                    Reaction
                </h2>
                <form onSubmit={reactionHandler}>
                    <p>
                        Name:
                    </p>
                    <input type="text" value={ReactionName} onChange={e => setReactionName(e.target.value)} />

                    <p>
                        Description:
                    </p>
                    <input type="text" value={ReactionDescription} onChange={e => setReactionDescription(e.target.value)} />

                    <p>
                        Spell: 
                        <input
                            type="checkbox"
                            defaultChecked={isSpell}
                            onChange={() => setisSpell(!isSpell)}
                        />
                    </p>
                    {isSpell===true && <div> 
                        <p>
                            Level:

                            <select value={ReactionSpellLevel} onChange={e => setReactionSpellLevel(e.target.value)}>
                                <SpellDropDown/>
                            </select> 
                        </p> 
                    </div>}
                    
                    <p>
                        Uses Psi: 

                        <input
                            type="checkbox"
                            defaultChecked={reactionUsesPsi}
                            onChange={() => setReactionUsesPsi(!reactionUsesPsi)}
                        />
                    </p>

                    {reactionUsesPsi===true && <div> 
                        <p>
                            Minimum Psi Cost:

                            <input type="number" value={reactionPsiMinCost} onChange={e => setReactionPsiMinCost(e.target.value)} />
                        </p>

                        <p>
                            Maximum Psi Cost:
                            
                            <input type="number" value={reactionPsiMaxCost} onChange={e => setReactionPsiMaxCost(e.target.value)} />
                        </p>
                    </div>}

                    <br/>
                    <input type="submit" value="Create Reaction" />
                </form>
            </div>}

        </div>
    </div>
    )
}

export default Create;