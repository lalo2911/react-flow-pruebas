import React from 'react';

export default function TextInputNode(data, id) {
    return (
        <Card className="p-4 w-64">
            <div className="font-semibold mb-2 text-green-600">Input de Texto #{id}</div>
            <textarea
                value={data.text || ''}
                onChange={(e) => data.onChange(id, { text: e.target.value })}
                className="w-full h-24 border rounded p-2"
                placeholder="Escribe el texto aquí..."
            />
            <Handle type="target" position={Position.Top} />
            <Handle type="source" position={Position.Bottom} />
        </Card>
    );
}
