// Objeto do usuário
const usuario = { nome: "Raphael", matricula: "123456", pendencia: false, acessibilidade: true };

// Lista de objetos de armários
const armarios = [
  { id: 1, formato: "padrao", status: true, acessivel: false },
  { id: 2, formato: "padrao", status: true, acessivel: false },
  { id: 3, formato: "padrao", status: true, acessivel: false },
  { id: 4, formato: "padrao", status: false, acessivel: true },
  { id: 5, formato: "padrao", status: false, acessivel: true },
  { id: 6, formato: "duplo", status: true, acessivel: true },
  { id: 7, formato: "duplo", status: false, acessivel: true },
  { id: 8, formato: "duplo", status: false, acessivel: true }
];

// Função para reserva do armário, incluindo o registro da data/hora e cálculo da entrega das chaves
function reservarArmario() {
  // Obter o tipo de armário selecionado no HTML
  let tipoSelecionado = document.getElementById("tipoArmario").value;
  
  // Filtrar armários disponíveis que atendam ao tipo selecionado e à acessibilidade do usuário
  let armariosDisponiveis = armarios.filter(a =>
    a.formato === tipoSelecionado && a.status === true && usuario.acessibilidade === a.acessivel
  );
  
  // Se não houver armário disponível, exibe mensagem e encerra
  if (armariosDisponiveis.length === 0) {
    document.getElementById("resultado").innerText = `Olá, ${usuario.nome}! Nenhum armário disponível para o tipo selecionado.`;
    return;
  }
  
  // Sorteia um armário disponível
  let armarioSorteado = armariosDisponiveis[Math.floor(Math.random() * armariosDisponiveis.length)];
  
  // Obter a data e hora atuais (momento da reserva)
  let dataReserva = new Date();
  // Registrar a data/hora da reserva no objeto do armário
  armarioSorteado.dataReserva = dataReserva;
  
  // Calcular a data e hora para entrega das chaves (24h após a reserva)
  let dataEntrega = new Date(dataReserva.getTime() + 24 * 60 * 60 * 1000);
  // Registrar a data/hora de entrega no objeto do armário
  armarioSorteado.dataEntrega = dataEntrega;
  
  // Atualizar o status do armário para indisponível
  armarios.find(armario => armario.id === armarioSorteado.id).status = false;
  
  // Alterar a pendência do usuário para verdadeira
  usuario.pendencia = true;
  
  // Exibir mensagem de sucesso com a data/hora de entrega das chaves
  document.getElementById("resultado").innerText =
    `Olá, ${usuario.nome}! O armário ${armarioSorteado.id} foi reservado com sucesso! ` +
    `A entrega das chaves será em: ${dataEntrega.toLocaleString()}.`;
  
  console.log(usuario);
  console.log(armarios);
}