import React from 'react';
import {AppBar, Container, Toolbar, Typography, Select, MenuItem, ThemeProvider, makeStyles, createTheme } from "@material-ui/core";
import Carousel from '../carousel/Carousel';

const useStyles = makeStyles(() => ({
    banner:{
        backgroundImage: "url(../banner2.jpg)",
    },
    bannerContent:{
        height: 400,
        display: "flex",
        flexDirection: "column",
        paddingTop: 25,
        justifyContent: "space-around"
    },
    tagline:{
        display:"flex",
        height: "40%",
        flexDirection: "column",
        justifyContentCenter: "center",
        alignItems:"center"
    }
}));

const Banner = () => {

    const classes = useStyles();
    return (
        <div className={classes.banner}>
            <Container
                className={classes.bannerContent}
            >
                <div className={classes.tagline}>
                    <Typography
                        variant='h2'
                        style={{ 
                            fontWeight:"bold",
                            color: "white",
                            marginBottom: 15,
                            fontFamily: "Montserrat",
                         }}
                    >
                        Frio Crypto
                    </Typography>
                    
                    <Typography
                        variant='subtitle2'
                        style={{ 
                            color: "darkgray",
                            teTransform: "capitalize",
                            marginBottom: 15,
                            fontFamily: "Montserrat",
                         }}
                    >
                        Get all the info regarding your favorite crypto currency
                    </Typography>
                </div>
                <Carousel/>
            </Container>
        </div>
    )
}

export default Banner
