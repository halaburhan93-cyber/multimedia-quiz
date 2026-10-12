// بنك الأسئلة: q = السؤال، o = الخيارات، a = رقم الإجابة الصحيحة، c = المجال
const questions = [
  {c:"التصميم الجرافيكي",q:"أي نظام ألوان يُستخدم للطباعة؟",o:["RGB","CMYK","HEX","HSL"],a:1},
  {c:"التصميم الجرافيكي",q:"ما نوع الصور التي لا تفقد جودتها عند التكبير؟",o:["النقطية Raster","المتجهة Vector","JPEG","GIF"],a:1},
  {c:"التصميم الجرافيكي",q:"أي برنامج مخصص أساسًا لتصميم الرسومات المتجهة؟",o:["Photoshop","Premiere Pro","Illustrator","Audition"],a:2},
  {c:"التصميم الجرافيكي",q:"ما الدقة القياسية المناسبة للطباعة؟",o:["72 DPI","150 DPI","300 DPI","36 DPI"],a:2},
  {c:"المونتاج",q:"ما معدل الإطارات الشائع في الأفلام السينمائية؟",o:["24 fps","10 fps","60 fps","120 fps"],a:0},
  {c:"المونتاج",q:"أي من البرامج التالية برنامج مونتاج فيديو؟",o:["Figma","DaVinci Resolve","Blender Sculpt","InDesign"],a:1},
  {c:"المونتاج",q:"ماذا يُسمى الانتقال التدريجي من صورة إلى السواد؟",o:["Cut","Fade Out","Zoom","Crop"],a:1},
  {c:"المونتاج",q:"ما دقة الفيديو Full HD؟",o:["1280×720","3840×2160","1920×1080","640×480"],a:2},
  {c:"الأنيميشن",q:"ما الإطارات الأساسية التي تحدد بداية الحركة ونهايتها؟",o:["Keyframes","Layers","Masks","Pixels"],a:0},
  {c:"الأنيميشن",q:"أي برنامج يُستخدم للنمذجة والتحريك ثلاثي الأبعاد مجانًا؟",o:["Blender","Lightroom","Dreamweaver","Canva"],a:0},
  {c:"الأنيميشن",q:"ما مبدأ الأنيميشن الذي يعطي الأجسام إحساسًا بالمرونة والوزن؟",o:["Squash & Stretch","Rendering","Compression","Cropping"],a:0},
  {c:"تصميم الويب",q:"ماذا تعني HTML؟",o:["Hyper Text Markup Language","High Tech Modern Language","Home Tool Markup Language","Hyperlink Text Making Language"],a:0},
  {c:"تصميم الويب",q:"أي لغة تُستخدم لتنسيق شكل صفحات الويب؟",o:["Python","CSS","SQL","C++"],a:1},
  {c:"تصميم الويب",q:"أي خاصية CSS تُستخدم لإنشاء تخطيط مرن؟",o:["display: flex","font-size","color","z-index"],a:0},
  {c:"تصميم الويب",q:"ما الأداة التي تجعل التصميم متجاوبًا مع أحجام الشاشات؟",o:["Media Queries","Cookies","Local Storage","Alt Text"],a:0},
];

const $ = id => document.getElementById(id);
let current = 0, score = 0, answers = [], order = [];

function show(id){
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  $(id).classList.add('active');
}

function shuffle(arr){ return arr.map(v=>[Math.random(),v]).sort((x,y)=>x[0]-y[0]).map(x=>x[1]); }

function start(){
  current = 0; score = 0; answers = [];
  order = shuffle(questions);        // ترتيب عشوائي للأسئلة في كل جولة
  show('quiz'); render();
}

function render(){
  const q = order[current];
  $('counter').textContent = `السؤال ${current+1} / ${order.length}`;
  $('category').textContent = q.c;
  $('score').textContent = `النقاط: ${score}`;
  $('bar').style.width = `${current / order.length * 100}%`;
  $('question').textContent = q.q;
  $('feedback').textContent = '';
  $('nextBtn').classList.add('hidden');
  $('options').innerHTML = '';
  q.o.forEach((text, i) => {
    const b = document.createElement('button');
    b.className = 'option';
    b.textContent = text;
    b.onclick = () => choose(i);
    $('options').appendChild(b);
  });
}

function choose(i){
  const q = order[current], btns = $('options').children, ok = i === q.a;
  [...btns].forEach(b => b.disabled = true);
  btns[q.a].classList.add('correct');          // إظهار الإجابة الصحيحة دائمًا
  if (ok){ score++; $('feedback').textContent = '✅ إجابة صحيحة! أحسنت'; $('feedback').style.color = 'var(--ok)'; }
  else { btns[i].classList.add('wrong'); $('feedback').textContent = `❌ خطأ، الإجابة الصحيحة: ${q.o[q.a]}`; $('feedback').style.color = 'var(--bad)'; }
  answers.push({q, chosen:i, ok});
  $('score').textContent = `النقاط: ${score}`;
  $('nextBtn').textContent = current === order.length-1 ? 'عرض النتيجة 🏁' : 'التالي ←';
  $('nextBtn').classList.remove('hidden');
}

function next(){
  current++;
  current < order.length ? render() : finish();
}

function finish(){
  const pct = Math.round(score / order.length * 100);
  $('final').textContent = `${score}/${order.length}`;
  $('result').querySelector('.circle').style.background =
    `conic-gradient(var(--accent) ${pct}%, #e5e7eb 0)`;
  const [medal, msg] = pct >= 90 ? ['🏆','ممتاز! أنت خبير في الوسائط المتعددة']
    : pct >= 70 ? ['🥈','جيد جدًا! مستوى رائع']
    : pct >= 50 ? ['🥉','جيد، واصل التعلم']
    : ['📚','تحتاج إلى مراجعة أكثر، حاول مجددًا'];
  $('medal').textContent = medal;
  $('message').textContent = `${msg} — نسبتك ${pct}%`;
  $('review').innerHTML = answers.map(x =>
    `<li class="${x.ok?'ok':'no'}">${x.q.q}<br>${x.ok?'✔':'✘'} إجابتك: ${x.q.o[x.chosen]}${x.ok?'':` — الصحيحة: ${x.q.o[x.q.a]}`}</li>`
  ).join('');
  show('result');
}

$('startBtn').onclick = start;
$('nextBtn').onclick = next;
$('restartBtn').onclick = start;
