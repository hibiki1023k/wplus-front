// components/ui/LoadingProgress.jsx
import React, { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";

const LoadingProgress = () => {
    return (
        <div className="loading-container">
            <div className="spinner"></div> {/* スピナー要素を追加 */}
            <Progress className="w-[60%]" />
        </div>
    );
};

export default LoadingProgress;
