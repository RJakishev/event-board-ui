Proovitöö lähteülesanne
Luua süsteem, mis võimaldab luua sündmuseid ja kasutajatel registreeruda sündmustele. Rakenduses on
kaks rolli, kuid autentida peab saama vaid admin kasutajaga.
Üldised nõuded
Süsteemis on kahte tüüpi kasutajaid: admin ja tavakasutaja.
 Lehel peab olema üleval riba peal autentimise nupp - selleks, et admin rollis kasutaja saaks sisse logida.
 Lehel peab olema nimekiri sündmustest - see tekib siis kui admin on lisanud sündmuseid. Kui sündmuseid ei
ole, siis peaks olema vastav teade.
 Funktsionaalsed nõuded, nt väljade valideerimine või veateadete kuvamine on vaba valik.
Admin kasutaja funktsionaalsused
 Admin kasutaja saab sisse logida eposti ja parooliga.
o Admin kasutaja epost ja parool peavad olema rakenduse konfiguratsioonis (et admin kasutajat saaks
vajadusel vahetada)

 Admin kasutaja saab lisada uue sündmuse. Sündmusel on nimetus, aeg ja maksimaalne rahvaarv
 Admin ei pea saama kustutada sündmust
Tavakasutaja funktsionaalsused
 Tavakasutaja ei saa sisse logida
 Lehele liikudes näeb tavakasutaja adminni poolt loodud sündmuste nimekirja
 Saab valida nimekirjast sündmuse ja registreeruda
o Üks kasutaja võib registreeruda mitmele sündmusele
 Peole registreerimisel peab sisestama eesnime, perenime ja isikukoodi
 Tavakasutaja ei pea saama sündmusele registreerumist tühistada

Proovitöös kasutatavad tehnoloogiad
 Backend teenus – Java
 Frontend - React, Angular või Vue
Frontend kujundus ei ole tähtis. Võib olla vabalt valitud UI raamistik või kasvõi isetehtud css fail.
Andmete hoiustamine - vabalt valitud andmebaas (PostgreSQL, MSSQL, Oracle, H2, SQLite). Kui
andmebaasi üles seadmine tundub liiga ajakulukas, siis andmeid võib salvestada ka failidena. Näiteks
kuhugi temp kausta salvestada syndmused.json ja osalejad.json vms.