<?php

header("Content-type: text/html; charset=utf-8");

function consultaPalavra($palavra_procurada) {

    $dicionario = unserialize(file_get_contents('./../data/dicionario_serializado.dat'));
    $menorDistancia = -1;
    $palavra_procurada = strtolower($palavra_procurada);

    foreach($dicionario as $palavra_do_dicionario => $peso) {

            if($palavra_procurada == $palavra_do_dicionario) return $palavra_procurada;

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

echo htmlspecialchars(consultaPalavra("mágua")[0]);
