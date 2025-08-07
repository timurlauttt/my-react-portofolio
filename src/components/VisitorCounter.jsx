import React from 'react';
import { useGlobalVisitorCounter } from '../hooks/useGlobalVisitorCounter';

const VisitorCounter = ({ className = "" }) => {
    const { globalCount, loading, error } = useGlobalVisitorCounter();

    if (loading) return <p className={className}>Memuat pengunjung...</p>;
    if (error) return <p className={`${className} text-red-600`}>Total Pengunjung: tidak tersedia</p>;

    return <p className={className}>Total Pengunjung: {globalCount.toLocaleString()}</p>;
};

export default VisitorCounter;
