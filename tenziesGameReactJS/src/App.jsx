import React from "react"
import Dice from "./Dice"
import Confetti from 'react-confetti'

export default function App(){
    const [dices, setDices] = React.useState(generateDiceData())
    const [tenzies, setTenzies] = React.useState(false)

    React.useEffect(()=>{
        let allHeld = dices.every(d=>d.isHeld===true)
        let sampleValue = dices[0].value
        let allSame = dices.every(d=>d.value===sampleValue)
        if(allHeld && allSame){
            setTenzies(true)
        } 
    }, [dices])

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
        if(tenzies){
            setDices(generateDiceData())
            setTenzies(false)
        }else{
            //change dice value unless it is held
        setDices(prevDices => prevDices.map(d=> !d.isHeld ?
            {...d, value:generateRandomDiceNumber()}
            : d
            ))
        }
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
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="dicesContainer">
                {diceElements}
            </div>
            <button onClick={rollDices} className="roll-dice">{tenzies ? "New Game" :"Roll"}</button>
        </main>
    )
}