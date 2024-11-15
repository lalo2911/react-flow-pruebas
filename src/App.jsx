import React, { useCallback, useEffect, useState } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  Panel,
  useNodesState,
  useEdgesState,
  addEdge,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import { initialNodes } from './react-flow/nodes';
import { initialEdges } from './react-flow/edges';

import KeywordsNode from './react-flow/PersonalizedNodes/KeywordsNode';
import TextInputNode from './react-flow/PersonalizedNodes/TextInputNode';
import ViewNode from './react-flow/PersonalizedNodes/ViewNode';

const nodeTypes = {
  keywords: KeywordsNode,
  textInput: TextInputNode,
  view: ViewNode
};

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [showAlert, setShowAlert] = useState(false);

  const defaultEdgeOptions = { type: 'smoothstep' };

  // Manejar cambios en los datos de nodos
  const handleNodeDataChange = useCallback((nodeId, newData) => {
    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        node.id === nodeId ? { ...node, data: { ...node.data, ...newData } } : node
      )
    );
  }, []);

  // Injectar handleNodeDataChange en los nodos
  const initializedNodes = nodes.map((node) => ({
    ...node,
    data: {
      ...node.data,
      onChange: handleNodeDataChange,
    },
  }));

  // Actualizar nodos conectados al nodo vista
  const updateViewNodeConnections = useCallback(() => {
    const viewNode = nodes.find((node) => node.type === 'view');
    if (!viewNode) return;

    const connectedNodes = edges
      .filter((edge) => edge.target === viewNode.id)
      .map((edge) => nodes.find((node) => node.id === edge.source))
      .filter(Boolean);

    handleNodeDataChange(viewNode.id, { connectedNodes });
  }, [nodes, edges, handleNodeDataChange]);

  // Efecto para actualizar conexiones cuando cambian los edges
  useEffect(() => {
    updateViewNodeConnections();
  }, [edges, updateViewNodeConnections]);

  // Agregar nuevo nodo de texto
  const addTextNode = useCallback(() => {
    const newNodeId = `text-${nodes.length + 1}`;
    const newNode = {
      id: newNodeId,
      type: 'textInput',
      position: {
        x: Math.random() * 500,
        y: Math.random() * 300,
      },
      data: {
        text: '',
        onChange: handleNodeDataChange,
      },
    };
    setNodes((prevNodes) => [...prevNodes, newNode]);
  }, [nodes, handleNodeDataChange]);

  const onConnect = useCallback((params) => {
    const targetNode = nodes.find(node => node.id === params.target); // Buscar el nodo de destino
    if (targetNode?.type === 'view') { // Verificar si el nodo de destino es de tipo 'view'
      const currentConnections = edges.filter(edge => edge.target === params.target); // Verificar las conexiones actuales
      if (currentConnections.length >= 6) { // Si ya hay 6 conexiones, mostrar una alerta
        setShowAlert(true); // Mostrar alerta de que no se pueden hacer más conexiones
        setTimeout(() => setShowAlert(false), 3000); // Ocultar la alerta después de 3 segundos
        return; // Evitar agregar más conexiones
      }
    }
    setEdges(prevEdges => addEdge(params, prevEdges)); // Si la validación pasa, agregar la nueva conexión
  }, [nodes, edges]);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      {showAlert && (
        <div className="absolute top-4 right-4 z-50 bg-red-200 h-12 p-6 rounded-lg text-lg flex items-center justify-center">
          El nodo de vista no puede tener más de 6 conexiones.
        </div>
      )}
      <ReactFlow
        nodes={initializedNodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
      >
        <Controls />
        <MiniMap zoomable pannable />
        <Background variant="dots" gap={12} size={1} />
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
}