(this["webpackJsonpbotter-marketing-client"]=this["webpackJsonpbotter-marketing-client"]||[]).push([[0],{20:function(e,t,n){e.exports=n(44)},25:function(e,t,n){},44:function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),r=n(18),s=n.n(r),c=(n(25),n(1)),o=n(2),l=n(7),p=n(4),u=n(3),m=function(e){Object(p.a)(n,e);var t=Object(u.a)(n);function n(){var e;Object(c.a)(this,n);for(var a=arguments.length,i=new Array(a),r=0;r<a;r++)i[r]=arguments[r];return(e=t.call.apply(t,[this].concat(i))).getIcon=function(){return"/botter-marketing"+"/images/".concat(e.props.icon,".svg")},e.getClassName=function(){return e.props.selectedOptionTitle===e.props.title?"app__options__option app__options__option--selected":"app__options__option"},e}return Object(o.a)(n,[{key:"render",value:function(){var e=this;return i.a.createElement("div",{className:this.getClassName(),onClick:function(){e.props.handleOptionClick(e.props.title)}},i.a.createElement("img",{className:"app__options__option__icon",src:this.getIcon(),alt:this.props.icon}),i.a.createElement("h1",{className:"app__options__option__title"},this.props.title),i.a.createElement("p",{className:"app__options__option__description"},this.props.description))}}]),n}(a.Component),h=function(e){Object(p.a)(n,e);var t=Object(u.a)(n);function n(){return Object(c.a)(this,n),t.apply(this,arguments)}return Object(o.a)(n,[{key:"render",value:function(){return i.a.createElement("div",{className:"button",onClick:this.props.handleClick},this.props.text)}}]),n}(a.Component),d=function(e){Object(p.a)(n,e);var t=Object(u.a)(n);function n(){return Object(c.a)(this,n),t.apply(this,arguments)}return Object(o.a)(n,[{key:"render",value:function(){return i.a.createElement("div",{className:"text-input"},i.a.createElement("input",{onChange:this.props.handleTextChange,type:"text",required:!0}),i.a.createElement("span",{className:"bar"}),i.a.createElement("label",null,this.props.label))}}]),n}(a.Component),f=function(e){Object(p.a)(n,e);var t=Object(u.a)(n);function n(){var e;Object(c.a)(this,n);for(var a=arguments.length,r=new Array(a),s=0;s<a;s++)r[s]=arguments[s];return(e=t.call.apply(t,[this].concat(r))).renderSettings=function(){switch(e.props.selectedOptionTitle){case"Campaign info":return e.getCampaignInfoSettings();default:return}},e.getCampaignInfoSettings=function(){return i.a.createElement("div",{className:"app__settings"},i.a.createElement(d,{label:"Project name",handleTextChange:e.props.setProjectName,stateKey:"projectName"}),i.a.createElement(h,{text:"START",handleClick:function(){e.props.get("campaignInfo")}}))},e}return Object(o.a)(n,[{key:"render",value:function(){return i.a.createElement(i.a.Fragment,null,this.renderSettings())}}]),n}(a.Component),g=n(6),O=n.n(g),b=n(8),v=n(19),j=n.n(v),_=Object.freeze({CAMPAIGN_INFO:"campaignInfo"});function y(e){return E.apply(this,arguments)}function E(){return(E=Object(b.a)(O.a.mark((function e(t){var n,a,i,r=this;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";e?r.setState({isWaitingAsync:!0,loadingMessage:n,queryType:t}):r.setState({isWaitingAsync:!1})},a=function(){var e=Object(b.a)(O.a.mark((function e(){return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n(!0,"Querying API..."),e.abrupt("return",j.a.get(i).then((function(e){return n(!1),e.data})));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),i="http://127.0.0.1:8025/",e.t0=t,e.next=e.t0===_.CAMPAIGN_INFO?6:8;break;case 6:return i+="info?projectName=".concat(this.state.projectName),e.abrupt("break",8);case 8:return e.t1=this,e.next=11,a();case 11:e.t2=e.sent,e.t3={queryResponse:e.t2,shouldResultRender:!0},e.t1.setState.call(e.t1,e.t3);case 14:case"end":return e.stop()}}),e,this)})))).apply(this,arguments)}var C=function(e){Object(p.a)(n,e);var t=Object(u.a)(n);function n(){return Object(c.a)(this,n),t.apply(this,arguments)}return Object(o.a)(n,[{key:"render",value:function(){return this.props.isActive?i.a.createElement("div",{className:"loader"},i.a.createElement("div",{className:"loader__animation"}),i.a.createElement("div",{className:"loader__message"},this.props.message)):null}}]),n}(a.Component),N=function(e){Object(p.a)(n,e);var t=Object(u.a)(n);function n(){return Object(c.a)(this,n),t.apply(this,arguments)}return Object(o.a)(n,[{key:"render",value:function(){return i.a.createElement("div",{className:"card"},i.a.createElement("h1",{className:"card__title"},this.props.title),i.a.createElement(h,{handleClick:this.props.handleClick,text:this.props.buttonText}))}}]),n}(a.Component);N.defaultProps={buttonText:"GO"};var k=function(e){Object(p.a)(n,e);var t=Object(u.a)(n);function n(){var e;Object(c.a)(this,n);for(var a=arguments.length,r=new Array(a),s=0;s<a;s++)r[s]=arguments[s];return(e=t.call.apply(t,[this].concat(r))).buildResultItem=function(){var t=e.props.queryResponse,n=[];for(var a in t)n.push(i.a.createElement(N,{title:a,key:a,url:t[a]}));return n.length<1?i.a.createElement("h3",null,"No results found."):n},e}return Object(o.a)(n,[{key:"render",value:function(){return this.props.isActive?i.a.createElement(i.a.Fragment,null,this.buildResultItem()):null}}]),n}(a.Component),T=function(e){Object(p.a)(n,e);var t=Object(u.a)(n);function n(e){var a;return Object(c.a)(this,n),(a=t.call(this,e)).state={selectedOptionTitle:"",projectName:"pmsa175-023",queryType:"",queryResponse:{},isWaitingAsync:!1,shouldResultRender:!1,loadingMessage:""},a.handleOptionClick=function(e){a.state.selectedOptionTitle!==e&&a.setState({selectedOptionTitle:e,shouldResultRender:!1})},a.setProjectName=function(e){a.setState({projectName:e.target.value})},a.get=y.bind(Object(l.a)(a)),a}return Object(o.a)(n,[{key:"render",value:function(){return i.a.createElement("div",{className:"app"},i.a.createElement("div",{className:"app__options"},i.a.createElement(m,{icon:"build",title:"Test campaign",description:"This feature is not yet available!",handleOptionClick:this.handleOptionClick,selectedOptionTitle:this.state.selectedOptionTitle})," ",i.a.createElement(m,{icon:"edit",title:"Edit campaign",description:"This feature is not yet available!",handleOptionClick:this.handleOptionClick,selectedOptionTitle:this.state.selectedOptionTitle}),i.a.createElement(m,{icon:"information",title:"Campaign info",description:"Get all campaign URLs, such as asset upload page, template testing, Zeplin, and InVision.",handleOptionClick:this.handleOptionClick,selectedOptionTitle:this.state.selectedOptionTitle})),i.a.createElement(f,{selectedOptionTitle:this.state.selectedOptionTitle,setProjectName:this.setProjectName,get:this.get}),i.a.createElement("div",{className:"app__progress"},i.a.createElement(C,{isActive:this.state.isWaitingAsync,message:this.state.loadingMessage}),i.a.createElement(k,{isActive:!this.state.isWaitingAsync&&this.state.shouldResultRender,queryResponse:this.state.queryResponse})),i.a.createElement("p",{className:"app__footer"},"Copyright \xa9 2020 Gianmarco Caputo"))}}]),n}(a.Component);s.a.render(i.a.createElement(i.a.StrictMode,null,i.a.createElement(T,null)),document.getElementById("root"))}},[[20,1,2]]]);
//# sourceMappingURL=main.6b2b2ab9.chunk.js.map