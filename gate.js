/** Password-unlock client for encrypted Swift English resource catalogue. */
(() => {
  'use strict';
  document.documentElement.classList.add('swift-locked');
  const style=document.createElement('style');
  style.textContent=[
    'html.swift-locked .workspace{visibility:hidden!important}',
    '#swift-gate{position:fixed;inset:0;z-index:99999;display:grid;place-items:center;padding:24px;background:#f0efe9;font-family:IBM Plex Sans,system-ui,sans-serif;color:#283d39}',
    '#swift-gate .panel{width:min(100%,424px);background:#fffefa;border:1px solid #dadfd6;border-top:3px solid #436f60;border-radius:5px;padding:38px 36px 30px;box-shadow:none;text-align:center}',
    '#swift-gate img{width:176px;max-width:82%;height:auto;margin:0 auto 25px;display:block}',
    '#swift-gate h1{font:500 33px/1.15 Source Serif 4,Georgia,serif;letter-spacing:-.5px;margin:0 0 12px}',
    '#swift-gate p{color:#6b7d72;font-size:13px;line-height:1.7;margin:0 0 27px}',
    '#swift-gate label{display:block;font-size:12px;font-weight:600;text-align:left;margin-bottom:8px}',
    '#swift-gate input{box-sizing:border-box;width:100%;padding:13px;border:1px solid #b7c4ba;border-radius:3px;background:#fff;font:inherit}',
    '#swift-gate input:focus{outline:2px solid #8da99c;outline-offset:2px}',
    '#swift-gate button{width:100%;margin-top:13px;border:0;border-radius:3px;padding:13px;background:#31594e;color:white;font-weight:600;font-size:13px;cursor:pointer}',
    '#swift-gate button:disabled{opacity:.6;cursor:wait}',
    '#swift-gate small{font-size:11px;color:#7b8a80;display:block;line-height:1.65;margin-top:17px}',
    '#swift-gate .message{min-height:20px;margin-top:10px;color:#a0412b;font-size:13px}',
    '.swift-lock-button{background:transparent;border:1px solid #b4c7bc;border-radius:3px;padding:6px 10px;color:inherit;cursor:pointer}'
  ].join('');
  document.head.appendChild(style);
  const screen=document.createElement('section');
  screen.id='swift-gate';
  screen.setAttribute('role','dialog');screen.setAttribute('aria-modal','true');
  screen.setAttribute('aria-label','Staff password');
  screen.innerHTML='<div class="panel"><img src="logo.png" alt="Swift English School">'
    +'<h1>Teacher library</h1><p>Enter the staff password to access your teaching resources.</p>'
    +'<form id="swift-unlock"><label for="swift-password">Staff password</label>'
    +'<input id="swift-password" type="password" autocomplete="current-password" required autofocus>'
    +'<button type="submit">Open the library</button><div class="message" role="status" aria-live="polite" id="swift-message"></div></form>'
    +'<small>Teaching materials remain in Google Drive. Original permissions still apply.</small></div>';
  document.body.appendChild(screen);
  const input=document.getElementById('swift-password');
  const form=document.getElementById('swift-unlock');
  const message=document.getElementById('swift-message');
  input.focus();
  const decode=b64=>Uint8Array.from(atob(b64),char=>char.charCodeAt(0));
  let payloadPromise;
  async function payload(){
    if(!payloadPromise)payloadPromise=fetch('protected.json',{cache:'no-store'}).then(r=>{
      if(!r.ok)throw Error('Encrypted catalogue unavailable. Contact the portal administrator.');
      return r.json();
    });
    return payloadPromise;
  }
  async function unlock(password){
    if(!crypto.subtle)throw Error('HTTPS is required to unlock the portal.');
    const p=await payload();
    if(p.version!==1||p.iterations<200000)throw Error('Invalid encrypted catalogue format.');
    const material=await crypto.subtle.importKey('raw',new TextEncoder().encode(password),'PBKDF2',false,['deriveKey']);
    const key=await crypto.subtle.deriveKey({name:'PBKDF2',salt:decode(p.salt),iterations:p.iterations,hash:'SHA-256'},material,{name:'AES-GCM',length:256},false,['decrypt']);
    const bytes=await crypto.subtle.decrypt({name:'AES-GCM',iv:decode(p.iv)},key,decode(p.ciphertext));
    const data=JSON.parse(new TextDecoder().decode(bytes));
    if(!Array.isArray(data)||!data.every(x=>x&&typeof x.title==='string'&&typeof x.url==='string'))throw Error('Invalid decrypted catalogue.');
    return data;
  }
  form.addEventListener('submit',async e=>{
    e.preventDefault();
    const button=form.querySelector('button');button.disabled=true;message.textContent='Checking password…';
    try{
      window.SWIFT_CATALOGUE=await unlock(input.value);
      input.value='';
      const app=document.createElement('script');
      app.src='app.js';
      app.onerror=()=>{message.textContent='Unable to load portal. Reload the page.';button.disabled=false;};
      app.onload=()=>{
        document.documentElement.classList.remove('swift-locked');screen.remove();
        const actions=document.querySelector('.topbar-actions');
        if(actions){
          const lock=document.createElement('button');lock.type='button';lock.className='swift-lock-button';
          lock.textContent='Lock';lock.title='Lock teacher portal on this device';
          lock.addEventListener('click',()=>location.reload());actions.appendChild(lock);
        }
      };
      document.body.appendChild(app);
    }catch(error){
      message.textContent=/Encrypted catalogue|HTTPS|Invalid encrypted|Invalid decrypted/.test(error.message)
        ? error.message : 'Incorrect password. Please try again.';
      input.select();button.disabled=false;
    }
  });
})();
