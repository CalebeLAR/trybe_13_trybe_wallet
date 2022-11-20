import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import mockData from './helpers/mockData';

describe('testes para a página da wallet', () => {
  test('(1) a pagina de login deve ser carregada na rota "/"', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
    const { history } = renderWithRouterAndRedux(<App />);

    // acessa a página da wallet.
    userEvent.type(screen.getByLabelText('email'), 'test@gmail.com');
    userEvent.type(screen.getByLabelText('password'), 'password');
    userEvent.click(screen.getByRole('button', { name: 'Entrar' }));

    expect(history.location.pathname).toBe('/carteira');
  });
  describe('testes pra verificar os inputs', () => {
    test.todo('(2)deve ser rederizado um input do tipo text, envolto por uma label com o texto "Valor da despesa:"');
    test.todo('(3)deve ser renderizado um input do tipo text, envolto por uma label com o texto "Descrição da despesa:"');
    test.todo('(4)deve ser renderizado um select, envolto por uma label com o texto "moeda"');
    test.todo('(5)deve ser renderizado um select, envolto por uma label com o texto "Método de pagamento"');
    test.todo('(6)deve ser renderizado um select, envolto por uma label com o texto "Categoria para a despesa (tag)"');
  });

  describe('testes pra verificar os botões', () => {
    test.todo('(7)deve ser rederizado um botão com o texto Adicionar Despesa"');
  });
});
