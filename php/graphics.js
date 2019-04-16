/*General*/
var mt = async(f)=>{
    var start=(new Date()).getTime();await f();console.log((new Date()).getTime()-start);
  },
  sp = (n)=>new Promise(r=>setTimeout(r,n)),
  cl = ()=>{
    document.getElementsByTagName("head")[0].innerHTML="<style>"+
      "*{margin:0px;padding:0px;}"+
      "html,body{height:100%;min-height:100%;width:100%;position:relative;background-color:rgb(50,54,57);}"+
      "#svg{background-color:transparent;display:block;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);}"+
    "</style>";
  },
  g = (n)=>{document.getElementById("graphics").innerHTML="<svg id=svg style='width:"+n+"px;height:"+n+"px;'></svg>";},
  cx = (o)=>parseInt(o.getAttribute("cx")),
  cy = (o)=>parseInt(o.getAttribute("cy")),
  exx = (a,b)=>{var t;t=cy(a);a.setAttribute("cx",cy(b));b.setAttribute("cx",t);},
  exy = (a,b)=>{var t;t=cy(a);a.setAttribute("cy",cy(b));b.setAttribute("cy",t);},
  r = (n)=>parseInt(Math.random()*n),
  rp = (n)=>{
    var ps=[];for(var i=0;i<n||0;i++){ps[i]={x:r(w),y:r(w)};}return ps;
  },
  c = (p)=>"<circle cx="+p.x+" cy="+p.y+" r=1 fill=black />",
  dp = (ps)=>{
    var s="";for(var i=0;i<ps.length;i++){s+=c(ps[i]);}document.getElementById("svg").innerHTML+=s;
  },
  ds = (a,b)=>Math.pow((b.x-a.x)*(b.x-a.x)+(b.y-a.y)*(b.y-a.y),0.5);

/*Sorting*/
  var s = {
    _run:async(n,m,d)=>{s.st^=1;g(n);s._per(n);await sp(1000);mt(()=>s[m](d,s.st));},
    _per:(n)=>{var ps=[];for(var i=0;i<n;i++)ps[i]={x:i,y:r(n)};dp(ps);},
    _ini:()=>{var p=document.getElementsByTagName("circle");return {cs:p,n:p.length};},st:1,
    s:async(d,st_)=>{var {cs,n}=s._ini(),m,im;
      b_:for(var i=0;i<n;i++){m=cy(cs[i]);im=i;
	for(var j=i+1;j<n;j++){if(cy(cs[j])>m){m=cy(cs[j]);im=j;}if(st_!=s.st)break b_;}
	exy(cs[i],cs[im]);await sp(d);
      }
    },
    i:async(d,st_)=>{var {cs,n}=s._ini(),q,x;
      b_:for(var i=0;i<n;i++){q=cy(cs[i]);x=i;
	while(x>0&&cy(cs[x-1])<q){cs[x].setAttribute("cy",cy(cs[--x]));if(st_!=s.st)break b_;}
	cs[x].setAttribute("cy",q);await sp(d);
      }
    },
    b:async(d,st_)=>{var {cs,n}=s._ini();
      b_:for(var i=n-1;i>0;i--){for(var j=0;j<i;j++)if(cy(cs[j])<cy(cs[j+1])){
	exy(cs[j],cs[j+1]);if(st_!=s.st)break b_;
      }await sp(d);}
    },
    sh:async(d,st_)=>{var {cs,n}=s._ini(),q,x,h;
      for(h=1;h<n;h=3*h+1);b_:for(h=(h-1)/3;h>0;h=(h-1)/3){
	for(var i=h;i<n;i++){q=cy(cs[i]);x=i;
	  while(x>h-1&&cy(cs[x-h])<q){cs[x].setAttribute("cy",cy(cs[x-=h]));if(st_!=s.st)break b_;}
	  cs[x].setAttribute("cy",q);await sp(d);
	}
      }
    },
    qs:async(d,st_,l,r)=>{var {cs,n}=s._ini(),i,j,q;
      l=l||0;r=r===undefined?n-1:r;if(st_==s.st&&r>l){q=cy(cs[r]);i=l-1;j=r;
	while(st_==s.st){while(i<r&&cy(cs[++i])>q);while(j>l&&cy(cs[--j])<=q);if(i>=j)break;exy(cs[i],cs[j]);await sp(d);}
	exy(cs[i],cs[r]);await s.qs(d,st_,l,i-1);await s.qs(d,st_,i+1,r);
      }		
    },
    mg:async(d,st_,l,r)=>{var {cs,n}=s._ini(),i,j,k,m,a=[];
      l=l||0;r=r===undefined?n-1:r;if(st_==s.st&&r>l){
	m=r+l;m=(m-m%2)/2;await s.mg(d,st_,l,m);await s.mg(d,st_,m+1,r);
	for(i=m+1;i>l;i--){a[i-1]=cy(cs[i-1]);}for(j=m;j<r;j++){a[r+m-j]=cy(cs[j+1]);}
	b_:for(k=l;k<=r;k++){cs[k].setAttribute("cy",a[a[i]>a[j]?i++:j--]);if(st_!=s.st)break b_;await sp(d);}
      }
    }
  };

/*Fractal*/
var fr = async(t="tr",ev=(j,i)=>r(3),l=2,m=5000,n=320)=>{
  g(n);
  var pg = {
    tr:[
      {x:parseInt(n/2),y:0},
      {x:n,y:n},
      {x:0,y:n}
    ],
    sq:[
      {x:0,y:0},
      {x:n,y:0},
      {x:n,y:n},
      {x:0,y:n}
    ]
  }[t];
  dp(pg);
  var p = {x:r(n),y:r(n)},v,s="",j=0;
  var svg = document.getElementById("svg");
  for(var i=0;i<m;i++){
    j=ev(j,i);
    //j=(j+1+r(pg.length-1))%(pg.length);
    /*switch(ft){
      case 0:j=r(pg.length);break;
      case 1:j=(j+fc+r(pg.length-1))%(pg.length);break;
      case 2:j=(j+fc+(i%2?r(pg.length):r(pg.length-1)))%(pg.length);break;
      default:break;
    }*/
    v = pg[j];
    p.x += parseInt((v.x-p.x)/l);
    p.y += parseInt((v.y-p.y)/l);
    s+="<circle cx="+p.x+" cy="+p.y+" r=1 fill=black />";
  }
  svg.innerHTML=s;
}
//fr(360,50000,"tr",(j,i)=>((j+(i%2?2:0)+r(2))%3)); 
