import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import bigCanLinkImg from '../images/CanLinklogo.png';

import Athabasca from "../images/Athabasca_University.jpg";
import Brock from "../images/Brock_University.jpg";
import Carleton from "../images/Carleton_University.jpg";
import Concordia from "../images/Concordia_University.jpg";
import Dalhousie from "../images/Dalhousie_University.jpg";
import Laurentian from "../images/Laurentian_University.jpg";
import McGill from "../images/McGill_University.jpg";
import Memorial from "../images/Memorial_University_of_Newfoundland.jpg";
import Queens from "../images/Queen's_University.jpg";
import RoyalRoads from "../images/Royal_Roads_University.jpg";
//import Tunis from "../images/Tunis_University.jpg";
import Montreal from "../images/U_Montreal.jpg";
import Alberta from "../images/University_of_Alberta.jpg";
import Guelph from "../images/University_of_Guelph.jpg";
import Lethbridge from "../images/University_of_Lethbridge.jpg";
import Manitoba from "../images/University_of_Manitoba.jpg";
import OCAD from "../images/OCAD.png"
import OIT from "../images/University_of_Ontario_Institute_of_Technology.jpg";
import Ottawa from "../images/University_of_Ottawa.jpg";
import Regina from "../images/University_of_Regina.jpg";
import Saskatchewan from "../images/University_of_Saskatchewan.jpg";
import Toronto from "../images/University_of_Toronto.jpg";
import Victoria from "../images/University_of_Victoria.jpg";
import Waterloo from "../images/University_of_Waterloo.jpg";
import York from "../images/York_University.jpg";
//import Uni1 from "../images/no_logo.jpeg";
import ubc from "../images/ubc.jpg"
import UAL from "../images/UA-LIBR-COLOUR.png";



const uniImages = [
    Athabasca,
    Brock,
    Carleton,
    Concordia,
    Dalhousie,
    Laurentian, 
    McGill,
    Memorial,
    Queens,
    RoyalRoads,
   // Tunis,
    Montreal,
    Alberta,
    Guelph,
    Lethbridge,
    Manitoba,
    OCAD,
    OIT,
    Ottawa,
    Regina,
    Saskatchewan,
    Toronto,
    Victoria,
    Waterloo,
    York,
    ubc,
    UAL
]


const useStyles = makeStyles((theme) => ({
  uniImages: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1.5),
    },
    marginLeft:'10vw',
    marginRight:'10vw',
    marginTop: '5vh'
  },
  
}));

export default function UniList() {
  const classes = useStyles();

  return (
      <Fragment>
    <div className={classes.uniImages}><img src={bigCanLinkImg} alt={'canLink'}  height={'200px'} /></div>
    <div className={classes.uniImages}>
       
      {uniImages.map(image => <img src={image} alt={'logo'} height={'60px'} />)}
    </div>
    </Fragment>
  );
}
