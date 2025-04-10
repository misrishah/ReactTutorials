import { useState, useEffect } from 'react';
export default function QuestionTimer({ timeout, onTimeout,mode }) {
    const [remainingTime, setReaminingTime]= useState(timeout);
    //setTimeout(onTimeout, timeout);

    useEffect(()=> {
        console.log('SETTING TIMOUT');
        const timer = setTimeout(onTimeout, timeout);
        
        return ()=> {
            clearTimeout(timer);
        };
    }, [timeout, onTimeout]);
    
    useEffect(() => {
            console.log('SETTING INTERVAL');
            const interval = setInterval(() => {
                setReaminingTime(prevRemainingTime => prevRemainingTime - 100);
            }, 100);

        return () => {
            clearInterval(interval);
        };
}, []);
    return <progress id= "question-time" max={timeout} value={remainingTime} className={mode}/>;

}