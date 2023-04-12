import React from "react"
import Dice from "./Dice"

export default function App(){
    const [dices, setDices] = React.useState(generateDiceData())

    function generateRandomDiceNumber(){
            return Math.ceil(Math.random()*6)
    }
    function generateDiceData(){
        let diceArray = []
        for (let i = 0; i < 10; i++) {
            diceArray.push({
                id: crypto.randomUUID(),
                value: generateRandomDiceNumber(),
                isHeld : false
            })
        }
        return diceArray
    }

    function rollDices(){
        //change dice value unless it is held
        setDices(prevDices => prevDices.map(d=> !d.isHeld ?
            {...d, value:generateRandomDiceNumber()}
            : d
            ))
    }

    //felt like hold the door = hodor
    //holt the dice = holdice
    function holDice(id){

        //change isHeld property of clicked number
        setDices(prevDices => prevDices.map(d=> d.id === id ?
            {...d, isHeld:!d.isHeld}
            : d
            ))
    }


    const diceElements = dices.map(d=> <Dice 
        key={d.id} 
        value={d.value}
        isHeld={d.isHeld}
        handleClick={()=>holDice(d.id)}
        />)
    return(
        <main>
            <div className="gameDesc">Tenzies game</div>
            <div className="dicesContainer">
                {diceElements}
            </div>
            <button onClick={rollDices} className="roll-dice">Roll</button>
        </main>
    )
}