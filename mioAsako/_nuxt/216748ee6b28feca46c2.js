(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{309:function(t,e,n){t.exports=n.p+"img/eb200da.png"},310:function(t,e,n){var content=n(391);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(41).default)("43aab9f3",content,!0,{sourceMap:!1})},387:function(t,e,n){"use strict";n(388)("link",(function(t){return function(e){return t(this,"a","href",e)}}))},388:function(t,e,n){var r=n(6),o=n(10),l=n(28),c=/"/g,h=function(t,e,n,r){var o=String(l(t)),h="<"+e;return""!==n&&(h+=" "+n+'="'+String(r).replace(c,"&quot;")+'"'),h+">"+o+"</"+e+">"};t.exports=function(t,e){var n={};n[t]=e(h),r(r.P+r.F*o((function(){var e=""[t]('"');return e!==e.toLowerCase()||e.split('"').length>3})),"String",n)}},389:function(t){t.exports=JSON.parse('[{"label":"STEP 1","description":"This is a timeline of all of the publicly reported academic sexual misconduct cases in the US. There is a total of 1030 reported cases from 1979 to 2020, as of April 1, 2020. Only cases with known outcomes are shown here (all cases in 2020, and a portion of cases in 2019 are still unresolved). Note that cases of sexual misconduct are likely much higher than what is officially reported to the institutions of origin. Reports of sexual harassment have steadily increased throughout the decades, with initial cases in the late 1970s. This is perhaps largely due to the passage of laws and public of court cases that set the stage for sexual harassment cases to come. "},{"label":"STEP 2","description":"Under the Educational Amendments of 1972, the federal civil rights law Title IX was passed, which prohibited discrimination on the basis of sex in educational institutions receiving federal aid. In a landmark case in 1980 between Yale University and five of its students (Ronnie Alexander, Margery Reifler, Pamela Price, Lisa E Stone and Ann Olivarius) in 1980 (Alexander v Yale), Title IX was used for the first time in charges of sexual harassment against an educational institution. While the plaintiffs did not win the case, they succeeded in having Yale set in place a grievance procedure for students in the event that they experienced sexual harassment. It also established that sexual harassment could be considered sex discrimination under Title IX and was illegal."},{"label":"STEP 3","description":"In 1991, Anita Hill testified against then Supreme Court nominee Clarence Thomas during his confirmation hearings, accusing him of sexual harassment while he was her supervisor at the Department of Education and the Equal Employment Opportunity Commission. In that year alone, the number of sexual harassment cases reported to the EEOC increased by 58%, and has steadily increased since."},{"label":"STEP 4","description":"In 2017, actress Alyssa Milano used the hashtag #MeToo, originally coined by civil rights activist Tarana Burke in 2006, on Twitter to highlight sexual abuse by Hollywood titan Harvey Weinstein. With this, she called out for fellow survivors of sexual misconduct to step forward and join in on highlighting similar experiences. #MeToo subsequently went viral, as thousands of women publicly detailed their accounts. This triggered a massive increase in the number of reported sexual misconduct cases in the academic world as well."},{"label":"STEP 5","description":"Out of all cases, 332 of them originate from STEM fields. This is around a third of total cases. Following overall trends, reports of sexual misconduct cases have skyrocketed since 2017, when the #MeToo movement made waves throughout all of society. Many prominent scientists were exposed between 2017 and 2019 in highly publicized investigative news reports that reached beyond the immediate scientific community."}]')},390:function(t,e,n){"use strict";var r=n(310);n.n(r).a},391:function(t,e,n){(e=n(40)(!1)).push([t.i,".description{font-family:Lato;font-size:18px;padding:2vh;line-height:1.5;background-color:rgba(0,0,0,.5)}.chartTitle,.description{max-width:75%;margin:5vh}.tooltip{max-width:600px;line-height:1.5;font-size:16px;min-height:50px}.cases{margin:5vh;line-height:.5;max-width:600px;padding:2vh;position:absolute;z-index:1;background-color:rgba(0,0,0,.5)}#chronologyPage{min-height:100vh}#chronologySVG{position:absolute;z-index:0}",""]),t.exports=e},412:function(t,e,n){"use strict";n.r(e);n(387),n(43);var r=n(122);var o=n(150);function l(t){return function(t){if(Array.isArray(t))return Object(r.a)(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||Object(o.a)(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}n(300);var c=n(301),h=n(291),f={data:function(){return{chartTitle:"FOLLOWING THE TRAIL OF SEXUAL MISCONDUCT CASES IN ACADEMIA",height:900,width:1500,margin:{top:25,left:25,bottom:25,right:25}}},props:{asmdData:{type:Array,required:!0},stepValue:{type:Number,required:!0},descriptions:{type:Array,required:!0}},mixins:[h.a],computed:{myData:function(){return this.asmdData.filter(this.isValid)},rHeight:function(){return 3.2},startYear:function(){return Math.min.apply(Math,l(this.myData.map((function(a){return a["Outcome Year"]}))))},endYear:function(){return Math.max.apply(Math,l(this.myData.map((function(a){return a["Outcome Year"]}))))},maxCases:function(){return Math.max.apply(Math,l(this.myBins.map((function(a){return a.length}))))},xScale:function(){return c.l().rangeRound([0,this.width]).domain([new Date(1979,1,1),new Date(this.endYear,12,31)])},yScale:function(){return c.j().range([this.height,0+this.margin.top,+this.margin.bottom]).domain([0,this.maxCases])},myBins:function(){var t=this.endYear-this.startYear,e=c.p("%Y");return c.e().domain(this.xScale.domain()).thresholds(this.xScale.ticks(t)).value((function(t){return e(t["Outcome Year"])}))(this.myData)}},methods:{clearBarGraph:function(){c.n(this.$refs.chronologySVG).selectAll("g").remove()},drawBarGraph:function(){var t=this;console.log("drawBarGraph: "+this.myData.length),console.log("maxCases: "+this.maxCases);var svg=c.n(this.$refs.chronologySVG).attr("viewBox",[0,0,this.width+this.margin.left+this.margin.right,this.height+this.margin.top+this.margin.bottom]),e=c.n(this.$refs.caseDetail).append().attr("class","tooltip").style("opacity",.2),n=c.n(this.$refs.chronologySVG).selectAll(".gBin").exit().remove().data(this.myBins),r=n.enter().append("g").attr("class","gBin");r.selectAll("rect").data((function(e){return e.map((function(p,i){return{idx:i,name:p.Person,outcome:p.Outcome,institution:p.Institution,discipline:p["Specific Discipline"],link:p["Original Link(s)"],color:"#6767ff",year:p["Outcome Year"],story:p["Specific Outcome"],rHeight:t.rHeight,isStem:t.isStem(p)}}))})).enter().append("rect").attr("class","enter").attr("x",0).attr("y",(function(t){return-2*t.rHeight*(t.idx+.5)})).attr("height",this.rHeight).attr("width",21).style("fill",(function(t){return t.outcome.toLowerCase().indexOf("resigned"),"#6767ff"})).on("mouseover",(function(t){c.n(this).classed("selected",!0).style("opacity",.5).style("fill","#ffffff").style("cursor","pointer"),e.transition().duration(200).style("opacity",.9),e.html("<b><span style = 'font-size: 24px; font-family: Syncopate; text-transform: uppercase; color: #6767ff;'>"+t.name+"</span></b></br><b>Outcome:  </b>"+t.outcome+"</span></br><b>Institution:  </b>"+t.institution+"</br><b>Discipline:  </b>"+t.discipline+"</br><b>Story: </b>"+t.story+"</b>")})).on("mouseout",(function(t){c.n(this).classed("selected",!1).style("fill",(function(t){return t.color})).style("opacity",1),e.transition().duration(500).style("opacity",0)})).on("click",(function(t){window.open(t.link)})),r.merge(n).attr("transform",(function(e){return"translate(".concat(t.xScale(e.x0),", ").concat(t.height,")")})),svg.append("g").style("font","16px helvetica").attr("class","axis axis--x").attr("transform","translate(0,"+this.height+")").style("stroke","white").call(c.a(this.xScale)),svg.append("text").attr("text-anchor","end").attr("x",this.width-this.margin.right-this.margin.left).attr("y",this.height+this.margin.top+this.margin.bottom).text("year").style("fill","white").style("font","20px helvetica"),svg.append("g").style("font","16px helvetica").attr("class","axis axis--y").style("stroke","white").call(c.b(this.yScale)).select(".domain").remove(),svg.append("text").attr("text-anchor","end").attr("transform","rotate(-90)").attr("y",20-this.margin.left).attr("x",-this.margin.top).text("Number of individual cases")}},mounted:function(){console.log("chronology component mounted 😷"),this.drawBarGraph()},watch:{stepValue:function(){switch(this.stepValue){case 0:c.n(this.$refs.chronologySVG).selectAll("rect").style("fill","#6767ff");break;case 1:c.n(this.$refs.chronologySVG).selectAll("rect").style("fill",(function(t){return 1980===t.year?"#ffffff":"#6767ff"}));break;case 2:c.n(this.$refs.chronologySVG).selectAll("rect").style("fill",(function(t){return 1991===t.year?"#ffffff":"#6767ff"}));break;case 3:c.n(this.$refs.chronologySVG).selectAll("rect").style("fill",(function(t){return 2018===t.year?"#ffffff":"#6767ff"}));break;default:c.n(this.$refs.chronologySVG).selectAll("rect").style("fill",(function(t){return t.isStem?"6767ff":"#333333"}))}}}},d=n(16),m=Object(d.a)(f,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"container"}},[n("el-row",[n("el-col",{attrs:{span:8}},[n("el-row",[n("div",{staticClass:"chartTitle"},[n("h3",[t._v(" "+t._s(t.chartTitle)+" ")])]),t._v(" "),n("div",{ref:"description",staticClass:"description"},[t._v(" \n          "+t._s(t.descriptions[t.stepValue].description)+"\n        ")])])],1),t._v(" "),n("el-col",{attrs:{span:16}},[n("div",{ref:"caseDetail",staticClass:"cases"}),t._v(" "),n("svg",{ref:"chronologySVG",attrs:{id:"chronologySVG"}})])],1)],1)}),[],!1,null,null,null).exports,y=n(292),x=n(389),v=n(345),w={data:function(){return{loadedAsmdData:v,stepValue:0,stepLabels:x.map((function(t){return t.label})),descriptions:x,images:{lab:n(309)}}},components:{chronology:m,steps:y.a},methods:{propagateStepChange:function(t){console.log("propagateStepChange: "+t),this.stepValue=t}},mounted:function(){}},S=(n(390),Object(d.a)(w,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{style:{backgroundImage:"url("+t.images.lab+")"},attrs:{id:"chronologyPage"}},[n("el-row",[n("el-col",{attrs:{span:24}},[n("chronology",{attrs:{asmdData:t.loadedAsmdData,stepValue:t.stepValue,descriptions:t.descriptions}})],1)],1),t._v(" "),n("el-row",[n("el-col",{staticStyle:{position:"fixed",bottom:"0"},attrs:{span:24}},[n("steps",{attrs:{labels:t.stepLabels,stepValue:t.stepValue},on:{stepChange:t.propagateStepChange}})],1)],1)],1)}),[],!1,null,null,null));e.default=S.exports}}]);