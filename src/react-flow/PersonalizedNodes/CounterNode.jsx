import React, { useState } from 'react';

export default function CounterNode(props) {
    const [count, setCount] = useState(props.data?.initialCount ?? 0);

    return (
        <div className="counter-node">
            <p>Conteo: {count}</p>
            <button className="nodrag" onClick={() => setCount(count + 1)}>
                Mas
            </button>
        </div>
    );
}
