import{ useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import uniMapping from '../datasets/uniMapping'
import {SOLR_QUERY_URL, FACET_QUERY} from '../constants';

const massageResultForVisualizers = ({val, count})=>(
  {
    val,
    count,   // val and count for map
    text:val, 
    value: count, // for Bubbles visualization
    label: val,  // for Bubbles visualization
    name: val, 
    size: count, 
   // color: Math.random(),
    style: {
      border: 'thin solid red'
    } 
  })

  const processUniversitiesForVisualizations = ({val, count}) => {
  
      const uniData = uniMapping[val] ;
      const transformed = massageResultForVisualizers({val, count});
      return {
          ...transformed,
          coordinates: uniData.coordinates,
          name: uniData.name,
      }
  }
    
  

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return { 
        ...state, 
        isLoading: true, 
        isError: false 
    };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        response: action.payload.response,
        universities: action.payload.universities,
        subjects: action.payload.subjects,
        degrees: action.payload.degrees,
        languages: action.payload.languages,
        years: action.payload.years
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      throw new Error();
  }
};

const useSOLRQuery = () => {
  const [query, setQuery] = useState({query:null,page:0});

  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    response: { docs:[]},
    universities: [],
    subjects: [],
    degrees: [],
    languages: [],
    years: []
  });

  useEffect(() => {
   
    let didCancel = false;

    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' });

      try {

        let queryString;
        

        if (query.query) {
          queryString = `(title:${query.query} or abstract:${query.query})`
        }

        if (query.Institution) {
          queryString = (queryString?`${queryString} and `:'') + `institution:${query.Institution.substring(query.Institution.lastIndexOf('/')+1)}`
        }

        if (query.Creator) {
          queryString = (queryString?`${queryString} and `:'') + `creator:${query.Creator}`
        }
        
        if (query.Subject) {
          queryString = (queryString?`${queryString} and `:'') + `subject:${query.Subject}`
        }

        if (query.from && query.to) {
          queryString = (queryString?`${queryString} and `:'') + `year:[${query.from} TO ${query.to}]`
        }

        let rows = 10;
        if (!queryString) {
          // no query to run, but we still want all the university facet numbers for the map,
          // so still run a query that returns all results:
          queryString = '*:*'
          // But, set rows to 0
          // which will still populate the faceting but not return actual results
          rows = 0
        } 

        let url = `${SOLR_QUERY_URL}${queryString}`
        
        
        url = `${url}&start=${query.page*rows}&rows=${rows}`
        

        // finally add faceting query for universities and subjects
        url = `${url}${FACET_QUERY}`

        const result = await axios.get(url)

        console.log("result of solr query")
        console.log(result)

        let payload = {
          response: result.data.response, 
          universities: result.data.facets.universities.buckets.map(processUniversitiesForVisualizations), 
          subjects: result.data.facets.subjects.buckets.map(massageResultForVisualizers), 
          degrees: result.data.facets.degrees.buckets.map(massageResultForVisualizers),
          years: result.data.facets.years.buckets.map(massageResultForVisualizers),
          languages: result.data.facets.languages.buckets.map(massageResultForVisualizers)
        }

        if (!didCancel) {
          dispatch({ type: 'FETCH_SUCCESS', payload: payload});
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: 'FETCH_FAILURE' });
        }
      }
    };

    fetchData();

    return () => {
      didCancel = true;
    };
  }, [query]);

  return [state, setQuery];
};

export default useSOLRQuery;


