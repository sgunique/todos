import React from 'react';
import FrontImg from './front.png';
import BackImg from './back.png';

const App = () => {
    return (
        <>
            <h1> App is rendering from App.js - devserver test </h1>
            <div style={{
                display: 'flex',
                height: '50%',
                flexDirection: 'column'
            }}>
                <img src={FrontImg} style={{
                    maxHeight: '100%',
                    transform: 'rotate(90deg) scale(0.5)'
                }}/>
                <img src={BackImg} style={{
                    maxHeight: '100%',
                    transform: 'rotate(-90deg) scale(0.5)'
                }}/>
            </div>
        </>
    )
}

export default App;