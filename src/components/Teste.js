import React, { useEffect, useState } from 'react';

const USER_VISIT_KEY = 'user_visit_count';

function incrementVisitCount() {
    let count = parseInt(localStorage.getItem(USER_VISIT_KEY) || '0', 10);
    count += 1;
    localStorage.setItem(USER_VISIT_KEY, count);
    return count;
}

function getVisitCount() {
    return parseInt(localStorage.getItem(USER_VISIT_KEY) || '0', 10);
}

const Teste = () => {
    const [visitCount, setVisitCount] = useState(0);

    useEffect(() => {
        const count = incrementVisitCount();
        setVisitCount(count);
    }, []);

    return (
        <div>
            <h2>Nombre d'utilisateurs ayant visité ce site :</h2>
            <p>{visitCount}</p>
        </div>
    );
};

export default Teste;