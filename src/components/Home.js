import React, { useContext, useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import './Home.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { AuthContext } from '../contexts/AuthProvider';

const Home = () => {
    const { logOut } = useContext(AuthContext);
    // states
    const [symbol, setSymbol] = useState('AAPL');
    const [data, setData] = useState(null);
    const [load, setLoad] = useState(false);

    // Separated Data States
    const [keys, setKeys] = useState([]);
    const [opens, setOpens] = useState([]);
    const [highs, setHighs] = useState([]);
    const [lows, setLows] = useState([]);
    const [closes, setCloses] = useState([]);
    const [volumes, setVolumes] = useState([]);

    // Fetch data info
    const apiKey = process.env.REACT_APP_alphavantage_key;
    const interval = '5min';

    // Fetch data from server
    useEffect(()=>{
        fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${interval}&apikey=${apiKey}`)
        .then(res => res.json())
        .then(data => {
            setLoad(false);
            setData(data)
        })
        .catch(err => {
            setLoad(false);
            console.log(err);
        });
  
    },[symbol, interval, apiKey]);

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
    

    // Handle Symbol search
    const handleSymbolInterval = e => {
        e.preventDefault();
        setLoad(true);
        setSymbol(e.target.symbol.value);
    }

    if(load){
        return <h4 className="text-center my-5 py-5">Please wait, loading...</h4>
    }
    return (
        <div>
            <Navbar bg="light" expand="lg" className='shadow-sm'>
                <Container>
                    <Navbar.Brand href="#home">Stock Data</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link onClick={() => logOut()}>Log Out</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className="container">
                <div className='row'>
                    <div className="col-12 my-5">
                        <form onSubmit={handleSymbolInterval}>
                            <div className="row">
                                <div className='col-md-5'>
                                    <label className='mb-2'>Select Symbol</label>
                                    <select name="symbol" className='form-control'>
                                        <option value="AAPL">AAPL</option>
                                        <option value="ABBV">ABBV</option>
                                        <option value="AMZN">AMZN</option>
                                        <option value="AMD">AMD</option>
                                        <option value="MSFT">MSFT</option>
                                        <option value="NVDA">NVDA</option>
                                    </select>
                                </div>
                                <div className="col-md-2">
                                <label className='mb-2'>&nbsp;</label>
                                    <input type="submit" className='btn btn-primary w-100' value='Show Data' />
                                </div>
                            </div>
                        </form>
                    </div>
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
                            style={{ width: "100%", height: "100%" }}
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
        </div>
    );
};

export default Home;