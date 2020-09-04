import React, {useState,useEffect} from "react";
import { UNI_LIST_URL } from '../constants';

export const UniversityListContext = React.createContext();


function isEmpty(obj) {
  for(var key in obj) {
      if(obj.hasOwnProperty(key))
          return false;
  }
  return true;
}


export const UniversityListProvider  = ({children}) => {

  const [universityList, setUniversityList] = useState({});

  async function  getList() {
    if (isEmpty(universityList)) {
      const response = await fetch(UNI_LIST_URL)
      return await response.json()
    } else {
      return universityList
    }
  }

  async function fetchList() {
    const universityList = await getList()
    setUniversityList(universityList)
  };

   useEffect(()=> {
      fetchList()
  },[]) 

  return (
    // we return two options:  the list as a state variable, and a direct call to get the list
    // for cases like the solr query that need the list before the state variable has initialized
      <UniversityListContext.Provider value={[universityList, getList]}>
        {children}
      </UniversityListContext.Provider>
    )
}
