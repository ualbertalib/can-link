import{ useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import { HEADER_MAPPING } from '../constants'

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



const useSPARQLQuery = (uri, initialSerialization = 'XML') => {
 // const [uri, setUri] = useState(initialURI);
  const [serialization, setSerialization] = useState(initialSerialization)
  
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    rdf: null
  });

  useEffect(() => {
    const acceptHeader = HEADER_MAPPING[serialization]
    let didCancel = false;
  
    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' });

      try {
        const result = await axios({
          method: 'get',
          url: uri,
          headers: {'Accept': acceptHeader}
        })
        const response = serialization==='json'?JSON.stringify(result.data, null, '\t'):result.data
        const payload = { response }

        if (!didCancel) {
          dispatch({ type: 'FETCH_SUCCESS', payload});
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: 'FETCH_FAILURE' });
        }
      }
    };

    if (uri) {fetchData()}

    return () => {
      didCancel = true;
    };
  }, [uri, serialization]);

  return [state, setSerialization];
};

export default useSPARQLQuery;


