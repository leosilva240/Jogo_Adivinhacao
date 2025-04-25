let resultado = document.getElementById("resultado")
let sectionPalpite = document.getElementById("sectionPalpite")
let sectionInicio = document.getElementById("sectionInicio")
let fim = document.getElementById("fim")
//Função pra abrir e mostrar as seções de acordo com as etapas
function mostrarOcultar(secao){
    if (secao.classList.contains("oculto")) {
        secao.classList.remove("oculto");
    } else secao.classList.add("oculto")
}
mostrarOcultar(sectionInicio)
// Função para gerar um número aleatório dentro de um intervalo definido
function sortearNumero(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}
//Função pra pegar o palpite e ler pra comparar com o numero Sorteado
function lerPalpite(){
    palpite = parseInt(document.getElementById("palpite").value)
    document.getElementById("palpite").value = ""
    return palpite
}
//Função pra definir os intervalor e tentativas
document.getElementById('iniciar').addEventListener('submit', function(event) {
    event.preventDefault();
    let min = parseInt(document.getElementById("min").value)
    let max = parseInt(document.getElementById("max").value)
    let tentativas = parseInt(document.getElementById("tentativas").value)
    if (tentativas <= 0 ){
        resultado.innerHTML = `O numero de tentativas informado é menor ou igual a 0!!`
        document.getElementById("min").value = ""
        document.getElementById("max").value = ""
        document.getElementById("tentativas").value = ""
    }
    else if (max <= min){
        resultado.innerHTML = `O intervalo minimo informado é maior ou igual ao máximo!!  `
        document.getElementById("min").value = ""
        document.getElementById("max").value = ""
        document.getElementById("tentativas").value = ""   
    }
    else {
        let numeroSecreto = sortearNumero(min, max)
        document.getElementById("min").value = ""
        document.getElementById("max").value = ""
        document.getElementById("tentativas").value = ""
        mostrarOcultar(sectionInicio)
        mostrarOcultar(sectionPalpite)
        resultado.innerHTML = ""
        console.log(numeroSecreto)
        //Função pra comparar os palpites com o numero secreto
        document.getElementById('formPalpite').addEventListener('submit', function(event) {
            event.preventDefault();
            let palpite = lerPalpite()
            // Verificar se o palpite é igual ao número secreto
            if (palpite === numeroSecreto) {
                resultado.innerHTML = `Parabéns! Você acertou o número secreto: ${numeroSecreto}`
                mostrarOcultar(sectionPalpite)
                mostrarOcultar(fim)
                return
            //Verifica se o palpite é menor que o número secreto
            } else if (palpite < numeroSecreto) {
                if (palpite < min){
                    min
                }
                else min = palpite + 1
                tentativas--
                resultado.innerHTML = `Palpite: ${palpite} <br> Você errou!! O numero secreto está entre ${min} e ${max} !! <br> Tentativas restantes: ${tentativas} `
            //Verifica se o palpite é maior que o numero secreto        
            } else {
                if (palpite > max ){
                    max
                }
                else max = palpite - 1
                tentativas--
                resultado.innerHTML = `Palpite: ${palpite} <br> Você errou!! O numero secreto está entre ${min} e ${max} !! <br> Tentativas restantes: ${tentativas} `
            }
            // Se o jogador não acertar dentro do número máximo de tentativas
            if (tentativas == 0){
                mostrarOcultar(sectionPalpite)
                mostrarOcultar(fim)
                resultado.innerHTML = `Você excedeu o número máximo de tentativas! Você perdeu!! <br> Número secreto: ${numeroSecreto}`
            }
        })           
    }
})
function reiniciarJogo(){
    location.href = "index.html"
}
function encerrar(){
    window.close()
}