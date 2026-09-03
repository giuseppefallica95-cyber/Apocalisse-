(() => {
  const data = window.WORLD_DATA;
  let mode = 'DM';
  let currentView = 'home';
  let activeType = 'tutti';

  const root = document.getElementById('view-root');
  const title = document.getElementById('view-title');
  const search = document.getElementById('global-search');
  const searchResults = document.getElementById('search-results');
  const dialog = document.getElementById('entry-dialog');
  const dialogContent = document.getElementById('dialog-content');
  const modeToggle = document.getElementById('mode-toggle');

  document.getElementById('brand-title').textContent = data.meta.title.replace(' — World Wiki','');

  const canSee = entry => mode === 'DM' || entry.visibility !== 'DM';
  const visibleEntries = () => data.entries.filter(canSee);
  const badgeClass = status => status.toLowerCase();

  function navTo(view){
    currentView = view;
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.toggle('active', b.dataset.view === view));
    const names = {home:'Panoramica',map:'Mappa',timeline:'Timeline',encyclopedia:'Enciclopedia',relations:'Relazioni'};
    title.textContent = names[view];
    searchResults.classList.add('hidden');
    search.value = '';
    render();
  }

  function entryCard(e){
    return `<article class="entry-card"><button type="button" data-entry="${e.id}"><div class="meta-row"><span class="type-chip">${e.type}</span><span class="badge ${badgeClass(e.status)}">${e.status}</span>${e.visibility==='DM'?'<span class="badge secret">DM</span>':''}</div><h4>${e.name}</h4><p>${e.summary}</p></button></article>`;
  }

  function renderHome(){
    const vis = visibleEntries();
    const canonCount = vis.filter(e=>e.status==='CANON').length;
    const dmCount = data.entries.filter(e=>e.visibility==='DM').length;
    root.innerHTML = `
      <section class="hero">
        <div class="hero-panel">
          <p class="eyebrow">${data.meta.subtitle.toUpperCase()}</p>
          <h3>${data.meta.title}</h3>
          <p>Archivio strutturato del mondo: lore, entità, cronologia, relazioni e geografia in un unico sistema versionabile.</p>
          <p class="quote-line">${data.meta.canonRule}</p>
        </div>
        <div class="stats">
          <div class="stat"><strong>${vis.length}</strong><span>Voci visibili</span></div>
          <div class="stat"><strong>${canonCount}</strong><span>Canoniche</span></div>
          <div class="stat"><strong>${data.timeline.length}</strong><span>Eventi timeline</span></div>
          <div class="stat"><strong>${mode==='DM'?dmCount:'—'}</strong><span>Voci DM</span></div>
        </div>
      </section>
      <h3 class="section-title">Voci iniziali</h3>
      <div class="entry-grid">${vis.map(entryCard).join('')}</div>`;
    bindEntryButtons();
  }

  function renderMap(){
    const points = data.map.points || [];
    const markers = points.map(p=>`<button class="map-point" type="button" data-entry="${p.entryId}" style="left:${p.x}%;top:${p.y}%">${p.label}</button>`).join('');
    root.innerHTML = `<section class="map-shell"><div class="map-toolbar"><div><strong>${data.map.title}</strong><div class="map-note">${data.map.note}</div></div><span class="badge draft">SCHEMATICA</span></div><div class="map-canvas"><div class="map-grid"></div>${points.length?markers:'<div class="map-empty"><div><strong>Geografia ancora vuota</strong><br><span>Quando definiamo regioni, città, confini e punti d’interesse, compariranno qui come elementi cliccabili.</span></div></div>'}</div></section>`;
    bindEntryButtons();
  }

  function renderTimeline(){
    const events = data.timeline.filter(t => mode==='DM' || t.visibility!=='DM').sort((a,b)=>String(a.date).localeCompare(String(b.date)));
    if(!events.length){root.innerHTML='<div class="empty-state"><strong>Nessun evento cronologico canonizzato.</strong><br>La timeline è pronta: gli eventi verranno aggiunti quando definiremo il calendario e la storia.</div>';return;}
    root.innerHTML = `<div class="timeline-wrap">${events.map(t=>`<article class="timeline-item"><div class="timeline-date">${t.date}</div><div class="timeline-dot"></div><div class="timeline-content"><h4>${t.title}</h4><p>${t.summary||''}</p></div></article>`).join('')}</div>`;
  }

  function renderEncyclopedia(){
    const vis = visibleEntries();
    const types = ['tutti', ...Array.from(new Set(vis.map(e=>e.type))).sort()];
    const filtered = activeType==='tutti'?vis:vis.filter(e=>e.type===activeType);
    root.innerHTML = `<div class="filters">${types.map(t=>`<button type="button" data-filter="${t}" class="${activeType===t?'active':''}">${t}</button>`).join('')}</div><div class="entry-grid">${filtered.map(entryCard).join('')}</div>`;
    document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{activeType=b.dataset.filter;renderEncyclopedia()}));
    bindEntryButtons();
  }

  function renderRelations(){
    const entries = visibleEntries();
    const ids = new Set(entries.map(e=>e.id));
    const rels = data.relations.filter(r=>ids.has(r.source)&&ids.has(r.target));
    if(!entries.length){root.innerHTML='<div class="empty-state">Nessuna relazione disponibile.</div>';return;}
    const w=900,h=500,cx=w/2,cy=h/2,r=Math.min(w,h)*.34;
    const positions={};
    entries.forEach((e,i)=>{const a=(Math.PI*2*i/entries.length)-Math.PI/2;positions[e.id]={x:cx+Math.cos(a)*r,y:cy+Math.sin(a)*r}});
    const edges=rels.map(rel=>{const a=positions[rel.source],b=positions[rel.target];const mx=(a.x+b.x)/2,my=(a.y+b.y)/2;return `<line class="graph-edge" x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}"/><text class="graph-edge-label" x="${mx}" y="${my-6}" text-anchor="middle">${rel.type}</text>`}).join('');
    const nodes=entries.map(e=>`<g class="graph-node" data-entry="${e.id}" transform="translate(${positions[e.id].x},${positions[e.id].y})"><circle r="54"></circle><text text-anchor="middle" dominant-baseline="middle">${e.name.length>18?e.name.slice(0,16)+'…':e.name}</text></g>`).join('');
    root.innerHTML=`<section class="graph-wrap"><svg viewBox="0 0 ${w} ${h}" role="img" aria-label="Grafo delle relazioni"><g>${edges}${nodes}</g></svg></section>`;
    bindEntryButtons();
  }

  function render(){
    ({home:renderHome,map:renderMap,timeline:renderTimeline,encyclopedia:renderEncyclopedia,relations:renderRelations}[currentView])();
  }

  function bindEntryButtons(){
    document.querySelectorAll('[data-entry]').forEach(el=>el.addEventListener('click',()=>openEntry(el.dataset.entry)));
  }

  function openEntry(id){
    const e=data.entries.find(x=>x.id===id); if(!e || !canSee(e)) return;
    const related=(e.relations||[]).map(id=>data.entries.find(x=>x.id===id)).filter(Boolean).filter(canSee);
    dialogContent.innerHTML=`<div class="meta-row"><span class="type-chip">${e.type}</span><span class="badge ${badgeClass(e.status)}">${e.status}</span>${e.visibility==='DM'?'<span class="badge secret">DM</span>':''}</div><h3>${e.name}</h3><p class="body">${e.body}</p><div class="details-grid"><div class="detail"><span>Tipo</span><strong>${e.type}</strong></div><div class="detail"><span>Visibilità</span><strong>${e.visibility}</strong></div></div>${e.tags?.length?`<div class="tag-list">${e.tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div>`:''}${related.length?`<h4 class="section-title">Collegamenti</h4><div class="entry-grid">${related.map(entryCard).join('')}</div>`:''}`;
    dialog.showModal();
    dialogContent.querySelectorAll('[data-entry]').forEach(el=>el.addEventListener('click',()=>openEntry(el.dataset.entry)));
  }

  function runSearch(q){
    q=q.trim().toLowerCase();
    if(!q){searchResults.classList.add('hidden');return;}
    const hits=visibleEntries().filter(e=>[e.name,e.summary,e.body,...(e.tags||[])].join(' ').toLowerCase().includes(q));
    searchResults.innerHTML=hits.length?hits.slice(0,12).map(e=>`<div class="search-hit"><button type="button" data-entry="${e.id}"><strong>${e.name}</strong><br><small>${e.type} · ${e.status}</small></button><span>›</span></div>`).join(''):'<div class="search-hit"><small>Nessun risultato.</small></div>';
    searchResults.classList.remove('hidden');bindEntryButtons();
  }

  document.querySelectorAll('.nav-btn').forEach(b=>b.addEventListener('click',()=>navTo(b.dataset.view)));
  modeToggle.addEventListener('click',()=>{mode=mode==='DM'?'PLAYER':'DM';modeToggle.textContent=mode;render();runSearch(search.value)});
  search.addEventListener('input',e=>runSearch(e.target.value));
  document.getElementById('dialog-close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
  document.getElementById('export-btn').addEventListener('click',()=>{
    const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});
    const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='sacro-impero-world-data.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),500);
  });

  render();
})();
