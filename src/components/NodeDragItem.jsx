import React from 'react';

const NodeDragItem = ({ label, type, onDragStart }) => {
    // Mapeo de tipos a clases de borde
    const borderClasses = {
        keywords: 'border-sky-500 bg-sky-50 hover:bg-sky-100',
        messages: 'border-emerald-500 bg-emerald-50 hover:bg-emerald-100',
    };

    return (
        <div
            className={`p-3 border-2 ${borderClasses[type]} rounded cursor-move`}
            draggable
            onDragStart={(event) => onDragStart(event, type)}
        >
            {label}
        </div>
    );
};

export default NodeDragItem;