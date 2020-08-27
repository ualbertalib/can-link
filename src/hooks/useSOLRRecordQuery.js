import{ useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import {SOLR_RECORD_URL} from '../constants';

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
        thesis: action.payload.response
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

const useSOLRRecordQuery = (initialThesisId) => {
  const [thesisId, setThesisId] = useState(initialThesisId);

  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    thesis: {}
  });

  useEffect(() => {
   
    let didCancel = false;

    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' });

      try {

        const url = `${SOLR_RECORD_URL}${thesisId}`
        const result = await axios.get(url)

        let payload = {
          response: result.data.response.docs[0]
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

    if (thesisId) {fetchData()}

    return () => {
      didCancel = true;
    };
  }, [thesisId]);

  return [state, setThesisId];
};

export default useSOLRRecordQuery;


