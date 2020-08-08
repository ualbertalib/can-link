function Solr() {
    const serverString = 'http://206.167.181.124:8983/solr/test/select?q=creator_first%3Ageoffrey'
    fetch(serverString)
        .then(response => response.json())
        .then(data => console.log(data));
}

export default Solr