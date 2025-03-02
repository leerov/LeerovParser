"use client";

import React, { useState, useEffect } from "react";
import TextButton from "@/components/ui/Buttons/TextButton";
import { Row } from "@/components/Row";
import TextInput from "@/components/ui/Inputs/TextInput";
import SelectInput from "@/components/ui/Inputs/SelectInput";
import { IConfiguration } from "@/components/Interfaces/IConfiguration";

interface ModalProps {
    onClose: () => void;
    onSave: () => void;
    title?: string;
    initialConfig?: IConfiguration;
}

export default function Modal({ onClose, title, initialConfig, onSave }: ModalProps) {
    const [config, setConfig] = useState<IConfiguration>(() =>
        initialConfig
            ? initialConfig
            : {
                id: Date.now(),
                name: "",
                domain: "",
                refXPath: "",
                refCSSSelector: "",
                dataStructure: {},
                modeChangePages: "",
                configChangePages: {}
            }
    );

    useEffect(() => {
        if (initialConfig) {
            setConfig(initialConfig);
        }
    }, [initialConfig]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setConfig((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        try {
            const method = initialConfig ? "PUT" : "POST";
            const res = await fetch("/api/config", {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(config),
            });

            if (!res.ok) {
                const errorText = await res.json(); 
                console.error("Ошибка при сохранении конфигурации", errorText);
                return;
            }

            
            const text = await res.json();
            if (text) {
                try {
                    const result = JSON.parse(text); 
                    console.log(result);
                } catch (error) {
                    console.error("Ошибка при парсинге JSON", error);
                }
            } else {
                console.log("Ответ пустой");
            }

            onSave();
        } catch (error) {
            console.error("Ошибка при сохранении конфигурации", error);
        } finally {
            onClose();
        }
    };


    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black opacity-50" onClick={onClose} />
            <div className="relative bg-background border-2 border-foreground rounded-xl p-8 z-10 w-11/12 max-w-md">
                {title && <h2 className="text-2xl font-bold mb-4">{title}</h2>}
                <div className="mb-6">
                    <form className="space-y-4">
                        <TextInput
                            label="Название"
                            id="name"
                            name="name"
                            value={config.name}
                            onChange={handleChange}
                            placeholder="Введите название"
                        />
                        <TextInput
                            label="Домен"
                            id="domain"
                            name="domain"
                            value={config.domain}
                            onChange={handleChange}
                            placeholder="Введите домен"
                        />
                        <TextInput
                            label="Ref XPath"
                            id="refXPath"
                            name="refXPath"
                            value={config.refXPath}
                            onChange={handleChange}
                            placeholder="Введите XPath"
                        />
                        <TextInput
                            label="Ref CSS Selector"
                            id="refCSSSelector"
                            name="refCSSSelector"
                            value={config.refCSSSelector}
                            onChange={handleChange}
                            placeholder="Введите CSS Selector"
                        />
                        <SelectInput
                            label="Режим смены страниц"
                            id="modeChangePages"
                            name="modeChangePages"
                            value={config.modeChangePages}
                            onChange={handleChange}
                            options={[
                                { value: "auto", label: "Автоматический" },
                                { value: "manual", label: "Ручной" },
                            ]}
                        />
                    </form>
                </div>
                <Row>
                    <TextButton text="Закрыть" onClick={onClose} />
                    <TextButton text="Сохранить" onClick={handleSave} />
                </Row>
            </div>
        </div>
    );
}
