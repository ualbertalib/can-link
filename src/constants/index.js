export const SERVER_URL = 'http://198.168.187.81/'
export const CAN_LINK_URI = 'http://canlink.library.ualberta.ca/'
export const THESIS_URI = `${CAN_LINK_URI}thesis/`
export const SUBJECT_URI = `${CAN_LINK_URI}subject/`
export const SOLR_URL = `${SERVER_URL}:8983/solr/CanLink-new-5/`;
export const SOLR_RECORD_URL = `${SOLR_URL}get?ids=${THESIS_URI}`
export const SOLR_QUERY_URL = `${SOLR_URL}select?q=`
export const FACET_QUERY = "&json.facet={universities: {type:terms,field:institution_str,limit:100}, uniShortNames: {type:terms, field:institution_short_str, limit:100}, subjects: {type:terms,field:subject_str,limit:100}, degrees: {type:terms,field:degree_name_str,limit:100}, languages: {type:terms,field:lang_str,limit:100}, years: {type:terms,field:year,limit:200}}";
export const UNI_LIST_URL = `${SERVER_URL}/institutions.json`
export const DEGREE_FACET_URL = `${SOLR_QUERY_URL}*:*&start=0&rows=0&json.facet={degrees: {type:terms, field:degree_name_str, limit:1000}}`

export const SPARQL_URL = `${SERVER_URL}:7200/repositories/cldi-test-9/statements`

// replace <SUBJECT_URI> with the actual uri in the following
export const SPARQL_SUBJECT_URL = `${SPARQL_URL}?subj=<{SUBJECT_URI}>`
// like so:
// http://198.168.187.81:7200/repositories/cldi-test-9/statements?subj=<http://canlink.library.ualberta.ca/subject/bcb3603403b3c89cefd49d1e3c75e4c6>'


export const HEADER_MAPPING = {
    XML: 'application/rdf+xml', 
    text: 'text/plain',
    turtle: 'text/turtle',
    N3: 'text/rdf+n3',
    nquads: 'text/x-nquads',
    json: 'application/rdf+json',
    trix: 'application/trix',
    trig: 'application/x-trig',
    binary: 'application/x-binary-rdf'
  }