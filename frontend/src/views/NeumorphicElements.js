import { neumorphic_elements } from "../styles/styles";
import { Link } from "react-router-dom";
import { permutationsWithReplacement } from "../utils/variations";
import { useState } from "react";

function NeumorphicElements() {
    const [shadow, setShadow] = useState('');
    const [shadowInset, setShadowInset] = useState('');
    const [shadowSmooth, setShadowSmooth] = useState('');
    const [buldge, setBuldge] = useState('');
    const [dip, setDip] = useState('');
    const [border, setBorder] = useState('');
    const [rounded, setRounded] = useState('');
    const [invert, setInvert] = useState('none');
    const [transition, setTransition] = useState(false);
    const properties = [
        "shadow",
        "shadow-inset",
        "shadow-smooth",
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
                if (e.target.value !== '') {
                    setShadowSmooth('')
                    let radioGroup = document.getElementsByName('shadow-smooth')
                    for (let radioButton of radioGroup) {
                        radioButton.checked = false;
                    }
                }
                break;
            case "shadow-smooth":
                setShadowSmooth(e.target.value)
                if (e.target.value !== '') {
                    setShadowInset('')
                    let radioGroup = document.getElementsByName('shadow-inset')
                    for (let radioButton of radioGroup) {
                        radioButton.checked = false;
                    }
                }
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
        .filter((sizes_row) => (sizes_row[0] !== '' || sizes_row[1] !== '' || sizes_row[2] !== '') && sizes_row.filter((size, size_index) => size_index !== 6).every((size, size_index) => size !== sizes[5]))
        .filter((sizes_row) => (sizes_row[0] === shadow && sizes_row[1] === shadowInset && sizes_row[2] === shadowSmooth && sizes_row[3] === buldge && sizes_row[4] === dip && sizes_row[5] === border && sizes_row[6] === rounded))
        .map(
            (sizes_row) =>
                sizes_row.map(
                    (size, size_index) => size === '' ? '' : `${properties[size_index]}${size !== '' ? '-' : ''}${size}`
                ).join(" ").replace(/\s+/g, ' ').trim()
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
                <div className="property-row">
                    <p>invert</p>
                    <input type="radio" value="none" onChange={(e) => { setInvert(e.target.value) }} name="invert" />
                    <label>none</label>
                    <input type="radio" value="hover" onChange={(e) => { setInvert(e.target.value) }} name="invert" />
                    <label>hover</label>
                    <input type="radio" value="active" onChange={(e) => { setInvert(e.target.value) }} name="invert" />
                    <label>active</label>
                </div>
                <div className="property-row">
                    <p>transition</p>
                    <input type="checkbox" checked={transition} onChange={(e) => { setTransition(!transition) }} name="transition" />
                    <label>smooth</label>
                </div>
            </div>
            <div className="preview">
                {
                    property_sizes.map((property_size, property_size_index) => <div className={[property_size, invert === 'none' ? '' : `${invert}-invert`, transition === false ? '' : `transition-smooth`].join(" ")} key={property_size_index} ></div>)
                }
            </div>
            <div className="copy-class">
                {
                    [property_sizes[0], invert === 'none' ? '' : `${invert}-invert`, transition === false ? '' : `transition-smooth`].join(" ")
                }
                <div className="copy-button shadow-mid rounded-mid active-invert text-shadow-inset-small text-color-grey transition-smooth" onClick={() => { navigator.clipboard.writeText([property_sizes[0], invert === 'none' ? '' : `${invert}-invert`, transition === false ? '' : `transition-smooth`].join(" ")) }}>COPY</div>
                <div className="copy-button shadow-mid rounded-mid active-invert text-shadow-inset-small text-color-grey transition-smooth" onClick={() => { navigator.clipboard.writeText([property_sizes[0].split(" ").map((property_size) => `@extend .${property_size};`).join("\n"), invert === 'none' ? '' : `@extend .${invert}-invert;`, transition === false ? '' : `@extend .transition-smooth;`].join("\n")) }}>COPY SCSS</div>
            </div>
        </div>
    );
}

export default NeumorphicElements;
