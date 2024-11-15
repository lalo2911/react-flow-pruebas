import React from 'react';

const NodeDragItem = ({ label, type, onDragStart }) => {
    // Mapeo de tipos a clases de borde
    const borderClasses = {
        input: 'border-blue-500',
        default: 'border-gray-500',
        output: 'border-pink-500'
    };

    return (
        <div
            className={`p-3 border ${borderClasses[type]} rounded cursor-move hover:bg-gray-50`}
            draggable
            onDragStart={(event) => onDragStart(event, type)}
        >
            {label}
        </div>
    );
};

export default NodeDragItem;