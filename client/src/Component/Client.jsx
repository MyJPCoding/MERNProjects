import { Link } from '@reach/router';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

const Client  = ({id, actions, bonusActions, reactions}) => {

    const [counter, setCounter] = useState(0);

    const [character, setCharacter] = useState({});
    useEffect(() => {
        axios.get(`http://localhost:8000/character/${id}`)
            .then(res => {
                setCharacter(res.data);
            })
    }, [id]);
    console.log(character.name);
    const [psiPerTurn, setPsiPerTurn] = useState(2);
    const [psiLeftInRound, setPsiLeftInRound] = useState(2);
    const [channelledPsi, setChannelledPsi] = useState(0);
    const [totalPsiPool, setTotalPsiPool] = useState(4);
    const [psiUsedInRound, setPsiUsedInRound] = useState(0);
    const [availablePsi, setAvailablePsi] = useState(2);


    

    
    // action variables
    const [chosenAction, setChosenAction] = useState({});
    const [selectedActionId, setSelectedActionId] = useState("5fd11994f70a411c7c2d4cdd");
    const [selectedAction, setSelectedAction] = useState({});
    const [actionPsiUpcast, setActionPsiUpcast] = useState(0);

    // bonusAction variables
    const [chosenBonusAction, setChosenBonusAction] = useState({});
    const [selectedBonusActionId, setSelectedBonusActionId] = useState("5fcfa99c125c6a4b18f4d140");
    const [selectedBonusAction, setSelectedBonusAction] = useState({});
    const [bonusActionPsiUpcast, setBonusActionPsiUpcast] = useState(0);


    // reaction variables
    const [chosenReaction, setChosenReaction] = useState({});
    const [selectedReactionId, setSelectedReactionId] = useState("5fd119baf70a411c7c2d4cde");
    const [selectedReaction, setSelectedReaction] = useState({});
    const [reactionPsiUpcast, setReactionPsiUpcast] = useState(0);


    // action list
    function ActionList() {
        const availableActions = actions.filter(action => action.min_psi_cost <= availablePsi + chosenAction.min_psi_cost)
        return ( 
            availableActions.map((action, index) =>
                <option key={index} value={action._id} selected={chosenAction.name === action.name}>
                    {action.name}
                </option>
            )
        )
    }

    // selecting action from drop down 
    function SelectActionOption(entry){

        setSelectedActionId(entry);
        setActionPsiUpcast(0);
    }

    function ActionUpCastChecker(entry){
        if (entry != null){ 
            const numberAction = Number(entry);
            if (numberAction < 0){
                setActionPsiUpcast(0);
            } else {
                const NetActionPsi = Number(chosenAction.max_psi_cost) - Number(chosenAction.min_psi_cost);
                if (actionPsiUpcast > numberAction){ 
                    setActionPsiUpcast(numberAction)
                } else {
                    if (availablePsi > 0) {
                        if (numberAction > NetActionPsi){
                            setActionPsiUpcast(NetActionPsi);
                        } else {
                            setActionPsiUpcast(numberAction);
                        } 
                    }
                }
            }
        }

    }

    // bonus action list
    function BonusActionList() {
        const availableBonusActions = bonusActions.filter(bonusAction => bonusAction.min_psi_cost <= availablePsi + chosenBonusAction.min_psi_cost)
        return ( 
            availableBonusActions.map((bonusAction, index) =>
                <option key={index} value={bonusAction._id} selected={chosenBonusAction.name === bonusAction.name}>
                    {bonusAction.name}
                </option>
            )
        )
    }

    // select bonus action from drop down
    function SelectBonusActionOption(entry){

        setSelectedBonusActionId(entry);
        setBonusActionPsiUpcast(0);
    }

    function BonusActionUpCastChecker(entry){
        if (entry != null){ 
            const numberBonusAction = Number(entry);
            if (numberBonusAction < 0){
                setReactionPsiUpcast(0);
            } else {
                const NetBonusActionPsi = chosenBonusAction.max_psi_cost - chosenBonusAction.min_psi_cost;
                if (bonusActionPsiUpcast > numberBonusAction){
                    setBonusActionPsiUpcast(numberBonusAction);
                }else {
                    if (availablePsi > 0) {
                        if (numberBonusAction > NetBonusActionPsi){
                            setBonusActionPsiUpcast(NetBonusActionPsi);
                        } else {
                            setBonusActionPsiUpcast(numberBonusAction);
                        } 
                    }
                }
            }
        }

    }

    // reaction list
    function ReactionList() {
        const availableReactions = reactions.filter(reaction => reaction.min_psi_cost <= availablePsi + chosenReaction.min_psi_cost)
        return ( 
            availableReactions.map((reaction, index) =>
                <option key={index} value={reaction._id} selected={chosenReaction.name === reaction.name}>
                    {reaction.name}
                </option>
            )
        )
    }

    // selecting reaction from drop down
    function SelectReactionOption(entry){

        setSelectedReactionId(entry);
        setReactionPsiUpcast(0);
    }

    function ReactionUpCastChecker(entry){
        if (entry !== null){ 
            const numberReaction = Number(entry);
            if (numberReaction < 0){
                setReactionPsiUpcast(0);
            } else {
                const NetReactionPsi= chosenReaction.max_psi_cost - chosenReaction.min_psi_cost;
                if (reactionPsiUpcast > numberReaction){
                    setReactionPsiUpcast(numberReaction);
                } else {
                    if (availablePsi > 0) {
                        if ( numberReaction > NetReactionPsi){
                            setReactionPsiUpcast(NetReactionPsi);
                        } else {
                            setReactionPsiUpcast(numberReaction);
                        }
                    } else {
                        setReactionPsiUpcast(reactionPsiUpcast)
                    }
                }
            }
        }
    }

    // auto update selected action
    useEffect(() => {
        axios.get(`http://localhost:8000/action/${selectedActionId}`)
            .then(res => {
                setSelectedAction(res.data)
                setChosenAction(res.data)
            })
    }, [selectedActionId]);

    // auto update selected bonus action
    useEffect(() => {
        axios.get(`http://localhost:8000/bonusAction/${selectedBonusActionId}`)
            .then(res => {
                setSelectedBonusAction(res.data)
                setChosenBonusAction(res.data)
            })
    }, [selectedBonusActionId]);

    // auto update selected reaction 
    useEffect(() => {
        axios.get(`http://localhost:8000/reaction/${selectedReactionId}`)
            .then(res => {
                setSelectedReaction(res.data)
                setChosenReaction(res.data)
            })
    }, [selectedReactionId]);

    function CalculateLeftOverPsi(){
        if ( Number.isInteger(character.level) && counter === 0){
            setPsiPerTurn(character.psi_Per_Turn);
            setPsiLeftInRound(character.psi_Per_Turn);
            setAvailablePsi(character.psi_Per_Turn);
            setTotalPsiPool(character.current_Psi);

            setCounter(1);

            return (availablePsi);
        }
        else if (counter === 1) {
            console.log("Available Psi: " + availablePsi);
            console.log("Total Psi: " +totalPsiPool);
            console.log("Psi Per Turn: "+psiPerTurn);
            let totalPsiCostAction = Number(chosenAction.min_psi_cost) + actionPsiUpcast;
            let totalPsiCostBonusAction = Number(chosenBonusAction.min_psi_cost) + bonusActionPsiUpcast;
            console.log(totalPsiCostBonusAction);
            let totalPsiCostReaction = Number(chosenReaction.min_psi_cost) + reactionPsiUpcast;
            console.log(totalPsiCostReaction);
            let totalPsiCost = totalPsiCostAction + totalPsiCostBonusAction + totalPsiCostReaction;
            console.log(totalPsiCost);
            setPsiUsedInRound(totalPsiCost);
            let netPsiTotal = (psiLeftInRound + channelledPsi) - totalPsiCost;
            console.log(psiLeftInRound);
            console.log(channelledPsi);
            console.log(netPsiTotal);
            setAvailablePsi(netPsiTotal);
            console.log(availablePsi);
            return (availablePsi);
        } else {
            return 0;
        }
    }

    function RoundHappens(){
        let newPsiPool = totalPsiPool - psiUsedInRound;
        if (psiUsedInRound > psiPerTurn){
            let netPsi = psiUsedInRound-psiPerTurn;
            let newChannelledAmount = channelledPsi - netPsi;
            setChannelledPsi(newChannelledAmount);
        } else if (psiUsedInRound === psiPerTurn + channelledPsi){
            setChannelledPsi(0);
        } 
        console.log(newPsiPool);
        setTotalPsiPool(newPsiPool);
        if (chosenBonusAction.name === "Channeling Psi"){
            let psiChannelling = chosenBonusAction.min_psi_cost + bonusActionPsiUpcast;
            console.log(psiChannelling);
            psiChannelling = channelledPsi + psiChannelling/2;
            console.log(psiChannelling);
            setChannelledPsi(psiChannelling); 
        }

        console.log(chosenBonusAction.name);

        setSelectedActionId("5fd11994f70a411c7c2d4cdd");
        setSelectedBonusActionId("5fcfa99c125c6a4b18f4d140");
        setSelectedReactionId("5fd119baf70a411c7c2d4cde");

        setActionPsiUpcast(0);
        setBonusActionPsiUpcast(0);
        setReactionPsiUpcast(0);


    }

    function LongRest(){

        setSelectedActionId("5fd11994f70a411c7c2d4cdd");
        setSelectedBonusActionId("5fcfa99c125c6a4b18f4d140");
        setSelectedReactionId("5fd119baf70a411c7c2d4cde");

        setActionPsiUpcast(0);
        setBonusActionPsiUpcast(0);
        setReactionPsiUpcast(0);

        setTotalPsiPool(character.current_Psi);

        setChannelledPsi(0);


    }

return (  <div className="mainWrapper">
    <div className="contentWrapper">
    <Link to={"/"}>Home Page</Link>
    <h1>
        {character.name}
    </h1>
        <div className="counterWrapper">
            <h1>
                Total Psi Pool: {totalPsiPool}
                <br/>

                Available Psi for Round: <CalculateLeftOverPsi/>
                <br/>

                Channelled Psi: {channelledPsi}
            </h1>
        </div>
        <div className="DropDownWrapper">
            <div className="DropDown">
                <div>
                    <p>
                        Actions:
                    </p>
                    <select type="number" name={chosenAction.name} onChange={e => SelectActionOption(e.target.value)}>
                        <ActionList/>
                    </select>
                </div>
                <div>
                    <p>
                        UpCast: 
                    </p>
                    <input type="number" value={actionPsiUpcast} onChange={e => ActionUpCastChecker(e.target.value)}>
                    </input>
                </div>
            </div>

            <div className="DropDown">
                <div>
                    <p>
                        Bonus Actions: 
                    </p>
                    <select name={chosenBonusAction.name} onChange={e => SelectBonusActionOption(e.target.value)}>
                            <BonusActionList/>
                    </select>
                </div>
                <div>
                    <p>
                        UpCast: 
                    </p>
                    <input type="number" value={bonusActionPsiUpcast} onChange={e => BonusActionUpCastChecker(e.target.value)}></input>
                </div>
            </div>

            <div className="DropDown">
                <div>
                    <p>
                        Reactions: 
                    </p>
                    <select name={chosenReaction.name} onChange={e => SelectReactionOption(e.target.value)}>
                        <ReactionList/>
                    </select>
                </div>
                <div>
                    <p>
                        UpCast:  
                    </p>
                    <input type="number" value={reactionPsiUpcast} onChange={e => ReactionUpCastChecker(e.target.value)}></input>
                </div>
            </div>
        </div>
        <div className="DropDownWrapper">
           
            <button onClick={e => RoundHappens()}>Lock In Round</button>

            <button onClick={e => LongRest()}>Long Rest</button>

        </div>
        <hr />

        <div className="DescriptionWrapper">
            <div className="Descriptions">
                <h4>
                    Name: {selectedAction.name}

                    <br/>

                    {selectedAction.min_psi_cost > 0 && <div>

                        Minimum Psi Cost: {selectedAction.min_psi_cost}

                    </div>}

                    {selectedAction.min_psi_cost > 0 && <div>

                        Maximum Psi Cost: {selectedAction.max_psi_cost}

                    </div>}

                    <br/>

                    Description
                    <h5>
                        {selectedAction.description}
                    </h5>
                </h4>

                <br/>
                
            </div>

            <div className="Descriptions">
                <h4>
                    Name: {selectedBonusAction.name}

                    <br/>

                    {selectedBonusAction.min_psi_cost > 0 && <div>

                        Minimum Psi Cost: {selectedBonusAction.min_psi_cost}

                    </div>}

                    {selectedBonusAction.min_psi_cost > 0 && <div>

                        Maximum Psi Cost: {selectedBonusAction.max_psi_cost}

                    </div>}

                    <br/>

                    Description
                    <h5>
                        {selectedBonusAction.description}
                    </h5>
                </h4> 

                <br/>
                
            </div>

            <div className="Descriptions">
                <h4>
                    Name: {selectedReaction.name}

                    <br/>

                    {selectedReaction.min_psi_cost > 0 && <div>

                        Minimum Psi Cost: {selectedReaction.min_psi_cost}

                    </div>}

                    {selectedReaction.min_psi_cost > 0 && <div>

                        Maximum Psi Cost: {selectedReaction.max_psi_cost}

                    </div>}

                    <br/>

                    Description
                    <h5>
                        {selectedReaction.description}
                    </h5>
                </h4>

                <br/>
                
            </div>
        </div>
    </div>
</div>  )





}

export default Client;