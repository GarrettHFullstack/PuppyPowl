import react, {useEffect, useState} from "react"

const Search = (props) => {
    const [searchTerm, setSearchTerm] = useState("")
    const handleChange = (event) => {
        setSearchTerm(event.target.value)
        const [puppies, setPuppies] = props.info
        const [filteredPuppies, setFilterPuppies] = props.filtered
        const newPuppies = puppies.filter((puppy) => {
            return puppy.name.toLowerCase().includes(event.target.value.toLowerCase()) || puppy.breed.toLowerCase().includes(event.target.value.toLowerCase())
        })
        console.log(event.target.value)
       if(searchTerm == "") {
        setFilterPuppies(puppies)
       } else {
        setFilterPuppies(newPuppies)
       }
    }
    return(
        <div className="Input-Container">
        <p>Search:</p>
       <input onChange = {handleChange} value = {searchTerm}/> 
       </div>
    )
}

export default Search