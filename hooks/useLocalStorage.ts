import { useEffect, useState } from 'react';

const useLocalStorage = (initialValue: string) => {
    const [value, setValue] = useState<Array<string>>([]);

    const localScore = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem(initialValue) || '[]') : []

    useEffect(()=> {
        localScore && setValue(localScore)
    }, [])

    return value;
};

export default useLocalStorage;