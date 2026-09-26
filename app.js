(() => {
  const DB_NAME = "brainforge-db";
  const DB_VERSION = 1;
  const SETTINGS_KEY = "brainforge-settings-v1";

  const SUBJECTS = {
    math: { name: "Math", icon: "∑", desc: "Mental arithmetic, fractions, percentages and algebra." },
    science: { name: "Science", icon: "⚗", desc: "Biology, chemistry, physics, Earth and space science." },
    gk: { name: "GK", icon: "🌍", desc: "Geography, history, economics and general knowledge." },
    cs: { name: "Computer Science", icon: "⌘", desc: "Binary, hardware, networks, algorithms and databases." },
    coding: { name: "Coding", icon: "</>", desc: "Python and JavaScript logic, syntax and debugging." }
  };

  const QUESTIONS = [
    {id:"s-photo-in",subject:"science",skill:"Photosynthesis",q:"What 3 things go into photosynthesis?",answers:["sunlight carbon dioxide water","light carbon dioxide water","sunlight co2 water","light co2 water"],explain:"Plants use light energy, carbon dioxide (CO₂) and water."},
    {id:"s-photo-out",subject:"science",skill:"Photosynthesis",q:"What 2 main products come out of photosynthesis?",answers:["glucose oxygen","glucose o2","oxygen glucose","o2 glucose"],explain:"Photosynthesis produces glucose (sugar) and oxygen."},
    {id:"s-chloroplast",subject:"science",skill:"Cells",q:"Where does photosynthesis happen inside a plant cell?",answers:["chloroplast","chloroplasts"],explain:"Photosynthesis occurs in chloroplasts."},
    {id:"s-chlorophyll",subject:"science",skill:"Cells",q:"What green pigment absorbs light for photosynthesis?",answers:["chlorophyll"],explain:"Chlorophyll absorbs light energy inside chloroplasts."},
    {id:"s-mito",subject:"science",skill:"Cells",q:"Which organelle releases usable energy from food?",answers:["mitochondria","mitochondrion"],explain:"Mitochondria make ATP through cellular respiration."},
    {id:"s-force",subject:"science",skill:"Physics",q:"What is the SI unit of force?",answers:["newton","newtons","n"],explain:"Force is measured in newtons (N)."},
    {id:"s-atom",subject:"science",skill:"Chemistry",q:"What particle has a negative electric charge?",answers:["electron","electrons"],explain:"Electrons are negatively charged."},

    {id:"gk-france",subject:"gk",skill:"Geography",q:"What is the capital of France?",answers:["paris"],explain:"Paris is the capital and largest city of France."},
    {id:"gk-ocean",subject:"gk",skill:"Geography",q:"What is the largest ocean on Earth?",answers:["pacific","pacific ocean","the pacific ocean"],explain:"The Pacific Ocean is Earth's largest ocean."},
    {id:"gk-cont",subject:"gk",skill:"Geography",q:"How many continents are commonly taught in the 7-continent model?",answers:["7","seven"],explain:"The common model lists seven continents."},
    {id:"gk-moon",subject:"gk",skill:"Space history",q:"In what year did humans first land on the Moon?",answers:["1969"],explain:"Apollo 11 landed on the Moon in 1969."},
    {id:"gk-currency",subject:"gk",skill:"Economics",q:"What is inflation?",answers:["general rise in prices","rise in prices","increase in prices","prices rising over time"],explain:"Inflation is a broad rise in the general price level over time.",fuzzy:true},

    {id:"cs-ram",subject:"cs",skill:"Hardware",q:"What computer component stores data temporarily while programs are running?",answers:["ram","memory","random access memory"],explain:"RAM is fast temporary working memory used by running programs."},
    {id:"cs-cpu",subject:"cs",skill:"Hardware",q:"What does CPU stand for?",answers:["central processing unit"],explain:"CPU means Central Processing Unit."},
    {id:"cs-bit",subject:"cs",skill:"Binary",q:"How many possible values can one bit represent?",answers:["2","two"],explain:"A bit can be 0 or 1, so it has two possible values."},
    {id:"cs-byte",subject:"cs",skill:"Binary",q:"How many bits are in one byte?",answers:["8","eight"],explain:"One byte contains 8 bits."},
    {id:"cs-http",subject:"cs",skill:"Networking",q:"What protocol is commonly used to transfer web pages?",answers:["http","https","hypertext transfer protocol"],explain:"HTTP transfers web resources; HTTPS is HTTP protected by TLS."},
    {id:"cs-db",subject:"cs",skill:"Databases",q:"What language is commonly used to query relational databases?",answers:["sql"],explain:"SQL is used to query and modify relational database data."},

    {id:"c-loop",subject:"coding",skill:"Python",q:"Which Python keyword starts a loop over items in a sequence?",answers:["for","for loop"],explain:"A Python for loop iterates over items in an iterable."},
    {id:"c-fn",subject:"coding",skill:"Python",q:"Which Python keyword defines a function?",answers:["def"],explain:"Python functions are defined with the def keyword."},
    {id:"c-list",subject:"coding",skill:"Python",q:"Which brackets create a Python list?",answers:["[]","square brackets"],explain:"Python list literals use square brackets: [1, 2, 3]."},
    {id:"c-js",subject:"coding",skill:"JavaScript",q:"Which keyword declares a block-scoped variable that can be reassigned in JavaScript?",answers:["let"],explain:"let creates a block-scoped binding that can be reassigned."},
    {id:"c-bool",subject:"coding",skill:"Logic",q:"What data type has only true and false values?",answers:["boolean","bool"],explain:"A Boolean value is either true or false."}
  ];

  const LESSONS = [
    {
      id:"photosynthesis", subject:"Science", title:"Photosynthesis",
      text:"Photosynthesis is how plants use light energy to make glucose. The main inputs are sunlight, carbon dioxide, and water. Chlorophyll inside chloroplasts absorbs the light energy. The plant uses that energy to build glucose and releases oxygen. Glucose stores chemical energy that the plant can use later.",
      question:"Without looking: what goes into photosynthesis, and what comes out?",
      answer:"Inputs: sunlight, carbon dioxide and water. Outputs: glucose and oxygen."
    },
    {
      id:"computer-memory", subject:"Computer Science", title:"RAM vs Storage",
      text:"RAM is short-term working memory for programs that are currently running. It is fast, but its contents disappear when power is removed. An SSD or other storage keeps files for the long term. More RAM can help with multitasking, while a faster SSD can improve loading and file access.",
      question:"Without looking: what is the main difference between RAM and an SSD?",
      answer:"RAM is fast temporary working memory; an SSD stores data long term."
    },
    {
      id:"binary", subject:"Computer Science", title:"Binary Basics",
      text:"Computers represent information using bits. A bit has two possible values, zero or one. Eight bits make one byte. Larger units such as kilobytes, megabytes and gigabytes are built from groups of bytes. Binary works well for electronic circuits because two states can be represented reliably.",
      question:"Without looking: how many values can one bit represent, and how many bits are in a byte?",
      answer:"One bit has two values, 0 or 1, and one byte has 8 bits."
    },
    {
      id:"functions", subject:"Coding", title:"Functions in Programming",
      text:"A function is a reusable block of code that performs a task. Functions can accept inputs called parameters and can return an output. In Python, the def keyword defines a function. Breaking a program into functions makes code easier to understand, test and reuse.",
      question:"Without looking: why are functions useful, and which Python keyword defines one?",
      answer:"Functions package reusable logic; Python defines them with def."
    }
  ];

  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];
  let db;
  let state = {
    session: [], sessionIndex: 0, questionStart: 0, currentQuestion: null,
    reviewOnly: false, listenIndex: 0, speech: null, sentenceIndex: 0
  };

  function openDB(){
    return new Promise((resolve,reject)=>{
      const req=indexedDB.open(DB_NAME,DB_VERSION);
      req.onupgradeneeded=()=>{
        const d=req.result;
        if(!d.objectStoreNames.contains("attempts")) d.createObjectStore("attempts",{keyPath:"id",autoIncrement:true});
        if(!d.objectStoreNames.contains("memory")) d.createObjectStore("memory",{keyPath:"questionId"});
        if(!d.objectStoreNames.contains("meta")) d.createObjectStore("meta",{keyPath:"key"});
      };
      req.onsuccess=()=>{db=req.result;resolve(db)};
      req.onerror=()=>reject(req.error);
    });
  }

  function txStore(name,mode="readonly"){ return db.transaction(name,mode).objectStore(name); }
  function getAll(name){ return new Promise((res,rej)=>{const r=txStore(name).getAll();r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error)})}
  function put(name,value){ return new Promise((res,rej)=>{const r=txStore(name,"readwrite").put(value);r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error)})}
  function clearStore(name){ return new Promise((res,rej)=>{const r=txStore(name,"readwrite").clear();r.onsuccess=()=>res();r.onerror=()=>rej(r.error)})}

  function settings(){
    try{return JSON.parse(localStorage.getItem(SETTINGS_KEY))||{}}catch{return{}}
  }
  function saveSettings(patch){
    const next={...settings(),...patch};
    localStorage.setItem(SETTINGS_KEY,JSON.stringify(next));
    applySettings();
  }
  function applySettings(){
    const s=settings();
    document.documentElement.classList.toggle("grayscale",!!s.grayscale);
    document.documentElement.classList.toggle("reduce-motion",!!s.reduceMotion);
    $("#grayscaleSetting").checked=!!s.grayscale;
    $("#motionSetting").checked=!!s.reduceMotion;
  }

  function normalize(v){
    return v.toLowerCase().trim().replace(/[.,!?]/g,"").replace(/\s+/g," ");
  }
  function isCorrect(q,answer){
    const a=normalize(answer);
    if(q.answers.some(x=>normalize(x)===a)) return true;
    if(q.fuzzy){
      const words=a.split(" ");
      return q.answers.some(x=>normalize(x).split(" ").filter(w=>w.length>3).every(w=>words.includes(w)));
    }
    return false;
  }

  function todayKey(d=new Date()){ return d.toISOString().slice(0,10); }
  function addDays(date,days){ const d=new Date(date); d.setDate(d.getDate()+days); return d; }
  function intervalFor(level,correct){ if(!correct) return 0; return [0,1,3,7,14,30,60,90][Math.min(level+1,7)]; }

  async function recordAttempt(q,answer,correct,ms){
    await put("attempts",{questionId:q.id,subject:q.subject,skill:q.skill,answer,correct,ms,at:new Date().toISOString(),day:todayKey()});
    const store=txStore("memory");
    const existing=await new Promise((res)=>{const r=store.get(q.id);r.onsuccess=()=>res(r.result||null)});
    const oldLevel=existing?.level||0;
    const nextLevel=correct?Math.min(oldLevel+1,7):Math.max(oldLevel-1,0);
    const days=intervalFor(oldLevel,correct);
    const due=addDays(new Date(),days);
    await put("memory",{
      questionId:q.id,subject:q.subject,skill:q.skill,level:nextLevel,
      correct:(existing?.correct||0)+(correct?1:0),
      wrong:(existing?.wrong||0)+(correct?0:1),
      lastReviewed:new Date().toISOString(),
      nextReview:due.toISOString()
    });
    await updateStreak();
    await refreshDashboard();
  }

  async function updateStreak(){
    const attempts=await getAll("attempts");
    const days=[...new Set(attempts.map(a=>a.day))].sort();
    let streak=0;
    let cursor=new Date();
    for(let i=0;i<400;i++){
      const key=todayKey(cursor);
      if(days.includes(key)){streak++;cursor.setDate(cursor.getDate()-1);continue}
      if(i===0){cursor.setDate(cursor.getDate()-1);continue}
      break;
    }
    const meta=await getAll("meta");
    const old=meta.find(x=>x.key==="bestStreak")?.value||0;
    await put("meta",{key:"bestStreak",value:Math.max(old,streak)});
    return streak;
  }

  async function dueMemories(){
    const mem=await getAll("memory");
    const now=Date.now();
    return mem.filter(m=>new Date(m.nextReview).getTime()<=now).sort((a,b)=>new Date(a.nextReview)-new Date(b.nextReview));
  }

  async function subjectStats(){
    const attempts=await getAll("attempts");
    const out={};
    Object.keys(SUBJECTS).forEach(k=>out[k]={attempts:0,correct:0,accuracy:0});
    attempts.forEach(a=>{if(!out[a.subject])return;out[a.subject].attempts++;if(a.correct)out[a.subject].correct++});
    Object.values(out).forEach(s=>s.accuracy=s.attempts?Math.round((s.correct/s.attempts)*100):0);
    return out;
  }

  async function refreshDashboard(){
    if(!db)return;
    const attempts=await getAll("attempts");
    const mem=await getAll("memory");
    const due=await dueMemories();
    const today=attempts.filter(a=>a.day===todayKey());
    const correct=attempts.filter(a=>a.correct);
    const avg=correct.length?Math.round(correct.reduce((s,a)=>s+a.ms,0)/correct.length/100)/10:null;
    const streak=await updateStreak();
    const best=(await getAll("meta")).find(x=>x.key==="bestStreak")?.value||streak;
    const accuracy=attempts.length?Math.round(correct.length/attempts.length*100):0;
    const memory=mem.length?Math.round(mem.reduce((s,m)=>s+Math.min(m.level/5,1),0)/mem.length*100):0;

    $("#streakStat").textContent=streak+" day"+(streak===1?"":"s");
    $("#memoryStat").textContent=memory+"%";
    $("#todayStat").textContent=today.length+" question"+(today.length===1?"":"s");
    $("#speedStat").textContent=avg?avg+"s":"—";
    $("#dailyRing").textContent=Math.min(100,today.length*10)+"%";
    $("#overallLevel").textContent=Math.max(1,Math.floor(correct.length/25)+1);

    $("#totalAttempts").textContent=attempts.length;
    $("#totalCorrect").textContent=correct.length;
    $("#overallAccuracy").textContent=accuracy+"%";
    $("#bestStreak").textContent=best+" day"+(best===1?"":"s");

    $("#dueCount").textContent=due.length+" concept"+(due.length===1?"":"s");
    renderDue(due);
    const stats=await subjectStats();
    renderSubjectCards(stats);
    renderMastery(stats);
  }

  function renderDue(due){
    const list=$("#reviewList");
    const preview=$("#duePreview");
    if(!due.length){
      list.innerHTML='<div class="empty-state">Nothing due right now. Practice any subject to create a review schedule.</div>';
      preview.innerHTML='<div class="empty-state">Nothing due right now. Your next reviews will appear here.</div>';
      return;
    }
    const html=due.slice(0,10).map(m=>{
      const q=QUESTIONS.find(x=>x.id===m.questionId);
      return q?'<div class="review-item"><span><b>'+q.skill+'</b><small>'+q.q+'</small></span><em>Level '+m.level+'</em></div>':"";
    }).join("");
    list.innerHTML=html;
    preview.innerHTML=html;
  }

  function renderSubjectCards(stats){
    $("#subjectGrid").innerHTML=Object.entries(SUBJECTS).map(([key,s])=>{
      const st=stats[key];
      return '<article class="card subject-card" data-subject="'+key+'"><div class="big-icon">'+s.icon+'</div><h3>'+s.name+'</h3><p>'+s.desc+'</p><div class="subject-meta"><span>'+st.attempts+' attempts</span><b>'+st.accuracy+'%</b></div></article>';
    }).join("");
    $$(".subject-card").forEach(el=>el.onclick=()=>startSession(el.dataset.subject));
  }

  function renderMastery(stats){
    $("#masteryBars").innerHTML=Object.entries(SUBJECTS).map(([key,s])=>{
      const p=stats[key].accuracy;
      return '<div class="mastery-row"><b>'+s.name+'</b><div class="bar"><span style="width:'+p+'%"></span></div><strong>'+p+'%</strong></div>';
    }).join("");
  }

  function mathQuestion(){
    const level=Math.floor(Math.random()*5);
    let a,b,op,ans;
    if(level===0){a=(Math.floor(Math.random()*20)+2);b=a;op="+";ans=a+b}
    else if(level===1){a=Math.floor(Math.random()*80)+20;b=Math.floor(Math.random()*50)+10;op="+";ans=a+b}
    else if(level===2){a=(Math.floor(Math.random()*12)+2);b=(Math.floor(Math.random()*12)+2);op="×";ans=a*b}
    else if(level===3){
      a=(Math.floor(Math.random()*20)+5)*5;b=[10,20,25,50][Math.floor(Math.random()*4)];ans=Math.round(a*b/100);
      return {id:"math-"+Date.now()+"-"+Math.random(),subject:"math",skill:"Mental Math",q:"What is "+b+"% of "+a+"?",answers:[String(ans)],explain:b+"% of "+a+" = "+ans,dynamic:true};
    }
    else {a=Math.floor(Math.random()*200)+100;b=Math.floor(Math.random()*150)+50;op="-";if(b>a)[a,b]=[b,a];ans=a-b}
    return {id:"math-"+Date.now()+"-"+Math.random(),subject:"math",skill:"Mental Math",q:"What is "+a+" "+op+" "+b+"?",answers:[String(ans)],explain:a+" "+op+" "+b+" = "+ans,dynamic:true};
  }

  function pickQuestions(subject,count=10){
    let pool=subject&&subject!=="mixed"?QUESTIONS.filter(q=>q.subject===subject):[...QUESTIONS];
    const arr=[];
    for(let i=0;i<count;i++){
      if(subject==="math"||((!subject||subject==="mixed")&&i<3)) arr.push(mathQuestion());
      else if(pool.length) arr.push(pool[Math.floor(Math.random()*pool.length)]);
      else arr.push(mathQuestion());
    }
    return arr.sort(()=>Math.random()-.5);
  }

  async function startReview(){
    const due=await dueMemories();
    const qs=due.map(m=>QUESTIONS.find(q=>q.id===m.questionId)).filter(Boolean);
    if(!qs.length){toast("Nothing due yet — starting mixed practice.");startSession("mixed");return}
    state.reviewOnly=true;
    state.session=qs.slice(0,10);
    state.sessionIndex=0;
    showView("train");
    loadQuestion();
  }

  function startSession(subject="mixed"){
    state.reviewOnly=false;
    state.session=pickQuestions(subject,10);
    state.sessionIndex=0;
    showView("train");
    loadQuestion();
  }

  function loadQuestion(){
    const q=state.session[state.sessionIndex];
    state.currentQuestion=q;
    state.questionStart=performance.now();
    $("#trainerSubject").textContent=(SUBJECTS[q.subject]?.name||q.subject).toUpperCase();
    $("#trainerCounter").textContent=(state.sessionIndex+1)+" / "+state.session.length;
    $("#trainerProgress").style.width=((state.sessionIndex/state.session.length)*100)+"%";
    $("#questionSkill").textContent=q.skill.toUpperCase();
    $("#questionText").textContent=q.q;
    $("#answerInput").value="";
    $("#answerInput").disabled=false;
    $("#submitAnswer").disabled=false;
    $("#feedback").className="feedback hidden";
    $("#nextQuestionBtn").classList.add("hidden");
    $("#startSessionBtn").classList.add("hidden");
    $("#answerInput").focus();
  }

  async function submitCurrent(e){
    e?.preventDefault();
    const answer=$("#answerInput").value.trim();
    if(!answer||!state.currentQuestion)return;
    const q=state.currentQuestion;
    const correct=isCorrect(q,answer);
    const ms=Math.max(50,performance.now()-state.questionStart);
    if(!q.dynamic) await recordAttempt(q,answer,correct,ms);
    else{
      await put("attempts",{questionId:q.id,subject:"math",skill:q.skill,answer,correct,ms,at:new Date().toISOString(),day:todayKey()});
      await updateStreak(); await refreshDashboard();
    }
    const fb=$("#feedback");
    fb.className="feedback "+(correct?"correct":"wrong");
    fb.innerHTML=(correct?"<b>✓ Correct.</b> ":"<b>Not quite.</b> ")+q.explain+"<br><small>Response time: "+(ms/1000).toFixed(1)+"s</small>";
    $("#answerInput").disabled=true;
    $("#submitAnswer").disabled=true;
    $("#nextQuestionBtn").classList.remove("hidden");
    $("#trainerProgress").style.width=(((state.sessionIndex+1)/state.session.length)*100)+"%";
  }

  function nextQuestion(){
    state.sessionIndex++;
    if(state.sessionIndex>=state.session.length){
      $("#questionSkill").textContent="SESSION COMPLETE";
      $("#questionText").textContent="Nice work. Your answers are saved locally.";
      $("#feedback").className="feedback correct";
      $("#feedback").innerHTML="<b>Come back later.</b> Spaced repetition works because you allow some forgetting before recalling again.";
      $("#answerInput").disabled=true;$("#submitAnswer").disabled=true;
      $("#nextQuestionBtn").classList.add("hidden");$("#startSessionBtn").classList.remove("hidden");
      refreshDashboard(); return;
    }
    loadQuestion();
  }

  function showView(name){
    $$(".view").forEach(v=>v.classList.toggle("active",v.id==="view-"+name));
    $$(".nav-btn").forEach(b=>b.classList.toggle("active",b.dataset.view===name));
    const labels={home:"Dashboard",train:"Daily Training",subjects:"Subjects",review:"Memory Review",listen:"Listening Mode",progress:"Progress",settings:"Settings"};
    $("#pageTitle").textContent=labels[name]||"BrainForge";
    $("#sidebar").classList.remove("open");
    window.scrollTo({top:0,behavior:"smooth"});
  }

  function toast(msg){
    const t=$("#toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2200);
  }

  function setupListening(){
    const topic=$("#listenTopic");
    topic.innerHTML=LESSONS.map((l,i)=>'<option value="'+i+'">'+l.subject+' — '+l.title+'</option>').join("");
    topic.onchange=()=>{state.listenIndex=Number(topic.value);renderLesson()};
    renderVoices();
    speechSynthesis.onvoiceschanged=renderVoices;
    renderLesson();
  }

  function renderVoices(){
    const voices=speechSynthesis.getVoices();
    $("#voiceSelect").innerHTML=voices.map((v,i)=>'<option value="'+i+'">'+v.name+' ('+v.lang+')</option>').join("");
  }

  function splitSentences(text){
    return text.match(/[^.!?]+[.!?]+|[^.!?]+$/g)?.map(s=>s.trim())||[text];
  }

  function renderLesson(){
    speechSynthesis.cancel();
    state.sentenceIndex=0;
    const l=LESSONS[state.listenIndex];
    const sentences=splitSentences(l.text);
    $("#listenText").innerHTML='<h3>'+l.title+'</h3><p>'+sentences.map((s,i)=>'<span class="sentence" data-i="'+i+'">'+s+' </span>').join("")+'</p>';
    $("#listenRecallQuestion").textContent=l.question;
    $("#listenRecallAnswer").value="";
    $("#listenRecallFeedback").className="feedback hidden";
  }

  function speakSentence(index=state.sentenceIndex){
    speechSynthesis.cancel();
    const l=LESSONS[state.listenIndex];
    const sentences=splitSentences(l.text);
    state.sentenceIndex=Math.max(0,Math.min(index,sentences.length-1));
    $$(".sentence").forEach((el,i)=>el.classList.toggle("active",i===state.sentenceIndex));
    const utter=new SpeechSynthesisUtterance(sentences[state.sentenceIndex]);
    const voices=speechSynthesis.getVoices();
    const voice=voices[Number($("#voiceSelect").value)];
    if(voice)utter.voice=voice;
    utter.rate=Number($("#speechRate").value)||1;
    utter.onend=()=>{if(state.sentenceIndex<sentences.length-1)speakSentence(state.sentenceIndex+1)};
    state.speech=utter;
    speechSynthesis.speak(utter);
  }

  async function exportData(){
    const payload={version:1,exportedAt:new Date().toISOString(),attempts:await getAll("attempts"),memory:await getAll("memory"),meta:await getAll("meta"),settings:settings()};
    const blob=new Blob([JSON.stringify(payload,null,2)],{type:"application/json"});
    const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="brainforge-backup-"+todayKey()+".json";a.click();URL.revokeObjectURL(a.href);
  }

  async function importData(file){
    try{
      const data=JSON.parse(await file.text());
      if(!Array.isArray(data.attempts)||!Array.isArray(data.memory))throw new Error("Invalid backup");
      await Promise.all(["attempts","memory","meta"].map(clearStore));
      for(const a of data.attempts)await put("attempts",a);
      for(const m of data.memory)await put("memory",m);
      for(const x of (data.meta||[]))await put("meta",x);
      if(data.settings)localStorage.setItem(SETTINGS_KEY,JSON.stringify(data.settings));
      applySettings();await refreshDashboard();toast("Backup imported.");
    }catch(e){toast("Could not import that backup.");}
  }

  async function resetData(){
    if(!confirm("Reset all BrainForge progress stored on this device?"))return;
    await Promise.all(["attempts","memory","meta"].map(clearStore));
    await refreshDashboard();toast("Local progress reset.");
  }

  function bind(){
    $$(".nav-btn").forEach(b=>b.onclick=()=>showView(b.dataset.view));
    $$("[data-jump]").forEach(b=>b.onclick=()=>showView(b.dataset.jump));
    $$("[data-session]").forEach(b=>b.onclick=()=>b.dataset.session==="review"?startReview():startSession(b.dataset.session));
    $("#startDailyBtn").onclick=()=>startSession("mixed");
    $("#startSessionBtn").onclick=()=>startSession("mixed");
    $("#answerForm").onsubmit=submitCurrent;
    $("#nextQuestionBtn").onclick=nextQuestion;
    $("#startReviewBtn").onclick=startReview;
    $("#menuBtn").onclick=()=>$("#sidebar").classList.toggle("open");

    $("#focusToggle").onclick=()=>saveSettings({grayscale:!settings().grayscale});
    $("#grayscaleSetting").onchange=e=>saveSettings({grayscale:e.target.checked});
    $("#motionSetting").onchange=e=>saveSettings({reduceMotion:e.target.checked});

    $("#playSpeech").onclick=()=>speakSentence(state.sentenceIndex);
    $("#pauseSpeech").onclick=()=>speechSynthesis.paused?speechSynthesis.resume():speechSynthesis.pause();
    $("#prevSentence").onclick=()=>speakSentence(state.sentenceIndex-1);
    $("#nextSentence").onclick=()=>speakSentence(state.sentenceIndex+1);
    $("#repeatSentence").onclick=()=>speakSentence(state.sentenceIndex);
    $("#checkRecallBtn").onclick=()=>{
      const l=LESSONS[state.listenIndex],fb=$("#listenRecallFeedback");
      fb.className="feedback correct";fb.innerHTML="<b>Compare with this:</b> "+l.answer+"<br><small>Try to explain the idea in your own words, not memorize one sentence.</small>";
    };

    $("#exportBtn").onclick=exportData;
    $("#importInput").onchange=e=>{if(e.target.files[0])importData(e.target.files[0])};
    $("#resetBtn").onclick=resetData;
  }

  async function init(){
    $("#todayLabel").textContent=new Intl.DateTimeFormat("en-US",{weekday:"long",month:"short",day:"numeric"}).format(new Date()).toUpperCase();
    await openDB();
    bind(); applySettings(); setupListening(); await refreshDashboard();
    if("serviceWorker" in navigator) navigator.serviceWorker.register("./sw.js").catch(()=>{});
  }

  init().catch(err=>{console.error(err);toast("BrainForge could not start local storage.");});
})();