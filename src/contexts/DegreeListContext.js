import React, {useState,useEffect} from "react";
import { DEGREE_FACET_URL } from '../constants';

export const DegreeListContext = React.createContext();


function isEmpty(obj) {
  for(var key in obj) {
      if(obj.hasOwnProperty(key))
          return false;
  }
  return true;
}


export const DegreeListProvider  = ({children}) => {

  const [degreeList, setDegreeList] = useState([]);

  async function  getList() {
    if (isEmpty(degreeList)) {
      const response = await fetch(DEGREE_FACET_URL, {cache: "no-store"})
      let respJSON = await response.json()
      return respJSON.facets.degrees.buckets.map(degree=>degree.val)
    } else {
      return degreeList
    }
  }

  async function fetchList() {
    const degreeList = await getList()
    setDegreeList(degreeList)
  };

   useEffect(()=> {
      fetchList()
  },[]) 

  return (
    // we return two options:  the list as a state variable, and a direct call to get the list
    // for cases like the solr query that need the list before the state variable has initialized
      <DegreeListContext.Provider value={[degreeList, getList]}>
        {children}
      </DegreeListContext.Provider>
    )
}
