"use strict";(self.webpackChunkthe_wall=self.webpackChunkthe_wall||[]).push([[716],{8716:(S,a,c)=>{c.r(a),c.d(a,{TextToSpeechWeb:()=>g});var h=c(6304),l=c(8384);class g extends l.Uw{constructor(){super(),this.speechSynthesis=null,"speechSynthesis"in window&&(this.speechSynthesis=window.speechSynthesis)}speak(e){var t=this;return(0,h.Z)(function*(){t.speechSynthesis||t.throwUnsupportedError(),yield t.stop();const s=t.speechSynthesis,o=t.createSpeechSynthesisUtterance(e);return new Promise((n,i)=>{o.onend=()=>{n()},o.onerror=r=>{i(r)},s.speak(o)})})()}stop(){var e=this;return(0,h.Z)(function*(){e.speechSynthesis||e.throwUnsupportedError(),e.speechSynthesis.cancel()})()}getSupportedLanguages(){var e=this;return(0,h.Z)(function*(){return{languages:e.getSpeechSynthesisVoices().map(n=>n.lang).filter((n,i,r)=>r.indexOf(n)==i)}})()}getSupportedVoices(){var e=this;return(0,h.Z)(function*(){return{voices:e.getSpeechSynthesisVoices()}})()}isLanguageSupported(e){var t=this;return(0,h.Z)(function*(){return{supported:(yield t.getSupportedLanguages()).languages.includes(e.lang)}})()}openInstall(){var e=this;return(0,h.Z)(function*(){e.throwUnimplementedError()})()}createSpeechSynthesisUtterance(e){const t=this.getSpeechSynthesisVoices(),s=new SpeechSynthesisUtterance,{text:o,lang:n,rate:i,pitch:r,volume:p,voice:u}=e;return u&&(s.voice=t[u]),p&&(s.volume=p>=0&&p<=1?p:1),i&&(s.rate=i>=.1&&i<=10?i:1),r&&(s.pitch=r>=0&&r<=2?r:2),n&&(s.lang=n),s.text=o,s}getSpeechSynthesisVoices(){return this.speechSynthesis||this.throwUnsupportedError(),(!this.supportedVoices||this.supportedVoices.length<1)&&(this.supportedVoices=this.speechSynthesis.getVoices()),this.supportedVoices}throwUnsupportedError(){throw this.unavailable("SpeechSynthesis API not available in this browser.")}throwUnimplementedError(){throw this.unimplemented("Not implemented on web.")}}}}]);