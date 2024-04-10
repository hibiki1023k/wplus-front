// components/ui/Table.js
import {
    Table as BaseTable,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export function Table({ caption, headers, data }) {
    return (
        <BaseTable>
            {caption && <TableCaption>{caption}</TableCaption>}
            <TableHead>
                <TableRow>
                {headers.map((header) => (
                    <TableHeader key={header}>{header}</TableHeader>
                ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {data.map((row, index) => (
                <TableRow key={index}>
                    {row.map((cell, cellIndex) => (
                    <TableCell key={cellIndex}>{cell}</TableCell>
                    ))}
                </TableRow>
                ))}
            </TableBody>
        </BaseTable>
    );
}
