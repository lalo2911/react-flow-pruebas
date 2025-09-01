import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export default function TextInputNode({ data, id }) {
    const { text, onChange } = data;

    return (
        <Card className="w-64 shadow-lg">
            <CardHeader className="pb-2">
                <CardTitle className="text-green-600 text-lg font-medium text-center">
                    Mensaje WhatsApp
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Textarea
                    value={text || ''}
                    onChange={(e) => onChange(id, { text: e.target.value })}
                    placeholder="Escribe el mensaje aquí..."
                    className="h-24"
                />
            </CardContent>
            <Handle type="target" position={Position.Top} />
            <Handle type="source" position={Position.Bottom} />
        </Card>
    );
}