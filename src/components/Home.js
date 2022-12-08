import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';

const Home = () => {
    // states
    const [keys, setKeys] = useState([]);
    const [opens, setOpens] = useState([]);
    const [highs, setHighs] = useState([]);
    const [lows, setLows] = useState([]);
    const [closes, setCloses] = useState([]);
    const [volumes, setVolumes] = useState([]);

    // Fetch data info
    const apiKey = process.env.REACT_APP_alphavantage_key;
    const symbol = 'MSFT';
    const interval = '5min';

    // Fetch data from server
    const { data, isLoading } = useQuery({
        queryKey: ['query'],
        queryFn: async () => {
            const res = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${interval}&apikey=${apiKey}`);
            const data = await res.json();
            return data
        }
    });
    useEffect(() => {
        if (data) {
            // Declear Array data to push
            let keyValues = [];
            let openValues = [];
            let highValues = [];
            let lowValues = [];
            let closeValues = [];
            let volumeValues = [];
            for (let key in data["Time Series (5min)"]) {
                // Push the data to different variable
                keyValues.push(key);
                openValues.push(data["Time Series (5min)"][key]['1. open']);
                highValues.push(data["Time Series (5min)"][key]['2. high']);
                lowValues.push(data["Time Series (5min)"][key]['3. low']);
                closeValues.push(data["Time Series (5min)"][key]['4. close']);
                volumeValues.push(data["Time Series (5min)"][key]['5. volume']);
            }
            // Set the values to States
            setKeys(keyValues);
            setOpens(openValues);
            setHighs(highValues);
            setLows(lowValues);
            setCloses(closeValues);
            setVolumes(volumeValues);
        }
    }, [data]);

    console.log('keys', keys);
    console.log('open', opens);
    console.log('high', highs);
    console.log('lows', lows);
    console.log('closes', closes);
    console.log('volumes', volumes);
    if (isLoading) {
        return <h1>Loading...</h1>
    }
    return (
        <div>
            {

            }
        </div>
    );
};

export default Home;