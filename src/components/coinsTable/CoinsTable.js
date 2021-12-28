import React, { useState, useEffect } from 'react';
import "./CoinsTable.css";
import { CryptoState } from '../../CryptoContext';
import { CoinList } from '../../config/api';
import { ThemeProvider, Container, Typography, createTheme, TextField, makeStyles, InputBase, TableContainer, LinearProgress, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import {useNavigate } from "react-router-dom";
import { numberWithCommas } from '../carousel/Carousel';
import {Pagination} from '@material-ui/lab';


const useStyles = makeStyles((theme) => ({
    title: {
      flex:1,
      color: "gold",
      fontFamily: "Montserrat",
      fontWeight: "bold",
      cursor: "pointer",
    },
    inputBase:{
        border: "1px solid white",
        borderRadius: theme.shape.borderRadius,
        height: "6vh",
        padding: theme.spacing(2)
    },
    row:{
        backgroundColor:"#16171a",
        cursor: "pointer",
        "&:hover":{
            backgroundColor: "#131111",
        },
        fontFamily:"Montserrat"
    },
    pagination:{
        "& .MuiPaginationItem-root":{
            color: "gold"
        }
    }
  })
  
);


const CoinsTable = () => {

    const navigate = useNavigate();
    const classes = useStyles();

    const [page, setPage] = useState(1);
    const {currency, symbol} = CryptoState();
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");

    const fetchCoins = async() => {
        try{
            setLoading(true);
            const data = await fetch(CoinList(currency));
            const dataJson = await data.json();
            setCoins(dataJson);
            setLoading(false);
        }catch(e){
            console.log("could not fetch data");
        }
    }

    useEffect(() => {
        fetchCoins();
    }, [currency]);


    const darkTheme = createTheme({
        palette: {
          primary: {
            main: "#fff",
          },
          type: "dark",
        },
      });


      const handleSearch = () => {
        return coins.filter(
          (coin) =>
            coin.name.toLowerCase().includes(search) ||
            coin.symbol.toLowerCase().includes(search)
        );
      };

      

      

    return (
        <ThemeProvider them={darkTheme} className="coinTable">
            <Container
                style={{ textAlign:"center", color:"white"}}
            >
                <Typography 
                    variant="h4"
                    style={{ margin:18, fontFamily: "Montserrat", color:"white"}}
                >
                    Crypto Price by Market Cap
                </Typography>

                {/* <TextField 
                    // className={classes.textField}
                    // color='secondary'
                    label="Search For a Crypto Currency.." 
                    variant="outlined"
                    style={{ marginBottom:20, width:"100%"}}
                    onChange={(e) =>setSearch(e.target.value)}
                /> */}

                <InputBase 
                    placeholder='Search For a Crypto Currency..'
                    variant="outlined"
                    className={classes.inputBase}
                    style={{ color:"white", width:"100%" }}
                    onChange={(e) =>setSearch(e.target.value)}
                />
                <br />
                <br />
               
                <TableContainer>
                    {
                        loading?(
                            <LinearProgress  style={{ backgroundColor:"gold" }} />
                        ):(
                            <Table>
                                <TableHead 
                                    style={{ backgroundColor: "#EEBC1D" }}
                                >
                                    <TableRow >
                                    {["Coin", "Price", "24h Change", "Market Cap"].map((head) =>(
                                                <TableCell 
                                                    style={{ 
                                                        color: "black",
                                                        fontWeight: "700",
                                                        fontFamily: "Montserrat"
                                                    }}
                                                    key={head}
                                                    align={head === "Coin" ? "" : "right"}
                                                > 
                                                    {head}    
                                            </TableCell>
                                            ))}
                                    </TableRow>
                                </TableHead>

                                <TableBody>{
                                            handleSearch()
                                            .slice((page -1) * 10,(page-1)*10+10)
                                            .map(row=>{
                                    const profit = row.price_change_percentage_24h > 0;
                                    return (
                                        <TableRow
                                            className={classes.row}
                                            onClick={() => navigate(`/coin/${row.id}`)}
                                        >
                                            <TableCell 
                                                component='th'
                                                scope="row"
                                                style={{ 
                                                    display: "flex",
                                                    gap: 15,
                                                 }}
                                            > 
                                                <img
                                                     src={row?.image}
                                                     alt={row.name} 
                                                     height="50"
                                                     style={{ 
                                                         marginBottom: 10,
                                                         cursor:"pointer"
                                                      }}
                                                />
                                                <div 
                                                    style={{ 
                                                        display: "flex", flexDirection: "column"
                                                     }}
                                                >
                                                    <span
                                                        style={{ 
                                                            textTransform:"uppercase",
                                                            fontSize: 22,
                                                            color:"white",
                                                            fontFamily:"Montserrat",
                                                         }}
                                                    >
                                                        {row.symbol}
                                                    </span>
                                                    <span style={{ color: "darkgray", fontFamily:"Montserrat" }}>{row.name} </span>
                                                </div>

                                            </TableCell>
                                            <TableCell 
                                                align="right"
                                                style={{ 
                                                    color:"white",
                                                    fontFamily:"Montserrat",
                                                    cursor:"pointer"
                                                 }}
                                            >
                                                {symbol}{" "}
                                                {numberWithCommas(row.current_price.toFixed(2))}

                                            </TableCell>
                                            <TableCell 
                                                align="right"
                                                style={{ 
                                                    color: profit > 0 ? "rgba(14, 203, 129)" : "red",
                                                    fontFamily:"Montserrat",
                                                    fontWeight: 500,
                                                    cursor:"pointer"
                                                 }}
                                            >
                                                {profit && "+"}
                                                {row.price_change_percentage_24h.toFixed(2)}%

                                            </TableCell>
                                            
                                            <TableCell 
                                                align="right"
                                                style={{ 
                                                    color:  "white",
                                                    fontFamily:"Montserrat",
                                                    fontWeight: 500,
                                                    cursor:"pointer"
                                                 }}
                                            >
                                                {symbol}{" "}
                                                {numberWithCommas(row.market_cap.toString().slice(0, -6) )}M
                                            </TableCell>
                                        </TableRow>
                                    )
                                })} </TableBody>

                            </Table>
                        )
                    }
                </TableContainer>
                
                <Pagination 
                    // color="primary"
                    count={( handleSearch()?.length/10).toFixed(0)}
                    classes={{ ul: classes.pagination }}
                    style={{ 
                        padding: 20,
                        width: "100%",
                        display: "flex",
                        justifyContent:"center",
                        color:"gold"
                     }}

                     onChange={(_, value) =>{
                         setPage(value);
                         window.scroll(0, 450);
                     }}
                
                />
            </Container>
        </ThemeProvider>
    )
}

export default CoinsTable
