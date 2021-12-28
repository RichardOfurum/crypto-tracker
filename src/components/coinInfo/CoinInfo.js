import { CircularProgress } from '@material-ui/core';
import React,{useState, useEffect} from 'react'
import { HistoricalChart } from '../../config/api';
import { chartDays  } from '../../config/data';
import { CryptoState } from '../../CryptoContext';
import "./CoinInfo.css";
import {Line} from "react-chartjs-2";
import SelectButton from "../selectButton/SelectButton";

const CoinInfo = ({coin}) => {
    const [historicData, setHistoricData] = useState();
    const [days, setDays] = useState(1);
    const { currency } = CryptoState();

    const fetchHistoric = async() =>{
        try{
          
            const data = await fetch(HistoricalChart(coin.id, days, currency.toLowerCase()));
           
            const dataJson = await data.json();
            setHistoricData(dataJson.prices);
        }catch(e){
            console.log("could not fetch data");
        }
    }
    
    // console.log(historicData);
    useEffect(() => {
        fetchHistoric(); 
    }, [currency, days]);

    return (
        <div className="coinInfo">
            {
                !historicData ? (
                    <CircularProgress
                        style={{ color: "gold"}}
                        size={250}
                        thickness={1}
                    />
                ):(

                    
                    <>
                        <Line
                        data={{
                            labels: historicData.map((coin) => {
                            let date = new Date(coin[0]);
                            let time =
                                date.getHours() > 12
                                ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                                : `${date.getHours()}:${date.getMinutes()} AM`;
                            return days === 1 ? time : date.toLocaleDateString();
                            }),

                            datasets: [
                            {
                                data: historicData.map((coin) => coin[1]),
                                label: `Price ( Past ${days} Days ) in ${currency}`,
                                borderColor: "#EEBC1D",
                            },
                            ],
                        }}
                        options={{
                            elements: {
                            point: {
                                radius: 1,
                            },
                            },
                        }}
                        />
                        <div
                        style={{
                            display: "flex",
                            marginTop: 20,
                            justifyContent: "space-around",
                            width: "100%",
                        }}
                        >
                        {chartDays.map((day) => (
                            <SelectButton
                            key={day.value}
                            onClick={() => setDays(day.value)}
                            selected={day.value === days}
                            >
                            {day.label}
                            </SelectButton>
                        ))}
                        </div>
                        <br /><br />
                    </>
                )
            }
        </div>
    )
}

export default CoinInfo
