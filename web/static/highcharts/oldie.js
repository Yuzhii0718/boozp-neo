/*
 Highcharts JS v8.2.2 (2020-10-22)

 Old IE (v6, v7, v8) module for Highcharts v6+.

 (c) 2010-2019 Highsoft AS
 Author: Torstein Honsi

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/modules/oldie",["highcharts"],function(A){a(A);a.Highcharts=A;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function A(a,z,p,u){a.hasOwnProperty(z)||(a[z]=u.apply(null,p))}a=a?a._modules:{};A(a,"Extensions/Math3D.js",[a["Core/Globals.js"],a["Core/Utilities.js"]],function(a,z){var p=z.pick,v=a.deg2rad,h=a.perspective3D=function(g,
a,h){a=0<h&&h<Number.POSITIVE_INFINITY?h/(g.z+a.z+h):1;return{x:g.x*a,y:g.y*a}},f=a.perspective=function(a,f,q,r){var g=f.options.chart.options3d,D=p(r,q?f.inverted:!1),y={x:f.plotWidth/2,y:f.plotHeight/2,z:g.depth/2,vd:p(g.depth,1)*p(g.viewDistance,0)},Q=f.scale3d||1;r=v*g.beta*(D?-1:1);g=v*g.alpha*(D?-1:1);var u=Math.cos(g),C=Math.cos(-r),z=Math.sin(g),G=Math.sin(-r);q||(y.x+=f.plotLeft,y.y+=f.plotTop);return a.map(function(g){var a=(D?g.y:g.x)-y.x;var f=(D?g.x:g.y)-y.y;g=(g.z||0)-y.z;a={x:C*a-
G*g,y:-z*G*a+u*f-C*z*g,z:u*G*a+z*f+u*C*g};f=h(a,y,y.vd);f.x=f.x*Q+y.x;f.y=f.y*Q+y.y;f.z=a.z*Q+y.z;return{x:D?f.y:f.x,y:D?f.x:f.y,z:f.z}})};z=a.pointCameraDistance=function(g,a){var f=a.options.chart.options3d,h=a.plotWidth/2;a=a.plotHeight/2;f=p(f.depth,1)*p(f.viewDistance,0)+f.depth;return Math.sqrt(Math.pow(h-p(g.plotX,g.x),2)+Math.pow(a-p(g.plotY,g.y),2)+Math.pow(f-p(g.plotZ,g.z),2))};var q=a.shapeArea=function(a){var f=0,g;for(g=0;g<a.length;g++){var h=(g+1)%a.length;f+=a[g].x*a[h].y-a[h].x*a[g].y}return f/
2};a=a.shapeArea3d=function(a,h,p){return q(f(a,h,p))};return{perspective:f,perspective3D:h,pointCameraDistance:z,shapeArea:q,shapeArea3D:a}});A(a,"Core/Renderer/SVG/SVGRenderer3D.js",[a["Core/Animation/AnimationUtilities.js"],a["Core/Color/Color.js"],a["Core/Globals.js"],a["Extensions/Math3D.js"],a["Core/Renderer/SVG/SVGElement.js"],a["Core/Renderer/SVG/SVGRenderer.js"],a["Core/Utilities.js"]],function(a,z,p,u,h,f,q){function g(k,a,b,d,t,l,c,e){var m=[],n=l-t;return l>t&&l-t>Math.PI/2+.0001?(m=m.concat(g(k,
a,b,d,t,t+Math.PI/2,c,e)),m=m.concat(g(k,a,b,d,t+Math.PI/2,l,c,e))):l<t&&t-l>Math.PI/2+.0001?(m=m.concat(g(k,a,b,d,t,t-Math.PI/2,c,e)),m=m.concat(g(k,a,b,d,t-Math.PI/2,l,c,e))):[["C",k+b*Math.cos(t)-b*N*n*Math.sin(t)+c,a+d*Math.sin(t)+d*N*n*Math.cos(t)+e,k+b*Math.cos(l)+b*N*n*Math.sin(l)+c,a+d*Math.sin(l)-d*N*n*Math.cos(l)+e,k+b*Math.cos(l)+c,a+d*Math.sin(l)+e]]}var v=a.animObject,D=z.parse,r=u.perspective,A=u.shapeArea,F=q.defined,y=q.extend,J=q.merge,M=q.objectEach,C=q.pick,L=Math.cos,G=Math.PI,
I=Math.sin,H=p.charts,O=p.deg2rad;var N=4*(Math.sqrt(2)-1)/3/(G/2);f.prototype.toLinePath=function(k,a){var b=[];k.forEach(function(d){b.push(["L",d.x,d.y])});k.length&&(b[0][0]="M",a&&b.push(["Z"]));return b};f.prototype.toLineSegments=function(a){var k=[],b=!0;a.forEach(function(d){k.push(b?["M",d.x,d.y]:["L",d.x,d.y]);b=!b});return k};f.prototype.face3d=function(a){var k=this,b=this.createElement("path");b.vertexes=[];b.insidePlotArea=!1;b.enabled=!0;b.attr=function(b){if("object"===typeof b&&
(F(b.enabled)||F(b.vertexes)||F(b.insidePlotArea))){this.enabled=C(b.enabled,this.enabled);this.vertexes=C(b.vertexes,this.vertexes);this.insidePlotArea=C(b.insidePlotArea,this.insidePlotArea);delete b.enabled;delete b.vertexes;delete b.insidePlotArea;var d=r(this.vertexes,H[k.chartIndex],this.insidePlotArea),l=k.toLinePath(d,!0);d=A(d);d=this.enabled&&0<d?"visible":"hidden";b.d=l;b.visibility=d}return h.prototype.attr.apply(this,arguments)};b.animate=function(b){if("object"===typeof b&&(F(b.enabled)||
F(b.vertexes)||F(b.insidePlotArea))){this.enabled=C(b.enabled,this.enabled);this.vertexes=C(b.vertexes,this.vertexes);this.insidePlotArea=C(b.insidePlotArea,this.insidePlotArea);delete b.enabled;delete b.vertexes;delete b.insidePlotArea;var d=r(this.vertexes,H[k.chartIndex],this.insidePlotArea),l=k.toLinePath(d,!0);d=A(d);d=this.enabled&&0<d?"visible":"hidden";b.d=l;this.attr("visibility",d)}return h.prototype.animate.apply(this,arguments)};return b.attr(a)};f.prototype.polyhedron=function(a){var k=
this,b=this.g(),d=b.destroy;this.styledMode||b.attr({"stroke-linejoin":"round"});b.faces=[];b.destroy=function(){for(var a=0;a<b.faces.length;a++)b.faces[a].destroy();return d.call(this)};b.attr=function(d,l,c,e){if("object"===typeof d&&F(d.faces)){for(;b.faces.length>d.faces.length;)b.faces.pop().destroy();for(;b.faces.length<d.faces.length;)b.faces.push(k.face3d().add(b));for(var m=0;m<d.faces.length;m++)k.styledMode&&delete d.faces[m].fill,b.faces[m].attr(d.faces[m],null,c,e);delete d.faces}return h.prototype.attr.apply(this,
arguments)};b.animate=function(d,l,c){if(d&&d.faces){for(;b.faces.length>d.faces.length;)b.faces.pop().destroy();for(;b.faces.length<d.faces.length;)b.faces.push(k.face3d().add(b));for(var e=0;e<d.faces.length;e++)b.faces[e].animate(d.faces[e],l,c);delete d.faces}return h.prototype.animate.apply(this,arguments)};return b.attr(a)};a={initArgs:function(a){var k=this,b=k.renderer,d=b[k.pathType+"Path"](a),t=d.zIndexes;k.parts.forEach(function(l){k[l]=b.path(d[l]).attr({"class":"highcharts-3d-"+l,zIndex:t[l]||
0}).add(k)});k.attr({"stroke-linejoin":"round",zIndex:t.group});k.originalDestroy=k.destroy;k.destroy=k.destroyParts;k.forcedSides=d.forcedSides},singleSetterForParts:function(k,a,b,d,t,l){var c={};d=[null,null,d||"attr",t,l];var e=b&&b.zIndexes;b?(e&&e.group&&this.attr({zIndex:e.group}),M(b,function(m,d){c[d]={};c[d][k]=m;e&&(c[d].zIndex=b.zIndexes[d]||0)}),d[1]=c):(c[k]=a,d[0]=c);return this.processParts.apply(this,d)},processParts:function(k,a,b,d,t){var l=this;l.parts.forEach(function(c){a&&(k=
C(a[c],!1));if(!1!==k)l[c][b](k,d,t)});return l},destroyParts:function(){this.processParts(null,null,"destroy");return this.originalDestroy()}};var P=J(a,{parts:["front","top","side"],pathType:"cuboid",attr:function(a,f,b,d){if("string"===typeof a&&"undefined"!==typeof f){var k=a;a={};a[k]=f}return a.shapeArgs||F(a.x)?this.singleSetterForParts("d",null,this.renderer[this.pathType+"Path"](a.shapeArgs||a)):h.prototype.attr.call(this,a,void 0,b,d)},animate:function(a,f,b){if(F(a.x)&&F(a.y)){a=this.renderer[this.pathType+
"Path"](a);var d=a.forcedSides;this.singleSetterForParts("d",null,a,"animate",f,b);this.attr({zIndex:a.zIndexes.group});d!==this.forcedSides&&(this.forcedSides=d,P.fillSetter.call(this,this.fill))}else h.prototype.animate.call(this,a,f,b);return this},fillSetter:function(a){this.forcedSides=this.forcedSides||[];this.singleSetterForParts("fill",null,{front:a,top:D(a).brighten(0<=this.forcedSides.indexOf("top")?0:.1).get(),side:D(a).brighten(0<=this.forcedSides.indexOf("side")?0:-.1).get()});this.color=
this.fill=a;return this}});f.prototype.elements3d={base:a,cuboid:P};f.prototype.element3d=function(a,f){var b=this.g();y(b,this.elements3d[a]);b.initArgs(f);return b};f.prototype.cuboid=function(a){return this.element3d("cuboid",a)};f.prototype.cuboidPath=function(a){function f(e){return 0===c&&1<e&&6>e?{x:h[e].x,y:h[e].y+10,z:h[e].z}:h[0].x===h[7].x&&4<=e?{x:h[e].x+10,y:h[e].y,z:h[e].z}:0===m&&2>e||5<e?{x:h[e].x,y:h[e].y,z:h[e].z+10}:h[e]}function b(c){return h[c]}var d=a.x,k=a.y,l=a.z||0,c=a.height,
e=a.width,m=a.depth,n=H[this.chartIndex],w=n.options.chart.options3d.alpha,g=0,h=[{x:d,y:k,z:l},{x:d+e,y:k,z:l},{x:d+e,y:k+c,z:l},{x:d,y:k+c,z:l},{x:d,y:k+c,z:l+m},{x:d+e,y:k+c,z:l+m},{x:d+e,y:k,z:l+m},{x:d,y:k,z:l+m}],K=[];h=r(h,n,a.insidePlotArea);var x=function(c,e,m){var a=[[],-1],d=c.map(b),n=e.map(b);c=c.map(f);e=e.map(f);0>A(d)?a=[d,0]:0>A(n)?a=[n,1]:m&&(K.push(m),a=0>A(c)?[d,0]:0>A(e)?[n,1]:[d,0]);return a};var B=x([3,2,1,0],[7,6,5,4],"front");a=B[0];var q=B[1];B=x([1,6,7,0],[4,5,2,3],"top");
e=B[0];var E=B[1];B=x([1,2,5,6],[0,7,4,3],"side");x=B[0];B=B[1];1===B?g+=1E6*(n.plotWidth-d):B||(g+=1E6*d);g+=10*(!E||0<=w&&180>=w||360>w&&357.5<w?n.plotHeight-k:10+k);1===q?g+=100*l:q||(g+=100*(1E3-l));return{front:this.toLinePath(a,!0),top:this.toLinePath(e,!0),side:this.toLinePath(x,!0),zIndexes:{group:Math.round(g)},forcedSides:K,isFront:q,isTop:E}};f.prototype.arc3d=function(a){function f(b){var c=!1,e={},m;b=J(b);for(m in b)-1!==k.indexOf(m)&&(e[m]=b[m],delete b[m],c=!0);return c?[e,b]:!1}var b=
this.g(),d=b.renderer,k="x y r innerR start end depth".split(" ");a=J(a);a.alpha=(a.alpha||0)*O;a.beta=(a.beta||0)*O;b.top=d.path();b.side1=d.path();b.side2=d.path();b.inn=d.path();b.out=d.path();b.onAdd=function(){var a=b.parentGroup,c=b.attr("class");b.top.add(b);["out","inn","side1","side2"].forEach(function(e){b[e].attr({"class":c+" highcharts-3d-side"}).add(a)})};["addClass","removeClass"].forEach(function(a){b[a]=function(){var c=arguments;["top","out","inn","side1","side2"].forEach(function(e){b[e][a].apply(b[e],
c)})}});b.setPaths=function(a){var c=b.renderer.arc3dPath(a),e=100*c.zTop;b.attribs=a;b.top.attr({d:c.top,zIndex:c.zTop});b.inn.attr({d:c.inn,zIndex:c.zInn});b.out.attr({d:c.out,zIndex:c.zOut});b.side1.attr({d:c.side1,zIndex:c.zSide1});b.side2.attr({d:c.side2,zIndex:c.zSide2});b.zIndex=e;b.attr({zIndex:e});a.center&&(b.top.setRadialReference(a.center),delete a.center)};b.setPaths(a);b.fillSetter=function(b){var c=D(b).brighten(-.1).get();this.fill=b;this.side1.attr({fill:c});this.side2.attr({fill:c});
this.inn.attr({fill:c});this.out.attr({fill:c});this.top.attr({fill:b});return this};["opacity","translateX","translateY","visibility"].forEach(function(a){b[a+"Setter"]=function(c,e){b[e]=c;["out","inn","side1","side2","top"].forEach(function(m){b[m].attr(e,c)})}});b.attr=function(a){var c;if("object"===typeof a&&(c=f(a))){var e=c[0];arguments[0]=c[1];y(b.attribs,e);b.setPaths(b.attribs)}return h.prototype.attr.apply(b,arguments)};b.animate=function(a,c,e){var m=this.attribs,d="data-"+Math.random().toString(26).substring(2,
9);delete a.center;delete a.z;delete a.alpha;delete a.beta;var w=v(C(c,this.renderer.globalAnimation));if(w.duration){c=f(a);b[d]=0;a[d]=1;b[d+"Setter"]=p.noop;if(c){var k=c[0];w.step=function(c,e){function b(c){return m[c]+(C(k[c],m[c])-m[c])*e.pos}e.prop===d&&e.elem.setPaths(J(m,{x:b("x"),y:b("y"),r:b("r"),innerR:b("innerR"),start:b("start"),end:b("end"),depth:b("depth")}))}}c=w}return h.prototype.animate.call(this,a,c,e)};b.destroy=function(){this.top.destroy();this.out.destroy();this.inn.destroy();
this.side1.destroy();this.side2.destroy();return h.prototype.destroy.call(this)};b.hide=function(){this.top.hide();this.out.hide();this.inn.hide();this.side1.hide();this.side2.hide()};b.show=function(b){this.top.show(b);this.out.show(b);this.inn.show(b);this.side1.show(b);this.side2.show(b)};return b};f.prototype.arc3dPath=function(a){function f(c){c%=2*Math.PI;c>Math.PI&&(c=2*Math.PI-c);return c}var b=a.x,d=a.y,h=a.start,l=a.end-.00001,c=a.r,e=a.innerR||0,m=a.depth||0,n=a.alpha,w=a.beta,k=Math.cos(h),
q=Math.sin(h);a=Math.cos(l);var K=Math.sin(l),x=c*Math.cos(w);c*=Math.cos(n);var B=e*Math.cos(w),p=e*Math.cos(n);e=m*Math.sin(w);var E=m*Math.sin(n);m=[["M",b+x*k,d+c*q]];m=m.concat(g(b,d,x,c,h,l,0,0));m.push(["L",b+B*a,d+p*K]);m=m.concat(g(b,d,B,p,l,h,0,0));m.push(["Z"]);var r=0<w?Math.PI/2:0;w=0<n?0:Math.PI/2;r=h>-r?h:l>-r?-r:h;var v=l<G-w?l:h<G-w?G-w:l,u=2*G-w;n=[["M",b+x*L(r),d+c*I(r)]];n=n.concat(g(b,d,x,c,r,v,0,0));l>u&&h<u?(n.push(["L",b+x*L(v)+e,d+c*I(v)+E]),n=n.concat(g(b,d,x,c,v,u,e,E)),
n.push(["L",b+x*L(u),d+c*I(u)]),n=n.concat(g(b,d,x,c,u,l,0,0)),n.push(["L",b+x*L(l)+e,d+c*I(l)+E]),n=n.concat(g(b,d,x,c,l,u,e,E)),n.push(["L",b+x*L(u),d+c*I(u)]),n=n.concat(g(b,d,x,c,u,v,0,0))):l>G-w&&h<G-w&&(n.push(["L",b+x*Math.cos(v)+e,d+c*Math.sin(v)+E]),n=n.concat(g(b,d,x,c,v,l,e,E)),n.push(["L",b+x*Math.cos(l),d+c*Math.sin(l)]),n=n.concat(g(b,d,x,c,l,v,0,0)));n.push(["L",b+x*Math.cos(v)+e,d+c*Math.sin(v)+E]);n=n.concat(g(b,d,x,c,v,r,e,E));n.push(["Z"]);w=[["M",b+B*k,d+p*q]];w=w.concat(g(b,d,
B,p,h,l,0,0));w.push(["L",b+B*Math.cos(l)+e,d+p*Math.sin(l)+E]);w=w.concat(g(b,d,B,p,l,h,e,E));w.push(["Z"]);k=[["M",b+x*k,d+c*q],["L",b+x*k+e,d+c*q+E],["L",b+B*k+e,d+p*q+E],["L",b+B*k,d+p*q],["Z"]];b=[["M",b+x*a,d+c*K],["L",b+x*a+e,d+c*K+E],["L",b+B*a+e,d+p*K+E],["L",b+B*a,d+p*K],["Z"]];K=Math.atan2(E,-e);d=Math.abs(l+K);a=Math.abs(h+K);h=Math.abs((h+l)/2+K);d=f(d);a=f(a);h=f(h);h*=1E5;l=1E5*a;d*=1E5;return{top:m,zTop:1E5*Math.PI+1,out:n,zOut:Math.max(h,l,d),inn:w,zInn:Math.max(h,l,d),side1:k,zSide1:.99*
d,side2:b,zSide2:.99*l}};return f});A(a,"Extensions/Oldie/VMLAxis3D.js",[a["Core/Utilities.js"]],function(a){var v=a.addEvent,p=function(){return function(a){this.axis=a}}();return function(){function a(){}a.compose=function(h){h.keepProps.push("vml");v(h,"init",a.onInit);v(h,"render",a.onRender)};a.onInit=function(){this.vml||(this.vml=new p(this))};a.onRender=function(){var a=this.vml;a.sideFrame&&(a.sideFrame.css({zIndex:0}),a.sideFrame.front.attr({fill:a.sideFrame.color}));a.bottomFrame&&(a.bottomFrame.css({zIndex:1}),
a.bottomFrame.front.attr({fill:a.bottomFrame.color}));a.backFrame&&(a.backFrame.css({zIndex:0}),a.backFrame.front.attr({fill:a.backFrame.color}))};return a}()});A(a,"Extensions/Oldie/VMLRenderer3D.js",[a["Core/Axis/Axis.js"],a["Core/Utilities.js"],a["Extensions/Oldie/VMLAxis3D.js"]],function(a,z,p){var v=z.setOptions;return function(){function h(){}h.compose=function(f,h){var g=h.prototype;f=f.prototype;v({animate:!1});f.face3d=g.face3d;f.polyhedron=g.polyhedron;f.elements3d=g.elements3d;f.element3d=
g.element3d;f.cuboid=g.cuboid;f.cuboidPath=g.cuboidPath;f.toLinePath=g.toLinePath;f.toLineSegments=g.toLineSegments;f.arc3d=function(a){a=g.arc3d.call(this,a);a.css({zIndex:a.zIndex});return a};f.arc3dPath=g.arc3dPath;p.compose(a)};return h}()});A(a,"Extensions/Oldie/Oldie.js",[a["Core/Chart/Chart.js"],a["Core/Color/Color.js"],a["Core/Globals.js"],a["Core/Pointer.js"],a["Core/Renderer/SVG/SVGElement.js"],a["Core/Renderer/SVG/SVGRenderer3D.js"],a["Core/Utilities.js"],a["Extensions/Oldie/VMLRenderer3D.js"]],
function(a,z,p,u,h,f,q,g){var v=z.parse,D=p.deg2rad,r=p.doc,A=p.noop,F=p.svg,y=p.win,J=q.addEvent,M=q.createElement,C=q.css,L=q.defined,G=q.discardElement,I=q.erase,H=q.extend,O=q.extendClass,N=q.getOptions,P=q.isArray,k=q.isNumber,R=q.isObject;z=q.merge;var b=q.offset,d=q.pick,t=q.pInt,l=q.uniqueKey;N().global.VMLRadialGradientURL="http://code.highcharts.com/8.2.2/gfx/vml-radial-gradient.png";r&&!r.defaultView&&(p.getStyle=q.getStyle=function(c,e){var a={width:"clientWidth",height:"clientHeight"}[e];
if(c.style[e])return t(c.style[e]);"opacity"===e&&(e="filter");if(a)return c.style.zoom=1,Math.max(c[a]-2*q.getStyle(c,"padding"),0);c=c.currentStyle[e.replace(/\-(\w)/g,function(c,a){return a.toUpperCase()})];"filter"===e&&(c=c.replace(/alpha\(opacity=([0-9]+)\)/,function(c,a){return a/100}));return""===c?1:t(c)});F||(J(h,"afterInit",function(){"text"===this.element.nodeName&&this.css({position:"absolute"})}),u.prototype.normalize=function(c,a){c=c||y.event;c.target||(c.target=c.srcElement);a||(this.chartPosition=
a=b(this.chart.container));return H(c,{chartX:Math.round(Math.max(c.x,c.clientX-a.left)),chartY:Math.round(c.y)})},a.prototype.ieSanitizeSVG=function(c){return c=c.replace(/<IMG /g,"<image ").replace(/<(\/?)TITLE>/g,"<$1title>").replace(/height=([^" ]+)/g,'height="$1"').replace(/width=([^" ]+)/g,'width="$1"').replace(/hc-svg-href="([^"]+)">/g,'xlink:href="$1"/>').replace(/ id=([^" >]+)/g,' id="$1"').replace(/class=([^" >]+)/g,'class="$1"').replace(/ transform /g," ").replace(/:(path|rect)/g,"$1").replace(/style="([^"]+)"/g,
function(c){return c.toLowerCase()})},a.prototype.isReadyToRender=function(){var c=this;return F||y!=y.top||"complete"===r.readyState?!0:(r.attachEvent("onreadystatechange",function(){r.detachEvent("onreadystatechange",c.firstRender);"complete"===r.readyState&&c.firstRender()}),!1)},r.createElementNS||(r.createElementNS=function(c,a){return r.createElement(a)}),p.addEventListenerPolyfill=function(c,a){function e(c){c.target=c.srcElement||y;a.call(b,c)}var b=this;b.attachEvent&&(b.hcEventsIE||(b.hcEventsIE=
{}),a.hcKey||(a.hcKey=l()),b.hcEventsIE[a.hcKey]=e,b.attachEvent("on"+c,e))},p.removeEventListenerPolyfill=function(c,a){this.detachEvent&&(a=this.hcEventsIE[a.hcKey],this.detachEvent("on"+c,a))},a={docMode8:r&&8===r.documentMode,init:function(c,a){var e=["<",a,' filled="f" stroked="f"'],b=["position: ","absolute",";"],d="div"===a;("shape"===a||d)&&b.push("left:0;top:0;width:1px;height:1px;");b.push("visibility: ",d?"hidden":"visible");e.push(' style="',b.join(""),'"/>');a&&(e=d||"span"===a||"img"===
a?e.join(""):c.prepVML(e),this.element=M(e));this.renderer=c},add:function(c){var a=this.renderer,b=this.element,d=a.box,f=c&&c.inverted;d=c?c.element||c:d;c&&(this.parentGroup=c);f&&a.invertChild(b,d);d.appendChild(b);this.added=!0;this.alignOnAdd&&!this.deferUpdateTransform&&this.updateTransform();if(this.onAdd)this.onAdd();this.className&&this.attr("class",this.className);return this},updateTransform:h.prototype.htmlUpdateTransform,setSpanRotation:function(){var c=this.rotation,a=Math.cos(c*D),
b=Math.sin(c*D);C(this.element,{filter:c?["progid:DXImageTransform.Microsoft.Matrix(M11=",a,", M12=",-b,", M21=",b,", M22=",a,", sizingMethod='auto expand')"].join(""):"none"})},getSpanCorrection:function(c,a,b,n,f){var e=n?Math.cos(n*D):1,m=n?Math.sin(n*D):0,h=d(this.elemHeight,this.element.offsetHeight);this.xCorr=0>e&&-c;this.yCorr=0>m&&-h;var g=0>e*m;this.xCorr+=m*a*(g?1-b:b);this.yCorr-=e*a*(n?g?b:1-b:1);f&&"left"!==f&&(this.xCorr-=c*b*(0>e?-1:1),n&&(this.yCorr-=h*b*(0>m?-1:1)),C(this.element,
{textAlign:f}))},pathToVML:function(c){for(var a=c.length,b=[];a--;)k(c[a])?b[a]=Math.round(10*c[a])-5:"Z"===c[a]?b[a]="x":(b[a]=c[a],!c.isArc||"wa"!==c[a]&&"at"!==c[a]||(b[a+5]===b[a+7]&&(b[a+7]+=c[a+7]>c[a+5]?1:-1),b[a+6]===b[a+8]&&(b[a+8]+=c[a+8]>c[a+6]?1:-1)));return b.join(" ")||"x"},clip:function(c){var a=this;if(c){var b=c.members;I(b,a);b.push(a);a.destroyClip=function(){I(b,a)};c=c.getCSS(a)}else a.destroyClip&&a.destroyClip(),c={clip:a.docMode8?"inherit":"rect(auto)"};return a.css(c)},css:h.prototype.htmlCss,
safeRemoveChild:function(c){c.parentNode&&G(c)},destroy:function(){this.destroyClip&&this.destroyClip();return h.prototype.destroy.apply(this)},on:function(c,a){this.element["on"+c]=function(){var c=y.event;c.target=c.srcElement;a(c)};return this},cutOffPath:function(c,a){c=c.split(/[ ,]/);var b=c.length;if(9===b||11===b)c[b-4]=c[b-2]=t(c[b-2])-10*a;return c.join(" ")},shadow:function(c,a,b){var e=[],m,f=this.element,h=this.renderer,g=f.style,l=f.path;l&&"string"!==typeof l.value&&(l="x");var k=l;
if(c){var p=d(c.width,3);var q=(c.opacity||.15)/p;for(m=1;3>=m;m++){var r=2*p+1-2*m;b&&(k=this.cutOffPath(l.value,r+.5));var v=['<shape isShadow="true" strokeweight="',r,'" filled="false" path="',k,'" coordsize="10 10" style="',f.style.cssText,'" />'];var u=M(h.prepVML(v),null,{left:t(g.left)+d(c.offsetX,1),top:t(g.top)+d(c.offsetY,1)});b&&(u.cutOff=r+1);v=['<stroke color="',c.color||"#000000",'" opacity="',q*m,'"/>'];M(h.prepVML(v),null,null,u);a?a.element.appendChild(u):f.parentNode.insertBefore(u,
f);e.push(u)}this.shadows=e}return this},updateShadows:A,setAttr:function(c,a){this.docMode8?this.element[c]=a:this.element.setAttribute(c,a)},getAttr:function(c){return this.docMode8?this.element[c]:this.element.getAttribute(c)},classSetter:function(c){(this.added?this.element:this).className=c},dashstyleSetter:function(c,a,b){(b.getElementsByTagName("stroke")[0]||M(this.renderer.prepVML(["<stroke/>"]),null,null,b))[a]=c||"solid";this[a]=c},dSetter:function(c,a,b){var e=this.shadows;c=c||[];this.d=
c.join&&c.join(" ");b.path=c=this.pathToVML(c);if(e)for(b=e.length;b--;)e[b].path=e[b].cutOff?this.cutOffPath(c,e[b].cutOff):c;this.setAttr(a,c)},fillSetter:function(c,a,b){var e=b.nodeName;"SPAN"===e?b.style.color=c:"IMG"!==e&&(b.filled="none"!==c,this.setAttr("fillcolor",this.renderer.color(c,b,a,this)))},"fill-opacitySetter":function(c,a,b){M(this.renderer.prepVML(["<",a.split("-")[0],' opacity="',c,'"/>']),null,null,b)},opacitySetter:A,rotationSetter:function(c,a,b){b=b.style;this[a]=b[a]=c;b.left=
-Math.round(Math.sin(c*D)+1)+"px";b.top=Math.round(Math.cos(c*D))+"px"},strokeSetter:function(c,a,b){this.setAttr("strokecolor",this.renderer.color(c,b,a,this))},"stroke-widthSetter":function(c,a,b){b.stroked=!!c;this[a]=c;k(c)&&(c+="px");this.setAttr("strokeweight",c)},titleSetter:function(c,a){this.setAttr(a,c)},visibilitySetter:function(c,a,b){"inherit"===c&&(c="visible");this.shadows&&this.shadows.forEach(function(b){b.style[a]=c});"DIV"===b.nodeName&&(c="hidden"===c?"-999em":0,this.docMode8||
(b.style[a]=c?"visible":"hidden"),a="top");b.style[a]=c},xSetter:function(c,a,b){this[a]=c;"x"===a?a="left":"y"===a&&(a="top");this.updateClipping?(this[a]=c,this.updateClipping()):b.style[a]=c},zIndexSetter:function(a,b,d){d.style[b]=a},fillGetter:function(){return this.getAttr("fillcolor")||""},strokeGetter:function(){return this.getAttr("strokecolor")||""},classGetter:function(){return this.getAttr("className")||""}},a["stroke-opacitySetter"]=a["fill-opacitySetter"],p.VMLElement=a=O(h,a),a.prototype.ySetter=
a.prototype.widthSetter=a.prototype.heightSetter=a.prototype.xSetter,u={Element:a,isIE8:-1<y.navigator.userAgent.indexOf("MSIE 8.0"),init:function(a,b,d){this.crispPolyLine=f.prototype.crispPolyLine;this.alignedObjects=[];var c=this.createElement("div").css({position:"relative"});var e=c.element;a.appendChild(c.element);this.isVML=!0;this.box=e;this.boxWrapper=c;this.gradients={};this.cache={};this.cacheKeys=[];this.imgCount=0;this.setSize(b,d,!1);if(!r.namespaces.hcv){r.namespaces.add("hcv","urn:schemas-microsoft-com:vml");
try{r.createStyleSheet().cssText="hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "}catch(S){r.styleSheets[0].cssText+="hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "}}},isHidden:function(){return!this.box.offsetWidth},clipRect:function(a,b,d,f){var c=this.createElement(),e=R(a);return H(c,{members:[],count:0,left:(e?a.x:a)+1,top:(e?a.y:b)+1,width:(e?a.width:d)-1,height:(e?a.height:f)-
1,getCSS:function(a){var c=a.element,b=c.nodeName,e=a.inverted,d=this.top-("shape"===b?c.offsetTop:0),m=this.left;c=m+this.width;var f=d+this.height;d={clip:"rect("+Math.round(e?m:d)+"px,"+Math.round(e?f:c)+"px,"+Math.round(e?c:f)+"px,"+Math.round(e?d:m)+"px)"};!e&&a.docMode8&&"DIV"===b&&H(d,{width:c+"px",height:f+"px"});return d},updateClipping:function(){c.members.forEach(function(a){a.element&&a.css(c.getCSS(a))})}})},color:function(a,b,d,f){var c=this,e=/^rgba/,m,h,g="none";a&&a.linearGradient?
h="gradient":a&&a.radialGradient&&(h="pattern");if(h){var l,n,k=a.linearGradient||a.radialGradient,p,q,r,t,u="";a=a.stops;var y=[],A=function(){m=['<fill colors="'+y.join(",")+'" opacity="',q,'" o:opacity2="',p,'" type="',h,'" ',u,'focus="100%" method="any" />'];M(c.prepVML(m),null,null,b)};var z=a[0];var C=a[a.length-1];0<z[0]&&a.unshift([0,z[1]]);1>C[0]&&a.push([1,C[1]]);a.forEach(function(a,c){e.test(a[1])?(J=v(a[1]),l=J.get("rgb"),n=J.get("a")):(l=a[1],n=1);y.push(100*a[0]+"% "+l);c?(q=n,r=l):
(p=n,t=l)});if("fill"===d)if("gradient"===h)d=k.x1||k[0]||0,a=k.y1||k[1]||0,z=k.x2||k[2]||0,k=k.y2||k[3]||0,u='angle="'+(90-180*Math.atan((k-a)/(z-d))/Math.PI)+'"',A();else{g=k.r;var D=2*g,F=2*g,G=k.cx,L=k.cy,I=b.radialReference,H;g=function(){I&&(H=f.getBBox(),G+=(I[0]-H.x)/H.width-.5,L+=(I[1]-H.y)/H.height-.5,D*=I[2]/H.width,F*=I[2]/H.height);u='src="'+N().global.VMLRadialGradientURL+'" size="'+D+","+F+'" origin="0.5,0.5" position="'+G+","+L+'" color2="'+t+'" ';A()};f.added?g():f.onAdd=g;g=r}else g=
l}else if(e.test(a)&&"IMG"!==b.tagName){var J=v(a);f[d+"-opacitySetter"](J.get("a"),d,b);g=J.get("rgb")}else g=b.getElementsByTagName(d),g.length&&(g[0].opacity=1,g[0].type="solid"),g=a;return g},prepVML:function(a){var c=this.isIE8;a=a.join("");c?(a=a.replace("/>",' xmlns="urn:schemas-microsoft-com:vml" />'),a=-1===a.indexOf('style="')?a.replace("/>",' style="display:inline-block;behavior:url(#default#VML);" />'):a.replace('style="','style="display:inline-block;behavior:url(#default#VML);')):a=a.replace("<",
"<hcv:");return a},text:f.prototype.html,path:function(a){var c={coordsize:"10 10"};P(a)?c.d=a:R(a)&&H(c,a);return this.createElement("shape").attr(c)},circle:function(a,b,d){var c=this.symbol("circle");R(a)&&(d=a.r,b=a.y,a=a.x);c.isCircle=!0;c.r=d;return c.attr({x:a,y:b})},g:function(a){var c;a&&(c={className:"highcharts-"+a,"class":"highcharts-"+a});return this.createElement("div").attr(c)},image:function(a,b,d,f,g){var c=this.createElement("img").attr({src:a});1<arguments.length&&c.attr({x:b,y:d,
width:f,height:g});return c},createElement:function(a){return"rect"===a?this.symbol(a):f.prototype.createElement.call(this,a)},invertChild:function(a,b){var c=this;b=b.style;var d="IMG"===a.tagName&&a.style;C(a,{flip:"x",left:t(b.width)-(d?t(d.top):1),top:t(b.height)-(d?t(d.left):1),rotation:-90});[].forEach.call(a.childNodes,function(b){c.invertChild(b,a)})},symbols:{arc:function(a,b,d,f,g){var c=g.start,e=g.end,h=g.r||d||f;d=g.innerR;f=Math.cos(c);var k=Math.sin(c),l=Math.cos(e),m=Math.sin(e);if(0===
e-c)return["x"];c=["wa",a-h,b-h,a+h,b+h,a+h*f,b+h*k,a+h*l,b+h*m];g.open&&!d&&c.push("e","M",a,b);c.push("at",a-d,b-d,a+d,b+d,a+d*l,b+d*m,a+d*f,b+d*k,"x","e");c.isArc=!0;return c},circle:function(a,b,d,f,g){g&&L(g.r)&&(d=f=2*g.r);g&&g.isCircle&&(a-=d/2,b-=f/2);return["wa",a,b,a+d,b+f,a+d,b+f/2,a+d,b+f/2,"e"]},rect:function(a,b,d,g,h){return f.prototype.symbols[L(h)&&h.r?"callout":"square"].call(0,a,b,d,g,h)}}},p.VMLRenderer=a=function(){this.init.apply(this,arguments)},a.prototype=z(a.prototype,f.prototype,
u),p.Renderer=a,g.compose(a,f));f.prototype.getSpanWidth=function(a,b){var c=a.getBBox(!0).width;!F&&this.forExport&&(c=this.measureSpanWidth(b.firstChild.data,a.styles));return c};f.prototype.measureSpanWidth=function(a,b){var c=r.createElement("span");a=r.createTextNode(a);c.appendChild(a);C(c,b);this.box.appendChild(c);b=c.offsetWidth;G(c);return b}});A(a,"masters/modules/oldie.src.js",[],function(){})});