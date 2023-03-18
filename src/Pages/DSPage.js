import React, { useEffect, useState } from "react";
import DSCard from "./DSCard";

export default function DSPage() {
    const [characters, setCharacters] = useState([]);
    const [selected, setSelected] = useState("");

    useEffect(() => {
        fetch("https://demon-slayer-api.onrender.com/v1")
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setCharacters(data);
            });
    }, []);

    const handleChange = (event) => {
        const { value } = event.target;
        setSelected(value);
    };

    return (
        <div className="ds--container">
            {characters.length === 0 ? (
                <div>
                    <h4>characters loading</h4>
                </div>
            ) : (
                <>
                    <h1>{selected}</h1>
                    <select className="ds--select" onChange={handleChange}>
                        <option value="">Select !</option>
                        {characters.map((char) => (
                            <option value={char.name}>{char.name}</option>
                        ))}
                    </select>
                </>
            )}
            {selected === "" ? (
                <p>Please Select a character</p>
            ) : (
                <DSCard character_name={selected} />
            )}
        </div>
    );
}
