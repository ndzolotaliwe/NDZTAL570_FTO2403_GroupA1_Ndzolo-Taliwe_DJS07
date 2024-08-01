import React from "react"

export default function Meme() {
    // State to manage meme data including the image URL and text
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg" 
    })
    
    // State to store all available memes fetched from the API
    const [allMemes, setAllMemes] = React.useState([])
    
    // Fetch memes from API once when the component mounts
    React.useEffect(() => {
        async function getMemes() {
            try {
                // Fetch meme data from API
                const res = await fetch("https://api.imgflip.com/get_memes")
                const data = await res.json()
                // Update state with the fetched memes
                setAllMemes(data.data.memes)
            } catch (error) {
                console.error("Failed to fetch memes:", error)
            }
        }
        getMemes()
    }, [])
    
    // Function to select a random meme image from the available memes
    function getMemeImage() {
        // Ensure there are memes to choose from
        if (allMemes.length === 0) return;
        
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomNumber].url
        // Update state with the selected meme image URL
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }))
    }
    
    // Function to handle input changes
    function handleChange(event) {
        const {name, value} = event.target
        // Update the corresponding text in the state
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }
    
    return (
        <main>
            <div className="form">
                {/* Input field for top text */}
                <input 
                    type="text"
                    placeholder="Top text"
                    className="form--input"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                />
                {/* Input field for bottom text */}
                <input 
                    type="text"
                    placeholder="Bottom text"
                    className="form--input"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                />
                {/* Button to fetch a new meme image */}
                <button 
                    className="form--button"
                    onClick={getMemeImage}
                >
                    Get a new meme image 🖼
                </button>
            </div>
            <div className="meme">
                {/* Display meme image */}
                <img src={meme.randomImage} className="meme--image" alt="Meme" />
                {/* Display top and bottom text */}
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    )
}
