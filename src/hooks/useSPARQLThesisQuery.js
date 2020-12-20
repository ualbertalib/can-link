import{ useState, useEffect, useReducer } from 'react';
import axios from 'axios';

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
        rdf: action.payload.response
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

const useSPARQLThesisQuery = (initialThesisURI) => {
  const [thesisURI, setThesisURI] = useState(initialThesisURI);

  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    rdf: null
  });

  useEffect(() => {
   
    let didCancel = false;

    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' });

      try {
        const result = await axios({
          method: 'get',
          url: thesisURI,
          headers: {'Accept': 'application/rdf+xml'}
        })

        const payload = {
          response: result.data
        }

        if (!didCancel) {
          dispatch({ type: 'FETCH_SUCCESS', payload});
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: 'FETCH_FAILURE' });
        }
      }
    };

    if (thesisURI) {fetchData()}

    return () => {
      didCancel = true;
    };
  }, [thesisURI]);

  return [state, setThesisURI];
};

export default useSPARQLThesisQuery;


