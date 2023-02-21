import{_ as u,S as p,e as P,c as l,a as o,w as _,f as S,v as w,F as m,r as v,t as c,o as i,g as y,h as b}from"./index.2bd95443.js";const f="88d2c735e36149b50c9d46f09826ec06",h="https://api.themoviedb.org/3",d="/tv/popular",x="/search/tv",n={api_key:f,language:"en-US",query:"",page:1},T={name:"ShowPage",components:{ShowCard:p},data(){return{shows:[],currentPage:n.page,totalPages:1,endpoint:`${h}${d}`,searchQuery:""}},methods:{async getShows(a){try{const e=await P.get(this.endpoint,{params:a});this.shows=e.data.results,this.currentPage=e.data.page,this.totalPages=e.data.total_pages}catch(e){console.error(e)}},handleSearch(){const a=this.searchQuery.trim();a?(this.endpoint=`${h}${x}`,this.getShows({...n,query:a})):(this.endpoint=`${h}${d}`,this.getShows(n))},handlePreviousPage(){this.currentPage>1&&(this.getShows({...n,page:this.currentPage-1}),this.scrollToTop())},handleNextPage(){this.currentPage<this.totalPages&&(this.getShows({...n,page:this.currentPage+1}),this.scrollToTop())},scrollToTop(){const a={top:0,left:0,behavior:"smooth"};window.scrollTo(a)}},mounted(){this.getShows(n)}},N={class:"px-5"},k=o("button",{class:"btn text-light",type:"submit"},"search",-1),A={class:"movie-list"},C={key:1},E={class:"pagination pb-3 text-light"},O=["disabled"],B=["disabled"];function D(a,e,U,q,t,r){const g=b("ShowCard");return i(),l("div",null,[o("div",N,[o("form",{class:"search-form",onSubmit:e[1]||(e[1]=_((...s)=>r.handleSearch&&r.handleSearch(...s),["prevent"]))},[S(o("input",{class:"",placeholder:"Search TV shows...",type:"text",id:"query",name:"query","onUpdate:modelValue":e[0]||(e[0]=s=>t.searchQuery=s)},null,512),[[w,t.searchQuery]]),k],32)]),o("div",A,[t.shows.length>0?(i(!0),l(m,{key:0},v(t.shows,s=>(i(),y(g,{key:s.id,show:s},null,8,["show"]))),128)):(i(),l("p",C,"No TV shows found."))]),o("div",E,[o("button",{class:"btn-color",onClick:e[2]||(e[2]=(...s)=>r.handlePreviousPage&&r.handlePreviousPage(...s)),disabled:t.currentPage===1},"Previous",8,O),o("span",null,c(t.currentPage)+"/"+c(t.totalPages),1),o("button",{class:"btn-color",onClick:e[3]||(e[3]=(...s)=>r.handleNextPage&&r.handleNextPage(...s)),disabled:t.currentPage===t.totalPages},"Next",8,B)])])}const Q=u(T,[["render",D]]);export{Q as default};
