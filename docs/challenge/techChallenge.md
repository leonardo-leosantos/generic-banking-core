# Desafio Técnico Sênior: Sistema de Core Bancário (Banking Core)

**Contexto:**
Você foi contratado para modernizar o sistema core de uma Fintech. O sistema atual é um monolito frágil e a empresa decidiu reescrever a operação financeira principal utilizando Domain-Driven Design e Clean Architecture para garantir testabilidade, isolamento de regras de negócio e facilidade de substituição de tecnologias (banco de dados, APIs de terceiros).

---


## O Domínio (O que deve ser modelado)
Sua aplicação deve gerenciar Clientes, Contatos, Contas Bancárias e Transações.

### Regras de Negócio e Restrições (Invariantes)**
**A. Clientes e Contatos (Agregado de Cliente):**
- Um Cliente não pode existir sem um documento válido (CPF ou CNPJ - pense em Value Objects aqui para validar o formato no momento da criação).
- Um cliente pode ter múltiplos Contatos (Telefone, E-mail).
**Regra:** Para que um Cliente seja considerado "Ativo" e apto a abrir uma conta, ele deve ter obrigatoriamente pelo menos um contato marcado como principal.


**B. Contas Bancárias (Agregado de Conta):**
- Um cliente pode ter mais de uma Conta, mas nunca duas contas do mesmo Tipo de Conta (ex: Ele pode ter uma Conta Corrente e uma Conta Poupança, mas não duas Contas Correntes).
- Toda conta possui um Saldo e um Limite de Cheque Especial.
**Regra:** O saldo nunca pode ser alterado diretamente por um simples "setSaldo". Ele só muda através do processamento de uma Transação válida.

C. Transações Financeiras e Taxas (Serviços de Domínio):
- Existem diferentes tipos de transação: Depósito, Saque e Transferência (entre contas da mesma fintech).
- Regra de Saldo: Uma transação de saída (Saque ou Transferência) só pode ocorrer se: (Saldo + Limite) >= Valor da Transação.
- Regra de Taxação (Aberto para Extensão - OCP): Contas diferentes possuem regras de taxas diferentes para transferências:
  - Conta Corrente Padrão: Cobra 1% de taxa sobre o valor transferido.
  - Conta Premium: Não cobra taxa de transferência.

> **Dica:** Use Padrão Strategy injetado via Domain Service para calcular a taxa de acordo com o tipo da conta origem.

- Regra de Anti-Fraude (Portas/Adaptadores): Qualquer transferência acima de R$ 10.000,00 deve passar por uma validação assíncrona/externa de um serviço de Anti-Fraude. Se o serviço rejeitar, a transação deve ser criada com status "Recusada".