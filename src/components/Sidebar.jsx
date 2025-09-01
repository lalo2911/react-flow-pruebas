import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Separator } from "@/components/ui/separator"
import NodeDragItem from './NodeDragItem';
import { PlusCircle, Eye } from 'lucide-react';

const Sidebar = ({ sidebarOpen, setSidebarOpen, onDragStart }) => {
    return (
        <div
            className={`fixed inset-y-0 left-0 z-10 transform transition-transform duration-300 ease-in-out
                lg:relative lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
                w-64 bg-white border-r border-gray-200 flex flex-col`}
        >
            <ScrollArea className="flex-grow overflow-hidden">
                <div className="p-4 space-y-6">
                    {/* Header*/}
                    <h1 className='text-2xl text-center align-middle font-semibold'>Chatbot Flow</h1>

                    {/* Acciones Section */}
                    <div>
                        <h3 className="text-sm font-semibold mb-3">Acciones</h3>
                        <div className="space-y-2">
                            <NodeDragItem
                                label="Palabras Clave"
                                type="keywords"
                                onDragStart={onDragStart}
                            />
                            <NodeDragItem
                                label="Nuevo Mensaje"
                                type="messages"
                                onDragStart={onDragStart}
                            />
                        </div>
                    </div>

                    <Separator />

                    {/* Flujos Section */}
                    <div>
                        <h3 className="text-sm font-semibold mb-3">Flujos</h3>
                        <div className="space-y-2">
                            <Button
                                variant="outline"
                                className="w-full justify-start text-left"
                                onClick={() => console.log('Nuevo flujo')}
                            >
                                <PlusCircle className="h-4 w-4 mr-2" />
                                Nuevo Flujo
                            </Button>
                            <Button
                                variant="ghost"
                                className="w-full justify-start text-left"
                            >
                                Bienvenida
                            </Button>
                            <Button
                                variant="ghost"
                                className="w-full justify-start text-left"
                            >
                                Opciones
                            </Button>
                            <Button
                                variant="ghost"
                                className="w-full justify-start text-left"
                            >
                                Información
                            </Button>
                        </div>
                    </div>
                </div>
            </ScrollArea>

            <Separator />

            {/* Vista Previa Button - Now at the bottom */}
            <div className="p-4">
                <Button
                    variant="outline"
                    className="w-full flex items-center gap-2"
                    onClick={() => console.log('Vista previa')}
                >
                    <Eye className="h-4 w-4" />
                    Vista Previa
                </Button>
            </div>
        </div>
    );
};

export default Sidebar;