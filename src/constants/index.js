export const SOLR_URL = "http://206.167.181.124:8983/solr/test/";
export const SOLR_RECORD_URL = `${SOLR_URL}get?ids=http://canlink.library.ualberta.ca/thesis/`
export const SOLR_QUERY_URL = `${SOLR_URL}select?q=`
export const FACET_QUERY = "&json.facet={universities: {type:terms,field:institution_str,limit:100}, subjects: {type:terms,field:subject,limit:100}, degrees: {type:terms,field:degree,limit:100}, languages: {type:terms,field:lang_str,limit:100}, years: {type:terms,field:year,limit:200}}";
//export const SUBJECT_FACET_QUERY = "http://206.167.181.124:8983/solr/test/select?q=*:*&start=0&rows=0&json.facet={subjects :{type:terms,field:subject,limit:10000}}"
//export const SOLR_INITIAL_FACET_URL = `${SOLR_URL}query?q=*:*&rows=0${UNI_FACET_QUERY}`


