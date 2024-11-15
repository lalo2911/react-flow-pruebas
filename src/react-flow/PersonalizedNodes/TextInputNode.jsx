import React from 'react';
import { Handle, Position } from '@xyflow/react';

export default function TextInputNode({ data, id }) {
    const { text, onChange } = data;

    return (
        <div className="p-4 w-64 bg-white rounded-lg">
            <div className="font-semibold mb-2 text-green-600">Input de Texto</div>
            <textarea
                value={text || ''}
                onChange={(e) => onChange(id, { text: e.target.value })}
                className="w-full h-24 border rounded p-2 bg-white"
                placeholder="Escribe el texto aquí..."
            />
            <Handle type="target" position={Position.Top} />
            <Handle type="source" position={Position.Bottom} />
        </div>
    );
}
