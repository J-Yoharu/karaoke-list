(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2e334a79"],{"728a":function(t,e,i){"use strict";i.r(e);var o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-footer",[i("v-container",{staticClass:"text-center",attrs:{fluid:""}},[i("v-row",{attrs:{"no-gutters":""}},[i("v-col",{attrs:{cols:"12",lg:"6"}},[i("p",[t._v("Tenha uma lista de música para videokê sempre com você!!!")])]),i("v-col",{staticClass:"text-center",attrs:{cols:"12",lg:"2"}},[i("div",{staticClass:"d-flex align-center justify-center"},[i("a",{attrs:{href:"https://api.whatsapp.com/send?phone=5511947466026&text=Gostaria%20de%20alugar%20uma%20m%C3%A1quina%20com%20voc%C3%AA!",target:"_blank"}},[i("v-icon",{attrs:{size:"40",color:"light-green"},domProps:{textContent:t._s(t.icons.mdiWhatsapp)}}),i("h4",[t._v("(11) 9 4746-6026")])],1)])]),i("v-col",{attrs:{cols:"12",lg:"3"}},[t._v(" Atualizado até o pacote "+t._s(t.version)+" ")])],1),i("v-row",{attrs:{"no-gutters":""}},[i("v-col",{staticClass:"justify-center",attrs:{cols:"12"}},[t._v(" © "+t._s((new Date).getFullYear())+" Copyright "),i("div",[i("v-icon",{domProps:{textContent:t._s(t.icons.mdiGithub)}}),i("a",{attrs:{href:"https://github.com/j-yoharu",target:"_blank"}},[t._v("J-Yoharu")]),t._v(" / "),i("a",{attrs:{href:"https://github.com/japostulo",target:"_blank"}},[t._v("Japostulo")])],1)])],1)],1)],1)},a=[],s=(i("d3b7"),i("96cf"),i("1da1")),n=i("94ed"),r={data:function(){return{icons:{mdiWhatsapp:n["i"],mdiGithub:n["c"]},version:null}},mounted:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){var i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,fetch("./bd.json",{method:"GET"}).then((function(t){return t.json()}));case 2:i=e.sent,t.version=i.version;case 4:case"end":return e.stop()}}),e)})))()}},c=r,p=i("2877"),l=i("6544"),u=i.n(l),h=i("62ad"),d=i("a523"),f=(i("a9e3"),i("c7cd"),i("5530")),v=(i("b5b6"),i("8dd9")),m=i("fe6c"),g=i("58df");function b(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];return Object(g["a"])(Object(m["b"])(["absolute","fixed"])).extend({name:"applicationable",props:{app:Boolean},computed:{applicationProperty:function(){return t}},watch:{app:function(t,e){e?this.removeApplication(!0):this.callUpdate()},applicationProperty:function(t,e){this.$vuetify.application.unregister(this._uid,e)}},activated:function(){this.callUpdate()},created:function(){for(var t=0,i=e.length;t<i;t++)this.$watch(e[t],this.callUpdate);this.callUpdate()},mounted:function(){this.callUpdate()},deactivated:function(){this.removeApplication()},destroyed:function(){this.removeApplication()},methods:{callUpdate:function(){this.app&&this.$vuetify.application.register(this._uid,this.applicationProperty,this.updateApplication())},removeApplication:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];(t||this.app)&&this.$vuetify.application.unregister(this._uid,this.applicationProperty)},updateApplication:function(){return 0}}})}var y=i("d10f"),j=i("80d2"),_=Object(g["a"])(v["a"],b("footer",["height","inset"]),y["a"]).extend({name:"v-footer",props:{height:{default:"auto",type:[Number,String]},inset:Boolean,padless:Boolean,tag:{type:String,default:"footer"}},computed:{applicationProperty:function(){return this.inset?"insetFooter":"footer"},classes:function(){return Object(f["a"])(Object(f["a"])({},v["a"].options.computed.classes.call(this)),{},{"v-footer--absolute":this.absolute,"v-footer--fixed":!this.absolute&&(this.app||this.fixed),"v-footer--padless":this.padless,"v-footer--inset":this.inset})},computedBottom:function(){if(this.isPositioned)return this.app?this.$vuetify.application.bottom:0},computedLeft:function(){if(this.isPositioned)return this.app&&this.inset?this.$vuetify.application.left:0},computedRight:function(){if(this.isPositioned)return this.app&&this.inset?this.$vuetify.application.right:0},isPositioned:function(){return Boolean(this.absolute||this.fixed||this.app)},styles:function(){var t=parseInt(this.height);return Object(f["a"])(Object(f["a"])({},v["a"].options.computed.styles.call(this)),{},{height:isNaN(t)?t:Object(j["g"])(t),left:Object(j["g"])(this.computedLeft),right:Object(j["g"])(this.computedRight),bottom:Object(j["g"])(this.computedBottom)})}},methods:{updateApplication:function(){var t=parseInt(this.height);return isNaN(t)?this.$el?this.$el.clientHeight:0:t}},render:function(t){var e=this.setBackgroundColor(this.color,{staticClass:"v-footer",class:this.classes,style:this.styles});return t(this.tag,e,this.$slots.default)}}),w=i("132d"),x=i("0fd9"),C=Object(p["a"])(c,o,a,!1,null,null,null);e["default"]=C.exports;u()(C,{VCol:h["a"],VContainer:d["a"],VFooter:_,VIcon:w["a"],VRow:x["a"]})},b5b6:function(t,e,i){}}]);
//# sourceMappingURL=chunk-2e334a79.30fb1b13.js.map