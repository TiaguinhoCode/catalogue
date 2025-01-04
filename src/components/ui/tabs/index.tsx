'use client';

import { Tab, Tabs as TBS } from '@nextui-org/react';

// Tipagem para as abas
type TabItem = {
    key: string;
    title: string;
    icon?: JSX.Element;
    disabled?: boolean;
}

// Props do componente Tabs
interface TabsProps {
    tabs: TabItem[];
    onTabChange?: (key: string) => void;
}

export function Tabs({ tabs, onTabChange }: TabsProps) {
    return (
        <div className="flex w-full flex-col ">
            <TBS
                aria-label="Custom Tabs"
                color="primary"
                variant="underlined"
                classNames={{
                    tabList: "flex justify-center",
                    tab: "text-base font-medium text-gray-500 transition-all",
                    tabContent: "group-data-[selected=true]:text-gray-700 group-data-[selected=true]:font-semibold",
                }}
            >
                {tabs.map((tab) => (
                    <Tab
                        key={tab.key}
                        isDisabled={tab.disabled}
                        title={
                            <div className="flex items-center space-x-2">
                                {tab.icon} {/* Ícone, se houver */}
                                <span>{tab.title}</span>
                            </div>
                        }
                    />
                ))}
            </TBS>
        </div>
    );
}
