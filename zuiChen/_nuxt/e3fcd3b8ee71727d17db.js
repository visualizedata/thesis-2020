(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{285:function(t,e,o){t.exports=o.p+"fonts/5c3ad70.ttf"},286:function(t,e,o){var content=o(290);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(57).default)("d0895a22",content,!0,{sourceMap:!1})},287:function(t,e,o){var content=o(293);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(57).default)("390ad722",content,!0,{sourceMap:!1})},289:function(t,e,o){"use strict";var n=o(286);o.n(n).a},290:function(t,e,o){var n=o(56),r=o(174),l=o(285),c=o(291);e=n(!1);var d=r(l),h=r(c);e.push([t.i,"@font-face{font-family:Garamond,cursive;src:url("+d+') format("truetype");font-weight:400;font-style:normal}.back-button{display:flex;font-family:Garamond;font-size:30px;width:120px;height:120px;color:#000;justify-content:center;align-items:center}.back-button:hover{background-image:url('+h+");background-size:120% 120%;background-position:50% 50%;background-repeat:no-repeat;background-color:none}a,a:link,a:visited{color:#000;text-decoration:none}a:hover{border-bottom-width:3px;border-bottom-style:solid;padding-bottom:4px}",""]),t.exports=e},291:function(t,e,o){t.exports=o.p+"img/93713a3.gif"},292:function(t,e,o){"use strict";var n=o(287);o.n(n).a},293:function(t,e,o){var n=o(56),r=o(174),l=o(285),c=o(294);e=n(!1);var d=r(l),h=r(c);e.push([t.i,"@font-face{font-family:Garamond,cursive;src:url("+d+') format("truetype");font-weight:400;font-style:normal}.next-button{display:flex;font-family:Garamond;font-size:30px;width:120px;height:120px;color:#000;justify-content:center;align-items:center}.next-button:hover{background-image:url('+h+");background-size:120% 120%;background-position:50% 50%;background-repeat:no-repeat;background-color:none}a,a:link,a:visited{color:#000;text-decoration:none}a:hover{border-bottom-width:3px;border-bottom-style:solid;padding-bottom:4px}",""]),t.exports=e},294:function(t,e,o){t.exports=o.p+"img/cc987ac.gif"},295:function(t,e,o){"use strict";var n={name:"BackButton",props:["routerLink"]},r=(o(289),o(27)),component=Object(r.a)(n,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"back-button"},[e("div",{attrs:{id:"text-container"}},[this._v("\n  [ "),e("n-link",{attrs:{to:this.routerLink}},[this._v("back")]),this._v(" ]\n  ")],1)])}),[],!1,null,null,null);e.a=component.exports},296:function(t,e,o){"use strict";var n={name:"NextButton",props:["routerLink"]},r=(o(292),o(27)),component=Object(r.a)(n,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"next-button"},[e("div",{attrs:{id:"text-container"}},[this._v("\n  [ "),e("n-link",{attrs:{to:this.routerLink}},[this._v("next")]),this._v(" ]\n  ")],1)])}),[],!1,null,null,null);e.a=component.exports},298:function(t,e,o){t.exports=o.p+"img/c539e2f.png"},314:function(t,e,o){var content=o(380);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(57).default)("03e8ff03",content,!0,{sourceMap:!1})},379:function(t,e,o){"use strict";var n=o(314);o.n(n).a},380:function(t,e,o){var n=o(56),r=o(174),l=o(285),c=o(298);e=n(!1);var d=r(l),h=r(c);e.push([t.i,"@font-face{font-family:Garamond,cursive;src:url("+d+') format("truetype");font-weight:400;font-style:normal}body{overflow-x:hidden;font-family:Garamond;background-repeat:no-repeat}.infoCard{position:absolute;z-index:15;margin-top:20vh;width:520px;background-color:#fff;font-size:36px;line-height:54px;padding-left:20px}.culture-mask{position:absolute;width:100vw;height:100vh;display:block;background:#fbdd4a;z-index:25;font-family:Garamond;font-weight:600;font-size:100px;background-size:150% auto;background-repeat:no-repeat;background-position:50% 50%}.back-button{position:absolute;z-index:55;margin-top:5vh;margin-left:44vw}.row-section{display:block;background-color:#fbdd4a;color:#000;width:100vw;height:20vh;padding-top:4vh;padding-left:5vw}.hoverable:hover{background-color:transparent;transition:.5s}.bg{position:absolute;width:100vw;height:100vh;background-image:url('+h+");background-size:150% auto;background-repeat:no-repeat;background-position:50% 50%;z-index:-2}#center-title{z-index:90;width:33vw;font-size:2.5vw;border-bottom:10px solid;border-color:#fff;margin-top:23vw;margin-left:35vw;font-weight:700;padding-top:20px;padding-bottom:20px}#center-title,.section-title{display:block;position:absolute}.section-title{margin-top:0;font-family:Garamond;font-weight:600;font-size:8vw;color:#000;letter-spacing:1px;line-height:.8;z-index:-2}#title-line1{display:grid;grid-template-columns:1fr 1fr;grid-gap:4px}#title-unmask{width:50vw;text-align:right}#title-ing,#title-masks{width:50vw;text-align:left}#title-masks{margin-left:50vw;padding-left:4px}",""]),t.exports=e},420:function(t,e,o){"use strict";o.r(e);var n=o(295),r=o(296),l={components:{BackButton:n.a,NextButton:r.a},data:function(){return{infoStyle:{marginLeft:"70vw",marginTop:"20vh"},moreInfo:"",sectionSelected:!1,revealStyle:{backgroundColor:"#FBDD4A",transition:"2s"},isHover:!1,info:[],sections:[],swipe:"center",swipeStyle:{marginLeft:0,transition:"0.2s"},normActive:!1,stigmaActive:!1,sectionTextDisplayed:!1,arrow:"",rowStyle:{paddingLeft:"5vw",textAlign:"left",paddingRight:"0",marginTop:"20vh"},infos:{"filter & warmth":'to prevent <span class="hightlight" style="background-color:#FBDD4A;">smog</span>, <span class="hightlight" style="background-color:#FBDD4A;">dust</span>, pollen <span class="hightlight" style="background-color:#FBDD4A;">allergy</span>, <span class="hightlight" style="background-color:#FBDD4A;">smells</span> in packed crowds, or to <span class="hightlight" style="background-color:#FBDD4A;">stay warm</span> in winter',"social firewall":'to <span class="hightlight" style="background-color:#FBDD4A;">avoid interaction</span> with others, or to hide one\'s face if <span class="hightlight" style="background-color:#FBDD4A;">no-make-up</span>',"fashion statement":'e.g. the <span class="hightlight" style="background-color:#FBDD4A;">smog couture</span>, <span class="hightlight" style="background-color:#FBDD4A;">marine serre</span>\'s futurewear collection',disease:'traditionally only severely sick <span class="hightlight" style="background-color:#FBDD4A;">patients</span> wear masks',danger:'to hide identity for abnormal purposes (usually bad) <span class="hightlight" style="background-color:#FBDD4A;">crimes/riots</span>',alien:'people in <span class="hightlight" style="background-color:#FBDD4A;">western</span> countries almost <span class="hightlight" style="background-color:#FBDD4A;">never</span> wear masks on a <span class="hightlight" style="background-color:#FBDD4A;">daily base</span>'},currentIndex:0}},watch:{swipe:function(t,e){"right"===t?(this.swipeStyle.marginLeft="100vw",this.normActive=!0,this.sectionTextDisplayed=!0,this.sections=["filter & warmth","social firewall","fashion statement"],this.arrow="→",this.rowStyle={paddingLeft:"5vw",textAlign:"left",paddingRight:"0"},this.infoStyle.marginLeft="70vw"):"left"===t?(this.swipeStyle.marginLeft="-100vw",this.stigmaActive=!0,this.sectionTextDisplayed=!0,this.sections=["disease","danger","alien"],this.arrow="←",this.rowStyle={paddingLeft:"0",textAlign:"right",paddingRight:"5vw"},this.infoStyle.marginLeft="35vw"):(this.swipeStyle.marginLeft="0",this.sectionTextDisplayed=!1,this.sections=[],this.arrow="",this.sectionSelected=!1)}},methods:{showMore:function(section,t){this.sectionSelected=!0,this.moreInfo=this.infos[section],this.infoStyle.marginTop=20*t+20+"vh"},hoverStigma:function(){this.stigmaActive=!this.stigmaActive},hoverNorm:function(){this.normActive=!this.normActive},swipeCenter:function(){this.swipe="center",this.sectionTextDisplayed=!1},swipeRight:function(){this.swipe="right",this.sectionTextDisplayed=!0},swipeLeft:function(){this.swipe="left",this.sectionTextDisplayed=!0},revealText:function(){this.revealStyle.backgroundColor="none",this.info=["privacy and safety zone","marine serre and smog couture","BTS etc."]},coverText:function(){this.revealStyle.backgroundColor="#FBDD4A",this.info=["social firewall","fashion statement","pop culture"]}}},c=(o(379),o(27)),component=Object(c.a)(l,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("div",{staticClass:"bg"}),t._v(" "),o("div",{staticClass:"culture-mask",style:t.swipeStyle},[o("div",{attrs:{id:"title"}},[o("div",{attrs:{id:"pro-title"},on:{click:t.swipeRight}},[o("span",{staticClass:"title-text",on:{mouseover:t.hoverNorm,mouseleave:t.hoverNorm}},[t._v("norm")])]),t._v(" "),o("div",{attrs:{id:"anti-title"},on:{click:t.swipeLeft}},[o("span",{staticClass:"title-text",staticStyle:{"text-decoration":"none"},on:{mouseover:t.hoverStigma,mouseleave:t.hoverStigma}},[t._v("stigma")])])])]),t._v(" "),o("h1",{staticClass:"section-title"},[o("div",{staticClass:"row-section"}),t._v(" "),t._l(t.sections,(function(e,n){return o("div",{key:n,staticClass:"row-section hoverable",style:t.rowStyle,on:{click:function(o){return t.showMore(e,n)}}},[t._v(t._s(e))])})),t._v(" "),o("div",{staticClass:"row-section hoverable",style:t.rowStyle,on:{click:function(e){t.swipe="center"}}},[t._v(t._s(t.arrow))])],2),t._v(" "),t.sectionSelected?o("div",{staticClass:"infoCard",style:t.infoStyle,domProps:{innerHTML:t._s(t.moreInfo)}}):t._e(),t._v(" "),o("BackButton",{attrs:{routerLink:"/timeline"}}),t._v(" "),o("NextButton",{attrs:{routerLink:"/end"}}),t._v(" "),o("div",{directives:[{name:"show",rawName:"v-show",value:!t.sectionTextDisplayed,expression:"!sectionTextDisplayed"}],attrs:{id:"center-title"}},[t._v(" ... and when they "),o("span",{staticStyle:{"background-color":"#FFF"}},[t._v("come closer")])])],1)}),[],!1,null,null,null);e.default=component.exports}}]);