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
let counts={spacing:0,type:0,line:0};
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
 if(property==="line-height"){
  if(/^\s*-?\d+(?:\.\d+)?\s*$/.test(value))
   failures.push(`unitless line-height: ${property}: ${value.trim()}`);
  for(const px of pixels){
   counts.line++;
   if(px%8!==0) failures.push(`line-height: ${property}: ${value.trim()}`);
  }
 }
}
const must=[
 ["--grid:8px","8px grid token"],
 ["--fs-body:16px","16px body token"],
 ["--lh-body:24px","24px body baseline"],
 ["--fs-meta:12px","12px metadata"],
 ["--fs-h1:64px","64px desktop heading"],
 ["--lh-h1:64px","64px H1 baseline"],
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
console.log(`AUX design-grid check PASSED: ${counts.spacing} spatial lengths, ${counts.type} font lengths, ${counts.line} line-heights.`);
