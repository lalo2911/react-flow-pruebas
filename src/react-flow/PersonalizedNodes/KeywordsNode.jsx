import React, { useState } from 'react';
import { Handle, Position } from '@xyflow/react';

export default function KeywordsNode(data) {
    const [keywords, setKeywords] = useState(data.keywords || ['hola', 'info']);

    const handleKeywordChange = (index, value) => {
        const newKeywords = [...keywords];
        newKeywords[index] = value;
        setKeywords(newKeywords);
        data.onChange(data.id, { keywords: newKeywords });
    };

    return (
        <div className="p-4 w-64 bg-white rounded-lg">
            <div className="font-semibold mb-2 text-blue-600">Keywords Trigger</div>
            <div className="space-y-2">
                {keywords.map((keyword, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <input
                            type="text"
                            value={keyword}
                            onChange={(e) => handleKeywordChange(index, e.target.value)}
                            className="border rounded px-2 py-1 w-full bg-white"
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
        </div>
    );
}
