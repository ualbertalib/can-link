import React, {useState, Fragment} from 'react';
import '../App.css';
import useSOLRQuery from '../hooks/useSOLRQuery';

import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import FormControl from '@material-ui/core/FormControl';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paginator from '../components/Paginator';

import '../../node_modules/react-vis/dist/style.css';
import '../../node_modules/leaflet/dist/leaflet.css'

import ThesisDialog from '../components/ThesisDialog'
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';

import { useForm } from "react-hook-form";
import Suggester from '../components/Suggester';
import UniversitySelect from '../components/UniversitySelect';
import DegreeSelect from '../components/DegreeSelect';
import FacetMap from '../components/FacetMap';
import WordCloud from '../components/WordCloud'
import ToggleBar from '../components/ToggleBar';
import Bubbles from '../components/Bubbles';
import AnimatedTreeMap from '../components/AnimatedTreeMap';
import Footer from '../components/Footer';
import Header from '../components/Header';

import { useLocation } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  form: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  popover: {
    pointerEvents: 'none',
  },
  searchButton: {
    fontSize: '11pt',
    width: "23vw", 
    height: "100%",
    backgroundColor: '#A8DBF6',
    marginRight:'.41vw'
  },
  paging: {
    fontSize: '10pt'
  },
  noresults: {
    color: 'red'
  }

}));

function Search() {

  const location = useLocation();

  const classes = useStyles();

  const [visualization, setVisualization] = useState('map')

  // these next four are created here and passed into the corresponding AutoSelects
  // so that we can reset the values on the AutoSelects from this Search page.
  const [author, setAuthor] = useState([])
  const [subject, setSubject] = useState([])
  const [degree, setDegree] = useState([])
  const [university, setUniversity] = useState([])


  const [{ response, universities, uniShortNames, subjects, degrees, years, isLoading, isError }, doQuery] = useSOLRQuery();
  
  const { register, handleSubmit, setValue, reset, errors } = useForm();
  
  const onSubmit = queryInputs => {
    console.log("the query inputs")
    console.log(queryInputs)
    doQuery({...queryInputs, page: 0});
  }

  const handlePageChange = (page) => {
    handleSubmit(queryInputs => doQuery({...queryInputs, page: page-1}))()
  }

  // invokes a new search using the passed in value, 
  // and sets the value in the corresponding form control
  const handleVizClick = (field, value) => {

  //  handleSubmit(queryInputs => doQuery({...queryInputs, page: page-1}))()
  }

  const handleTabBarChange = (tabName) => {
    setVisualization(tabName)
  }

  const resetForm = () => {
    reset({ query: "", from:"", to:"" })
    setValue('Subject', [])
    setValue('Institution', [])
    setValue('Author', [])
    setValue('Degree', [])
    setSubject([])
    setAuthor([])
    setUniversity([])
    setDegree([])
  }


  React.useEffect(() => {
    if (location.state && location.state.query) {
      setValue('query', location.state.query)
      handleSubmit(queryInputs => doQuery({...queryInputs, page: 0}))()
    }
 }, [location, setValue, doQuery, handleSubmit]);

React.useEffect(() => {
  register({ name: 'Subject' });
  register({ name: 'Author' });
  register({ name: 'Institution' });
  register({ name: 'Degree' });
}, [register]);

  return (
    
<div>
    <Header/>
  
  <div className="App">

    
    <div className={classes.root}>

      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
     
      <Grid container  spacing={1} style={{paddingRight:"1vw"}} >
        <Grid item sm={6} >
          <FormControl> <TextField  style={{ width: "47.5vw" }} variant={'outlined'} type="search" label={"Query"} inputRef={register} name="query"   /></FormControl>
        </Grid>

        <Grid item sm={3} >
          <FormControl> <Suggester  width='23vw' title={'Author'} suggestType="agents" setValue={setValue} inputValue={author} setInputValue={setAuthor}/> </FormControl>
        </Grid>

        <Grid item sm={3} >
          <FormControl> <DegreeSelect width='23vw' setValue={setValue} inputValue={degree} setInputValue={setDegree}/> </FormControl>
        </Grid>

      </Grid>
      <Grid container spacing={1}  style={{paddingRight:"1vw"}} >
        <Grid item sm={3} >
        <FormControl> <UniversitySelect width='23vw' setValue={setValue} inputValue={university} setInputValue={setUniversity}/> </FormControl>
        </Grid>
        
        <Grid item sm={3} >
          <FormControl> <Suggester  width='23vw' title={'Subject'} suggestType="subjects" setValue={setValue} inputValue={subject} setInputValue={setSubject}/> </FormControl>
        </Grid>
        
        <Grid item sm={3}  >
          <FormControl> <TextField  style={{ width: "11vw" }} variant={'outlined'} 
      color="secondary" type="number" label={"From Year"} inputRef={register({ min: 1000, max: 9999 })} name="from"   /> {errors.from && "Year must be four digits"}</FormControl>
          <FormControl> <TextField  style={{ width: "11vw" , marginLeft:'1vw'}} variant={'outlined'} type="number" label={"To Year"} inputRef={register({ min: 1000, max: 9999 })} name="to"   />  {errors.from && "Year must be four digits"} </FormControl>
        </Grid>

        <Grid item sm={3} style={{textAlign:'right'}}>
        <FormControl> <Button size="medium" className={classes.searchButton} variant="outlined" color="primary" type="submit" style={{ width: "11vw", height: "5.4vh", marginRight:'1vw' }}>Search</Button></FormControl> 
        <FormControl> <Button size="large" className={classes.searchButton} variant="outlined" color="primary" style={{ width: "11vw", height: "5.4vh" }} onClick={resetForm}>Reset</Button></FormControl> 
      </Grid>
    
      </Grid>
      </form>


      
      <Grid container spacing={3} style={{padding: '1vw'}}>
          {isError && <div>Something went wrong ...</div>}
 
              {isLoading ? (
                <div>Loading ...</div>
              ) : (
                <Grid container spacing={1}>
                      <Grid item xs={4}>
                  {response.docs[0] ? (
                    <Fragment>
                      <Typography component="span"
                    variant="body2" className={classes.paging}>Page {response.start/10 + 1} of {Math.ceil(response.numFound/10)}</Typography>

                      <div className={classes.demo}>
                        <List dense={true}>
                          {response.docs.map(thesis => (
                            <ThesisDialog key={thesis.id} thesis={thesis}/>))}
                        </List>
                      </div>

                      <Paginator  handlePageChange={handlePageChange} page={response.start/10 + 1} totalPages={Math.ceil(response.numFound/10)}/>
                      </Fragment>
                  ):(<Typography component="span"
                  variant="body2" className={classes.noresults}>No Results To Show</Typography>)
                  }
                    </Grid>

                    <Grid item xs={8}>
                             <ToggleBar setVisualization={handleTabBarChange} />
                             
                           <div style={{display: 'flex', alignItems: 'center',justifyContent: 'center'}}>
                             {visualization === 'map' && <FacetMap facets={universities} /> }
                             {visualization === 'cloud' && <WordCloud words={subjects} /> }
                             {visualization === 'rdTree' &&   <Bubbles values={uniShortNames} />}
                             {visualization === 'sqTree' &&   <AnimatedTreeMap data={years} type="squarify"/>}
                             {visualization === 'subbub' &&   <Bubbles values={degrees}/>}
                            </div> 
                        </Grid>
                </Grid>
              )}
          
      </Grid>
      
   
  </div>
  
  </div>
  <Footer/>
    </div>
  
   
  );
}

export default Search;
