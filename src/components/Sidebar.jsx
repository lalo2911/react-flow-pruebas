import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import NodeDragItem from './NodeDragItem';

const Sidebar = ({ sidebarOpen, setSidebarOpen, onDragStart }) => {
    return (
        <div
            className={`fixed inset-y-0 left-0 z-10 transform transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        w-64 bg-white border-r border-gray-200`}
        >
            <ScrollArea className="h-full">
                <div className="p-4">
                    <h2 className="text-xl font-bold mb-4">Nodos Disponibles</h2>
                    <div className="space-y-3">
                        <NodeDragItem label="Input Node" type="input" onDragStart={onDragStart} />
                        <NodeDragItem label="Default Node" type="default" onDragStart={onDragStart} />
                        <NodeDragItem label="Output Node" type="output" onDragStart={onDragStart} />
                    </div>
                </div>
            </ScrollArea>
        </div>
    );
};

export default Sidebar;
