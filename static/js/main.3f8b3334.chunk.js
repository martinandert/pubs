(this.webpackJsonpexample=this.webpackJsonpexample||[]).push([[0],[,,,,,,function(e,t,n){e.exports=n(15)},,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var l=n(0),a=n(3),c=(n(11),n(1)),r=n(4),s=Object(r.create)(),u=Object(c.a)(s,2),o=u[0],m=u[1];n(12),n(13);function i(){var e=l.useState(""),t=Object(c.a)(e,2),n=t[0],a=t[1],r=l.useRef(null);return l.createElement("form",{onSubmit:function(e){e.preventDefault(),o(n),a(""),r.current&&r.current.focus()},className:"Sender"},l.createElement("h2",null,"Send a message"),l.createElement("div",null,l.createElement("input",{ref:r,type:"text",value:n,onChange:function(e){a(e.target.value)},placeholder:"Type a message..."}),l.createElement("button",{type:"submit",disabled:0===n.length},"Send")))}var d=n(5);n(14);function f(){var e,t=l.useState([]),n=Object(c.a)(t,2),a=n[0],r=n[1];return e=function(e){r((function(t){return[].concat(Object(d.a)(t),[e])}))},l.useEffect((function(){return m(e)}),[e]),l.createElement("div",{className:"Receiver"},l.createElement("h2",null,"Received messages"),a.length>0?l.createElement("ol",null,a.map((function(e,t){return l.createElement("li",{key:t},e)}))):l.createElement("p",null,"No message received yet."))}a.render(l.createElement((function(){return l.createElement("div",{className:"App"},l.createElement("header",null,l.createElement("h1",null,"Pubs Usage Example"),l.createElement("a",{href:"https://github.com/martinandert/pubs/tree/master/example/src"},"GitHub")),l.createElement("main",null,l.createElement(i,null),l.createElement(f,null)),l.createElement("p",null,"All received messages get logged to the console, too. You can also send messages by issuing ",l.createElement("code",null,'sendMessage("my message")')," in the console."))}),null),document.getElementById("root")),window.sendMessage=o,m((function(e){console.log("Message received:",e)}))}],[[6,1,2]]]);
//# sourceMappingURL=main.3f8b3334.chunk.js.map