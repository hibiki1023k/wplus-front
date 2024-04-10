// components/ui/Select.js
import {
    Select as BaseSelect,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export function Select({ value, onChange, options }) {
return (
    <BaseSelect value={value} onValueChange={onChange}>
    <SelectTrigger>
        <SelectValue />
    </SelectTrigger>
    <SelectContent>
        {options.map((option) => (
        <SelectItem key={option.value} value={option.value}>
            {option.label}
        </SelectItem>
        ))}
    </SelectContent>
    </BaseSelect>
);
}
