import React, { useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";

export default function KeywordsNode(data) {
    const [keywords, setKeywords] = useState(data.keywords || ['hola', 'info']);

    const handleKeywordChange = (index, value) => {
        const newKeywords = [...keywords];
        newKeywords[index] = value;
        setKeywords(newKeywords);
        data.onChange(data.id, { keywords: newKeywords });
    };

    const handleRemoveKeyword = (index) => {
        const newKeywords = keywords.filter((_, i) => i !== index);
        setKeywords(newKeywords);
        data.onChange(data.id, { keywords: newKeywords });
    };

    const addKeyword = () => {
        const newKeywords = [...keywords, ''];
        setKeywords(newKeywords);
        data.onChange(data.id, { keywords: newKeywords });
    };

    return (
        <Card className="w-64 shadow-lg">
            <CardHeader className="pb-2">
                <CardTitle className="text-blue-600 text-lg font-medium text-center">
                    Palabras Clave
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                {keywords.map((keyword, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <Input
                            type="text"
                            value={keyword}
                            onChange={(e) => handleKeywordChange(index, e.target.value)}
                            className="h-8"
                            placeholder="Ingresa una keyword..."
                        />
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 p-0"
                            onClick={() => handleRemoveKeyword(index)}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                ))}
                <Button
                    onClick={addKeyword}
                    variant="outline"
                    className="w-full mt-2"
                    size="sm"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Agregar Keyword
                </Button>
            </CardContent>
            <Handle type="source" position={Position.Bottom} />
        </Card>
    );
}