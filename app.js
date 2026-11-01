(()=>{'use strict';
const CATALOGUE=window.SWIFT_CATALOGUE||[];
const STORAGE='swift.teacher.workspace.v3';
// Original external resource collection is deliberately not linked: its Drive ownership is unverified.
const SCHOOL_LOGO_URL=document.getElementById('schoolLogo')?.getAttribute('src')||'logo.png';
const icons={
'layout-dashboard':'<rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/>',
'library':'<rect x="3" y="4" width="5" height="16" rx="1"/><rect x="10" y="4" width="5" height="16" rx="1"/><path d="m18 5 3 14"/>','key-round':'<circle cx="7.5" cy="15.5" r="5.5"/><path d="m11.5 11.5 9-9 2 2-2 2 2 2-3 3-2-2"/>',
'calendar-days':'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/>',
'bookmark':'<path d="M5 4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v18l-7-5-7 5V4z"/>',
'shield-check':'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>',
'external-link':'<path d="M14 3h7v7M10 14 21 3"/><path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6"/>',
'menu':'<path d="M3 6h18M3 12h18M3 18h18"/>','moon':'<path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z"/>','sun':'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
'download':'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>','upload':'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>',
'headphones':'<path d="M3 14v-3a9 9 0 0 1 18 0v3M3 14h4v7H5a2 2 0 0 1-2-2v-5ZM21 14h-4v7h2a2 2 0 0 0 2-2v-5Z"/>',
'book-open':'<path d="M12 7a8 8 0 0 0-9-2v14a8 8 0 0 1 9 2 8 8 0 0 1 9-2V5a8 8 0 0 0-9 2Zm0 0v14"/>',
'file-text':'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M8 13h8M8 17h8"/>',
'files':'<path d="M16 3H5a2 2 0 0 0-2 2v11M8 7h11a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z"/>',
'folder':'<path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z"/>',
'notebook-pen':'<path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10M8 2v20M12 7h6M12 11h4"/><path d="m14 19 6-6 2 2-6 6-3 1 1-3Z"/>',
'search':'<circle cx="10.9" cy="10.9" r="7"/><path d="m16 16 5 5"/>',
'arrow-right':'<path d="M5 12h14m-7-7 7 7-7 7"/>','arrow-up-right':'<path d="M7 17 17 7M7 7h10v10"/>','chevron-right':'<path d="m9 18 6-6-6-6"/>',
'check-circle':'<circle cx="12" cy="12" r="10"/><path d="m8 12 3 3 5-6"/>','check':'<path d="m5 12 4 4L19 6"/>','plus':'<path d="M12 5v14M5 12h14"/>','x':'<path d="M18 6 6 18M6 6l12 12"/>','trash-2':'<path d="M3 6h18M8 6V4h8v2m3 0-1 15H6L5 6M10 10v7M14 10v7"/>',
'clipboard-list':'<rect x="5" y="4" width="14" height="18" rx="2"/><path d="M9 4V2h6v2M9 10h6M9 15h6"/>',
'sliders-horizontal':'<path d="M4 7h16M4 17h16M8 4v6m8 4v6"/>','clock-3':'<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
'link':'<path d="m10 13 4-4M7 17H6a4 4 0 0 1 0-8h4m4-2h4a4 4 0 0 1 0 8h-4"/>','copy':'<rect x="8" y="8" width="13" height="13" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/>',
'archive':'<rect x="3" y="3" width="18" height="4" rx="1"/><path d="M5 7v13h14V7M10 12h4"/>','file-check':'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6m-11 8 2 2 4-4"/>',
'print':'<path d="M6 9V3h12v6M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2M6 15h12v7H6v-7Z"/>',
'edit-3':'<path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z"/>','graduation-cap':'<path d="m2 10 10-5 10 5-10 5-10-5Zm4 2v5c4 3 8 3 12 0v-5M22 10v7"/>',
'sparkles':'<path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3ZM19 17l.8 2.2L22 20l-2.2.8L19 23l-.8-2.2L16 20l2.2-.8L19 17Z"/>',
'alert-circle':'<circle cx="12" cy="12" r="10"/><path d="M12 8v5m0 3h.01"/>','list-filter':'<path d="M4 6h16M7 12h10M10 18h4"/>','refresh-cw':'<path d="M20 7v5h-5M4 17v-5h5M5 9a8 8 0 0 1 14-2l1 5M4 12a8 8 0 0 0 15 3"/>'};
function I(name,cls=''){return `<svg class="icon ${cls}" viewBox="0 0 24 24" aria-hidden="true">${icons[name]||icons.folder}</svg>`}
function esc(v=''){return String(v).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]))}
function isSafe(url){try{let u=new URL(url);return ['https:','http:'].includes(u.protocol)}catch(e){return false}}
function safeHref(url){return isSafe(url)?esc(url):'#'}
function load(){
 const defaults={savedIds:[],lessons:[],tasks:[],notes:{},custom:[],recent:[],dark:false,cardView:'covers',coverOverrides:{}};
 try{
  const d=JSON.parse(localStorage.getItem(STORAGE)||'{}');
  return {
   savedIds:Array.isArray(d.savedIds)?d.savedIds:[],
   lessons:Array.isArray(d.lessons)?d.lessons:[],
   tasks:Array.isArray(d.tasks)?d.tasks:[],
   notes:d.notes&&typeof d.notes==='object'?d.notes:{},
   custom:Array.isArray(d.custom)?d.custom:[],
   recent:Array.isArray(d.recent)?d.recent:[],
   dark:!!d.dark,
   cardView:d.cardView==='compact'?'compact':'covers',
   coverOverrides:d.coverOverrides&&typeof d.coverOverrides==='object'&&!Array.isArray(d.coverOverrides)?d.coverOverrides:{}
  };
 }catch(e){return defaults}
}
let state=load();const ui={view:document.documentElement.dataset.startView||'home',level:'All',category:'All',query:'',editingId:null,draftResource:null};
const all=()=>[...CATALOGUE,...state.custom];const byId=id=>all().find(x=>x.id===id);
const saved=id=>state.savedIds.includes(id);
function persist(){try{localStorage.setItem(STORAGE,JSON.stringify(state));return true}catch(e){toast('Unable to save in this browser. Try a smaller image or export your covers.');return false}}
function toast(msg){const x=document.getElementById('toast');x.textContent=msg;x.classList.add('show');clearTimeout(window.__swiftToast);window.__swiftToast=setTimeout(()=>x.classList.remove('show'),2700)}
function hydrateIcons(el=document){el.querySelectorAll('[data-icon]').forEach(x=>x.innerHTML=I(x.dataset.icon))}
function setView(view,opts={}){if(!['home','library','answers','planner','saved'].includes(view))view='home';const previous=ui.view;ui.view=view;if(view==='library'&&previous==='answers'&&!opts.level&&!opts.category){ui.category='All';ui.query=''}if(opts.level){ui.level=opts.level;ui.category='All';ui.query=''}if(opts.category){ui.category=opts.category;ui.level='All';ui.query=''}render();closeMenu();window.scrollTo({top:0,behavior:'instant'});try{history.replaceState(null,'','#'+view)}catch(e){}}
function closeMenu(){document.getElementById('sidebar').classList.remove('open');document.getElementById('overlay').hidden=true}
function header(eyebrow,title,desc,actions=''){return `<div class="page-heading"><div><p class="eyebrow">${eyebrow}</p><h1>${title}</h1><p>${desc}</p></div>${actions?`<div class="heading-actions">${actions}</div>`:''}</div>`}
function categoryIcon(r){if(r.category==='Audio & listening')return 'headphones';if(r.category==='Answer keys & scripts')return r.kind==='Answer key'?'key-round':'file-text';if(r.category==='Books & trainers')return 'book-open';if(r.category==='Exam & skills')return 'file-check';return r.format==='file'?'file-text':'folder'}
function tone(r){if(r.category==='Audio & listening')return 'tone-sky';if(r.category==='Answer keys & scripts')return 'tone-sand';if(r.category==='Books & trainers')return 'tone-sea';if(r.category==='Exam & skills')return 'tone-purple';return 'tone-sky'}
function kindSummary(r){if(r.itemCount===0)return 'Empty folder at the last check.';return r.note||'Resource available in the connected Google Drive.'}
const BOOK_COVER_SOURCES={
  "B1 PET Complete (revised exam)": [
    "https://i.ebayimg.com/images/g/ExMAAOSw4JpnrTth/s-l1200.jpg",
    "https://covers.openlibrary.org/b/isbn/9781108525213-M.jpg?default=false",
    "https://pictures.abebooks.com/isbn/9781108525213-us.jpg",
    "https://books.google.com/books/content?vid=ISBN9781108525213&printsec=frontcover&img=1&zoom=1&source=gbs_api"
  ],
  "B1 PET Compact (revised exam)": [
    "https://cdn1.fahasa.com/media/catalog/product/i/m/image_195509_1_30248.jpg",
    "https://covers.openlibrary.org/b/isbn/9781108616195-M.jpg?default=false",
    "https://pictures.abebooks.com/isbn/9781108616195-us.jpg",
    "https://books.google.com/books/content?vid=ISBN9781108616195&printsec=frontcover&img=1&zoom=1&source=gbs_api"
  ],
  "PET for Schools Complete Student Book": [
    "https://website-assets.studocu.com/img/document_thumbnails/820d5b979ab967545a95e7ef22566ec9/thumb_1200_1553.png",
    "https://static.imosver.com/imagenes_small/9781108/978110853905.jpg",
    "https://pictures.abebooks.com/isbn/9781108539050-us.jpg",
    "https://covers.openlibrary.org/b/isbn/9781108539050-M.jpg?default=false",
    "https://books.google.com/books/content?vid=ISBN9781108539050&printsec=frontcover&img=1&zoom=1&source=gbs_api"
  ],
  "B2 FCE Complete (2nd edition)": [
    "https://pictures.abebooks.com/isbn/9781107633902-us.jpg",
    "https://covers.openlibrary.org/b/isbn/9781107633902-M.jpg?default=false",
    "https://books.google.com/books/content?vid=ISBN9781107633902&printsec=frontcover&img=1&zoom=1&source=gbs_api"
  ],
  "C1 CAE Complete (3rd edition)": [
    "https://images.thalia.media/-/BF2000-2000/f2dff1a1900f491898d11d2a03d2c861/complete-advanced-third-edition-student-s-book-with-answers-with-digital-pack-klett-sprachen-gmbh.jpeg",
    "https://covers.openlibrary.org/b/isbn/9783125352537-M.jpg?default=false",
    "https://books.google.com/books/content?vid=ISBN9783125352537&printsec=frontcover&img=1&zoom=1&source=gbs_api"
  ],
  "C1 CAE Compact (2015 spec)": [
    "https://armazemdolivro.cdn.magazord.com.br/img/2025/02/produto/1530/compact-advanced-student-s-book-without-answer-c1-english-profile.png",
    "https://pictures.abebooks.com/isbn/9781107418080-us.jpg",
    "https://covers.openlibrary.org/b/isbn/9781107418080-M.jpg?default=false",
    "https://books.google.com/books/content?vid=ISBN9781107418080&printsec=frontcover&img=1&zoom=1&source=gbs_api"
  ]
};
function safeCoverUrl(url){
 if(typeof url!=='string')return false;
 if(/^https:\/\//i.test(url)&&url.length<2500){try{return new URL(url).protocol==='https:'}catch(e){return false}}
 return url.length<650000&&/^data:image\/(?:jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/i.test(url);
}
function safeCoverSrc(url){return safeCoverUrl(url)?esc(url):'#'}
function coverSources(r){
 const override=state.coverOverrides?.[r.id];
 if(safeCoverUrl(override))return [override];
 if(r.coverManual&&safeCoverUrl(r.coverImage))return [r.coverImage];
 if(r.category!=='Books & trainers')return [];
 const known=BOOK_COVER_SOURCES[r.title]||[];
 return [...new Set([...known,r.coverImage].filter(safeCoverUrl))];
}
function tryNextCover(img){
 if(!img||!img.matches?.('.book-cover-image'))return;
 let others=[];try{others=JSON.parse(img.dataset.remainingCovers||'[]')}catch(e){}
 if(others.length){
  img.dataset.remainingCovers=JSON.stringify(others.slice(1));
  img.src=safeCoverUrl(others[0])?others[0]:"#";
 }else{img.closest('.resource-media')?.classList.add('cover-failed');}
}
function coverMarkup(r){
 const sources=coverSources(r);
 const hasCover=sources.length>0;
 const image=hasCover?`<img class="book-cover-image" src="${safeCoverSrc(sources[0])}" data-remaining-covers="${esc(JSON.stringify(sources.slice(1)))}" alt="Book cover: ${esc(r.title)}" loading="lazy" decoding="async">`:'';
 const type=r.category==='Audio & listening'?'Audio':r.category==='Answer keys & scripts'?'Teacher key':r.category==='Books & trainers'?'Book cover':r.category==='Exam & skills'?'Exam materials':'Folder';
 return `<div class="resource-media ${tone(r)} ${hasCover?'has-cover':''}">${image}<div class="resource-media-fallback"><span class="resource-media-icon">${I(categoryIcon(r))}</span><span class="resource-media-level">${esc(r.level)}</span></div><span class="resource-media-tag">${esc(type)}</span><button type="button" class="resource-cover-action" data-cover="${esc(r.id)}" aria-label="Set cover for ${esc(r.title)}">${I('edit-3','icon-sm')} Cover</button></div>`;
}
function card(r,featured=false){const c=esc(r.id);return `<article class="resource-card ${featured?'feature-card':''}">${coverMarkup(r)}<div class="card-upper"><div class="resource-icon ${tone(r)}">${I(categoryIcon(r))}</div><button class="bookmark-toggle ${saved(r.id)?'active':''}" data-bookmark="${c}" title="${saved(r.id)?'Remove bookmark':'Save bookmark'}" aria-label="Bookmark ${esc(r.title)}">${I('bookmark')}</button></div><p class="mini-eyebrow">${esc(r.category)} · ${esc(r.level)}</p><h3>${esc(r.title)}</h3><p class="card-desc">${esc(kindSummary(r))}</p><div class="card-labels"><span class="chip chip-level">${esc(r.level)}</span><span class="chip">${esc(r.kind)}</span>${r.itemCount!==undefined&&r.itemCount!==null?`<span class="chip">${r.itemCount} ${r.itemCount===1?'item':'items'}</span>`:''}${r.format==='file'?`<span class="chip chip-auth">Direct file</span>`:''}</div><div class="card-footer"><button class="btn btn-quiet btn-small" data-detail="${c}">${I('files')} Details</button><a class="btn btn-outline btn-small" data-track="${c}" href="${safeHref(r.url)}" target="_blank" rel="noopener noreferrer">Open Drive ${I('arrow-up-right')}</a></div></article>`}
function counts(){return {folders:CATALOGUE.filter(x=>x.format==='folder').length,files:CATALOGUE.filter(x=>x.format==='file').length,saved:state.savedIds.length,plans:state.lessons.length}}

function home(){
 const featuredBooks=CATALOGUE.filter(r=>r.category==='Books & trainers'&&coverSources(r).length);
 const byLevel=['B1','B2','C1','C2'].map(level=>featuredBooks.find(r=>r.level===level)).filter(Boolean);
 const spotlight=[...byLevel,...featuredBooks.filter(r=>!byLevel.includes(r))].slice(0,4);
 const upcoming=state.lessons.filter(x=>x.date&&x.date>=new Date().toISOString().slice(0,10)).sort((a,b)=>a.date.localeCompare(b.date)).slice(0,3);
 const levelLinks=[['B1','Preliminary'],['B2','First'],['C1','Advanced'],['C2','Proficiency'],['IELTS','IELTS'],['PAU','Aragón']];
 return `<div class="editorial-home">
   <section class="editorial-masthead" aria-labelledby="libraryMasthead">
     <div class="masthead-meta"><span>SWIFT ENGLISH SCHOOL</span><span>STAFF LIBRARY · 2026</span></div>
     <div class="masthead-content"><div class="masthead-main">
       <p class="editorial-kicker">THE TEACHING COLLECTION</p>
       <h1 id="libraryMasthead">Resources for the classroom.</h1>
       <p class="masthead-description">Coursebooks, exam materials, audio and teacher resources, organised for everyday use.</p>
       <div class="masthead-actions"><button class="btn btn-primary" data-view="library">Browse the library ${I('arrow-right')}</button><button class="btn btn-outline" data-view="planner">Open lesson planner</button></div>
     </div><div class="masthead-aside" aria-label="Library index"><span class="masthead-aside-label">THE COLLECTION</span><strong>${CATALOGUE.length}</strong><span>linked resources<br>across Cambridge, IELTS and PAU</span></div></div>
   </section>
   <section class="editorial-levels" aria-labelledby="levelHeading">
     <div class="editorial-section-heading compact"><div><p class="editorial-index">01 / BROWSE</p><h2 id="levelHeading">By examination level</h2></div></div>
     <div class="level-directory">
     ${levelLinks.map(([level,label],i)=>`<button class="directory-level" data-level-shortcut="${level}"><span class="directory-number">${String(i+1).padStart(2,'0')}</span><strong>${level}</strong><span class="directory-label">${label}</span>${I('arrow-up-right','icon-sm')}</button>`).join('')}
     </div>
   </section>
   <section class="editorial-shelf" aria-labelledby="shelfHeading">
     <div class="editorial-section-heading"><div><p class="editorial-index">02 / SELECTED MATERIALS</p><h2 id="shelfHeading">From the shelves</h2><p>Start with a course collection or explore the complete resource index.</p></div><button class="text-link" data-category-shortcut="Books & trainers">All coursebooks ${I('arrow-right')}</button></div>
     <div class="cards-grid home-shelf">${spotlight.map(r=>card(r,true)).join('')}</div>
   </section>
   <section class="editorial-tools" aria-labelledby="toolsHeading">
     <div class="editorial-section-heading"><div><p class="editorial-index">03 / DAILY WORK</p><h2 id="toolsHeading">What do you need?</h2></div></div>
     <div class="editorial-tool-grid">
       <button class="editorial-tool" data-category-shortcut="Audio & listening"><span class="tool-index">01</span><span class="tool-copy"><strong>Listening & audio</strong><small>Tracks, scripts and practice tests</small></span>${I('arrow-up-right','icon-sm')}</button>
       <button class="editorial-tool" data-view="answers"><span class="tool-index">02</span><span class="tool-copy"><strong>Answer keys</strong><small>Keys, marking materials and teacher packs</small></span>${I('arrow-up-right','icon-sm')}</button>
       <button class="editorial-tool" data-view="planner"><span class="tool-index">03</span><span class="tool-copy"><strong>Lesson planning</strong><small>Prepare and print a lesson outline</small></span>${I('arrow-up-right','icon-sm')}</button>
       <button class="editorial-tool" data-view="saved"><span class="tool-index">04</span><span class="tool-copy"><strong>Saved resources</strong><small>Your frequently used materials</small></span>${I('arrow-up-right','icon-sm')}</button>
     </div>
   </section>
   ${upcoming.length?`<section class="editorial-schedule"><div class="editorial-section-heading"><div><p class="editorial-index">04 / PLANNER</p><h2>Upcoming lessons</h2></div><button class="text-link" data-view="planner">View planner ${I('arrow-right')}</button></div><div class="list-panel">${upcoming.map(x=>lessonListRow(x)).join('')}</div></section>`:''}
   <div class="editorial-footnote"><span>ABOUT THESE MATERIALS</span><p>This library lists only Drive links verified as owned by the school’s teachers account. Other teaching materials will return after ownership checks and migration.</p></div>
 </div>`;
}

const cats=['All','Books & trainers','Audio & listening','Answer keys & scripts','Exam & skills','Course folders'];
function libraryShell(which='library'){const isAns=which==='answers';if(isAns){ui.category='Answer keys & scripts'}const title=isAns?'Answer keys & scripts':'Resource library';const sub=isAns?'Answer keys, scripts and teaching notes linked from Google Drive.':'Browse coursebooks, exam papers, audio and classroom materials.';const banner=isAns?`<div class="notice">${I('alert-circle')}<div><strong>Teacher material — handle with care</strong>Labels in this app do not restrict access. Only Google Drive sharing permissions protect answer keys and teacher packs. Verify the original file permissions before sharing any link.</div></div>`:'';return `${header('Teaching materials',title,sub,`<button class="btn btn-outline" data-manage-covers>${I('book-open')} Manage covers</button><button class="btn btn-outline" data-add-link>${I('plus')} Add your own link</button><button class="btn btn-primary" data-view="planner">${I('calendar-days')} Plan a lesson</button>`)}${banner}<div class="toolbar"><div class="toolbar-main"><label class="search-field">${I('search')}<input id="librarySearch" type="search" placeholder="Search books, audio, exam papers, answer keys..." value="${esc(ui.query)}" aria-label="Search resources" /></label><select id="levelFilter" class="filter-select" aria-label="Filter by level">${['All','A2','B1','B2','C1','C2','IELTS','PAU','EOI','General'].map(x=>`<option value="${x}" ${ui.level===x?'selected':''}>${x==='All'?'All levels':x}</option>`).join('')}</select><button class="btn btn-outline" data-toggle-card-view aria-pressed="${state.cardView==='compact'}">${I('library')} ${state.cardView==='compact'?'Cover view':'Compact view'}</button><button class="btn btn-outline" data-reset-filters>${I('refresh-cw')} Reset</button></div>${isAns?'':`<div class="filters-row" id="categoryTabs">${cats.map(x=>`<button class="filter-tab ${ui.category===x?'active':''}" data-category="${esc(x)}">${esc(x)}</button>`).join('')}</div>`}</div><div class="results-meta"><span id="libraryResultText"></span><span>${isAns?'Keys, scripts and teacher packs':'Linked Google Drive resources'}</span></div><div class="cards-grid" id="resourceGrid"></div><div class="teacher-note page-tail">${I('alert-circle')}<span>Only verified school-owned links appear here. A folder may contain separately owned files; check individual file ownership before sharing.</span></div>`}
function filtered(){return all().filter(r=>{if(ui.view==='answers'&&r.category!=='Answer keys & scripts')return false;if(ui.view!=='answers'&&ui.view!=='saved'&&ui.category!=='All'&&r.category!==ui.category)return false;if(ui.view==='saved'&&!saved(r.id))return false;if(ui.level!=='All'&&r.level!==ui.level)return false;const q=ui.query.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');const hay=[r.title,r.note,r.kind,r.category,r.level,...(r.children||[]).map(x=>x.title)].join(' ').toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');return !q||hay.includes(q)}).sort((a,b)=>{let score=x=>(x.featured?100:0)+(x.category==='Books & trainers'?12:0)+(x.format==='file'?2:0);return score(b)-score(a)||a.title.localeCompare(b.title)})}
function updateResults(){let g=document.getElementById('resourceGrid');if(!g)return;let items=filtered();let w=document.getElementById('libraryResultText');if(w)w.innerHTML=`Showing <b>${items.length}</b> of <b>${all().length}</b> resources`;g.classList.toggle('compact-layout',state.cardView==='compact');g.innerHTML=items.length?items.map(x=>card(x)).join(''):`<div class="empty-state">${I('search')}<h3>No matching resources</h3><p>Try a different level or resource type, or return to the full library.</p><button class="btn btn-outline" data-reset-filters>Clear filters</button></div>`}
function answers(){return libraryShell('answers')}
function savedView(){return `${header('Your shortcuts','Saved resources','Keep the folders and files you use most often one click away.',`<button class="btn btn-outline" data-view="library">${I('plus')} Find materials</button>`)}<div class="saved-helper">${I('bookmark')}<span>Bookmarks are saved in this browser. Export your local data to transfer them to another device.</span></div><div class="toolbar"><div class="toolbar-main"><label class="search-field">${I('search')}<input id="librarySearch" type="search" placeholder="Search your saved materials" value="${esc(ui.query)}" /></label><select id="levelFilter" class="filter-select">${['All','A2','B1','B2','C1','C2','IELTS','PAU','EOI','General'].map(x=>`<option value="${x}" ${ui.level===x?'selected':''}>${x==='All'?'All levels':x}</option>`).join('')}</select><button class="btn btn-outline" data-reset-filters>${I('refresh-cw')} Reset</button></div></div><div class="results-meta"><span id="libraryResultText"></span><span>Saved in your browser</span></div><div class="cards-grid" id="resourceGrid"></div>`}
function lessonListRow(x){return `<div class="list-item"><div class="list-icon">${I('calendar-days')}</div><div class="list-info"><strong>${esc(x.title)}</strong><small>${esc(x.level||'General')} ${x.group?'· '+esc(x.group):''} · ${esc(x.date||'No date')} · ${esc(x.duration||60)} min</small></div><div class="list-right"><button class="btn btn-small btn-outline" data-open-lesson="${esc(x.id)}">View</button><button class="btn btn-small btn-quiet" data-edit-lesson="${esc(x.id)}">Edit</button></div></div>`}
function planner(){const draft=ui.draftResource?byId(ui.draftResource):null;return `${header('Teaching toolkit','Lesson planner','Create a lesson outline, attach materials and print a ready-to-use plan.',`<button class="btn btn-outline" id="importButton">${I('upload')} Import backup</button><button class="btn btn-primary" id="exportButton">${I('download')} Export backup</button>`)}${draft?`<div class="notice notice-secure">${I('link')}<div><strong>Resource attached to your draft</strong>${esc(draft.title)} — the Drive link is prefilled in the materials field.</div></div>`:''}<div class="planner-layout"><section class="panel"><div class="panel-title"><div class="panel-title-icon">${I('notebook-pen')}</div><div><strong id="formHeading">${ui.editingId?'Edit lesson plan':'Create a lesson plan'}</strong><small>A clear, flexible structure for any exam level</small></div></div><form id="lessonForm"><div class="form-grid"><div class="form-field full"><label for="lessonTitle">Lesson topic / title *</label><input class="form-input" id="lessonTitle" name="title" required maxlength="180" placeholder="e.g. C1 Advanced – Listening Part 3" /></div><div class="form-field"><label for="lessonLevel">Exam level *</label><select class="form-input" id="lessonLevel" name="level" required><option value="">Select a level</option>${['A2','B1','B2','C1','C2','IELTS','PAU','EOI','General'].map(x=>`<option>${x}</option>`).join('')}</select></div><div class="form-field"><label for="lessonGroup">Class / group <span>(optional)</span></label><input class="form-input" id="lessonGroup" name="group" placeholder="e.g. Saturday C1 group" /></div><div class="form-field"><label for="lessonDate">Date</label><input class="form-input" type="date" id="lessonDate" name="date" /></div><div class="form-field"><label for="lessonDuration">Duration (minutes)</label><input class="form-input" id="lessonDuration" name="duration" type="number" min="5" max="360" value="60" /></div><div class="form-divider"></div><div class="form-field full"><label for="lessonObjectives">Learning objectives</label><textarea class="form-textarea" name="objectives" id="lessonObjectives" placeholder="By the end of the lesson, learners will be able to..."></textarea></div><div class="form-field full"><label for="lessonLead">Lead-in / warmer</label><textarea class="form-textarea" name="lead" id="lessonLead" placeholder="How will you introduce the topic?"></textarea></div><div class="form-field full"><label for="lessonActivities">Main activities / stages</label><textarea class="form-textarea" id="lessonActivities" name="activities" rows="5" placeholder="1. Model the task and identify strategies...&#10;2. Guided practice...&#10;3. Independent exam task..."></textarea></div><div class="form-field full"><label for="lessonMaterials">Materials & links</label><textarea class="form-textarea" id="lessonMaterials" name="materials" placeholder="Paste the Google Drive link and any additional handouts..."></textarea></div><div class="form-field full"><label for="lessonHomework">Homework / follow-up</label><textarea class="form-textarea" id="lessonHomework" name="homework" placeholder="Assign exam questions and feedback tasks..."></textarea></div><div class="form-field full"><label for="lessonNotes">Teacher notes</label><textarea class="form-textarea" id="lessonNotes" name="notes" placeholder="Differentiation, assessment focus, timing notes..."></textarea></div></div><div class="form-actions"><button class="btn btn-outline" type="button" data-clear-lesson>Clear form</button><button class="btn btn-primary" type="submit">${I('check-circle')} <span id="saveLessonLabel">${ui.editingId?'Update lesson':'Save lesson plan'}</span></button></div></form></section><aside class="panel planner-side"><div class="side-panel-block"><div class="side-panel-heading"><strong>Saved lesson plans</strong><small id="savedLessonsCount">${state.lessons.length} plans</small></div><div id="lessonsList">${state.lessons.length?state.lessons.slice().sort((a,b)=>(b.date||'').localeCompare(a.date||'')).map(x=>`<div class="lesson-card"><div class="lesson-card-top"><strong>${esc(x.title)}</strong><button class="icon-minimal" data-delete-lesson="${esc(x.id)}" title="Delete lesson">${I('trash-2')}</button></div><small>${esc(x.level||'General')} · ${esc(x.date||'No date')} · ${esc(x.duration||60)} min</small><div class="lesson-card-bottom"><button class="btn btn-small btn-quiet" data-open-lesson="${esc(x.id)}">View / print</button><button class="btn btn-small btn-outline" data-edit-lesson="${esc(x.id)}">Edit</button></div></div>`).join(''):`<p class="empty-small">You haven't saved a lesson yet. Create one using the form and it will appear here.</p>`}</div></div><div class="side-panel-block"><div class="side-panel-heading"><strong>Preparation checklist</strong><small>${state.tasks.filter(x=>x.done).length}/${state.tasks.length} done</small></div><form id="taskForm" class="task-input-line"><input class="form-input" name="task" required maxlength="180" placeholder="e.g. Print speaking cards" /><button class="btn btn-primary" aria-label="Add task">${I('plus')}</button></form><div style="margin-top:12px" id="taskList">${state.tasks.length?state.tasks.map(x=>`<div class="task-item ${x.done?'done':''}"><input type="checkbox" data-task-toggle="${esc(x.id)}" aria-label="Complete task" ${x.done?'checked':''} /><span>${esc(x.text)}</span><button class="icon-minimal" data-task-delete="${esc(x.id)}">${I('x')}</button></div>`).join(''):`<p class="empty-small">Keep track of handouts, links, audio checks and answer keys.</p>`}</div></div><div class="side-panel-block"><div class="side-panel-heading"><strong>Local data & backups</strong></div><p class="empty-small" style="padding-top:0">Plans, tasks, notes and bookmarks are saved only in this browser. Export a JSON backup regularly.</p><div class="data-actions"><button class="btn btn-small btn-outline" id="exportButtonSide">${I('download')} Export</button><button class="btn btn-small btn-outline" id="importButtonSide">${I('upload')} Import</button></div></div></aside></div>`}
function render(){document.body.classList.toggle('dark',state.dark);document.getElementById('themeToggle').innerHTML=I(state.dark?'sun':'moon');document.getElementById('navSavedCount').textContent=state.savedIds.length;document.getElementById('navResourceCount').textContent=CATALOGUE.filter(x=>x.format==='folder').length;const labels={home:'Home',library:'Resource library',answers:'Keys & scripts',planner:'Lesson planner',saved:'Saved resources'};document.getElementById('breadcrumbCurrent').textContent=labels[ui.view];document.querySelectorAll('.nav-link').forEach(x=>x.classList.toggle('active',x.dataset.view===ui.view));let views={home,library:()=>libraryShell('library'),answers,planner,saved:savedView};document.getElementById('app').innerHTML=views[ui.view]();if(['library','answers','saved'].includes(ui.view))updateResults();if(ui.view==='planner'&&(ui.editingId||ui.draftResource))populateLesson();hydrateIcons(document)}
function closeModal(){document.getElementById('modalMount').innerHTML='';document.body.style.overflow=''}
function showModal(content){document.getElementById('modalMount').innerHTML=`<div class="modal-backdrop" id="modalBackdrop"><div class="modal" role="dialog" aria-modal="true">${content}</div></div>`;document.body.style.overflow='hidden';document.getElementById('modalBackdrop').addEventListener('click',e=>{if(e.target.id==='modalBackdrop')closeModal()});hydrateIcons(document.getElementById('modalMount'))}

let pendingCover=null;
function manageCover(id){
 const resources=all().filter(r=>r.id&&r.title);
 const r=byId(id)||resources.find(x=>x.category==='Books & trainers')||resources[0];
 if(!r)return;
 pendingCover={id:r.id,url:state.coverOverrides?.[r.id]||''};
 const choices=resources.slice().sort((a,b)=>a.level.localeCompare(b.level)||a.title.localeCompare(b.title));
 const options=choices.map(x=>`<option value="${esc(x.id)}" ${x.id===r.id?'selected':''}>${esc(x.level)} · ${esc(x.title)}</option>`).join('');
 const query=encodeURIComponent(r.title+' Cambridge book front cover');
 const current=pendingCover.url||coverSources(r)[0]||'';
 const image=safeCoverUrl(current)?`<img id="coverPreviewImage" alt="Current cover preview" src="${safeCoverSrc(current)}">`:'<span>Select an image to preview it here</span>';
 const urlValue=pendingCover.url.startsWith('https://')?pendingCover.url:'';
 showModal(`<div class="modal-head"><div><p class="eyebrow">COVER MANAGER</p><h2>Find and assign a thumbnail</h2></div><button class="modal-close" data-close-modal aria-label="Close">${I('x')}</button></div>
 <div class="modal-body cover-manager">
  <div class="form-field"><label for="coverResource">Select a folder or resource</label><select id="coverResource" class="form-input">${options}</select></div>
  <p class="modal-desc" style="margin-top:14px">Search for the correct edition, then paste the image address, or upload a cover image from your device.</p>
  <a class="btn btn-outline" href="https://www.google.com/search?tbm=isch&amp;q=${query}" target="_blank" rel="noopener noreferrer">${I('search')} Find cover images online ${I('arrow-up-right')}</a>
  <div class="cover-manager-layout">
   <div>
    <div class="form-field"><label for="coverUrl">Paste the actual image address (HTTPS)</label><input id="coverUrl" class="form-input" type="url" value="${esc(urlValue)}" placeholder="https://example.com/cover.jpg"></div>
    <button class="btn btn-outline btn-small" data-cover-preview style="margin-top:9px">Preview image link</button>
    <div class="cover-upload">
     <label for="coverUpload">Or upload a picture</label>
     <input id="coverUpload" type="file" accept="image/jpeg,image/png,image/webp">
     <p>JPEG, PNG or WebP (max 10 MB). Images are automatically resized.</p>
    </div>
   </div>
   <div><div class="cover-preview-box" id="coverPreviewBox">${image}</div><p class="cover-preview-status" id="coverStatus">Current thumbnail</p></div>
  </div>
  <p class="cover-manager-note"><strong>Local first:</strong> the cover appears immediately in your browser. To share it with every teacher, export assignments, upload the exported file to your <strong>private</strong> GitHub source repository, rebuild the encrypted package and publish it to GitHub Pages.</p>
  <div class="cover-manager-transfer">
   <button class="btn btn-outline btn-small" data-export-covers>${I('download')} Export cover assignments</button>
   <button class="btn btn-outline btn-small" data-import-covers>${I('upload')} Import assignments</button>
   <input id="coverImport" type="file" accept=".json,application/json" hidden>
  </div>
 </div>
 <div class="modal-footer"><button class="btn btn-quiet" data-cover-reset>Reset to automatic</button><button class="btn btn-primary" data-cover-save>${I('check')} Save thumbnail</button></div>`);
}
function showCoverPreview(url){
 const box=document.getElementById('coverPreviewBox'),status=document.getElementById('coverStatus');
 if(!box)return;
 if(!safeCoverUrl(url)){box.textContent='Choose a valid HTTPS image link or upload a picture.';if(status)status.textContent='No valid preview';return}
 box.innerHTML=`<img id="coverPreviewImage" alt="Selected cover" src="${safeCoverSrc(url)}">`;
 if(status)status.textContent='Previewing the selected image';
}
function previewCoverLink(){
 if(!pendingCover)return;
 const url=document.getElementById('coverUrl')?.value?.trim()||'';
 if(!url.startsWith('https://')||!safeCoverUrl(url)){toast('Paste a full HTTPS image address, not a search-result URL.');return}
 pendingCover.url=url;
 showCoverPreview(url);
}
function saveSelectedCover(){
 if(!pendingCover||!byId(pendingCover.id))return;
 const typed=document.getElementById('coverUrl')?.value?.trim()||'';
 const url=typed&&safeCoverUrl(typed)?typed:pendingCover.url;
 if(!safeCoverUrl(url)){toast('Choose a cover link or upload an image first.');return}
 const id=pendingCover.id,previous=state.coverOverrides[id];
 state.coverOverrides[id]=url;
 if(!persist()){if(previous===undefined)delete state.coverOverrides[id];else state.coverOverrides[id]=previous;return}
 closeModal();render();toast('Thumbnail assigned in this browser. Export to share with all teachers.');
}
function resetSelectedCover(){
 if(!pendingCover)return;
 const id=pendingCover.id,previous=state.coverOverrides[id];
 delete state.coverOverrides[id];
 if(!persist()){if(previous!==undefined)state.coverOverrides[id]=previous;return}
 closeModal();render();toast('Reverted to the automatic cover.');
}
function uploadSelectedCover(file){
 if(!pendingCover||!file)return;
 if(!['image/jpeg','image/png','image/webp'].includes(file.type)||file.size>10*1024*1024){toast('Upload a JPG, PNG or WebP under 10 MB.');return}
 const id=pendingCover.id,objectURL=URL.createObjectURL(file),img=new Image();
 img.onload=()=>{
  URL.revokeObjectURL(objectURL);
  if(!pendingCover||pendingCover.id!==id)return;
  const scale=Math.min(1,360/img.naturalWidth,500/img.naturalHeight);
  const canvas=document.createElement('canvas');
  canvas.width=Math.max(1,Math.round(img.naturalWidth*scale));
  canvas.height=Math.max(1,Math.round(img.naturalHeight*scale));
  const ctx=canvas.getContext('2d');
  ctx.fillStyle='#fff';ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.drawImage(img,0,0,canvas.width,canvas.height);
  let result=canvas.toDataURL('image/jpeg',.78);
  if(result.length>500000)result=canvas.toDataURL('image/jpeg',.58);
  if(!safeCoverUrl(result)){toast('Image is still too large. Try a smaller picture.');return}
  pendingCover.url=result;
  const input=document.getElementById('coverUrl');if(input)input.value='';
  showCoverPreview(result);toast('Cover ready. Click Save thumbnail.');
 };
 img.onerror=()=>{URL.revokeObjectURL(objectURL);toast('Could not read that image.')};
 img.src=objectURL;
}
function exportCoverOverrides(){
 const covers=Object.fromEntries(Object.entries(state.coverOverrides||{}).filter(([id,url])=>byId(id)&&safeCoverUrl(url)));
 if(!Object.keys(covers).length){toast('Assign a thumbnail before exporting.');return}
 const blob=new Blob([JSON.stringify({version:1,covers},null,2)],{type:'application/json'});
 const url=URL.createObjectURL(blob),a=document.createElement('a');
 a.href=url;a.download='cover-overrides.json';document.body.appendChild(a);a.click();a.remove();
 setTimeout(()=>URL.revokeObjectURL(url),2000);
 toast('Cover assignments exported. Keep the file in your private repository.');
}
function importCoverOverrides(file){
 if(!file)return;
 if(file.size>8*1024*1024){toast('Cover file is too large.');return}
 const rd=new FileReader();
 rd.onload=()=>{
  try{
   const data=JSON.parse(rd.result);
   if(data.version!==1||!data.covers||typeof data.covers!=='object'||Array.isArray(data.covers))throw Error('Invalid cover file');
   const covers=Object.fromEntries(Object.entries(data.covers).filter(([id,url])=>byId(id)&&safeCoverUrl(url)));
   const count=Object.keys(covers).length;
   if(!count){toast('No matching cover assignments found.');return}
   const previous=state.coverOverrides;
   state.coverOverrides={...previous,...covers};
   if(!persist()){state.coverOverrides=previous;return}
   closeModal();render();toast(count+' cover assignments imported.');
  }catch(e){toast('Could not import this cover file.')}
 };
 rd.readAsText(file);
}

function resourceDetail(id){const r=byId(id);if(!r)return;const children=(r.children||[]);const note=state.notes[id]||'';let body=`<div class="modal-head"><div><p class="eyebrow">${esc(r.level)} · ${esc(r.category)}</p><h2>${esc(r.title)}</h2></div><button class="modal-close" data-close-modal aria-label="Close">${I('x')}</button></div><div class="modal-body"><p class="modal-desc">${esc(r.note)}</p><div class="modal-meta"><span class="chip chip-level">${esc(r.level)}</span><span class="chip">${esc(r.kind)}</span><span class="chip chip-auth">${r.format==='folder'?'Verified folder':'Direct file link'}</span>${r.itemCount!==undefined&&r.itemCount!==null?`<span class="chip">${r.itemCount} listed items</span>`:''}</div>${children.length?`<h3 class="modal-subtitle">Inside this resource collection</h3><div class="child-list">${children.map(x=>`<div class="child-row">${I(x.kind==='Folder'?'folder':x.kind==='Answer key'?'key-round':x.kind==='Audio scripts'?'file-text':'file-check')}<span>${esc(x.title)}</span><a href="${safeHref(x.url)}" target="_blank" rel="noopener noreferrer">Open ${I('arrow-up-right','icon-sm')}</a></div>`).join('')}</div>`:r.format==='folder'?`<div class="modal-resource-note">${r.itemCount===0?'This folder was empty when checked.':r.itemCount===null?'Use Open Drive to inspect the current folder contents.':'This folder has '+r.itemCount+' listed items. Open Drive to browse the files.'}</div>`:''}<div class="note-field"><label for="resourceNote">Your teaching note <span class="muted-help">(stored only in this browser)</span></label><textarea id="resourceNote" class="form-textarea" placeholder="e.g. Use track 12 after task 2; remember to check the answers...">${esc(note)}</textarea></div></div><div class="modal-footer"><button class="btn btn-outline" data-cover="${esc(r.id)}">${I('edit-3')} Set cover</button><button class="btn btn-outline" data-copy-url="${esc(r.id)}">${I('copy')} Copy link</button><button class="btn btn-outline" data-save-note="${esc(r.id)}">${I('check')} Save note</button><button class="btn btn-quiet" data-attach-resource="${esc(r.id)}">${I('calendar-days')} Add to lesson</button><a class="btn btn-primary" href="${safeHref(r.url)}" target="_blank" rel="noopener noreferrer" data-track="${esc(r.id)}">Open Drive ${I('external-link')}</a></div>`;showModal(body)}
function addResource(){showModal(`<div class="modal-head"><div><p class="eyebrow">PERSONAL WORKSPACE</p><h2>Add a teaching resource</h2></div><button class="modal-close" data-close-modal>${I('x')}</button></div><form id="customForm"><div class="modal-body"><p class="modal-desc">Add a Drive folder, a trusted website or a resource your school already has access to. This is saved only in your browser.</p><div class="form-grid"><div class="form-field full"><label>Resource name *</label><input name="title" class="form-input" required maxlength="200" placeholder="e.g. IELTS Writing Task 2 prompts" /></div><div class="form-field full"><label>Web link *</label><input name="url" class="form-input" required type="url" placeholder="https://drive.google.com/..." /></div><div class="form-field"><label>Level *</label><select class="form-input" name="level">${['General','A2','B1','B2','C1','C2','IELTS','PAU','EOI'].map(x=>`<option>${x}</option>`).join('')}</select></div><div class="form-field"><label>Type *</label><select class="form-input" name="category">${cats.filter(x=>x!=='All').map(x=>`<option>${x}</option>`).join('')}</select></div><div class="form-field full"><label>Notes</label><textarea class="form-textarea" name="note" placeholder="What is included and when you would use it..."></textarea></div></div></div><div class="modal-footer"><button class="btn btn-outline" type="button" data-close-modal>Cancel</button><button class="btn btn-primary" type="submit">${I('plus')} Save resource</button></div></form>`)}
function populateLesson(){const f=document.getElementById('lessonForm');if(!f)return;if(ui.editingId){let x=state.lessons.find(z=>z.id===ui.editingId);if(x){['title','level','group','date','duration','objectives','lead','activities','materials','homework','notes'].forEach(k=>{if(f.elements[k])f.elements[k].value=x[k]||''})}}else if(ui.draftResource){let r=byId(ui.draftResource);if(r){f.elements.materials.value=`${r.title}\n${r.url}`;if(['A2','B1','B2','C1','C2','IELTS','PAU','EOI'].includes(r.level))f.elements.level.value=r.level;f.elements.title.value=`${r.level} — ${r.title}`}}}
function clearLesson(){ui.editingId=null;ui.draftResource=null;setView('planner')}
function saveLesson(form){let d=new FormData(form);const title=String(d.get('title')||'').trim(),level=String(d.get('level')||'').trim();if(!title||!level){toast('Add a lesson title and level.');return}let x={id:ui.editingId||'lesson-'+Date.now(),updated:new Date().toISOString()};['title','level','group','date','duration','objectives','lead','activities','materials','homework','notes'].forEach(k=>x[k]=String(d.get(k)||'').trim());const i=state.lessons.findIndex(z=>z.id===x.id);if(i>=0)state.lessons[i]=x;else state.lessons.unshift(x);persist();ui.editingId=null;ui.draftResource=null;render();toast('Lesson plan saved in this browser.')}
function viewLesson(id){const x=state.lessons.find(z=>z.id===id);if(!x)return;const sec=[['Learning objectives','objectives'],['Lead-in / warmer','lead'],['Main activities / stages','activities'],['Materials & links','materials'],['Homework / follow-up','homework'],['Teacher notes','notes']];showModal(`<div class="modal-head"><div><p class="eyebrow">LESSON PLAN · ${esc(x.level)}</p><h2>${esc(x.title)}</h2></div><button class="modal-close" data-close-modal>${I('x')}</button></div><div class="modal-body plan-preview"><img class="print-logo" src="${SCHOOL_LOGO_URL}" alt="Swift English School logo"><div class="plan-title">${esc(x.title)}</div><p class="plan-meta">${esc(x.level)} ${x.group?' · '+esc(x.group):''} · ${esc(x.date||'Date not set')} · ${esc(x.duration)} minutes</p>${sec.map(([l,k])=>`<section><h4>${l}</h4><p>${esc(x[k]||'—').replace(/\n/g,'<br>')}</p></section>`).join('')}</div><div class="modal-footer"><button class="btn btn-outline" data-edit-lesson="${esc(x.id)}">${I('edit-3')} Edit</button><button class="btn btn-primary" id="printLesson">${I('print')} Print / PDF</button></div>`)}
function track(id){state.recent=[id,...state.recent.filter(x=>x!==id)].slice(0,25);persist()}
function exportData(){const backup={app:'swift-teacher-workspace',version:3,exported:new Date().toISOString(),...state};const blob=new Blob([JSON.stringify(backup,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='swift-english-teacher-backup-'+new Date().toISOString().slice(0,10)+'.json';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),2000);toast('Backup downloaded. Keep it in a safe place.')}
function importData(file){if(!file)return;const rd=new FileReader();rd.onload=()=>{try{let d=JSON.parse(rd.result);if(d.app!=='swift-teacher-workspace'||!Array.isArray(d.lessons)||!Array.isArray(d.savedIds)){toast('This is not a Swift English teacher backup.');return}if(!confirm('Importing will replace the bookmarks, plans and tasks saved in this browser. Continue?'))return;state={savedIds:d.savedIds||[],lessons:d.lessons||[],tasks:d.tasks||[],notes:d.notes||{},custom:(d.custom||[]).filter(x=>isSafe(x.url)),recent:d.recent||[],dark:!!d.dark,cardView:d.cardView==='compact'?'compact':'covers',coverOverrides:d.coverOverrides&&typeof d.coverOverrides==='object'&&!Array.isArray(d.coverOverrides)?Object.fromEntries(Object.entries(d.coverOverrides).filter(([id,url])=>byId(id)&&safeCoverUrl(url))):{}};persist();render();toast('Backup imported successfully.')}catch(e){toast('Could not read that JSON backup.')}};rd.readAsText(file)}
function copyLink(id){const r=byId(id);if(!r)return;const done=()=>toast('Google Drive link copied.');if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(r.url).then(done).catch(()=>fallback())}else fallback();function fallback(){const t=document.createElement('textarea');t.value=r.url;document.body.appendChild(t);t.select();try{document.execCommand('copy');done()}catch(e){toast('Copy this link from the Open Drive button.')}t.remove()}}
function toggleSave(id){state.savedIds=saved(id)?state.savedIds.filter(x=>x!==id):[...state.savedIds,id];persist();let current=document.activeElement?.dataset?.bookmark;render();if(ui.view==='saved'&&!saved(id))toast('Removed from saved resources.');else toast(saved(id)?'Added to saved resources.':'Removed from saved resources.');}
function handleClick(e){const el=e.target.closest('button,a');if(!el)return;let d=el.dataset;
if(d.view){e.preventDefault();setView(d.view);return}
if(d.levelShortcut){e.preventDefault();setView('library',{level:d.levelShortcut});return}
if(d.categoryShortcut){e.preventDefault();setView('library',{category:d.categoryShortcut});return}
if(d.toggleCardView!==undefined){state.cardView=state.cardView==='compact'?'covers':'compact';persist();render();return}
if(d.cover){manageCover(d.cover);return}
if(d.manageCovers!==undefined){manageCover();return}
if(d.coverPreview!==undefined){previewCoverLink();return}
if(d.coverSave!==undefined){saveSelectedCover();return}
if(d.coverReset!==undefined){resetSelectedCover();return}
if(d.exportCovers!==undefined){exportCoverOverrides();return}
if(d.importCovers!==undefined){document.getElementById('coverImport')?.click();return}
if(d.bookmark){toggleSave(d.bookmark);return}
if(d.detail){resourceDetail(d.detail);return}
if(d.track){track(d.track);return}
if(d.addLink!==undefined){addResource();return}
if(d.resetFilters!==undefined){ui.query='';ui.level='All';ui.category=ui.view==='answers'?'Answer keys & scripts':'All';render();return}
if(d.category){ui.category=d.category;render();return}
if(d.closeModal!==undefined){closeModal();return}
if(d.copyUrl){copyLink(d.copyUrl);return}
if(d.saveNote){const txt=document.getElementById('resourceNote');state.notes[d.saveNote]=txt?txt.value:'';persist();toast('Teaching note saved.');return}
if(d.attachResource){ui.editingId=null;ui.draftResource=d.attachResource;closeModal();setView('planner');return}
if(d.clearLesson!==undefined){clearLesson();return}
if(d.openLesson){viewLesson(d.openLesson);return}
if(d.editLesson){ui.editingId=d.editLesson;ui.draftResource=null;closeModal();setView('planner');return}
if(d.deleteLesson){if(!confirm('Delete this saved lesson plan?'))return;state.lessons=state.lessons.filter(x=>x.id!==d.deleteLesson);if(ui.editingId===d.deleteLesson)ui.editingId=null;persist();render();toast('Lesson deleted.');return}
if(d.taskDelete){state.tasks=state.tasks.filter(x=>x.id!==d.taskDelete);persist();render();return}
if(el.id==='menuButton'){const sb=document.getElementById('sidebar');sb.classList.toggle('open');document.getElementById('overlay').hidden=!sb.classList.contains('open');return}
if(el.id==='themeToggle'){state.dark=!state.dark;persist();render();return}
if(['exportButton','exportButtonSide','backupButton'].includes(el.id)){exportData();return}
if(['importButton','importButtonSide'].includes(el.id)){document.getElementById('backupImport').click();return}
if(el.id==='printLesson'){window.print();return}
}
document.addEventListener('error',e=>{if(e.target.id==='coverPreviewImage'){const status=document.getElementById('coverStatus');if(status)status.textContent='This image could not be displayed. Try downloading it and uploading the picture instead.';return}if(e.target.matches?.('.book-cover-image'))tryNextCover(e.target)},true);
document.addEventListener('load',e=>{if(e.target.matches?.('.book-cover-image') && (e.target.naturalWidth<40||e.target.naturalHeight<50))tryNextCover(e.target)},true);
document.addEventListener('click',handleClick);
document.addEventListener('input',e=>{if(e.target.id==='librarySearch'){ui.query=e.target.value;updateResults()}});
document.addEventListener('change',e=>{if(e.target.id==='levelFilter'){ui.level=e.target.value;updateResults()}else if(e.target.id==='backupImport'){importData(e.target.files?.[0]);e.target.value=''}else if(e.target.id==='coverResource'){manageCover(e.target.value)}else if(e.target.id==='coverUpload'){uploadSelectedCover(e.target.files?.[0]);e.target.value=''}else if(e.target.id==='coverImport'){importCoverOverrides(e.target.files?.[0]);e.target.value=''}else if(e.target.dataset.taskToggle){const t=state.tasks.find(x=>x.id===e.target.dataset.taskToggle);if(t){t.done=e.target.checked;persist();render()}}});
document.addEventListener('submit',e=>{if(e.target.id==='lessonForm'){e.preventDefault();saveLesson(e.target)}else if(e.target.id==='taskForm'){e.preventDefault();let text=e.target.elements.task.value.trim();if(text){state.tasks.push({id:'task-'+Date.now(),text,done:false});persist();render();toast('Task added.')}}else if(e.target.id==='customForm'){e.preventDefault();const d=new FormData(e.target),url=String(d.get('url')||'').trim();if(!isSafe(url)){toast('Enter a valid HTTP or HTTPS link.');return}const category=String(d.get('category')||'Course folders');const item={id:'custom-'+Date.now(),title:String(d.get('title')||'New resource').trim().slice(0,200),url,category,kind:'Custom link',level:String(d.get('level')||'General'),note:String(d.get('note')||'Saved by a teacher.'),source:'Custom',format:'link',itemCount:null,children:[]};state.custom.unshift(item);persist();closeModal();setView('library');toast('Resource added to your browser library.')}});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});document.getElementById('overlay').addEventListener('click',closeMenu);
if(location.hash){const view=location.hash.slice(1);if(['home','library','answers','planner','saved'].includes(view))ui.view=view}
render(); // Offline cache retired: always load the current encrypted portal assets.
})();
