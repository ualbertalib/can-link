import{ useState, useEffect, useReducer, useContext } from 'react';
import axios from 'axios';
import {SOLR_QUERY_URL, FACET_QUERY} from '../constants';
import { UniversityListContext } from '../contexts/UniversityListContext'

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
      border: 'thin solid #2EBCEE',
      fontFamily: "'News Cycle', sans-serif",
    },
    color: '#A8DBF6', 
  })

  const processUniversitiesForVisualizations = (uniMapping) => ({val, count}) => {
      try {
        const uniData = uniMapping[val] ;
        const transformed = massageResultForVisualizers({val, count});
        return {
          ...transformed,
          coordinates: uniData.coordinates,
          name: uniData.name,
          label: uniData.name,
          short_name: uniData.short_name

        }
      } catch(e) {
        console.log("error in processing university: " + val)
        throw Error(e)
      }
  }
    
  const extractYearQuery = (queryString) => {
    return queryString.split(' ').reduce((result, token)=>{
      if (/\b\d{4}\b/.test(token)) {
        result.push(`OR year:${token}`)
      } 
      return result
    }, []).join(' ')
    
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
        uniShortNames: action.payload.uniShortNames,
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
  // note:  we skip over the first item in the destructured array returned by the
  // UniversityListContext (which is a shared state variable containing the uni list.
  // We instead need to force the call to 
  // get the university mapping for this component, rather than relying on getting it through the state variable
  // share by the UniversityListContext.  The UniversityListContext call to get the mapping from the server (to put
  // in its shared state variable) doesn't always finish before this solr search is fired.
  const [ , fetchMappingAsync] = useContext(UniversityListContext)
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
          let yearQuery = extractYearQuery(query.query)
          queryString = `(title:${query.query} OR abstract:${query.query} OR subject:${query.query} OR creator:${query.query} ${yearQuery})`
        }

        if (query.Institution && query.Institution.length) {
          queryString = (queryString?`${queryString} AND (`:'(')
          queryString = queryString + query.Institution.map( institution => `institution_short_str:"${institution}"`).join(' OR ')
          queryString = queryString + ')'
        }

        if (query.Author && query.Author.length) {
          queryString = (queryString?`${queryString} AND (`:'(')
          queryString = queryString + query.Author.map( author => `creator:"${author}"`).join(' OR ')
          queryString = queryString + ')'
        }
        
        if (query.Subject && query.Subject.length) {
          queryString = (queryString?`${queryString} AND (`:'(')
          queryString = queryString + query.Subject.map( subject => `subject:"${subject}"`).join(' OR ')
          queryString = queryString + ')'
        }

        if (query.Degree && query.Degree.length) {
          queryString = (queryString?`${queryString} AND (`:'(')
          queryString = queryString + query.Degree.map( degree => `degree_name_str:"${degree}"`).join(' OR ')
          queryString = queryString + ')'
        }

        if (query.from && query.to) {
          queryString = (queryString?`${queryString} AND `:'') + `year:[${query.from} TO ${query.to}]`
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
        

        // finally add faceting query 
        url = `${url}${FACET_QUERY}`

        const result = await axios.get(url)

        const uniMapping = await fetchMappingAsync()

        let payload = {
          response: result.data.response, 
          universities: result.data.facets.universities?result.data.facets.universities.buckets.map(processUniversitiesForVisualizations(uniMapping)):[],
          uniShortNames: result.data.facets.uniShortNames?result.data.facets.uniShortNames.buckets.map(massageResultForVisualizers):[],
          subjects: result.data.facets.subjects?result.data.facets.subjects.buckets.map(massageResultForVisualizers):[], 
          degrees: result.data.facets.degrees?result.data.facets.degrees.buckets.map(massageResultForVisualizers):[],
          years: result.data.facets.years?result.data.facets.years.buckets.map(massageResultForVisualizers):[],
          languages: result.data.facets.languages?result.data.facets.languages.buckets.map(massageResultForVisualizers):[]
        }

        if (!didCancel) {
          dispatch({ type: 'FETCH_SUCCESS', payload: payload});
        }
      } catch (error) {
        console.log("error from solr query:")
        console.log(error)
        if (!didCancel) {
          dispatch({ type: 'FETCH_FAILURE' });
        }
      }
    };

    fetchData();

    return () => {
      didCancel = true;
    };
  }, [fetchMappingAsync, query]);

  return [state, setQuery];
};

export default useSOLRQuery;


