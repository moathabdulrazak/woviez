import{_ as n,c as _,a as e,t as s,F as m,o as d}from"./index.14a320e3.js";const c="88d2c735e36149b50c9d46f09826ec06",p={data(){return{movie:{title:"",vote_average:"",release_date:"",overview:"",poster_path:""}}},computed:{movieUrl(){return`https://autoembed.to/movie/tmdb/${this.$route.params.id}?api_key=${c}`}},async created(){const t=`https://api.themoviedb.org/3/movie/${this.$route.params.id}?api_key=${c}`,a=await(await fetch(t)).json();this.movie=a},methods:{scrollToTop(){window.scrollTo({top:0,behavior:"smooth"})}}},h={class:"movie-poster"},g=["src","alt"],u={class:"movie-details"},f={class:"text-light"},w={class:"movie-rating text-light"},x={class:"movie-release text-light"},b={class:"movie-overview-text text-light"},T={class:"movie-page"},y={class:"video-container"},k=["src"];function I(r,t,l,a,o,i){return d(),_(m,null,[e("div",{class:"movie-overview",onClick:t[0]||(t[0]=(...v)=>i.scrollToTop&&i.scrollToTop(...v))},[e("div",h,[e("img",{src:"https://image.tmdb.org/t/p/w500"+o.movie.poster_path,alt:o.movie.title+" poster"},null,8,g)]),e("div",u,[e("h1",f,s(o.movie.title),1),e("div",w,s(o.movie.vote_average*10)+"%",1),e("div",x,s(o.movie.release_date),1),e("p",b,s(o.movie.overview),1)])]),e("div",T,[e("div",y,[e("iframe",{src:i.movieUrl,frameborder:"0",allowfullscreen:""},null,8,k)])])],64)}const P=n(p,[["render",I]]);export{P as default};