/*
 * Crie a classe Casa com o nome das propriedades, endereço, númeroQuartos. 
 * Crie um método chamado display que imprime os valores das propriedades. 
 * Crie um objeto da classe Casa e defina os valores das propriedades.
 * Chame a exibição do método para imprimir os valores das propriedades.
 * */
void main() {
  Casa casa = Casa("Rua dos bobos, número 0", 3);
  casa.display();
}

class Casa {
    String endereco;
    int numeroQuartos;
  
    Casa(this.endereco, this.numeroQuartos);
  
  void display(){
    print("Endereço: $endereco");
    print("Número de quartos: ${numeroQuartos.toString()}");
  }
  
}