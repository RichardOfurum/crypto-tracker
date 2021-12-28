import React from 'react';
import {AppBar, Container, Toolbar, Typography, Select, MenuItem, ThemeProvider, makeStyles, createTheme } from "@material-ui/core";

import {useNavigate } from "react-router-dom";
import {CryptoState} from '../../CryptoContext';



const useStyles = makeStyles((theme) => ({
    title: {
      flex:1,
      color: "gold",
      fontFamily: "Montserrat",
      fontWeight: "bold",
      cursor: "pointer",
    },
  })
  
);


const darkTheme = createTheme({
    palette: {
        primary:{
            main: "#fff",
        },
        type: 'dark',
    },
  });


const Header = () => {

    const navigate = useNavigate();
    const classes = useStyles();
    
    const { currency,currencies, setCurrency} = CryptoState();

    return (
        <ThemeProvider theme={darkTheme}>  
            <AppBar color='transparent' position='static'>
                <Container>
                    <Toolbar>
                        <Typography 
                            onClick={() => navigate('/')} 
                            className={classes.title}
                            variant='h5'
                            style={{ 
                                fontWeight:"bold",
                                color:"gold !important"
                             }}
                        >
                            Frio Crypto
                        </Typography> 

                        <Select 
                            variant="outlined"
                            style={{ 
                                width: 100,
                                height: 40,
                                marginRight: 15,
                                color:"white"
                            }}

                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                        >
                            {
                                currencies.map((currency, index ) =>(
                                    <MenuItem value={currency} key={index}>{currency}</MenuItem>
                                ))
                            }
                        </Select>
                       
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
        
    )
}

export default Header
