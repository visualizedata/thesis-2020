(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{289:function(e,t,o){var content=o(295);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,o(41).default)("046f7c8f",content,!0,{sourceMap:!1})},291:function(e,t,o){"use strict";o(306);var n={created:function(){console.log("utilsMixin.created()")},methods:{isValid:function(s){return s["Outcome Year"]>1900&&s["Outcome Year"]<2020&&s.Discipline.length>0&&s.Outcome.length>0},addOutcomeClassifier:function(s){var e=s.Outcome,t=["resigned","no longer employed","suspended","retired","monetary settlement","other","criminal plea","fine","jury","training","demoted","committed suicide","barred","official warning","honor revoked","no known outcome"].map((function(t){return-1!==e.toLowerCase().indexOf(t)&&t.charAt(0).toUpperCase()+t.slice(1)})).find((function(b){return!1!==b}));return s.OutcomeClassifier=void 0===t?e:t,s},isStem:function(s){var e=s.Discipline;return["math","bio","med","health","psych","engineering","neuro","physical science","physics","anthro","chem","life","computer","geo","ecology","sociology","political","information","statistics","criminology"].map((function(t){return!(-1===e.toLowerCase().indexOf(t))})).some((function(b){return!0===b}))}}};t.a=n},292:function(e,t,o){"use strict";var n={data:function(){return{active:0}},props:{labels:{type:Array,required:!0}},methods:{next:function(){this.active<this.labels.length-1&&(this.active=this.active+1),this.$emit("stepChange",this.active)},back:function(){this.active>0&&(this.active=this.active-1),this.$emit("stepChange",this.active)}}},r=(o(294),o(16)),component=Object(r.a)(n,(function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("el-row",[t("el-col",{attrs:{span:24}})],1),this._v(" "),t("el-row",[t("el-col",{attrs:{span:8}}),this._v(" "),t("el-col",{attrs:{span:4}},[t("el-button",{staticClass:"el-button-steps",attrs:{type:"info",icon:"el-icon-arrow-left"},on:{click:this.back}})],1),this._v(" "),t("el-col",{attrs:{span:4}},[t("el-button",{staticClass:"el-button-steps",attrs:{type:"info",icon:"el-icon-arrow-right"},on:{click:this.next}})],1),this._v(" "),t("el-col",{attrs:{span:8}})],1)],1)}),[],!1,null,null,null);t.a=component.exports},294:function(e,t,o){"use strict";var n=o(289);o.n(n).a},295:function(e,t,o){(t=o(40)(!1)).push([e.i,".el-step{font-family:Lato}.el-button-steps{display:block;margin-left:auto;margin-right:auto;width:40%;background-color:#333;margin-bottom:2vh}.el-step__title.is-wait{color:#00f}.el-step__head.is-wait{color:#00f;border-color:#00f}.el-step__title.is-process{color:#0f0}.el-step__head.is-process{color:#0f0;border-color:#0f0}.el-step__title.is-finish{color:#ff6767}.el-step__head.is-finish{color:#ff6767;border-color:#ff6767}.el-step.is-horizontal .el-step__line{height:0;top:55%;left:0;right:0;position:absolute;background-color:grey}.el-step__line-inner{background-color:#fff}",""]),e.exports=t},307:function(e){e.exports=JSON.parse('[{"name":"Title IX investigation","caveats":"NA","first_incident":2017,"first_complaint":2018,"outcome":2018,"comments":"NA","institution":"NA","discipline":"NA","description":"NA"},{"name":"Lawrence Krauss","caveats":"three universities","first_incident":2006,"first_complaint":2009,"outcome":2018,"comments":"https://www.buzzfeednews.com/article/peteraldhous/lawrence-krauss-sexual-harassment-allegations","institution":"Arizona State University","discipline":"Physics","description":"Lawrence Krauss was a celebrity physicist and a staunch advocate for atheism. He was well known among the skeptical movement, whose members believe in rational inquiry and the use of empirical research to back claims. His career is littered with instances of sexual harassment, and some cases of outright sexual assault. He has denied all allegations against him, and attributes them to his fame. \\"It is common knowledge that celebrity attracts all forms of negative attention from many different angles...There is no pattern of discontent revealed here that suggests any other explanation,\\" Krauss has stated."},{"name":"Thomas Jessell","caveats":"at least","first_incident":2012,"first_complaint":2012,"outcome":2018,"comments":"https://www.columbiaspectator.com/news/2018/04/12/before-removal-mbbi-director-thomas-jessell-engaged-in-years-long-relationship-that-violated-columbia-policy/","institution":"Columbia University","discipline":"Neuroscience","description":"Thomas Jessel was a prominent neuroscientist who was a key contributor to the founding of Columbia\'s Zuckerman Mind Brain Behavior Institute. He was engaged in a relationship with a lab member under his supervision for years, violating university policies on consensual romantic and sexual relationships. Though a formal investigation started in December 2017, at least five years after the relationship began, faculty members have confirmed that a complain was filed to a mandated reporter in 2012, with no disciplinary actions taken. On March 2018, he was removed from all administrative positions and was stripped of all titles and grants. He has since passed away."},{"name":"Todd Heatherton","caveats":"at least","first_incident":2002,"first_complaint":2002,"outcome":2018,"comments":"https://www.washingtonpost.com/blogs/post-partisan/wp/2018/11/20/the-most-horrifying-part-of-the-dartmouth-sexual-harassment-case/","institution":"Dartmouth College","discipline":"Psychology","description":"Todd Heatherton is one of three tenured professors in Darmouth College\'s Department of Phychological and Brain Sciences accused of sexual misconduct in a $70 million class-action lawsuit against the trustees of the college. Heatherton has been accused of goping multiple graduate students. Dartmouth allowed him to retire after an internal investigation."},{"name":"Paul Whalen","caveats":"at least","first_incident":2002,"first_complaint":2002,"outcome":2018,"comments":"https://slate.com/technology/2018/11/dartmouth-sexual-assault-harassment-lawsuit-psychology.html","institution":"Dartmouth College","discipline":"Psychology","description":"Paul Whalen is the second of three Darmouth professors accused of sexual misconduct in the lawsuit. Whalen allegedly a raped a neuroscience graduate student and refused to wear a condom after cajoling her into a night of drinking. He then asked her to meet him at a bar to \\"celebrate\\" the results of medical testing she\'d pursued following the rape. He has also harassed multiple other students, allegedly telling them that Darmouth \\"protects its male professors\\", and that complaining has historically backfired. Whalen was allowed to resign after an internal investigations recommended that he be terminated."},{"name":"William Kelley","caveats":"at least","first_incident":2002,"first_complaint":2002,"outcome":2018,"x1":0,"x2":16,"xtotal":16,"comments":"https://view.publitas.com/newspapers-of-new-england/valley-news-dartmouth-lawsuit/page/54-55","institution":"Dartmouth College","discipline":"Psychology","description":"William Kelley is the third Dartmouth professor accused of sexual misconduct in the class action lawsuit. Kelley is alleged to have manipulated hotel room arrangements so a graduate student would need to stay in his hotel room during a conference, and proceeded to assault her. He has been accused of hosting hot tub parties at his house, playing inappropriate versions of Charades with them while drinking, sending photos of himself having sex with various people to students, and more. He resigned after internal investigations. The lawsuit was settled in August of 2019, which included $14 million for the class of plaintiffs."},{"name":"Harvey J. Makadon","caveats":"at least","first_incident":1990,"first_complaint":2013,"outcome":2018,"comments":"https://www.bostonglobe.com/metro/2017/12/08/for-years-fenway-health-center-kept-prominent-doctor-accused-harassment-bullying/djZugTTaxy1upIJfThMQZK/story.html","institution":"Harvard University","discipline":"Medicine","description":"Harvey Makadon held multiple medical positions, including a faculty position at Harvard Medical school, Fenway Community Health Center, and Beth Israel Deaconess Medical Center. He has been alleged to sexual harass and bully male coworkers, and accused of sexually assaulting a coworker in an elevator.Mutiple investigations were conducted throughout the years with recommendations that he be fired, but action was not taken. He was forced to resign from his positions after multiple allegations arose from colleagues at both Fenway Health and Harvard Medical School."},{"name":"Richard Vogt","caveats":"for years","first_incident":1989,"first_complaint":2018,"outcome":2018,"comments":"https://qz.com/1330066/turtle-scientist-richard-vogt-is-accused-of-sexually-inappropriate-behavior/","institution":"Joint Meeting of Ichthyologists and Herpetologists","discipline":"Herpetology","description":"Richard Vogt is a prominent herpetologist (turtle researcher) who was briefly given an award for distinguishment before it was rescinded due to his plenary lecture featuring photos of scantily clad fomer female students. Previous to this, he has had a reputation for his sexually inappropriate behavior in the herpetology field. Scientists had been warned to avoid him, and many have exited the field due to its toxic culture."},{"name":"Karl Kjer","caveats":"NA","first_incident":2012,"first_complaint":2016,"outcome":2018,"comments":"https://theaggie.org/2018/06/07/former-uc-davis-professor-filmed-individuals-showering-without-their-consent-stored-footage-on-university-owned-hard-drives/","institution":"University of California – Davis","discipline":"Entomology","description":"Karl Kjer is an entomologist who was a tenured professor at UC Davis. Two researchers in his lab accidentally discovered a hard drive full of pornography and videos of women unknowingly being filmed  undressing in his bathroom at home. He was charged in 2017 for one count of invasion of privacy in New Jersey, as these were filmed before his time at UC Davis. The university  allowed him to resign confidentially in 2016, but news of his charge broke in 2017, upsetting students and faculty that they were not told the circumstances of his resignation."},{"name":"Inder Verma","caveats":"NA","first_incident":1976,"first_complaint":1992,"outcome":2018,"comments":"https://www.sciencemag.org/news/2018/04/famed-cancer-biologist-allegedly-sexually-harassed-women-decades","institution":"Salk Institute","discipline":"Bioscience","description":"Inder Verma is a famed cancer biologist who resided at the Salk Institute. He was also notorious for sexual harassing colleagues. His misconduct spanned decades, with mutliple complaints being raised against him for inappropriate touching, kissing, and attempts at sexual engagement. In the past, when women raised issues with human resources, they were told to keep quiet of the incidents. He resigned from the institute after an investigation was opened regarding his misconduct. The Salk Institute has since faced and settled gender discirmination lawsuits filed by senior female professors who claimed that the institute systematically undermined and marginalized its female professors."},{"name":"Terry Speed","caveats":"NA","first_incident":2000,"first_complaint":2016,"outcome":2018,"comments":"https://www.dailycal.org/2018/03/25/uc-berkeley-statistics-professor-allegedly-sexually-harassed-postdoctoral-researcher/","institution":"University of California – Berkeley","discipline":"Mathematics","description":"Terry Speed was a statistics professor at UC Berkeley who was accused of sexually harassing a postdoctoral researcher for multiple years. A UC Berkeley mathematics professo and Caltech computational biology professor Lior Pachter filed a Title IX complaint against him in 2016 for creating a hostile environment for him and the researcher. He frequently sent the researcher explicit emails and declarations of love, and emailed Pachter about his infatuation. The investigation took more than a year with no proper outcome, prompting Pachter to go public with the investigation in a podcast. In 2018, Speed resigned from UC Berkeley."},{"name":"Stanton Glantz","caveats":"NA","first_incident":2015,"first_complaint":2017,"outcome":2018,"comments":"https://www.thearmstronglawfirm.com/NEELEY-COMPLAINT-FINAL.pdf","institution":"University of California – Berkeley","discipline":"Bioscience","description":"Stanton Glantz is the director of UCSF\'s Center for Tobacco Control Research and Education, who was involved in a lawsuit filed in 2017 by his former postdoc. She claimed that he sexually harassed her by making lurid remarks, ogling her breasts, and forcing her to hug him. She also claimed that he refused to include her name on a research paper. She left UCSF after filing a complaint with the university. UCSF settled the lawsuit with $150,000."},{"name":"Francisco J. Ayala","caveats":"NA","first_incident":2003,"first_complaint":2015,"outcome":2018,"comments":"https://www.sciencemag.org/news/2018/07/report-gives-details-sexual-harassment-allegations-felled-famed-geneticist","institution":"University of California – Irvine","discipline":"Bioscience","description":"Francisco Ayala is a famed geneticist who was at UC Irvine who allegedly had a track record for sexual harassment. His colleagues and students who were harassed details accounts of inappropriate comments on their appearances and unwanted touching. He was cautioned about his behavior many years before the last investigation led to his resignation, but he did nothing to right it."},{"name":"Robert Kurzban","caveats":"before","first_incident":2016,"first_complaint":2018,"outcome":2018,"comments":"https://www.thedp.com/article/2018/04/kurzban-philadelphia-evolutionary-psychology-upenn-ivy-league-pennsylvania-misconduct-higher-ed","institution":"University of Pennsylvania","discipline":"Psychology","description":"Robert Kurzban is a former professor of psychology at the University fo Pennsylvania. He resigned after being accused of having multiple inappropriate relationships with students. Details from multiple students reveal that he was a repeat offender in terms of engaging in romantic relationships with students."},{"name":"George Tyndall","caveats":"1990s","first_incident":1990,"first_complaint":2016,"outcome":2018,"comments":"https://www.nytimes.com/2018/05/17/us/USC-gynecologist-young-women.html","institution":"University of Southern California","discipline":"Medicine","description":"George Tyndall is a former gynecologist at the University of Southern California accused of sexually assaulting hundreds of women as the university\'s only full time gynecologist for 30 years. More than 350 women stepped forward to detail their acounts of sexual assault with them. After a year long investigation, the LA police arrested him, and was charged with 18 counts of sexually penetrating a person while she was unconscious, and 11 counts of sexual battery by fraud. The college admitted that it had received complaints of his behavior dating back to the 90s. A $215 million federal class action settlement was approved by the court in 2019."},{"name":"Eugene Redmond","caveats":"at least","first_incident":1976,"first_complaint":1994,"outcome":2018,"comments":"http://features.yaledailynews.com/blog/2019/03/05/i-saw-what-i-saw/","institution":"Yale University","discipline":"Psychiatry","description":"Eugene Redmond was a Yale School of Medicine professor who retired after an investigation into sexual assault allegations from five students affiliated with his university research, and at least eight other undergraduates. Most incidents occurred at his resaerch facility on St. Kitts, a Caribbean Island where he ran a summer internship program for Yale undergraduates. Yale first investigated his conduct in 1994, though did not properly implement disciplinary action. An investigation was finally conducted after three separate complaints, and Redmond\'s resignation. In 2019, additional allegations surfaced of Redmond sexually assaulting a 12 year old boy during a ski trip in Vermont."}]')},313:function(e,t,o){var content=o(405);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,o(41).default)("4acc00fd",content,!0,{sourceMap:!1})},404:function(e,t,o){"use strict";var n=o(313);o.n(n).a},405:function(e,t,o){(t=o(40)(!1)).push([e.i,".svg-container{position:relative;width:100%;padding-bottom:100%;vertical-align:top;overflow:hidden}.svg,.svg-container{display:inline-block}.svg{position:absolute;top:0;left:0}",""]),e.exports=t},415:function(e,t,o){"use strict";o.r(t);o(300);var n=o(301),r=(o(291),{data:function(){return{chartTitle:"A SQUARE",margin:{top:25,left:25,bottom:25,right:25}}},props:{caseStudyData:{type:Array,required:!0},colorToggled:{type:String,required:!0},stepValue:{type:Number,required:!0}},mounted:function(){console.log("SQUARE mounted 😷");var svg=n.n(this.$refs.squareSVG).attr("viewBox",[0,0,window.innerWidth/2,window.innerHeight/2]);svg.append("rect").attr("x",window.innerWidth/4-150).attr("y",window.innerHeight/4-75).attr("width",300).attr("height",150).attr("stroke",this.colorToggled).attr("fill",this.colorToggled),svg.append("text").style("font","18px Lato").attr("x",window.innerWidth/4-150).attr("y",window.innerHeight/4-75).attr("width",300).attr("height",150).attr("stroke","#ffffff").text("slider in step: "+this.stepValue)},watch:{colorToggled:function(){console.log("colorToggled 😷");n.n(this.$refs.squareSVG).select("rect").attr("stroke",this.colorToggled).attr("fill",this.colorToggled)},stepValue:function(){n.n(this.$refs.squareSVG).select("text").text("slider in step: "+this.stepValue)}}}),l=o(16),c=Object(l.a)(r,(function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"container"}},[t("h2",[this._v(" "+this._s(this.chartTitle)+" stepsValue is "+this._s(this.stepValue))]),this._v(" "),t("el-row",[t("el-col",{attrs:{span:24}},[t("svg",{ref:"squareSVG"})])],1)],1)}),[],!1,null,null,null).exports,d=o(292),h=o(307),m={data:function(){return{loadedCaseStudies:h,colorToggled:"#ff0000",stepValue:1,stepLabels:["sdfisdf","sdfsdfs"]}},components:{square:c,steps:d.a},methods:{propagateStepChange:function(e){console.log("propagateStepChange: "+e),this.changeColor(),this.stepValue=e},changeColor:function(e){console.log("changeColor 🤪"),"#ff0000"===this.colorToggled?this.colorToggled="#00ff00":this.colorToggled="#ff0000"}}},f=(o(404),Object(l.a)(m,(function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("el-row",[t("el-col",{attrs:{span:24}},[t("square",{attrs:{caseStudyData:this.loadedCaseStudies,colorToggled:this.colorToggled,stepValue:this.stepValue}}),this._v(" --\x3e\n    ")],1)],1),this._v(" "),t("el-row",[t("el-col",{staticStyle:{position:"fixed",bottom:"0"},attrs:{span:24}},[t("steps",{attrs:{labels:this.stepLabels},on:{stepChange:this.propagateStepChange}})],1)],1)],1)}),[],!1,null,null,null));t.default=f.exports}}]);