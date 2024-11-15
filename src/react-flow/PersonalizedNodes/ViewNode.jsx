import React from 'react';
import { Handle, Position } from '@xyflow/react';

export default function ViewNode({ data }) {
    const message = data.connectedNodes?.map((node) => node.data.text || '').join('\n\n') || '';

    return (
        <div className="p-4 w-64 bg-white rounded-lg">
            <div className="font-semibold mb-2 text-purple-600">Vista Previa WhatsApp</div>
            <div className="text-sm mb-2">
                Nodos conectados: {data.connectedNodes?.length || 0}/6
            </div>
            <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                <div className="text-sm whitespace-pre-wrap">{message}</div>
            </div>
            <Handle type="target" position={Position.Top} />
        </div>
    );
}
