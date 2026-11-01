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
  // Client-side defence in depth while the public encrypted catalogue is being rebuilt.
  // Only SHA-256 hashes are published here; raw resource IDs remain in the private repository.
  const VERIFIED_DRIVE_HASHES=new Set([
    '3475616327cffcd0e77a40112cd8dae0c6b2330e9996e8252a8e045461bb1a46',
    'a75d3600497deab23dad00f3920d8b738907ba1eeea10359936471d6d0213cfd',
    '421d120f2ebdeb00dd356f7845547a1d00892363ac5850ed3dceaa8af9340039',
    '84f6f3a3ef373b9517bf81209df1756483a1e2d3b9064b71cd28aff4a0deb55d',
    '9e1322986c39f0c2ace4885b39911ef8edce477f6cc9ff05a43ca6657b66dc06',
    '402db65a38be141ffd29147195e3ac4361b67b9d06d12113f2d146365fbb12dc',
    '9ad050ddbf2713ef55882f1a2e89c94243f4723b18db5df52709137edb5c5a47',
    '5e7a5eb284d2b77b3ae3ddbce8b31e4b8470dcc83cbf46769c929bad96ace882',
    '53fc7a3478f1408e8341df4d26d9799aea343995f840adcfe7c6e49b4c6994ea',
    '67f1ce91f767f9de2ea5a42d005516198efdbedc3a39b883cc7ec8a15fc8ae76',
    '7e745101d704d6fdf6e19f9b783347e7d54090ceb377effd206fe043f3a23a8e',
    'f799a24d6b25342fb6a144cf05522d324554e246b037b1ca483876b1ae984c8c',
    '669d9b8ceda3bcc257bf30ff1ef19957a2fdeb65ee85d86ead382afeda16cbd9',
    '479ca90ca924bab8a1a7ab616bc83c10d9580125c138d41eb62ed6fecbf483ea',
    '8100e79e81f9e8474699a5db8f4b5cfc2e6925b41f40034972d4b039d78e4c82',
    '46df7e8fb15afc16fd00c99c1148520cfaea706b16490f1fd3dd8eff4aaccf2d',
    'b9bd008a34860f554fe48a0b674d63d19bc0faf51cbb58e4e36137f36fcd8765',
    '0e390ea6e90f90f6de571d05da7f99d38750ef34ecc4ed99d433681b3b9490a5',
    'b39f309f9a1a091615c7fb6ef4cd6dbe863e6a3622877b601c34147aab1280c3',
    'c4f89dc70de8d8615e620d252d20847dcea51409027af1c430175cb9e5712271',
    'e48043478fe3bb51d3f4a8e2854b48adc1c7908021fa637309d17b9a07d4a943',
    'd48c38f346ed062403fa78cd136bbb272d1b5f5dbd226f7166593a7d4ecba237',
    '7076bf9256e4efc2395a850836468670cc5227cfd6e668f0296ffab1a7dbdfe8',
    'f97531328c27b5ca604e61b2c26f99ffcb19aa627f24fae488b3ebfb578eda7a',
    'd462dc284c7057ef0b32caf0b60b8b5bb695bd1453373135b8cc5711f6476d4d',
    '32a355bd692fe6fd1336d63275295e8f17585eeb892d862ffa80f004f4ad55bc',
    'ba6213a68a20dbc2ab2f3ef1cfa0307d8b3fa13954a074e2200b587e1f5357fe',
    '8e03f35f8d71de1749b81810a2c8dd8b33404cff33f84ebd0eb43af012ad59e6',
    '7eb81fa3d90534b8fad4a2076e530c03701909c4d68e4f76396af5ba5d9733c2',
    'dd2c953e4e0b23295b487a97cd0e3965634ba5989e1cb0be69781ef28f1b5f69',
    '30c08f18f6cc8ba34d7a311ecacf8e74eae7ab939cc3214b0993b48851001066',
    '0531b49fad85756368e14c55210211620767b0e81c49a576932701e89a86c9aa',
    '3d6e29d6cdc99cc364250aa6a8a05ff611c6aa76f688fea8e76ced9e052cd6ae',
    'bb2b7662c0aede31c84ced9457443ca7849614d277db9c9d968fdcc2b517deaf',
    '73c0220df2c25b6c65a9615d82b62be6fa0bd6c7a46eea4280d168d0a05f922f',
    'f13332ce40e661790266843446f003f0c753244b1b5737f25c1a1906ced22458',
    '4279e6d42bd493ce666093d3a235dc6a11ad17c1f5163490c95579c5445a4d33',
    '32734499493007454d96eafd325a26f75bdd160b08deeec9db2d2f5f5898df1c',
    '13993112295fd07c3255233bcdf8e3e8251c79c1b2518e343302780c0a518da1',
    'a670bbbc062f6781ddf2c67a55a252919e0cd9ab0795ec6ec7b302f480461846',
    '706f7f27777ed2d1e8c93f5f08be5033fd6e08402ec252aca04498f748c7308e',
    'd5664c3d315ee88277b65d9ca1af2b20ca8ba322ef3baed79e7e1600a33c8685',
    'c18b5fb89e645a207a4741f8ae3c3eba62ac421537dcf2a842d6b420ff1d19b6',
    'c3c383d0dacdf1672cd3faf3c5d908f01b7924fa6aed79934836855ac00384bd',
    '74895718550896bbb4f66b237c12f93e949b207201cb820275bdbfe9015ab4b3',
    '44619931c2981297cf1dcaaae213eb52502dd1f25558a8bf67f80e276fbfa2c1',
    '24e14eea87837fa9d6ce745335f4a233f378fd93fe266edabecb300a1fc88ea5',
    'c7158a1bb1009e94aba77fc9dd52c730aeb98596e7151b2e9ba59a34ba20b543',
    'cb773f312a4ec99d13fa6bff50e41a111e98e2ea9ce1b9f7c50fc1f973d40300',
    '92acc3a90b3c5dcc489f4bd48fe897da7d915956c317767d9018c3f7adb4c04d',
    '36b08e15e28a682f9fd80cfb777efa57c61d3e058e4356746d3342b5f468ca1d',
    'a17b223ea393e5b952beb1f8c5256efa60df829dcc1de2215aff29b5662ff6ba',
    'd1c25aa3992c49c79689cb2f6c18898a8c3b052ccc456018ddeb0d98e22cb171',
    '14216678eb7fa4fbd25dbf3b618807ebd0903bc9d8d3017825c3d7a08a5e02af',
    'ae8671fe4439b949473489acbfba4c696fda5d696bd4e7bbeb066de14abb1dc0',
    '5f18c11385b9c1f4608ee8a5fa8db0378c234cff33f2fcdfba80f3de42f971e7',
    'af2aa9c7ab222bcb469fc74be8a84829b53ede1248c5acd15faae8a83ca529d6',
    'e31d6e44741fcfe7cb1aaf22cb804b2496e0a7e9777ab0e4221afec86f1dc441',
    'ab2b903b7bc1ba6251140136db08ae3e691bacf683dc5e0f6d8649b582fb0cdb',
    'c47aae5dd4a0c2ce42bc8ad21344800796a9d5ae6c279e66971f85cafd75b58c',
    '70289e62e73528f7e663a89afb342ea09286701f39567f1cd8e940b88e5d8587',
    'dbe670ad7756816cf8e278017f4a9b43eeff2a01156b1546e2614b32b0abd7a4',
    'f0bbffdda40ef83ef3851e5b48fe63c0606626787d223c147552e555797bd75f',
    'ec2a68cdb5e78b2dcd3b7d9407fd6653d19eeeb4ef5a7db2e19130e37f991071',
    'ec8164c502a8e4bd9845b4f0fd16abb7ad366e9b64a4111028fb3569c93de9e7',
    '5ffcd1c72bacb1f8662bb053aa4a73d1a7b8a8cb331636fcbe44aa7ddb7093b8',
    'e1e05a01f9d1418a67a481b8559898a70befe6da0f8db75065bdaeadc1b1513a',
    '84bd49aa0daaaf86eb60376849e51ea3cff9f4a286a72bf641a373470c309170',
    '24a4e095b22e9106ca760f717332f0844ad3171d4f199805b081c2fd484e8395',
    'cf9bb210cc6851767501e2d97b3463f9fe1fb42e82e30345f366a1b28531ea2f',
    '373db9625679cc9d6edeebc0514d37cd80cf33ab7b967b4554664a46f1a0dc98',
    'a81720496a058f9d34edbb9673da59868c41a277c56f6534f7b7c25b18328bfa',
    '481e5309953f34717f0bf3c2a631205382e32cddbe6d32d18ac3e3336cb59687',
    'b100dc12b1c6f45f21c74d5cb4c9d7b80ae7a915384c218688376e56f186888a',
    '2a1e5387d3950d5bf13baa4cd88f7f57886cbc7e7f27bee59398a31810e355da',
    '9a18a8cda849477510980b696ab3a70798149b765697c75b6b04d9179496ef48',
    'cce564f9e815f99c3fe792a8e554217c769420f1f6050a15c2988bcbd2eac34a',
    'cc8be666883aac5b839b0063a345b0475faf973a3594908aab55ed7f5da094e9',
    '573415912a4b266543a954576106ac8a99e841844b120ea0c1fb46d20aeba2b1',
    'ba8f5542bdd87c55aa5038171c5330c5f9a2f89b444e0b7b9b2dfa64ccd39ed5',
    '150024eab7f7157bb327b0d8d1675bebf01d673d511422206e1ba4866190f8f5',
    '792ae83d1fe562f60faeab8542a160707e7c12640fcbbca98001fe347aac0828',
    '39cabaf6fe0b7d3ae78849d618be500e49ee7d0896283babae0edf05a9be9b36',
    '979a61f0cd993ca5314c34a9648c80af014891dde0db3054e46449cd2a760d1a',
    'bb8bf8216b2e861434f73c58dc5331242acdd483a81d086c8e2d05524ac70050',
    '6b1d2e896af5a30a5b16fd62f22f61c30e417a38fdf98cddf9e3980be26b33a6',
    '1aad4cceece1600018f345913176f536f6e8acdce91e133f8ecf6099b0ef1cdc',
    '08398568594ea7cab75ab83521c7d3d89d408d71620edfb7712cbc2eae859e07'
  ]);
  async function verifiedDriveUrl(url){
    try{
      const parsed=new URL(url);
      if(parsed.protocol!=='https:'||!['drive.google.com','docs.google.com'].includes(parsed.hostname))return false;
      const match=parsed.pathname.match(/^\/(?:drive\/folders|file\/d|document\/d|spreadsheets\/d|presentation\/d)\/([A-Za-z0-9_-]+)(?:\/|$)/);
      if(!match)return false;
      const bytes=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(match[1]));
      const hash=Array.from(new Uint8Array(bytes),n=>n.toString(16).padStart(2,'0')).join('');
      return VERIFIED_DRIVE_HASHES.has(hash);
    }catch(e){return false}
  }
  async function keepVerifiedOnly(catalogue){
    const rows=await Promise.all(catalogue.map(async resource=>{
      if(!await verifiedDriveUrl(resource.url))return null;
      const children=Array.isArray(resource.children)?resource.children:[];
      const checks=await Promise.all(children.map(child=>verifiedDriveUrl(child.url)));
      return {...resource,children:children.filter((_,i)=>checks[i])};
    }));
    const approved=rows.filter(Boolean);
    if(approved.length===0)throw Error('No verified teacher-owned resources available. Contact the administrator.');
    return approved;
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
    return keepVerifiedOnly(data);
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
      message.textContent=/Encrypted catalogue|HTTPS|Invalid encrypted|Invalid decrypted|No verified teacher-owned/.test(error.message)
        ? error.message : 'Incorrect password. Please try again.';
      input.select();button.disabled=false;
    }
  });
})();
