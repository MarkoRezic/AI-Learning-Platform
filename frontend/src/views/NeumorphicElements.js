import "../styles/NeumorphicElements.css";
import { Link } from "react-router-dom";
import { permutationsWithReplacement } from "../utils/variations";
import { useState } from "react";

function NeumorphicElements() {
    const [shadow, setShadow] = useState('');
    const [shadowInset, setShadowInset] = useState('');
    const [buldge, setBuldge] = useState('');
    const [dip, setDip] = useState('');
    const [border, setBorder] = useState('');
    const [rounded, setRounded] = useState('');
    const properties = [
        "shadow",
        "shadow-inset",
        "buldge",
        "dip",
        "border",
        "rounded"
    ];
    const sizes = [
        "",
        "small",
        "mid",
        "large",
        "xlarge",
        "circular"
    ];

    const changeProperty = (e, propertyName) => {
        switch (propertyName) {
            case "shadow":
                setShadow(e.target.value)
                break;
            case "shadow-inset":
                setShadowInset(e.target.value)
                break;
            case "buldge":
                setBuldge(e.target.value)
                if (e.target.value !== '') {
                    setDip('')
                    let radioGroup = document.getElementsByName('dip')
                    for (let radioButton of radioGroup) {
                        radioButton.checked = false;
                    }
                }
                break;
            case "dip":
                setDip(e.target.value)
                if (e.target.value !== '') {
                    setBuldge('')
                    let radioGroup = document.getElementsByName('buldge')
                    for (let radioButton of radioGroup) {
                        radioButton.checked = false;
                    }
                }
                break;
            case "border":
                setBorder(e.target.value)
                break;
            case "rounded":
                setRounded(e.target.value)
                break;
        }
    }

    const property_sizes = [...permutationsWithReplacement(sizes, properties.length)]
        .filter((sizes_row) => (sizes_row[0] !== '' || sizes_row[1] !== '') && sizes_row.filter((size, size_index) => size_index !== 5).every((size, size_index) => size !== sizes[5]))
        .filter((sizes_row) => (sizes_row[0] === shadow && sizes_row[1] === shadowInset && sizes_row[2] === buldge && sizes_row[3] === dip && sizes_row[4] === border && sizes_row[5] === rounded))
        .map(
            (sizes_row) =>
                sizes_row.map(
                    (size, size_index) => size === '' ? '' : `${properties[size_index]}${size !== '' ? '-' : ''}${size}`
                ).join(" ")
        )
    console.log(property_sizes)


    return (
        <div id="neumorphic-elements">
            <div className="properties">
                {
                    properties.map((property, property_index) =>
                        <div className="property-row">
                            <p key={property_index}>{property}</p>
                            {
                                sizes.filter((size, size_index) => property !== "rounded" ? size !== "circular" : true).map((size, size_index) =>
                                    <>
                                        <input type="radio" value={size} onChange={(e) => { changeProperty(e, property) }} key={size_index} name={property} />
                                        <label>{size === '' ? 'none' : size}</label>
                                    </>
                                )
                            }
                        </div>
                    )
                }
            </div>
            <div className="preview">
                {
                    property_sizes.map((property_size, property_size_index) => <div className={property_size} key={property_size_index} ></div>)
                }
            </div>
        </div>
    );
}

export default NeumorphicElements;
