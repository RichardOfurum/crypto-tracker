import { Typography, LinearProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { SingleCoin } from '../../config/api';
import { CryptoState } from '../../CryptoContext';
import CoinInfo from '../coinInfo/CoinInfo';
import "./Coin.css";
import ReactHtmlParser from 'react-html-parser';
import { numberWithCommas } from '../carousel/Carousel';

const Coin = () => {
    const {id} = useParams();
    const [coin, setCoin] = useState();
    const [loading, setLoading] = useState(false);

    const {currency, symbol} = CryptoState();

    const fetchCoin = async() =>{
        try{
            setLoading(true)
            const data = await fetch(SingleCoin(id));
            const dataJson = await data.json();
            setCoin(dataJson);
            // console.log(dataJson);
            setLoading(false);
        }catch(e){
            console.log("could not fetch data");
        }
    }


    useEffect(() => {
        fetchCoin(); 
    }, [currency]);


    if (!coin) return <LinearProgress  style={{ backgroundColor:"gold" }} />;

    return (
        
        <div className="coin">
            
                   
            <div className="coin_sidebar">
                <img 
                    src={coin?.image?.large}
                    alt= {coin?.name}
                    height="200"
                    style={{ 
                        marginBottom:20,
                    }}
                />
                
                <Typography variant="h3" className='coin_heading'>
                    {coin?.name}
                </Typography>
                
                <Typography     
                    variant="subtitle"  
                    className='coin_description'
                >
                    {ReactHtmlParser(coin?.description?.en.split(". ")[0])}
                </Typography>

                <div className="marketDat">
                    <div>
                        <span
                        style={{ display: "flex" }}
                    >
                        <Typography 
                            variant="h5" className='coin_heading'
                        >
                            Rank:
                        </Typography>
                        &nbsp; &nbsp;
                        <Typography 
                            variant="h5" style={{ 
                                fontFamily: "Montserrat"
                                }}
                        >
                            {coin?.market_cap_rank}
                        </Typography>

                    </span>
                    
                    
                    <span
                        style={{ display: "flex" }}
                    >
                        <Typography 
                            variant="h5" className='coin_heading'
                        >
                            Current Price:
                        </Typography>
                        &nbsp; &nbsp;
                        <Typography 
                            variant="h5" style={{ 
                                fontFamily: "Montserrat"
                                }}
                        >
                            {symbol} {" "}
                            {numberWithCommas(
                                coin?.market_data?.current_price[currency.toLowerCase()]
                            )}
                        </Typography>

                    </span>
                    
                    <span
                        style={{ display: "flex" }}
                    >
                        <Typography 
                            variant="h5" className='coin_heading'
                        >
                            Market Cap: {" "}
                        </Typography>
                        &nbsp; &nbsp;
                        <Typography 
                            variant="h5" style={{ 
                                fontFamily: "Montserrat"
                                }}
                        >
                            {symbol} {" "}
                            {numberWithCommas(
                                coin?.market_data?.market_cap[currency.toLowerCase()].toString().slice(0, -6)
                            )}M
                        </Typography>

                    </span>
                    </div>
                </div>
                
            </div>

            <div className="coin_info">
                <CoinInfo coin={coin}/>
            </div>
        </div>
           
    )
}

export default Coin
