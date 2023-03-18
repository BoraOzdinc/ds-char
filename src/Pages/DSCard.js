import React, { useEffect, useState } from "react";

export default function DSCard(props) {
    const [characterState, setCharacterState] = useState([]);

    useEffect(() => {
        setCharacterState([]);

        fetch(
            `https://demon-slayer-api.onrender.com/v1/${transformName(
                props.character_name
            )}`
        )
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setCharacterState(data[0]);
                console.log(data[0]);
            });
    }, [props.character_name]);

    const { name, gallery, image, ...otherProps } = characterState;

    function urlFixer(url) {
        const revisionIndex = url.indexOf("revision");
        if (revisionIndex !== -1) {
            return url.substring(0, revisionIndex - 1);
        } else {
            return url;
        }
    }
    function transformName(name) {
        return name.replace(/\s+/g, "_");
    }
    return (
        <div className="ds--card">
            {characterState.length === 0 ? (
                <h3>Loading...</h3>
            ) : (
                <>
                    <h2>{name}</h2>
                    <img className="ds--img" src={urlFixer(image)} alt={name} />
                    <ul>
                        {Object.entries(otherProps).map(([key, value]) => (
                            <li key={key}>
                                <strong>{key}: </strong>
                                {value}
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
}
