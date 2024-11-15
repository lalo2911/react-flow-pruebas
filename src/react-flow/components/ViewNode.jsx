import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Card } from '../../../components/ui/card';

const ViewNode = memo(({ data }) => {
    const message = data.connectedNodes?.map(node => node.data.text || '').join('\n\n') || '';

    return (
        <Card className="p-4 w-64">
            <div className="font-semibold mb-2 text-purple-600">Vista Previa WhatsApp</div>
            <div className="text-sm mb-2">
                Nodos conectados: {data.connectedNodes?.length || 0}/6
            </div>
            <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                <div className="text-sm whitespace-pre-wrap">{message}</div>
            </div>
            <Handle type="target" position={Position.Top} />
        </Card>
    );
});

export default ViewNode;
