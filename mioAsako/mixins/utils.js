var utilsMixin = {
    created: function(){
        console.log("utilsMixin.created()");
    },
    methods: {
        isValid: function(s){
            return s['Outcome Year'] > 1900 
                && s['Outcome Year'] < 2020 
                && s['Discipline'].length > 0 
                && s['Outcome'].length > 0;
         },

        addOutcomeClassifier: function(s){
          // this is in order of importance
          var outcomes = 
            [ "resigned", "no longer employed", "suspended", "retired"
            , "monetary settlement", "other", "criminal plea", "fine"
            , "jury", "training", "demoted", "committed suicide", "barred", "official warning"
            , "honor revoked", "no known outcome"
            ]
          var elem = s['Outcome'];
          var containsName = function(name) {
            if (!(elem.toLowerCase().indexOf(name) === -1)){
                return name.charAt(0).toUpperCase() + name.slice(1);
            } else { return false };
          }
          // array of true or false, where true if includes any of stemNames
          var res = outcomes.map(containsName);
          // return true if _any_ of the results are true
          var classifier = res.find(function(b){ return b !== false ;})
          if(classifier === undefined) {
            s['OutcomeClassifier'] = elem;
          } else {
            s['OutcomeClassifier'] = classifier;
          }
          return s;
        },

        isStem: function(s) {
            // array of stem substrings
            var stemNames = ['math','bio','med', 'health', 'psych', 'engineering', 'neuro', 'physical science', 'physics', 'anthro', 'chem', 'life', 'computer', 'geo', 'ecology', 'sociology', 'political', 'information', 'statistics','criminology'];
            var elem = s['Discipline'];
            var containsName = function(name) {
              return !(elem.toLowerCase().indexOf(name) === -1);
            }
            // array of true or false, where true if includes any of stemNames
            var res = stemNames.map(containsName);
            // return true if _any_ of the results are true
            return res.some(function(b){ return b === true ;})
        }
    }
};

export default utilsMixin;