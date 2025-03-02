import { IConfiguration } from "@/components/Interfaces/IConfiguration";
import React, { useState } from 'react';
import Favicon from "../ui/Img/Favicon";
import { Edit, Trash2, Play } from "@deemlol/next-icons";
import IconButton from "@/components/ui/Buttons/IconButton";

interface ConfigurationProps extends IConfiguration {
    onDelete: (id: number) => void;
    onEdit: (config: IConfiguration) => void;
}

export function Configuration({ id, name, domain, refXPath, refCSSSelector, dataStructure, modeChangePages, configChangePages, onDelete, onEdit }: ConfigurationProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            key={id}
            className="py-2 relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="flex justify-between items-center h-10">
                <div className="flex items-center space-x-4">
                    <Favicon domain={domain} />
                    <strong>{name}</strong>
                    <span>{domain}</span>
                </div>

                {isHovered && (
                    <div className="flex items-center space-x-2 h4/5">
                        <IconButton
                            icon={<Play className="h-4 w-4 m-2" />}
                            onClick={() => onEdit({ id, name, domain, refXPath, refCSSSelector, dataStructure, modeChangePages, configChangePages })}
                        />
                        <IconButton
                            icon={<Edit className="h-4 w-4 m-2" />}
                            onClick={() => onEdit({ id, name, domain, refXPath, refCSSSelector, dataStructure, modeChangePages, configChangePages })}
                        />
                        <IconButton
                            icon={<Trash2 className="h-4 w-4 m-2" />}
                            onClick={() => onDelete(id)}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
