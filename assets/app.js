/* ==========================================================================
   RatMed24 — skrypty strony
   1. Menu na telefonie
   2. Kalkulator obsady medycznej imprezy masowej
   3. Formularz zgłoszenia (demo — nie wysyła)
   4. Sklep: filtry i koszyk (sklep.html)
   ========================================================================== */

/* --------------------------------------------------------------------------
   1. MENU
   -------------------------------------------------------------------------- */
(function menu(){
  var przycisk = document.getElementById('hamburger');
  var lista = document.getElementById('menu');
  if(!przycisk || !lista) return;

  przycisk.addEventListener('click', function(){
    var otwarte = lista.getAttribute('data-otwarte') === '1';
    lista.setAttribute('data-otwarte', otwarte ? '0' : '1');
    przycisk.setAttribute('aria-expanded', otwarte ? 'false' : 'true');
  });

  lista.addEventListener('click', function(e){
    if(e.target.tagName === 'A'){
      lista.setAttribute('data-otwarte','0');
      przycisk.setAttribute('aria-expanded','false');
    }
  });
})();

/* rok w stopce */
(function rok(){
  var el = document.getElementById('rok');
  if(el) el.textContent = new Date().getFullYear();
})();

/* --------------------------------------------------------------------------
   2. KALKULATOR OBSADY MEDYCZNEJ

   Progi liczby uczestników i skład obsady pochodzą z rozporządzenia Ministra
   Zdrowia z 6 lutego 2012 r. w sprawie minimalnych wymagań dotyczących
   zabezpieczenia pod względem medycznym imprezy masowej (Dz.U. 2012 poz. 181).

   Progi uznania imprezy za masową — ustawa z 20 marca 2009 r. o bezpieczeństwie
   imprez masowych. Termin 30 dni na złożenie wniosku — art. 25 tej ustawy.

   NIC TUTAJ NIE JEST OSZACOWANE. Jeżeli przepis się zmieni, zmienia się ta tabela.
   -------------------------------------------------------------------------- */
(function kalkulator(){
  var polTyp = document.getElementById('typ');
  var polLudzie = document.getElementById('ludzie');
  var polData = document.getElementById('data');
  if(!polTyp || !polLudzie) return;

  var wyZespoly = document.getElementById('w-zespoly');
  var wyPatrole = document.getElementById('w-patrole');
  var wyPunkt = document.getElementById('w-punkt');
  var wyKoordynator = document.getElementById('w-koordynator');
  var status = document.getElementById('status');
  var opis = document.getElementById('opis');
  var termin = document.getElementById('termin');

  /* próg, od którego impreza danego rodzaju jest imprezą masową */
  var PROGI = {
    'art-otwarta':   1000,
    'art-obiekt':     500,
    'sport-otwarta': 1000,
    'sport-obiekt':   300,
    'mecz':          1000
  };

  var NAZWY = {
    'art-otwarta':   'artystyczno-rozrywkowa na terenie otwartym',
    'art-obiekt':    'artystyczno-rozrywkowa w obiekcie',
    'sport-otwarta': 'sportowa na terenie otwartym',
    'sport-obiekt':  'sportowa w obiekcie',
    'mecz':          'mecz piłki nożnej'
  };

  function obsada(n){
    /* zwraca skład wymagany rozporządzeniem dla podanej liczby uczestników */
    if(n <= 5000)  return { zespoly:'1 × P',       patrole:1, punkt:false, koordynator:false };
    if(n <= 10000) return { zespoly:'1 × S + 1 × P', patrole:2, punkt:false, koordynator:false };
    if(n <= 15000) return { zespoly:'1 × S + 1 × P', patrole:2, punkt:true,  koordynator:true  };
    if(n <= 25000) return { zespoly:'1 × S + 1 × P', patrole:3, punkt:true,  koordynator:true  };
    /* powyżej 25 000 — jeden patrol więcej na każde kolejne rozpoczęte 10 000 osób */
    var dodatkowe = Math.ceil((n - 25000) / 10000);
    return { zespoly:'1 × S + 1 × P', patrole:3 + dodatkowe, punkt:true, koordynator:true };
  }

  function odmiana(n, jeden, kilka, wiele){
    if(n === 1) return jeden;
    var r10 = n % 10, r100 = n % 100;
    if(r10 >= 2 && r10 <= 4 && !(r100 >= 12 && r100 <= 14)) return kilka;
    return wiele;
  }

  function policzDni(){
    if(!polData || !polData.value){ termin.style.display = 'none'; return; }
    var dzis = new Date(); dzis.setHours(0,0,0,0);
    var impreza = new Date(polData.value + 'T00:00:00');
    if(isNaN(impreza)){ termin.style.display = 'none'; return; }

    var dni = Math.round((impreza - dzis) / 86400000);
    termin.style.display = 'inline-flex';
    termin.className = 'plakietka plakietka--limonka';

    if(dni < 0){
      termin.textContent = 'Podana data już minęła';
      termin.className = 'plakietka plakietka--ciemna';
    } else if(dni < 30){
      termin.className = 'plakietka plakietka--czerwona';
      termin.textContent = 'Zostało ' + dni + ' ' + odmiana(dni,'dzień','dni','dni') +
        ' — ustawowy termin 30 dni na złożenie wniosku już minął. Zadzwoń, sprawdzimy, co da się zrobić.';
    } else {
      termin.textContent = 'Do imprezy ' + dni + ' ' + odmiana(dni,'dzień','dni','dni') +
        ' · na złożenie wniosku zostało ' + (dni - 30) + ' ' + odmiana(dni - 30,'dzień','dni','dni');
    }
  }

  function przelicz(){
    var typ = polTyp.value;
    var n = parseInt(polLudzie.value, 10);
    policzDni();

    if(isNaN(n) || n <= 0){
      status.textContent = 'Uzupełnij liczbę uczestników';
      status.className = 'plakietka plakietka--ciemna';
      wyZespoly.textContent = wyPatrole.textContent = wyPunkt.textContent = wyKoordynator.textContent = '—';
      return;
    }

    var prog = PROGI[typ];

    /* impreza niemasowa — rozporządzenie nie ma zastosowania */
    if(n < prog){
      status.textContent = 'Impreza niemasowa (próg: ' + prog.toLocaleString('pl-PL') + ' osób)';
      status.className = 'plakietka plakietka--zielona';
      wyZespoly.textContent = '—';
      wyPatrole.textContent = '—';
      wyPunkt.textContent = '—';
      wyKoordynator.textContent = '—';
      opis.innerHTML = 'Przy tej liczbie uczestników impreza ' + NAZWY[typ] + ' <b>nie jest imprezą masową</b> ' +
        'w rozumieniu ustawy, więc rozporządzenie nie narzuca składu obsady. Nie znaczy to, że zabezpieczenie ' +
        'jest zbędne — dobieramy je do ryzyka: rodzaju atrakcji, wieku uczestników, dojazdu karetki i pory roku. ' +
        'Zadzwoń, powiemy, co ma sens przy takim wydarzeniu.';
      return;
    }

    /* tabela w rozporządzeniu zaczyna się od 1 000 uczestników */
    if(n < 1000){
      status.textContent = 'Impreza masowa — obsada ustalana indywidualnie';
      status.className = 'plakietka plakietka--czerwona';
      wyZespoly.textContent = '?';
      wyPatrole.textContent = '?';
      wyPunkt.textContent = 'nie';
      wyKoordynator.textContent = 'nie';
      opis.innerHTML = 'Impreza ' + NAZWY[typ] + ' przy ' + n.toLocaleString('pl-PL') + ' uczestnikach <b>jest imprezą masową</b> ' +
        '(próg wynosi ' + prog.toLocaleString('pl-PL') + ' osób), ale tabela składu w rozporządzeniu zaczyna się ' +
        'od 1 000 uczestników. Obsadę uzgadniamy z Tobą i ze służbami opiniującymi wniosek.';
      return;
    }

    var o = obsada(n);
    status.textContent = 'Impreza masowa — obsada wymagana rozporządzeniem';
    status.className = 'plakietka plakietka--czerwona';

    wyZespoly.textContent = o.zespoly;
    wyPatrole.textContent = o.patrole;
    wyPunkt.textContent = o.punkt ? 'tak' : 'nie';
    wyKoordynator.textContent = o.koordynator ? 'tak' : 'nie';

    var zdanie = 'Dla imprezy ' + NAZWY[typ] + ' przy ' + n.toLocaleString('pl-PL') + ' uczestnikach ' +
      'rozporządzenie wymaga: ' + o.zespoly.replace('×','x') + ' ' +
      (o.zespoly.indexOf('S') > -1 ? 'zespołu specjalistycznego i podstawowego' : 'zespołu podstawowego') +
      ', ' + o.patrole + ' ' + odmiana(o.patrole,'patrolu ratowniczego','patroli ratowniczych','patroli ratowniczych') +
      (o.punkt ? ', punktu pomocy medycznej' : '') +
      (o.koordynator ? ' oraz koordynatora medycznego' : '') + '. ';

    if(n > 25000){
      zdanie += 'Powyżej 25 000 uczestników dochodzi jeden patrol na każde kolejne rozpoczęte 10 000 osób. ';
    }

    zdanie += '<b>To jest wyliczenie z przepisu, nie oferta</b> — ostateczny skład potwierdzamy razem z Tobą ' +
      'i z opinią służb opiniujących wniosek.';

    opis.innerHTML = zdanie;
  }

  polTyp.addEventListener('change', przelicz);
  polLudzie.addEventListener('input', przelicz);
  if(polData) polData.addEventListener('change', przelicz);
  przelicz();
})();

/* --------------------------------------------------------------------------
   3. FORMULARZ — wersja demonstracyjna, nie wysyła danych
   -------------------------------------------------------------------------- */
(function formularz(){
  var form = document.getElementById('formularz');
  if(!form) return;
  var ok = document.getElementById('f-ok');

  form.addEventListener('submit', function(e){
    e.preventDefault();
    if(!form.checkValidity()){ form.reportValidity(); return; }
    ok.style.display = 'block';
    form.querySelector('button[type="submit"]').textContent = 'Zgłoszenie przyjęte';
    ok.scrollIntoView({ behavior:'smooth', block:'center' });
  });
})();

/* --------------------------------------------------------------------------
   4. SKLEP — filtry kategorii i koszyk
   -------------------------------------------------------------------------- */
(function sklep(){
  var siatka = document.getElementById('produkty');
  if(!siatka) return;

  var filtry = document.querySelectorAll('.filtr');
  var licznik = document.getElementById('licznik-produktow');
  var karty = Array.prototype.slice.call(siatka.querySelectorAll('.produkt'));

  function pokaz(kategoria){
    var widoczne = 0;
    karty.forEach(function(k){
      var pasuje = kategoria === 'wszystko' || k.getAttribute('data-kat') === kategoria;
      k.hidden = !pasuje;
      if(pasuje) widoczne++;
    });
    if(licznik) licznik.textContent = widoczne + ' z ' + karty.length + ' produktów';
  }

  filtry.forEach(function(f){
    f.addEventListener('click', function(){
      filtry.forEach(function(x){ x.setAttribute('aria-pressed','false'); });
      f.setAttribute('aria-pressed','true');
      pokaz(f.getAttribute('data-kat'));
    });
  });
  pokaz('wszystko');

  /* ---- koszyk ---- */
  var koszyk = document.getElementById('koszyk');
  var zaslona = document.getElementById('zaslona');
  var lista = document.getElementById('koszyk-lista');
  var suma = document.getElementById('koszyk-suma');
  var znacznik = document.getElementById('koszyk-znacznik');
  var otworz = document.getElementById('otworz-koszyk');
  var zamknij = document.getElementById('zamknij-koszyk');
  var pozycje = [];

  function zlotowki(gr){
    return (gr).toLocaleString('pl-PL', { minimumFractionDigits:2, maximumFractionDigits:2 }) + ' zł';
  }

  function rysuj(){
    lista.innerHTML = '';
    if(!pozycje.length){
      lista.innerHTML = '<li class="koszyk__pusty">Koszyk jest pusty.<br>Dodaj sprzęt, a przygotujemy wycenę z fakturą.</li>';
    }
    pozycje.forEach(function(p, i){
      var li = document.createElement('li');
      li.className = 'koszyk__poz';
      li.innerHTML = '<div><b>' + p.nazwa + '</b><span>' + zlotowki(p.cena) + ' · szt. ' + p.ile + '</span></div>' +
                     '<button class="koszyk__usun" aria-label="Usuń pozycję" data-i="' + i + '">×</button>';
      lista.appendChild(li);
    });

    var razem = pozycje.reduce(function(s,p){ return s + p.cena * p.ile; }, 0);
    var sztuk = pozycje.reduce(function(s,p){ return s + p.ile; }, 0);
    suma.textContent = zlotowki(razem);
    znacznik.textContent = sztuk;
    znacznik.style.display = sztuk ? 'flex' : 'none';
  }

  siatka.addEventListener('click', function(e){
    var guzik = e.target.closest('.produkt__dodaj');
    if(!guzik) return;
    var karta = guzik.closest('.produkt');
    var nazwa = karta.querySelector('h3').textContent.trim();
    var cena = parseFloat(karta.getAttribute('data-cena'));

    var istnieje = pozycje.filter(function(p){ return p.nazwa === nazwa; })[0];
    if(istnieje) istnieje.ile++;
    else pozycje.push({ nazwa:nazwa, cena:cena, ile:1 });

    guzik.setAttribute('data-dodany','1');
    guzik.textContent = 'W koszyku';
    setTimeout(function(){
      guzik.removeAttribute('data-dodany');
      guzik.textContent = 'Do koszyka';
    }, 1400);

    rysuj();
  });

  lista.addEventListener('click', function(e){
    var usun = e.target.closest('.koszyk__usun');
    if(!usun) return;
    pozycje.splice(parseInt(usun.getAttribute('data-i'),10), 1);
    rysuj();
  });

  function ustaw(otwarty){
    koszyk.setAttribute('data-otwarty', otwarty ? '1' : '0');
    zaslona.setAttribute('data-otwarty', otwarty ? '1' : '0');
  }
  if(otworz) otworz.addEventListener('click', function(){ ustaw(true); });
  if(zamknij) zamknij.addEventListener('click', function(){ ustaw(false); });
  if(zaslona) zaslona.addEventListener('click', function(){ ustaw(false); });
  document.addEventListener('keydown', function(e){ if(e.key === 'Escape') ustaw(false); });

  rysuj();
})();

/* --------------------------------------------------------------------------
   5. ZASIĘG — promień 100 km na mapie Polski
      Kontury z Natural Earth (przeniesione z dema Polski Express 24).
      Odległość liczona haversine'em między miastami — geometria, nie szacunek.
   -------------------------------------------------------------------------- */
(function promien() {
    var spokojnie = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var selA = document.getElementById('miasto-a');
    if (!selA) return;
    var selB = document.getElementById('miasto-b');

    var PROMIEN = 100; // km — obietnica z oferty

    // [nazwa, długość geogr., szerokość geogr.]
    var MIASTA = [
      ['Warszawa', 21.01, 52.23], ['Kraków', 19.94, 50.06], ['Łódź', 19.46, 51.76],
      ['Wrocław', 17.04, 51.11], ['Poznań', 16.93, 52.41], ['Gdańsk', 18.65, 54.35],
      ['Gdynia', 18.53, 54.52], ['Szczecin', 14.55, 53.43], ['Bydgoszcz', 18.00, 53.12],
      ['Toruń', 18.60, 53.01], ['Lublin', 22.57, 51.25], ['Białystok', 23.16, 53.13],
      ['Katowice', 19.02, 50.26], ['Gliwice', 18.67, 50.29], ['Tychy', 18.99, 50.13],
      ['Rybnik', 18.55, 50.10], ['Bielsko-Biała', 19.05, 49.82], ['Częstochowa', 19.12, 50.81],
      ['Kielce', 20.63, 50.87], ['Radom', 21.15, 51.40], ['Rzeszów', 22.00, 50.04],
      ['Tarnów', 20.99, 50.01], ['Nowy Sącz', 20.70, 49.62], ['Olsztyn', 20.49, 53.78],
      ['Elbląg', 19.40, 54.16], ['Opole', 17.93, 50.67], ['Wałbrzych', 16.28, 50.77],
      ['Legnica', 16.16, 51.21], ['Jelenia Góra', 15.73, 50.90], ['Zielona Góra', 15.51, 51.94],
      ['Gorzów Wielkopolski', 15.24, 52.74], ['Koszalin', 16.19, 54.19], ['Słupsk', 17.03, 54.46],
      ['Piła', 16.74, 53.15], ['Kalisz', 18.09, 51.76], ['Konin', 18.25, 52.22],
      ['Włocławek', 19.07, 52.65], ['Płock', 19.71, 52.55], ['Grudziądz', 18.75, 53.48],
      ['Ciechanów', 20.62, 52.88], ['Ostrołęka', 21.57, 53.09], ['Siedlce', 22.29, 52.17],
      ['Zamość', 23.25, 50.72], ['Suwałki', 22.93, 54.10], ['Mielec', 21.42, 50.29],
      ['Piotrków Trybunalski', 19.70, 51.41], ['Sieradz', 18.73, 51.60],
      ['Skierniewice', 20.16, 51.96], ['Żyrardów', 20.44, 52.05], ['Sochaczew', 20.24, 52.23],
      ['Pruszków', 20.81, 52.17], ['Jaworzno', 19.27, 50.20], ['Ostrowiec Świętokrzyski', 21.39, 50.93]
    ].sort(function (a, b) { return a[0].localeCompare(b[0], 'pl'); });

    // mapa: te same wzory, którymi narysowany jest kontur Polski w SVG
    function mx(lon) { return (lon - 14.0) * 55; }
    function my(lat) { return (55.0 - lat) * 90; }

    function odleglosc(a, b) {                       // haversine, kilometry
      var R = 6371, rad = Math.PI / 180;
      var dLat = (b[2] - a[2]) * rad, dLon = (b[1] - a[1]) * rad;
      var s1 = Math.sin(dLat / 2), s2 = Math.sin(dLon / 2);
      var h = s1 * s1 + Math.cos(a[2] * rad) * Math.cos(b[2] * rad) * s2 * s2;
      return 2 * R * Math.asin(Math.sqrt(h));
    }

    MIASTA.forEach(function (m, i) {
      selA.add(new Option(m[0], i));
      selB.add(new Option(m[0], i));
    });
    selA.value = MIASTA.findIndex(function (m) { return m[0] === 'Łódź'; });
    selB.value = MIASTA.findIndex(function (m) { return m[0] === 'Piotrków Trybunalski'; });

    var krag = document.getElementById('krag');
    var kragOpis = document.getElementById('krag-opis');
    var tor = document.getElementById('tor');
    var trasa = document.getElementById('trasa');
    var aPkt = document.getElementById('a-punkt');
    var aObw = document.getElementById('a-obwod');
    var aOpis = document.getElementById('a-opis');
    var bPkt = document.getElementById('b-punkt');
    var bOpis = document.getElementById('b-opis');
    var werdykt = document.getElementById('werdykt');
    var werdyktTxt = document.getElementById('werdykt-txt');
    var werdyktPod = document.getElementById('werdykt-pod');
    var poleKm = document.getElementById('f-km');

    function pokazKm(el, docelowo) {
      var start = parseFloat(el.dataset.v || '0');
      el.dataset.v = docelowo;
      if (spokojnie) { el.textContent = docelowo; return; }
      var t0 = performance.now(), czas = 400;
      cancelAnimationFrame(el._raf);
      function krok(t) {
        var p = Math.min(1, (t - t0) / czas);
        var e = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(start + (docelowo - start) * e);
        if (p < 1) el._raf = requestAnimationFrame(krok);
      }
      el._raf = requestAnimationFrame(krok);
    }

    function licz() {
      var a = MIASTA[+selA.value];
      var b = MIASTA[+selB.value];
      var km = Math.round(odleglosc(a, b));

      var ax = mx(a[1]), ay = my(a[2]);
      var bx = mx(b[1]), by = my(b[2]);

      // promień w pikselach: w pionie stały, w poziomie zależny od szerokości geogr.
      var ry = PROMIEN / 111.32 * 90;
      var rx = PROMIEN / (111.32 * Math.cos(a[2] * Math.PI / 180)) * 55;

      krag.setAttribute('cx', ax.toFixed(1));
      krag.setAttribute('cy', ay.toFixed(1));
      krag.setAttribute('rx', rx.toFixed(1));
      krag.setAttribute('ry', ry.toFixed(1));
      kragOpis.setAttribute('x', (ax - rx + 4).toFixed(1));
      kragOpis.setAttribute('y', (ay - ry - 10).toFixed(1));

      aPkt.setAttribute('cx', ax.toFixed(1)); aPkt.setAttribute('cy', ay.toFixed(1));
      aObw.setAttribute('cx', ax.toFixed(1)); aObw.setAttribute('cy', ay.toFixed(1));
      aOpis.setAttribute('x', (ax - 10).toFixed(1));
      aOpis.setAttribute('y', (ay + 32).toFixed(1));
      aOpis.setAttribute('text-anchor', 'middle');
      aOpis.textContent = a[0];

      bPkt.setAttribute('cx', bx.toFixed(1)); bPkt.setAttribute('cy', by.toFixed(1));
      bOpis.setAttribute('x', (bx + (bx > ax ? 14 : -14)).toFixed(1));
      bOpis.setAttribute('y', (by - 12).toFixed(1));
      bOpis.setAttribute('text-anchor', bx > ax ? 'start' : 'end');
      bOpis.textContent = b[0];

      var d = 'M' + ax.toFixed(1) + ' ' + ay.toFixed(1) + ' L' + bx.toFixed(1) + ' ' + by.toFixed(1);
      tor.setAttribute('d', d);
      trasa.setAttribute('d', d);

      pokazKm(poleKm, km);

      if (a[0] === b[0]) {
        werdykt.classList.remove('nie');
        werdyktTxt.textContent = 'Kurs miejski';
        werdyktPod.textContent = 'Odbiór i dostawa w tej samej miejscowości — najkrótszy możliwy kurs.';
      } else if (km <= PROMIEN) {
        werdykt.classList.remove('nie');
        werdyktTxt.textContent = 'Mieści się w promieniu';
        werdyktPod.textContent = 'Od ' + a[0] + ' do ' + b[0] + ' jest ' + km +
          ' km — mniej niż 100. Jedziemy nawet tego samego dnia.';
      } else {
        werdykt.classList.add('nie');
        werdyktTxt.textContent = 'Poza promieniem — kurs dedykowany';
        werdyktPod.textContent = 'Od ' + a[0] + ' do ' + b[0] + ' jest ' + km +
          ' km. Jedziemy i tam, kursem dedykowanym — godzinę potwierdza dyspozytor przy zleceniu.';
      }
    }

    selA.addEventListener('change', licz);
    selB.addEventListener('change', licz);
    licz();
  })();
