#!/usr/bin/env node
/**
 * AUX 8px design-system guard.
 * Run: node scripts/check-design-grid.js
 *
 * Source: V1 wf-design-foundation.css and wf-layout-system.css.
 * 8px spatial grid; 4px typography sub-grid; 8px baseline.
 * Small 4px gaps are permitted. 1px strokes and CSS ratios are not spatial units.
 */
const fs = require("node:fs");
const path = require("node:path");
const css = fs.readFileSync(path.join(__dirname,"..","v2.css"),"utf8");
const text = css.replace(/\/\*[\s\S]*?\*\//g,"");
const space=/^(padding(?:-(?:top|bottom|left|right))?|margin(?:-(?:top|bottom|left|right))?|gap|row-gap|column-gap|width|height|min-width|max-width|min-height|max-height|top|bottom|left|right|grid-template-columns|grid-template-rows|flex-basis)$/;
const failures=[];
let counts={spacing:0,type:0,line:0,tracking:0};
const decl=/(?<=[;{])\s*([-\w]+)\s*:\s*([^;{}]+)(?=[;}])/g;
for(const m of text.matchAll(decl)){
 const property=m[1],value=m[2];
 if(property.startsWith("--"))continue; // Tokens are separately checked below.
 const pixels=[...value.matchAll(/(-?\d+(?:\.\d+)?)px\b/g)].map(x=>Number(x[1]));
 if(space.test(property)){
  for(const px of pixels){
   counts.spacing++;
   if(px!==0 && Math.abs(px)!==4 && Math.abs(px)%8!==0)
    failures.push(`spacing: ${property}: ${value.trim()} (${px}px)`);
  }
  if(/^(padding|gap|row-gap|column-gap)/.test(property) && /\d(?:\.\d+)?%/.test(value))
   failures.push(`percentage spacing: ${property}: ${value.trim()}`);
 }
 if(property==="font-size"){
  for(const px of pixels){
   counts.type++;
   if(px<12 || px%4!==0) failures.push(`typography: ${property}: ${value.trim()}`);
  }
 }
 if(property==="letter-spacing"){
  counts.tracking++;
  if(!/^var\(--tracking-(display|heading|body|ui|eyebrow|index)\)$/.test(value.trim())) failures.push("unapproved tracking value: "+value.trim());
 }
 if(property==="line-height"){
  if(/^\s*-?\d+(?:\.\d+)?\s*$/.test(value))
   failures.push(`unitless line-height: ${property}: ${value.trim()}`);
  for(const px of pixels){
   counts.line++;
   if(px%8!==0) failures.push(`line-height: ${property}: ${value.trim()}`);
  }
 }
}
// Colour system: storefront rules use only the five colour tokens (white, surface, line, muted, ink).
// Literal colours are allowed only inside :root and in the review chrome (preview bar, page rail, stage).
const reviewChrome=/(\.preview|\.page-rail|\.rail-|#page-index|\.lang-control|\.stage\b|\.stage-|\.site-frame|^\s*body\b)/;
const colourLiteral=/#[0-9a-fA-F]{3,6}\b|rgba?\([^)]*\)|(?<![-\w])(white|black)(?![-\w])/g;
for(const r of text.matchAll(/([^{}]+)\{([^{}]*)\}/g)){
 const sel=r[1].trim(),body=r[2];
 if(sel.includes(":root")||reviewChrome.test(sel))continue;
 for(const d of body.split(";")){
  const i=d.indexOf(":");if(i<0)continue;
  const prop=d.slice(0,i).trim();if(prop.startsWith("--")||prop==="content")continue;
  const hits=d.slice(i+1).match(colourLiteral);
  if(hits){counts.colour=(counts.colour||0)+hits.length;failures.push(`colour literal outside the colour tokens: ${sel} { ${d.trim()} }`);}
 }
}
const must=[
 ["--grid:8px","8px grid token"],
 ["--fs-body:16px","16px body token"],
 ["--lh-body:24px","24px body baseline"],
 ["--fs-meta:12px","12px metadata"],
 ["--fs-h1:48px","48px desktop heading (quiet type volume)"],
 ["--lh-h1:56px","56px H1 baseline"],
 ["--fs-statement:64px","64px single brand statement"],
 ["--surface:#f4f4f2","surface colour token"],
 ["--line:#dddddb","line colour token"],
 ["--muted:#666","muted colour token"],
 ["--ink:#232323","ink colour token"],
 ["--tracking-display:.035em","display tracking"],
 ["--tracking-heading:.05em","heading tracking"],
 ["--tracking-body:.03em","body tracking"],
 ["--tracking-ui:.06em","UI tracking"],
 ["--tracking-eyebrow:.12em","eyebrow tracking"],
 ["--tracking-index:.08em","index tracking"],
 ["--page-gutter:80px","80px desktop outer margin"],
 ["--pdp-top-gutter:var(--space-8)","PDP shared 64px gutter"],
 ["#site-app p{font-size:var(--fs-body);line-height:var(--lh-body)}","Site-wide readable body text"]
];
for(const [fragment,label] of must)
 if(!css.includes(fragment))failures.push(`missing core design contract: ${label}`);
if(failures.length){
 console.error("AUX design-grid check FAILED:");
 failures.forEach(x=>console.error(" - "+x));
 process.exit(1);
}
console.log(`AUX design-grid check PASSED: ${counts.spacing} spatial lengths, ${counts.type} font lengths, ${counts.line} line-heights, ${counts.tracking} tracking declarations.`);
