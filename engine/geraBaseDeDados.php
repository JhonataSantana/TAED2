<?php

$texto = file_get_contents('./../data/dicionario_com_acento.txt');
preg_match_all("/[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]+/", htmlspecialchars(strtolower($texto)), $resultados);

$palavras = $resultados[0];
$dicionario = array();

foreach ($palavras as $palavra){
    $dicionario[$palavra] = 1;
}

file_put_contents('./../data/dicionario_serializado.dat', serialize($dicionario));
