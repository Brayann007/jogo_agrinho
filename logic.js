function alterar_display(){
	document.getElementById('tela_ajuda').style.display='block';
	document.getElementById('fundo').style.filter='blur(10px)';
	document.getElementById('mapa_jogo').style.filter='blur(10px)';
	document.getElementById('caminhao').style.filter='blur(10px)';
	document.getElementById('botao_reciclagem').style.filter='blur(10px)';
	document.getElementById('botão_aterro').style.filter='blur(10px)';
	document.getElementById('botão_caçamba').style.display='none';
	document.getElementById('div_caçamba').style.display='none';
	document.getElementById('esconder_caçamba').style.display='none';
}

function alterar_display_avanço(){
	document.getElementById('tela_ajuda').style.display='none';
	document.getElementById('tela_ajuda2').style.display='block';
}

function alterar_display_voltar(){
	document.getElementById('tela_ajuda').style.display='none';
	document.getElementById('tela_ajuda2').style.display='none';
	document.getElementById('fundo').style.filter='blur(0)';
	document.getElementById('mapa_jogo').style.filter='blur(0)';
	document.getElementById('caminhao').style.filter='blur(0)';
	document.getElementById('botão_aterro').style.filter='blur(0)';
	document.getElementById('botão_caçamba').style.display='block';
}


function ver_caçamba(){
	document.getElementById('div_caçamba').style.display='block';
	document.getElementById('esconder_caçamba').style.display='block';
	document.getElementById('botão_caçamba').style.display='none';
}

function esconder_caçamba(){
	document.getElementById('div_caçamba').style.display='none';
	document.getElementById('esconder_caçamba').style.display='none';
	document.getElementById('botão_caçamba').style.display='block';
}

function sortear(min, max){
	// Sorteia um número inteiro entre dois valores
	return Math.floor(Math.random() * (max - min) + min);
}

function som_ativo(){
	document.getElementById('som_ligado').style.display='block';
	document.getElementById('som_desligado').style.display='none';
}

function som_of(){
	document.getElementById('som_desligado').style.display='block';
	document.getElementById('som_ligado').style.display='none';
}

function sortearCacamba(){

 	itensReciclaveis = ["Tampas", "Potes de Alimentos", "Frascos", "Papel", "Embalagens de Refrigerante", "Garrafas de Água Mineral", "PVC", "Sacos Plásticos", "Engradados de bebidas e Baldes", "Garrafas Pet", "Brinquedos de plástico"]
	itensNaoReciclaveis = ["Restos de Alimentos", "Folhas e Sementes", "Papel Higiênico", "Restos de Carne", "Ossos", "Pó de Café", "Frutas Estragadas", "Erva de Chimarrão", "Casca de Ovo", "Cascas de Frutas"]

	for (i = 0; i < 1; i++){
		sortearTipo = sortear(0, 2) // Sorteia o tipo de alimento

		for (c = 0; c < 5; c++){

			if (sortearTipo == 0){
				sorteado = itensReciclaveis[sortear(0, itensReciclaveis.length)] // Adiciona item sorteado da lista itensReciclaveis
			} else{
				sorteado = itensNaoReciclaveis[sortear(0, itensNaoReciclaveis.length)] // Adiciona item sorteado da lista itensNaoReciclaveis
			}

			if (c == 4){
				document.getElementById("itens").innerHTML += sorteado; // Escreve na div caçamba os itens sorteados
			} else{
				document.getElementById("itens").innerHTML += sorteado + "<br><br> "; // Escreve na div caçamba os itens sorteados
			}
		}
	}

}




async function aterro(){
	var caminhao = document.getElementById("caminhao");
	caminhao.classList.remove("andando1"); // Remove as classes de animação
	caminhao.classList.remove("andando2"); // Remove as classes de animação
	await new Promise(r => setTimeout(r, 100)); // Espera alguns segundos até executar o resto do script
	caminhao.classList.add("andando1"); // Adiciona a animação em "caminhão"

	adicionarPonto(sortearTipo, 0); // Chama a função para validar os pontos e passa como argumento o tipo de reciclagem e o local (0 para aterro, 1 para reclicagem)
}

async function reciclagem(){
	caminhao.classList.remove("andando1"); // Remove as classes de animação
	caminhao.classList.remove("andando2"); // Remove as classes de animação
	await new Promise(r => setTimeout(r, 100)); // Espera alguns segundos até executar o resto do script
	caminhao.classList.add("andando2"); // Adiciona a animação em "caminhão"

	adicionarPonto(sortearTipo, 1); // Chama a função para validar os pontos e passa como argumento o tipo de reciclagem e o local (0 para aterro, 1 para reclicagem)
}


async function adicionarPonto(tipo, local){
	pontos = parseInt(document.getElementById("ponto").innerText); // Converte o string da div ponto para inteiro
	await new Promise(r => setTimeout(r, 3300)); // Espera alguns segundos até executar o resto do script

	if (tipo == local){
		document.getElementById("ponto").innerHTML = pontos - 5; // Remove 5 pontos da div ponto
		document.getElementById("ae").innerHTML = "ERROU!";
		document.getElementById("ae").style.color = "red";
	} else{
		document.getElementById("ponto").innerHTML = pontos + 5; // Adiciona 5 pontos da div ponto
		document.getElementById("ae").innerHTML = "ACERTOU!";
		document.getElementById("ae").style.color = "green";
	}

	if (parseInt(document.getElementById("ponto").innerText) == 50){alert("VOCÊ VENCEU!"); document.location.reload()} // Exibe alerta se os pontos chegar a 50 e recarrega a página
	if (parseInt(document.getElementById("ponto").innerText) == -30){alert("VOCÊ PERDEU!"); document.location.reload()} // Exibe alerta se os pontos chegar a -50 e recarrega a página

	document.getElementById("itens").innerHTML = ""; // Apagas itens da caçamba
	sortearCacamba(); // Sorteia novamente os itens da caçamba
}


function iniciar(){
	sortearCacamba(); // Sorteia itens da caçamba
}