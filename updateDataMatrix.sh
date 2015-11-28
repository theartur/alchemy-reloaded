wget http://www1.caixa.gov.br/loterias/_arquivos/loterias/D_megase.zip -N -P "raw/"
unzip -d raw/ -o raw/D_megase.zip D_MEGA.HTM 
node updateDataMatrix.js