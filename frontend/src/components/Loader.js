import React from 'react';

import '../styles/Loader.css';

const Loader = (params) => {
    return (
        <span className={`loader${params?.absolute ? ' absolute' : ''}`} style={params?.style}></span>
    )
}

export default Loader;