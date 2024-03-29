import React, { useState } from 'react';
import { Button } from "@/components/ui/button.jsx";

const DeleteRow = ({ employee_id, children }) => {
    const [isVisible, setIsVisible] = useState(true);

    const toggleVisibility = () => {
        setIsVisible(false);
        // APIを呼び出してデータベースのisVisibleを更新
        fetch(`/api/work_entries/hide/${employee_id}`, { method: 'POST' });
    };

    if (!isVisible) {
        return null;
    }

    return (
        <tr>
            {React.Children.map(children, child => (
                React.cloneElement(child)
            ))}
            <td>
                <Button onClick={toggleVisibility}>
                    Hide
                </Button>
            </td>
        </tr>
    );
};

export default DeleteRow;
