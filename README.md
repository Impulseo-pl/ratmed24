# RatMed24 — demo

Demo dla leada: **RatMed24** — szkolenia pierwszej pomocy, zabezpieczenia medyczne,
transport medyczny osób, ekspresowy transport leków, sklep ze sprzętem ratowniczym.

Dwie strony: `index.html` (usługi) + `sklep.html` (30 produktów).

Podgląd lokalny:

```powershell
python -m http.server 8101   # w katalogu projektu
```

## Domena — sprawdzone 22.09.2026

**`ratmed24.pl` jest WOLNA.** Rejestr NASK (RDAP `https://rdap.dns.pl/domain/ratmed24.pl`)
zwraca 404, domena nie ma też żadnych rekordów DNS. Klient jej nie ma i jej nie wykupił.
Link, który przysłał, to koszyk OVH z `ratmed24.pl` na 2 lata — czyli był na etapie zakupu,
ale go nie dokończył. **Domena wchodzi w cenę naszej usługi na rok** — nie ma po co kupować
jej osobno w OVH.

## Dane od klienta

- Nazwa: **RatMed24**
- Szkolenia pierwszej pomocy dla firm i instytucji
- Sklep z artykułami medycznymi — **do 30 produktów na start**, później rozbudowa
  (plecaki, torby ratownicze, stroje ratownicze itd.)
- Zabezpieczenia medyczne
- Transport medyczny — dowożenie ludzi do lekarza i na dializy
- Dodatkowo: zakładka **ekspresowy transport leków i artykułów medycznych**
- Wyróżnik: **szybkość, niezawodność, dostawa nawet tego samego dnia na terenie całej Polski**
- Kolorystyka: medyczna, czytelna, ma przypominać stronę dla ratowników

## Do uzupełnienia przed wdrożeniem

1. **Telefon** — w całym kodzie placeholder `+48 XXX XXX XXX` / `tel:+48000000000`
2. **E-mail** — wpisane `kontakt@ratmed24.pl` (propozycja, domena wolna)
3. **Adres siedziby, NIP, numer wpisu do rejestru podmiotów leczniczych** — stopka
4. **Godziny dyżuru** — nazwa „24" sugeruje całą dobę, ale klient tego nie potwierdził;
   **nie wolno deklarować 24/7 bez jego słowa**
5. **Ceny szkoleń i zabezpieczeń** — w tabeli szkoleń stoi „do ustalenia"
6. **Godzina graniczna zleceń na dostawę tego samego dnia** — sekcja transportu leków
7. **Ceny w sklepie** — patrz niżej
8. **Zdjęcia** — obecnie rysunki SVG; docelowo zdjęcia szkoleń, ambulansu i produktów
9. **Opinie Google** — brak sekcji, do dodania gdy klient poda wizytówkę
10. **Regulamin sklepu, polityka prywatności, wzór formularza odstąpienia**

## Zasada, której pilnowałem: zero zmyślonych liczb

Na stronie nie ma ani jednej wymyślonej liczby o firmie — żadnych „15 lat doświadczenia",
„500 przeszkolonych osób" czy „reakcja w 30 minut". Wszystkie liczby pochodzą z przepisów:

| Liczba na stronie | Źródło |
|---|---|
| Skład obsady medycznej imprezy masowej | Rozporządzenie MZ z 6.02.2012 (Dz.U. 2012 poz. 181) |
| Progi imprezy masowej (1000 / 500 / 300) | Ustawa z 20.03.2009 o bezpieczeństwie imprez masowych |
| Termin 30 dni na wniosek | j.w., art. 25 |
| Obowiązek wyznaczenia i przeszkolenia pracowników | Art. 209¹ Kodeksu pracy |
| KPP 66 h (25 h teorii / 41 h praktyki), ważność 3 lata | Program kursu KPP wg ustawy o PRM |
| Zakresy temperatur 2–8 / 8–15 / 15–25 °C | Wymagania przewozu produktów leczniczych |
| Odstąpienie 14 dni + wyjątek higieniczny | Ustawa o prawach konsumenta, art. 38 pkt 5 |

**Ceny w sklepie** to realne ceny rynkowe zebrane 22.09.2026 z polskich sklepów ratowniczych
(sklepratowniczy.pl, sklep.centrumratownictwa.com, medyczny.store, eproma.pl, torbymedyczne.pl).
Są wstawione **wyłącznie poglądowo** i tak opisane na stronie oraz przy każdej cenie
(„cena poglądowa"). Do podmiany na cennik RatMed24 przed uruchomieniem.

## Czego nie ma na stronie i dlaczego

- **Nie ma „certyfikatu GDP dla przewoźnika"**, którym chwalą się niektóre strony kurierskie.
  Taki certyfikat w Polsce nie istnieje — GIF wydaje certyfikaty GDP hurtowniom po inspekcji.
  Napisanie tego wywróciłoby wiarygodność przy pierwszym pytaniu farmaceuty.
  Zamiast tego jest uczciwy opis: wozimy na zlecenie apteki/hurtowni, odpowiedzialność
  za zgodność z Dobrą Praktyką Dystrybucyjną zostaje po stronie zlecającego.
- **Nie ma deklaracji 24/7** — mimo „24" w nazwie. Do potwierdzenia z klientem.
- **Nie ma dofinansowania z PFRON** opisanego jako pewnik. „Likwidacja barier
  w komunikowaniu się" dotyczy porozumiewania się, nie przejazdów; dofinansowanie transportu
  idzie zwykle przez programy powiatowe. Na stronie jest bezpieczna formuła:
  „pomagamy skompletować dokumenty, o dofinansowanie pytaj w swoim PCPR/MOPS".

## Co odróżnia to demo od konkurencji

Przebadaliśmy ~40 stron z trzech branż klienta. Trzy rzeczy, których **nie ma nikt**:

1. **Kalkulator obsady medycznej** (`#kalkulator`) — wpisujesz rodzaj imprezy, liczbę
   uczestników i datę, dostajesz skład wymagany rozporządzeniem plus licznik dni do terminu
   złożenia wniosku. W całej branży istnieje jedna statyczna tabela (triage.pl) i zero widgetów.
2. **Uczciwe postawienie sprawy NFZ** przy dializach — konkurencja przemilcza, że stacja dializ
   ma obowiązek zapewnić bezpłatny transport. Powiedzenie tego wprost kupuje zaufanie.
3. **Ścieżka dla jednostek budżetowych** w sklepie — proforma, odroczony termin, dokumenty CE.
   Jednostki OSP i szkoły to główny klient tych sklepów, a żaden nie ma dla nich osobnej ścieżki.

Dodatkowo: sticky pasek telefonu na komórce (połowa badanych stron nie ma nawet klikalnego
numeru), formularz z polami, które faktycznie są potrzebne do wyceny (data, liczba uczestników,
miejscowość), tabela „co podajesz przy zamówieniu kursu" przy transporcie pacjenta.

## Kierunek wizualny

Paleta ratownicza zamiast generycznej medycznej: **czerwień ambulansowa `#C8102E`**,
grafit `#16202B`, hi-viz limonka `#CDE500` i błękit `#005EB8` — te dwa ostatnie tworzą
**pas Battenburg** (szachownica z boku ambulansu) pod hero i nad stopką.
Typografia **Barlow Condensed** (nagłówki, wersaliki — klimat służb) + **Barlow** (tekst)
+ **IBM Plex Mono** (dane techniczne, numery sekcji).

Ostre krawędzie, linie siatki zamiast cieni, numeracja sekcji jak pozycje w kosztorysie.
Trzy sekcje ciemne wyłamane z jasnej strony (zabezpieczenia, transport leków, zakupy
dla jednostek), żeby strona nie była jednym slajdem.
Logo: **gwiazda życia** (sześcioramienna gwiazda ratownictwa) rysowana w SVG.

## Uwagi sprzedażowe

- Demo **pokazujemy na żywo przy kliencie**, prowadząc po ekranie. Kalkulator obsady
  jest do kliknięcia razem z nim — wpisać jego realną imprezę i pokazać wynik.
- Cennik: klient chce **stronę i sklep**. To nie jest 1500 zł. Trzeba mieć ustaloną jedną
  liczbę przed rozmową — inaczej wychodzi „wszystko do dogadania".
- Zdjęcia i logo dostarcza klient (zgodnie z ofertą).

## Wersja 2 — 22.09.2026

Zmiany po uwagach: **mniej tekstu, spokojniejsza kolorystyka, zdjęcia, mapa Polski.**

- Wycięte sekcje: proces w czterech krokach, karta dyżuru w hero, listy pod kartami usług,
  czterostopniowa oś przy transporcie leków, tabela „co podajesz przy zamówieniu kursu",
  dwa pytania z FAQ. Strona zeszła o mniej więcej jedną trzecią treści.
- Wyciszone: numery sekcji z czerwonych na szare, nagłówki H2 bez wersalików, pas demo
  z limonkowego na szary, wynik kalkulatora z limonki na biel, pas Battenburg z 10 na 5 px,
  akcent w nagłówku hero z różowego na biały.
- **Mapa Polski z promieniem 100 km** — przeniesiona z dema Polski Express 24
  (`kurier-ekspresowy`, commit 895eab5). Kontury z Natural Earth, odległość liczona
  haversine'em między 53 miastami. Kadr zacieśniony do `viewBox="-16 -14 596 572"`.
  **Nie edytować `d="..."` ręcznie.**

### ⚠️ Sprzeczność do rozstrzygnięcia z klientem

Klient powiedział: *„dostawy nawet tego samego dnia na terenie **całej Polski**"*.
Na stronie stoi teraz: *„do **100 km** od odbioru — nawet tego samego dnia"*, bo taka była
decyzja przy zamawianiu mapy. To **zawęża** jego własną obietnicę. Do potwierdzenia:
czy trzymamy 100 km jako granicę pewnej dostawy tego samego dnia (a dalej kurs dedykowany
z godziną od dyspozytora), czy wracamy do „cała Polska tego samego dnia".

### Zdjęcia

Poglądowe, z Wikimedia Commons, do wymiany na zdjęcia klienta. Każde podpisane na stronie
jako poglądowe, licencje wymienione w stopce. Źródła:

- `0.2014-06-14 Traugutta-Straße in Sanok.JPG` — CC BY-SA 3.0, aut. <a href="//commons.wikimedia.org/w/index.php?title=User:Silar&amp;acti
- `2015 Woodstock 064 Medyczny Patrol.jpg` — CC BY 4.0, aut. Ralf Lotys (Sicherlich)
- `2021 Pol’and’Rock (108) Scena.jpg` — CC BY 4.0, aut. Ralf Lotys (Sicherlich)
- `2023 -Pol’and’Rock (109) Ratownicy.jpg` — CC BY 4.0, aut. Ralf Lotys (Sicherlich)
- `Aed-defibrillators-c2fa8edb.jpg` — CC BY-SA 4.0, aut. <a href="//commons.wikimedia.org/w/index.php?title=User:AEDUSA&amp;act
- `Budynek handlowo-usługowy, ul. Dominikańska 2-4, Góra Kalwaria.jpg` — CC BY-SA 4.0, aut. Piotr Strębski

Pliki w `img/`: `hero-ratownicy`, `szkolenie-aed`, `zabezpieczenia`, `transport-ambulans`,
`leki-apteka`, `pas-impreza` — każdy w dwóch rozmiarach (`-sm` dla telefonu), format WebP.
Przy wdrożeniu podmieniamy na zdjęcia RatMed24 i usuwamy wzmiankę o licencjach ze stopki.


---

## Wersja 3 — 22.09.2026: przebudowa na pięć podstron

Powód: strona wyglądała słabo, treść była ogólna i nie była przygotowana ani pod wyszukiwarkę,
ani pod klienta, który szuka konkretnej usługi. Wersja 2 była cicha, ale pusta — wycięcie
jednej trzeciej treści poprawiło wygląd i zepsuło użyteczność.

### Co się zmieniło strukturalnie

Jedna strona na pięć usług to dla Google jeden temat. Teraz jest sześć adresów,
każdy z własną frazą, tytułem, H1, treścią i FAQ:

| Adres | Fraza główna | Persona |
|---|---|---|
| `index.html` | ratownicy medyczni / usługi medyczne dla firm | ktoś, kto sprawdza, czy to poważna firma |
| `szkolenia-pierwszej-pomocy.html` | szkolenie z pierwszej pomocy dla firm | specjalista BHP, kadrowa, dyrektor szkoły |
| `zabezpieczenie-medyczne-imprez.html` | zabezpieczenie medyczne imprez | organizator biegu, koordynator w gminie |
| `transport-medyczny.html` | transport medyczny / transport na dializy | córka pacjenta dializowanego |
| `transport-lekow.html` | ekspresowy transport leków | kierownik apteki, koordynator laboratorium |
| `sklep.html` | apteczka zakładowa, torba R1, AED do firmy | osoba od BHP z zadaniem „doposażyć apteczki” |

Każda podstrona: okruszki, spis treści, 800–1200 słów treści, 6–7 pytań FAQ zadanych tak,
jak pyta klient, przyklejony blok z telefonem, sekcja cennika i sekcja „od czego zależy cena”.

### Ceny — najważniejsza zmiana merytoryczna

Research obu agentów dał ten sam wniosek: **10 z 14 polskich firm w tych branżach nie podaje
żadnej ceny.** Kto poda widełki, wygrywa porównanie, zanim ktokolwiek zadzwoni. Dlatego
na każdej podstronie usługowej jest cennik z widełkami i wyjaśnieniem, od czego zależy kwota.

⚠️ **Wszystkie kwoty w cennikach to stawki rynkowe zebrane 22.09.2026 z cenników innych firm**
(Triage, Ratomed, Falck, Nona Med, CAR-MED, GT Trans, med-learn, sklepy ratownicze).
Każda tabela ma widoczną adnotację „Demo”. **Przed publikacją zastępujemy je cennikiem RatMed24** —
inaczej klient zobaczy cudze stawki jako swoje.

### Schema.org — poprawka błędu z wersji 1

Było `EmergencyService`, czyli sygnał „pogotowie ratunkowe / 112". RatMed24 nim nie jest,
więc to było ryzyko wprowadzenia w błąd. Jest:

- `MedicalBusiness` z `@id` jako encja główna (tylko na stronie głównej)
- `Service` na każdej podstronie usługowej, spięty z encją firmy przez `@id`
- `Course` + `CourseInstance` przy szkoleniach (szansa na wynik rozszerzony)
- `FAQPage` wszędzie, gdzie pytania są widoczne w HTML
- `BreadcrumbList` na każdej podstronie
- `CollectionPage` w sklepie — **bez `Product`**, dopóki ceny są poglądowe; fałszywa cena
  w danych strukturalnych to ryzyko kary

### Treść pisana do konkretnej osoby

- **Dializy** — pisane do rodziny, nie do pacjenta. Rozbrojone realne lęki: „zniesiemy
  z czwartego piętra bez windy”, „jedna osoba towarzysząca bez dopłaty”, „nie odjeżdżamy
  bez pacjenta, jeśli zabieg się przedłuży”.
- **Szkolenia** — dla kadrowej: podstawa prawna, zaświadczenia imienne plus lista zbiorcza
  do teczki, program godzina po godzinie, reguła liczenia ilu pracowników wyznaczyć
  (z przykładem dla zakładu 120-osobowego na trzy zmiany).
- **Zabezpieczenia** — kalkulator obsady przeniesiony tutaj, plus wyjaśnienie, co znaczą
  P, S i patrol, oraz lista dokumentów do wniosku.
- **Leki** — dla kierownika apteki: zakresy temperatur, zapis temperatury jako dokument,
  procedura przy nieobecnym odbiorcy.

### Wygląd

Nowe komponenty: hero z mozaiką zdjęć, kafle usług ze zdjęciami zamiast ikon, okruszki,
spis treści, tabele cennika, kroki współpracy, pasek dowodów, przyklejony blok kontaktu
przy treści. Nagłówki podstron zeszły z wersalików do normalnej wielkości liter, pas
Battenburg z 10 na 4 px i w wyciszonych barwach.

**Zdjęć jest dwanaście** (było sześć), wszystkie z Wikimedia Commons, CC BY / CC BY-SA,
opisane na stronie jako poglądowe. Pexels i Pixabay blokują pobieranie automatyczne.

### Czego nadal brakuje — i co to blokuje

1. **Miejscowość bazy klienta.** To jest teraz największa dźwignia SEO, jakiej nie możemy
   ruszyć. Branża gra podstronami miastowymi (`transport medyczny [miasto]`) i tak wygląda
   cały TOP10. Bez miasta nie da się ich zrobić, a to właśnie one dają ruch lokalny.
   Po podaniu miasta: 6 podstron w pierwszej kolejności, każda z realnymi placówkami
   docelowymi, czasem dojazdu i ceną kursu — minimum 60% unikatowej treści, inaczej Google
   uzna je za doorway.
2. **Telefon, e-mail, adres, NIP, numer wpisu do rejestru podmiotów leczniczych.**
3. **Realny cennik** zamiast widełek rynkowych.
4. **Godziny dyżuru** — nazwa „24" nie znaczy 24/7, dopóki klient tego nie potwierdzi.
5. **Godzina graniczna zleceń** na dostawę tego samego dnia.
6. **Zdjęcia własne** — szkolenia, ambulans, zespół, produkty.
7. **Wizytówka Google** — bez niej lokalne SEO stoi w miejscu niezależnie od strony.

---

## Wersja 4 — 23.09.2026: SEO techniczne, odchudzenie, nowy projekt

### SEO techniczne

| Co | Jak |
|---|---|
| Jeden `H1` na stronę, hierarchia `H2`/`H3` | sprawdzone audytem na wszystkich stronach |
| Dane strukturalne | `MedicalBusiness` + `WebSite` (główna), `Service`, `Course`, `FAQPage`, `BreadcrumbList`, `CollectionPage` — spięte przez `@id` |
| Okruszki | widoczne na stronie i w `BreadcrumbList` |
| Linkowanie wewnętrzne | blok „Zobacz też" z trzema innymi usługami na każdej podstronie |
| `canonical`, `og:*`, `twitter:card` | na każdej stronie, generowane z jednego miejsca |
| `robots` | `index, follow, max-image-preview:large`; `noindex` na `404` i `zrodla-zdjec` |
| `sitemap.xml` | 6 adresów z `lastmod` |
| Strona 404 | `404.html` z listą wszystkich usług — GitHub Pages podaje ją automatycznie |
| Wydajność | `preload` + `fetchpriority` na zdjęciu nagłówkowym każdej strony, `loading="lazy"` i `decoding="async"` na pozostałych, `defer` na skrypcie |
| Dostępność | link „Przejdź do treści", `<main id="tresc">`, `aria-current` w menu, etykiety pól |

**Usunięty zmyślony telefon z danych strukturalnych.** W wersji 3 w `MedicalBusiness` siedział
placeholder `+48000000000`. Numer w danych strukturalnych musi być prawdziwy — wraca, gdy
klient poda swój.

### Odchudzenie

- **Arkusz stylów napisany od zera**: 37 kB → 34 kB, ale bez ani jednej martwej klasy.
  Poprzednia wersja miała 29 reguł po nieistniejących już komponentach (`hero__filary`,
  `pozycja`, `os__krok`, `przelacznik`…).
- **Usunięte 9 nieużywanych zdjęć**: katalog `img/` z 2150 kB → **940 kB**.
- Usunięty pas Battenburg — trzy razy z rzędu wychodził najgłośniejszym elementem strony.
  Tożsamość ratowniczą niesie logo z gwiazdą życia.
- Górny pasek przestał dublować menu.

### Nowy projekt wizualny

- **Ciepły papier zamiast zimnej szarości** (`#F6F5F2`) — strona wygląda jak druk, nie jak panel.
- **Karty bez ramek** — górna krawędź 2 px zamiast pudełka. Dotyczy kafli usług, dowodów,
  kroków, cennika, FAQ i kontaktu.
- **Nagłówki sekcji z numerem i linią** biegnącą do końca kolumny, zamiast czerwonej plakietki.
- **Cyfry tabelaryczne** w cenach, telefonach i wynikach kalkulatora — kolumny się nie ruszają.
- **Sklep**: kwadratowe kafle produktów na ciepłym tle, przyklejony pasek filtrów,
  czytelniejszy blok ceny, przycisk „Do koszyka" w wersji obrysowej.
- Podkreślenia w menu wjeżdżają od lewej, zdjęcia w kaflach lekko się przybliżają przy najechaniu.

### Uwaga o wygenerowanych plikach

Strony powstają z jednego generatora (`szkielet.py` w katalogu roboczym sesji), dlatego
nagłówek, nawigacja, stopka i pasek telefonu są identyczne wszędzie. Przy ręcznej edycji
HTML-a trzeba pamiętać, że kolejne przebudowanie nadpisze zmiany.

---

## Wersja 5 — 28.09.2026: zespół Poland Rescue Team i nowe logo

Źródło: dokument klienta `Poland_Rescue_Team_-_Struktura_Organizacyjna.pdf` (REF: PRT-SOP-2026-01)
i emblemat `KPP_Special_Response_emblem_logo` + zdjęcie naszywki (`IMG_5011.jpeg`) z Pulpitu.

- **Logo**: emblemat PRT (wycięty do koła, przezroczyste tło) zamiast gwiazdy życia w SVG —
  nagłówek, stopka, favicona (`img/logo-prt-sm.webp`, `logo-prt-180.png`), dane strukturalne.
  Podpis pod nazwą: „Poland Rescue Team · KPP”.
- **Nowa podstrona `zespol.html`**: hierarchia dowodzenia (Dowódca / Starszy Ratownik KPP /
  Ratownik KPP / Ratownik-Kierowca), łańcuch meldunkowy (podległość, SBAR, briefing/debriefing),
  standardy (uprawnienia KPP, ŚOI, wyjazd sekcji do 5 min), FAQ, schema `AboutPage` + `Organization`.
  Pozycja „Zespół” w menu i w stopce, wpis w `sitemap.xml`.
- **Strona główna**: emblemat nad H1, pasek pod hero („Jeden dowódca na miejscu”, „Wyjazd do 5 minut”),
  nowa ciemna sekcja 02 „Kto przyjeżdża na miejsce” z czterema rolami i mottem. `MedicalBusiness`
  dostał `logo` i `subOrganization`.
- **Zabezpieczenia**: nowy rozdział „Kto dowodzi na miejscu”.
- Menu chowa się do hamburgera od 1080 px (7 pozycji nie mieściło się z przyciskiem „Zadzwoń”).

Liczba „5 minut” pochodzi z dokumentu klienta, więc wolno ją pokazywać.

Opisy ról, łańcuch meldunkowy i standardy są przepisane **dosłownie z PDF** (decyzja Szymona 28.09).
Do ustalenia z klientem:
- „Bazyfikacja” — w polszczyźnie nie ma takiego słowa; propozycja: „kierowanie działaniami”.
- „Działania w pełnym zakresie Ustawy o PRM” — ratownik KPP nie ma pełnego zakresu ustawy
  (to ratownik medyczny); propozycja: „w zakresie KPP określonym w ustawie o PRM”.

Do wyjaśnienia z klientem:
- Relacja nazw: na stronie RatMed24 = firma, Poland Rescue Team = jej zespół ratowniczy.
  Jeśli PRT ma być główną marką, trzeba zmienić nazwę w nagłówku, tytułach i schemacie.
- Pozostałe podstrony (szkolenia) mówią o „czynnym ratowniku medycznym”, a zespół to ratownicy KPP —
  potwierdzić, kto prowadzi szkolenia.

Generator: `szkielet.py` + `str_*.py` w katalogu roboczym sesji
`...\3647f00a-6b3c-4023-9cef-44f13b316aad\scratchpad\gen\` (nowe: `str_zespol.py`, `str_zrodla2.py`).
