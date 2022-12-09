import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import './Home.css';

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
        <div className="container">
            <div className='row'>
                <div>Hello</div>
                <div className='col-12'>
                    <Plot className='myChart'
                        data={[
                            {
                                x: keys,
                                y: opens,
                                name: 'Open',
                                type: 'scatter'
                            },
                            {
                                x: keys,
                                y: highs,
                                name: 'High',
                                yaxis: 'y2',
                                type: 'scatter'
                            },
                            {
                                x: keys,
                                y: lows,
                                name: 'Low',
                                yaxis: 'y3',
                                type: 'scatter'
                            },
                            {
                                x: keys,
                                y: closes,
                                name: 'Close',
                                yaxis: 'y4',
                                type: 'scatter'
                            },
                            {
                                x: keys,
                                y: volumes,
                                name: 'Volume',
                                yaxis: 'y5',
                                type: 'scatter'
                            }
                        ]}
                        layout={
                            {
                                title: `${symbol} showing ${interval} interval`,
                                autosize: true,
                                height: 500,
                                paper_bgcolor: '#eee',
                                xaxis: { domain: [0.3, 0.7] },
                                yaxis: {
                                    title: 'Open',
                                    titlefont: { color: '#1f77b4' },
                                    tickfont: { color: '#1f77b4' }
                                },
                                yaxis2: {
                                    title: 'High',
                                    titlefont: { color: '#ff7f0e' },
                                    tickfont: { color: '#ff7f0e' },
                                    anchor: 'free',
                                    overlaying: 'y',
                                    side: 'left',
                                    position: 0.20
                                },
                                yaxis3: {
                                    title: 'Low',
                                    titlefont: { color: '#2ca02c' },
                                    tickfont: { color: '#2ca02c' },
                                    anchor: 'free',
                                    overlaying: 'y',
                                    side: 'left',
                                    position: 0.10
                                },
                                yaxis4: {
                                    title: 'Close',
                                    titlefont: { color: '#d62728' },
                                    tickfont: { color: '#d62728' },
                                    anchor: 'x',
                                    overlaying: 'y',
                                    side: 'right',
                                    position: 0.75
                                },
                                yaxis5: {
                                    title: 'Volume',
                                    titlefont: { color: '#9467bd' },
                                    tickfont: { color: '#9467bd' },
                                    anchor: 'free',
                                    overlaying: 'y',
                                    side: 'right',
                                    position: 0.85
                                }
                            }
                        }
                        useResizeHandler
                        style={{width: "100%", height: "100%"}}
                    ></Plot>
                </div>
                <div className="col-12">
                    <hr />
                    <h4 className='text-center'>Showing {symbol}, {interval} Interval Data In Table</h4>
                    <hr />
                    <div className='table-responsive'>
                        <table className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>SL</th>
                                    <th>Open</th>
                                    <th>Close</th>
                                    <th>High</th>
                                    <th>Low</th>
                                    <th>Volume</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    keys.map((key, i) => <tr>
                                        <td>{i + 1}</td>
                                        <td>{opens[i]}</td>
                                        <td>{closes[i]}</td>
                                        <td>{highs[i]}</td>
                                        <td>{lows[i]}</td>
                                        <td>{volumes[i]}</td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;