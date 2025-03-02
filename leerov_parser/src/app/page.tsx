'use client';

import { useEffect, useState, useCallback } from "react";
import { PlusSquare, Loader, Box } from "@deemlol/next-icons";
import IconTextButton from "@/components/ui/Buttons/IconTextButton";
import useModal from "@/hooks/useModal";
import Modal from "@/components/ui/Modals/Modal";
import { Configuration } from "@/components/complicated/configuration";
import { IConfiguration } from "@/components/Interfaces/IConfiguration";
import { Column } from "@/components/Column";

export default function Home() {
  const { isOpen, openModal, closeModal } = useModal();
  const [configs, setConfigs] = useState<IConfiguration[]>([]);
  const [selectedConfig, setSelectedConfig] = useState<IConfiguration | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchConfigs = useCallback(async () => {
    try {
      const res = await fetch('/api/config');
      if (!res.ok) {
        throw new Error(`Ошибка при загрузке: ${res.statusText}`);
      }

      const text = await res.text();
      const data = text ? JSON.parse(text) : { configs: [] };

      setConfigs(Array.isArray(data.configs) ? data.configs : []);
    } catch (error) {
      console.error("Ошибка при загрузке конфигураций:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);


  useEffect(() => {
    fetchConfigs();
  }, [fetchConfigs]);

  const handleDeleteConfig = async (id: number) => {
    try {
      await fetch(`/api/config?id=${id}`, { method: "DELETE" });
      setConfigs((prev) => prev.filter((config) => config.id !== id));
    } catch (error) {
      console.error("Ошибка при удалении конфигурации:", error);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center overflow-hidden">
      <div className="grid h-4/5 sm:w-4/5 place-items-center sm:p-20 gap-8 grid-rows-[100px_100px_1fr] scrollbar-hide">
        <h1 className="text-4xl font-black">LParser - parser by Leerov</h1>
        <IconTextButton
          icon={<PlusSquare size={24} />}
          text="Add config"
          onClick={() => {
            setSelectedConfig(null);
            openModal();
          }}
        />
        <div className="w-full h-full border-2 rounded-xl p-4 overflow-hidden relative no-scrollbar flex items-center justify-center">
          {isLoading ? (
            <Column>
              <Loader size={48} className="animate-spin" />
              <p>Loading</p>
            </Column>
          ) : configs.length === 0 ? (
            <Column>
              <Box size={48} />
              <p>Empty</p>
            </Column>
          ) : (
            <div className="h-full overflow-y-scroll no-scrollbar w-full">
              {configs.map((config) => (
                <Configuration
                  key={config.id}
                  {...config}
                  onDelete={handleDeleteConfig}
                  onEdit={() => {
                    setSelectedConfig(config);
                    openModal();
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      {isOpen && (
        <Modal
          title={selectedConfig ? "Редактировать конфигурацию" : "Добавить конфигурацию"}
          initialConfig={selectedConfig || undefined}
          onClose={closeModal}
          onSave={fetchConfigs}
        />
      )}
    </div>
  );
}
