<?php

header("Content-type: text/html; charset=utf-8");

if(!isset($_POST['palavra']) && !isset($_POST['palavra'])){
    exit();
}

$palavra = $_POST['palavra'];

function consultaPalavra($palavra_procurada) {

    $dicionario = unserialize(file_get_contents('./../data/dicionario_serializado.dat'));
    $menorDistancia = -1;
    $palavra_procurada = strtolower($palavra_procurada);

    foreach($dicionario as $palavra_do_dicionario => $peso) {

            if($palavra_procurada == $palavra_do_dicionario) return array($palavra_procurada);

            $distancia = levenshtein($palavra_procurada,$palavra_do_dicionario);
            $dicionario[$palavra_do_dicionario] = $distancia;

            if($distancia < $menorDistancia || $menorDistancia == -1) {
                $menorDistancia = $distancia;
            }
    }

    asort($dicionario);

    $base = min($dicionario);

    $sugestoes = array_filter($dicionario, function($peso) use ($base){
        return $peso == $base;
    });

    $posicao = 0;
    
    foreach($sugestoes as $palavra => $peso){
        $sugestoes[$palavra] = $posicao;
        $posicao++;
    }

    $sugestoes = array_flip($sugestoes);

    return $sugestoes;

}

function array2JSON($sugestoes, $palavra_procurada){
    $json = '{"response": [';
    $primeiro = 1;
    foreach($sugestoes as $palavra){
        if($primeiro < 1){
            $json .= ',';
        }
        $json .= '"'.$palavra.'"';
        $primeiro--;
    }
    $json .= '],';
    $json .= '"exist": ';
    if(sizeof($sugestoes) == 1 && $sugestoes[0] == $palavra_procurada){
        $json .= 'true';
    }else{
        $json .= 'false';
    }
    $json .= '}';

    return $json;
}

echo array2JSON(consultaPalavra($palavra), $palavra);
