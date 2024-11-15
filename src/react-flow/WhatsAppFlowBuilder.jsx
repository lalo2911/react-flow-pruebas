import React, { memo, useState, useCallback } from 'react';
import {
    ReactFlow,
    Handle,
    Position,
    Background,
    Controls,
    Panel,
    useNodesState,
    useEdgesState,
    addEdge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Card } from '../../components/ui/card';
import { Alert } from '../../components/ui/alert';

// Nodo de Keywords (Disparador)
const KeywordsNode = memo(({ data }) => {
    const [keywords, setKeywords] = useState(data.keywords || ['hola', 'info']);

    const handleKeywordChange = (index, value) => {
        const newKeywords = [...keywords];
        newKeywords[index] = value;
        setKeywords(newKeywords);
        data.onChange(data.id, { keywords: newKeywords });
    };

    return (
        <Card className="p-4 w-64">
            <div className="font-semibold mb-2 text-blue-600">Keywords Trigger</div>
            <div className="space-y-2">
                {keywords.map((keyword, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <input
                            type="text"
                            value={keyword}
                            onChange={(e) => handleKeywordChange(index, e.target.value)}
                            className="border rounded px-2 py-1 w-full"
                        />
                    </div>
                ))}
                <button
                    onClick={() => {
                        const newKeywords = [...keywords, ''];
                        setKeywords(newKeywords);
                        data.onChange(data.id, { keywords: newKeywords });
                    }}
                    className="bg-blue-500 text-white px-2 py-1 rounded text-sm hover:bg-blue-600"
                >
                    + Agregar Keyword
                </button>
            </div>
            <Handle type="source" position={Position.Bottom} />
        </Card>
    );
});

// Nodo de Input de Texto
const TextInputNode = memo(({ data, id }) => {
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
});

// Nodo Vista Principal (Preview del mensaje)
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

// Componente principal
const WhatsAppFlowBuilder = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [showAlert, setShowAlert] = useState(false);

    // Inicializar nodos
    React.useEffect(() => {
        const initialNodes = [
            {
                id: 'keywords-1',
                type: 'keywords',
                position: { x: 250, y: 0 },
                data: {
                    id: 'keywords-1',
                    keywords: ['hola', 'info'],
                    onChange: handleNodeDataChange
                }
            },
            {
                id: 'view-1',
                type: 'view',
                position: { x: 250, y: 400 },
                data: {
                    connectedNodes: [],
                    onChange: handleNodeDataChange
                }
            }
        ];
        setNodes(initialNodes);
    }, []);

    // Manejar cambios en los datos de los nodos
    const handleNodeDataChange = useCallback((nodeId, newData) => {
        setNodes(prevNodes => {
            return prevNodes.map(node => {
                if (node.id === nodeId) {
                    return {
                        ...node,
                        data: { ...node.data, ...newData }
                    };
                }
                return node;
            });
        });
    }, []);

    // Actualizar nodos conectados al nodo vista
    const updateViewNodeConnections = useCallback(() => {
        const viewNode = nodes.find(node => node.type === 'view');
        if (!viewNode) return;

        const connectedNodes = edges
            .filter(edge => edge.target === viewNode.id)
            .map(edge => nodes.find(node => node.id === edge.source))
            .filter(Boolean);

        handleNodeDataChange(viewNode.id, { connectedNodes });
    }, [nodes, edges]);

    // Efecto para actualizar conexiones cuando cambian los edges
    React.useEffect(() => {
        updateViewNodeConnections();
    }, [edges, updateViewNodeConnections]);

    // Manejar nuevas conexiones
    const onConnect = useCallback((params) => {
        const targetNode = nodes.find(node => node.id === params.target);
        if (targetNode?.type === 'view') {
            const currentConnections = edges.filter(edge => edge.target === params.target);
            if (currentConnections.length >= 6) {
                setShowAlert(true);
                setTimeout(() => setShowAlert(false), 3000);
                return;
            }
        }
        setEdges(prevEdges => addEdge(params, prevEdges));
    }, [nodes, edges]);

    // Agregar nuevo nodo de texto
    const addTextNode = useCallback(() => {
        const newNodeId = `text-${nodes.length + 1}`;
        const newNode = {
            id: newNodeId,
            type: 'textInput',
            position: {
                x: Math.random() * 500,
                y: Math.random() * 300
            },
            data: {
                text: '',
                onChange: handleNodeDataChange
            }
        };
        setNodes(prevNodes => [...prevNodes, newNode]);
    }, [nodes]);

    const nodeTypes = {
        keywords: KeywordsNode,
        textInput: TextInputNode,
        view: ViewNode
    };

    return (
        <div className="w-full h-screen relative">
            {showAlert && (
                <Alert className="absolute top-4 right-4 z-50 bg-red-100">
                    No se pueden conectar más de 6 nodos al nodo de vista
                </Alert>
            )}
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView
            >
                <Background />
                <Controls />
                <Panel position="top-left">
                    <button
                        onClick={addTextNode}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        + Agregar Nodo de Texto
                    </button>
                </Panel>
            </ReactFlow>
        </div>
    );
};

export default WhatsAppFlowBuilder;