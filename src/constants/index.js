export const SOLR_URL = "http://206.167.181.124:8983/solr/CanLink-new-5/";
export const SOLR_RECORD_URL = `${SOLR_URL}get?ids=http://canlink.library.ualberta.ca/thesis/`
export const SOLR_QUERY_URL = `${SOLR_URL}select?q=`
export const FACET_QUERY = "&json.facet={universities: {type:terms,field:institution_str,limit:100}, uniShortNames: {type:terms, field:institution_short_str, limit:100}, subjects: {type:terms,field:subject_str,limit:100}, degrees: {type:terms,field:degree_name_str,limit:100}, languages: {type:terms,field:lang_str,limit:100}, years: {type:terms,field:year,limit:200}}";
export const UNI_LIST_URL = 'http://206.167.181.124/institutions.json'
export const DEGREE_FACET_URL = `${SOLR_QUERY_URL}*:*&start=0&rows=0&json.facet={degrees: {type:terms, field:degree_name_str, limit:1000}}`

