import {ChangeEvent, memo, useCallback} from "react";

interface RootSelectorProps {
    value: string;
    items: Record<string, readonly Readonly<Node>[]>;
    onChange: (value: string, nodes: readonly Readonly<Node>[]) => void;
}

export const RootSelector = memo(
    function RootSelector({value, items, onChange}: RootSelectorProps) {
        const changeHandler = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
            const key = event.target.value;
            onChange(key, items[key]);
        }, [items, onChange]);

        return (
            <select value={value} onChange={changeHandler}>
                {Object.keys(items).map((item) => (
                    <option key={item} value={item}>{item}</option>
                ))}
            </select>
        );
    },
);