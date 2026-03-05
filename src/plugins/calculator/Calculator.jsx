import React, { useState } from 'react';

const CalculatorApp = () => {
    const [display, setDisplay] = useState('0');
    const [equation, setEquation] = useState('');

    const handleNumber = (num) => {
        setDisplay(display === '0' ? num : display + num);
    };

    const handleOperator = (op) => {
        setEquation(display + ' ' + op + ' ');
        setDisplay('0');
    };

    const calculate = () => {
        try {
            const parts = equation.trim().split(' ');
            if (parts.length < 2) return;

            const num1 = parseFloat(parts[0]);
            const op = parts[1];
            const num2 = parseFloat(display);

            let result = 0;
            switch (op) {
                case '+': result = num1 + num2; break;
                case '-': result = num1 - num2; break;
                case '*': result = num1 * num2; break;
                case '/': result = num1 / num2; break;
                default: result = num2;
            }

            setDisplay(String(result));
            setEquation('');
        } catch {
            setDisplay('Error');
        }
    };

    const clear = () => {
        setDisplay('0');
        setEquation('');
    };

    return (
        <div className="glass-card">
            <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Calculator</h2>
            <div className="calc-display">
                <div style={{ fontSize: '0.8rem', opacity: 0.6, height: '1.2rem' }}>{equation}</div>
                {display}
            </div>
            <div className="calc-grid">
                <button className="calc-btn op" onClick={clear}>C</button>
                <button className="calc-btn op" onClick={() => handleOperator('/')}>/</button>
                <button className="calc-btn op" onClick={() => handleOperator('*')}>×</button>
                <button className="calc-btn op" onClick={() => setDisplay(display.slice(0, -1) || '0')}>⌫</button>

                <button className="calc-btn" onClick={() => handleNumber('7')}>7</button>
                <button className="calc-btn" onClick={() => handleNumber('8')}>8</button>
                <button className="calc-btn" onClick={() => handleNumber('9')}>9</button>
                <button className="calc-btn op" onClick={() => handleOperator('-')}>-</button>

                <button className="calc-btn" onClick={() => handleNumber('4')}>4</button>
                <button className="calc-btn" onClick={() => handleNumber('5')}>5</button>
                <button className="calc-btn" onClick={() => handleNumber('6')}>6</button>
                <button className="calc-btn op" onClick={() => handleOperator('+')}>+</button>

                <button className="calc-btn" onClick={() => handleNumber('1')}>1</button>
                <button className="calc-btn" onClick={() => handleNumber('2')}>2</button>
                <button className="calc-btn" onClick={() => handleNumber('3')}>3</button>
                <button className="calc-btn eq" onClick={calculate}>=</button>

                <button className="calc-btn" style={{ gridColumn: 'span 2', width: 'auto' }} onClick={() => handleNumber('0')}>0</button>
                <button className="calc-btn" onClick={() => handleNumber('.')}>.</button>
            </div>
        </div>
    );
};

export default CalculatorApp;
