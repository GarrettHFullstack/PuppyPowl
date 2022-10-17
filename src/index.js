import React, {useEffect, useState} from "react"
import ReactDOM from "react-dom"
import Search from "./SeachBar"

const Button = (props) => {
    
    const keys = []
    for(let i in props.carrot){
        keys.push(i)
    }

    const [buttonSelector, setButtonSelector] = useState(false);
    return (
    <div className="containerButton">
    <button className="buttonThing" onClick = {() => {
        setButtonSelector(!buttonSelector)
        console.log(buttonSelector)
      }}> Breed: {props.carrot.breed}</button>
      {buttonSelector == true ? <div className = "Text1">{keys.map((names,index) => names.toUpperCase() != "IMAGEURL" && names.toUpperCase() != "CREATEDAT" && names.toUpperCase() !="UPDATEDAT" ? <div key = {index} className="infoText">{names.toUpperCase() + ": " +props.carrot[names]}</div> : null)}</div> : <img src = {props.carrot.imageUrl}></img>}
      
    </div>
    
    )
}

const Puppy = () => {
    const [puppyType,setPuppyType] = useState();
    const [filterpuppyType,setFilterPuppyType] = useState();
    useEffect (() => {
        async function getPuppyData(){
            try {
                const responce = await fetch("https://fsa-puppy-bowl.herokuapp.com/api/2209-ftb-mt-web-ft/players")
                const newData = await responce.json()
                setFilterPuppyType(newData.data.players)
                setPuppyType(newData.data.players)
                console.log(newData.data.players)
            } catch (error) {
                console.log(error)
             }
        }
        // console.log(puppyType)
        getPuppyData()
    },[])

    return (
        <div>
        <Search info = {[puppyType,setPuppyType]} filtered = {[filterpuppyType,setFilterPuppyType]}/>
        <div className = "row">
             {filterpuppyType && filterpuppyType.length ? filterpuppyType.map((event,index) => {
                return <div key = {index} className = "container">
                    <div className="text">{event.name}</div>
                    <Button name = {event.name} carrot = {event} />
                    </div>
             })   : "NO PUPPIES FOUND"
             }
        </div>
        </div>
        )
}
    



ReactDOM.render(<Puppy />, document.getElementById("app"))