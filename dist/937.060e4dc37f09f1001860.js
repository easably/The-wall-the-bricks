"use strict";(self.webpackChunkthe_wall=self.webpackChunkthe_wall||[]).push([[937],{937:(f,a,s)=>{s.r(a),s.d(a,{BalloonComponent:()=>h});var n=s(639),r=s(584);const c=["balloon"];let h=(()=>{class e{constructor(t){this.mainBridgeService=t}ngOnInit(){this.resultSubscription=this.mainBridgeService.result.subscribe(t=>{t>4?this.righthAnswer():this.wrongAnswer()})}ngOnDestroy(){this.resultSubscription.unsubscribe()}ngAfterViewInit(){this.initializeField(this.balloon.nativeElement)}initializeField(t){const o=window.screen.width-70,l=Math.floor(Math.random()*o);t.style.left=l+"px"}righthAnswer(){}wrongAnswer(){const t=this.balloon.nativeElement,o=(window.screen.height-66-t.offsetHeight)/3;t.style.top=t.offsetTop+o+"px"}}return e.\u0275fac=function(t){return new(t||e)(n.Y36(r.W))},e.\u0275cmp=n.Xpm({type:e,selectors:[["app-balloon"]],viewQuery:function(t,o){if(1&t&&n.Gf(c,5),2&t){let l;n.iGM(l=n.CRH())&&(o.balloon=l.first)}},decls:2,vars:0,consts:[["src","/assets/bricks/balloon.svg"],["balloon",""]],template:function(t,o){1&t&&n._UZ(0,"img",0,1)},styles:["[_nghost-%COMP%]{width:100%;height:100%;position:absolute;background-color:#65baff8c;overflow:hidden;z-index:-1}img[_ngcontent-%COMP%]{position:absolute;top:66px;transition:all 1s;animation:balloon-start 1.5s}@keyframes balloon-start{0%{transform:translateY(900px)}to{transform:translateY(0)}}"]}),e})()}}]);