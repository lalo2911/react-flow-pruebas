import { useCallback } from 'react';

export const useNodeManagement = (setNodes) => {
    const handleNodeDataChange = useCallback((nodeId, newData) => {
        setNodes(prevNodes => prevNodes.map(node => 
            node.id === nodeId ? { ...node, data: { ...node.data, ...newData } } : node
        ));
    }, [setNodes]);

    return { handleNodeDataChange };
};
