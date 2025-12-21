import React, { useEffect, useState } from "react";
import { database } from "../firebase";
import { ref, get, set, increment } from "firebase/database";

const VisitorCounter = ({ className }) => {
    const [count, setCount] = useState(null);

    useEffect(() => {
        const counterRef = ref(database, "visitor_count");

        get(counterRef).then((snapshot) => {
            if (snapshot.exists()) {
                // Sudah ada: increment
                set(counterRef, increment(1));
                setCount(snapshot.val() + 1);
            } else {
                // Belum ada: buat dari 1
                set(counterRef, 1);
                setCount(1);
            }
        }).catch((error) => {
            console.error("Error reading visitor count:", error);
            setCount("tidak tersedia");
        });
    }, []);

    return (
        <p className={className}>
            Total Kunjungan : {count !== null ? count : "memuat..."}
        </p>
    );
};

export default VisitorCounter;
