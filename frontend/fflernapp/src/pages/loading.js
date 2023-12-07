import React from 'react';

function Loading() {
    const preview = require('../assets/preview.png');
    const logo = require('../assets/logo.png');

    return (
        <div style={{ display: 'flex', alignItems: 'center', width: '100vw', height: '100vh', background: '#05192A' }}>
            <div style={{ display: 'flex', alignItems: 'center', height: '40vh' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100vw', height: '100%', zIndex: '1' }}>
                    <img src={String(logo)} alt="FFLernApp Logo" style={{ width: '10vw', borderRadius: '5vw' }} />
                    <p style={{ color: '#05192A', fontSize: '5vw' }}>FFLernApp</p>
                </div>
                <img src={String(preview)} alt="firefighters working at a skyscraper" style={{ width: '100vw', position: 'absolute' }} />
            </div>
        </div>
    );
}

export default Loading;
