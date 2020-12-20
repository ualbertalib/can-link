export const SERVER_URL = 'http://206.167.181.124'
export const THESIS_URI = 'http://canlink.library.ualberta.ca/thesis/'
export const SOLR_URL = `${SERVER_URL}:8983/solr/CanLink-new-5/`;
export const SOLR_RECORD_URL = `${SOLR_URL}get?ids=${THESIS_URI}`
export const SOLR_QUERY_URL = `${SOLR_URL}select?q=`
export const FACET_QUERY = "&json.facet={universities: {type:terms,field:institution_str,limit:100}, uniShortNames: {type:terms, field:institution_short_str, limit:100}, subjects: {type:terms,field:subject_str,limit:100}, degrees: {type:terms,field:degree_name_str,limit:100}, languages: {type:terms,field:lang_str,limit:100}, years: {type:terms,field:year,limit:200}}";
export const UNI_LIST_URL = `${SERVER_URL}/institutions.json`
export const DEGREE_FACET_URL = `${SOLR_QUERY_URL}*:*&start=0&rows=0&json.facet={degrees: {type:terms, field:degree_name_str, limit:1000}}`

// replace <SUBJECT_URI> with the actual uri in the following
export const SPARQL_URL = `${SERVER_URL}:7200/repositories/cldi-test-9/statements?subj=<{SUBJECT_URI}>`
// like so:
// http://206.167.181.124:7200/repositories/cldi-test-9/statements?subj=<http://canlink.library.ualberta.ca/subject/bcb3603403b3c89cefd49d1e3c75e4c6>'

