var numeroCadeiras = 0;
var paiCadeiras = document.querySelector(".pai-das-cadeiras");
var cadeirasDisponiveis = 0;
var cadeirasSelecionadas = 0;

while(numeroCadeiras < 48){
    numeroCadeiras++
    paiCadeiras.innerHTML+="<div class='cadeiras' onclick=functionDasCadeiras("+numeroCadeiras+")>"+numeroCadeiras+"</div>";
}

cadeirasDisponiveis = paiCadeiras.children.length;
document.querySelector(".cadeirasDisponiveis").innerHTML="Cadeiras Disponiveis: "+ cadeirasDisponiveis;

function functionDasCadeiras(numero){
    if(paiCadeiras.children[numero-1].classList[1]=="vendida"){
    } else {
        if(paiCadeiras.children[numero-1].classList[1]=="marcado"){
            paiCadeiras.children[numero-1].classList.remove("marcado");
            cadeirasSelecionadas -= 1;
            document.querySelector(".cadeirasSelecionadas").innerHTML="Cadeiras Selecionadas: " +cadeirasSelecionadas
        } else {
            paiCadeiras.children[numero-1].classList.add("marcado");
            cadeirasSelecionadas++;
            document.querySelector(".cadeirasSelecionadas").innerHTML="Cadeiras Selecionadas: " +cadeirasSelecionadas
        }
    }
}

function venderCadeira(){
    var cadeirasmarcadas = document.querySelectorAll(".cadeiras.marcado");
    let contadorVendaCadeiras = 0
    while(contadorVendaCadeiras < cadeirasmarcadas.length){
        cadeirasmarcadas[contadorVendaCadeiras].classList.add("vendida");
        cadeirasmarcadas[contadorVendaCadeiras].classList.remove("marcado");
        cadeirasDisponiveis -= 1;
        contadorVendaCadeiras++;
        cadeirasSelecionadas -= 1;
    }
    document.querySelector(".cadeirasDisponiveis").innerHTML="Cadeiras Disponiveis: "+ cadeirasDisponiveis;
    document.querySelector(".cadeirasSelecionadas").innerHTML="Cadeiras Selecionadas: "+ cadeirasSelecionadas;
}
let buttonDeVenda = document.querySelector(".buttonVenda");
buttonDeVenda.addEventListener("click",venderCadeira);

