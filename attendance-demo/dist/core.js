/* Shared, deterministic attendance calculations. */
(function(root){
const minutes=value=>{if(!/^\d{2}:\d{2}$/.test(value||''))return NaN;const [h,m]=value.split(':').map(Number);return h<24&&m<60?h*60+m:NaN;};
function netMinutes(entry,exit){const a=minutes(entry),b=minutes(exit);if(!Number.isFinite(a)||!Number.isFinite(b)||b<a)return null;return b-a-Math.max(0,Math.min(b,780)-Math.max(a,720));}
function validate(record,date,today,now){if(!['present','leave','absent'].includes(record.type))return 'Ýagdaý saýlaň.';if(date>today)return 'Geljek gün üçin wagt belläp bolmaýar.';if(record.type!=='present')return '';const a=minutes(record.entry),b=record.exit?minutes(record.exit):null;if(!Number.isFinite(a)||(record.exit&&!Number.isFinite(b)))return 'Wagty dogry giriziň.';if(b!==null&&b<a)return 'Çykyş wagty girişden öň bolmaly däl.';if(date===today&&(a>now||(b!==null&&b>now)))return 'Geljek wagt üçin bellik edip bolmaýar.';return '';}
const api={minutes,netMinutes,validate};if(typeof module!=='undefined')module.exports=api;else root.Attendance=api;
})(globalThis);
