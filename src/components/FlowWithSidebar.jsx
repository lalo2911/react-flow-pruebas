import React, { useState, useRef, useCallback } from 'react';
import { ReactFlow, useReactFlow, Controls, Background } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Button } from '@/components/ui/button';
import { MenuIcon, XIcon } from 'lucide-react';
import Sidebar from './Sidebar';
import useFlow from './useFlow';

const FlowWithSidebar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const reactFlowWrapper = useRef(null);
    const { nodes, edges, onNodesChange, onEdgesChange, onConnect, onDrop, onDragOver, onDragStart, nodeTypes } = useFlow();

    return (
        <div className="h-screen flex overflow-hidden bg-gray-50">
            <div className="lg:hidden">
                <Button
                    variant="ghost"
                    className="p-2 m-2 fixed top-0 left-0 z-20"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                    {sidebarOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
                </Button>
            </div>

            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} onDragStart={onDragStart} />

            <div className="flex-1" ref={reactFlowWrapper}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    nodeTypes={nodeTypes}
                    fitView
                >
                    <Controls />
                    <Background />
                </ReactFlow>
            </div>
        </div>
    );
};

export default FlowWithSidebar;
