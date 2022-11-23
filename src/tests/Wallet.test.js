import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import mockData from './helpers/mockData';

//
const emailtest = 'test@gmail.com';
const addExpense = 'Adicionar despesa';
describe('testes para a página da wallet', () => {
  test.only('(1) a pagina da wallet deve ser carregada na rota "/carteira"', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
    const { history, store } = renderWithRouterAndRedux(<App />);
    jest.spyOn(store, 'dispatch');
    // acessa a página da wallet.
    act(() => {
      userEvent.type(screen.getByLabelText('email'), emailtest);
      userEvent.type(screen.getByLabelText('password'), 'password');
      userEvent.click(screen.getByRole('button', { name: 'Entrar' }));
    });
    expect(screen.queryByRole('button', { name: 'Entrar' })).not.toBeInTheDocument();
    expect(store.dispatch).toBeCalled();
    const trybeWallet = await screen.findByText('TRYBE WALLET');
    expect(trybeWallet).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalled();
    expect(store.getState()).toStrictEqual({
      user: { email: emailtest },
      wallet: {
        currencies: [],
        expenses: [],
        editor: false,
        idToEdit: 0,
      },
    });
    expect(history.location.pathname).toBe('/carteira');
    const btnAddExpense = screen.getByText(addExpense);
    userEvent.click(btnAddExpense);
    await screen.findByText('Editar/Excluir');
    expect(store.getState()).toStrictEqual({
      user: { email: emailtest },
      wallet: {
        currencies: [],
        expenses: [],
        editor: false,
        idToEdit: 0,
      },
    });
    await screen.findByText('Dólar Americano/Real Brasileiro');
    const btnAlterarExpense = screen.getByTestId('edit-btn');
    userEvent.click(btnAlterarExpense);
    expect(screen.queryByText(addExpense)).not.toBeInTheDocument();
    const btnEditExpense = screen.queryByText('Editar despesa');
    expect(btnEditExpense).toBeInTheDocument();
    const btnEsc = screen.queryByText('Esquecer');
    userEvent.click(btnEsc);

    await screen.findByText('Dólar Americano/Real Brasileiro');
    expect(btnEsc).not.toBeInTheDocument();
    const btnDeleteExpense = screen.getByTestId('delete-btn');
    userEvent.click(btnDeleteExpense);
  });
  describe('testes para o componente do WalletForm.js', () => {
    beforeEach(() => {
      jest.spyOn(global, 'fetch').mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockData),
      });
      renderWithRouterAndRedux(<App />);
      // acessa a página da wallet.
      userEvent.type(screen.getByLabelText('email'), emailtest);
      userEvent.type(screen.getByLabelText('password'), 'password');
      userEvent.click(screen.getByRole('button', { name: 'Entrar' }));
    });
    test('(2)deve ser rederizado um input do tipo text, envolto por uma label com o texto "Valor da despesa:"', async () => {
      const inputValue = screen.getByLabelText('Valor da despesa:');
      expect(inputValue).toBeInTheDocument();
    });
    test('(3)deve ser renderizado um input do tipo text, envolto por uma label com o texto "Descrição da despesa:"', () => {
      const inputDescription = screen.getByLabelText('Descrição da despesa:');
      expect(inputDescription).toBeInTheDocument();
    });
    test('(4)deve ser renderizado um select, envolto por uma label com o texto "moeda"', () => {
      const selectCurrencies = screen.getByLabelText('Moeda');
      expect(selectCurrencies).toBeInTheDocument();
    });
    test('(5)deve ser renderizado um select, envolto por uma label com o texto "Método de pagamento"', () => {
      const selectCurrencies = screen.getByLabelText('Método de pagamento');
      expect(selectCurrencies).toBeInTheDocument();
    });
    test('(6)deve ser renderizado um select, para as Categorias da despesa', () => {
      // await screen.findByText()
      const selectTAG = screen.getByTestId('tag-input');
      expect(selectTAG).toBeInTheDocument();
    });
    test('(7)deve ser rederizado um botão com o texto Adicionar Despesa"', () => {
      const btnAddExpense = screen.getByText(addExpense);
      expect(btnAddExpense).toBeInTheDocument();
    });
  });
  describe('testes para os elementos do componente Table.js', () => {
    test.todo('(8)');
    test.todo('(9)');
    test.todo('(10)');
    test.todo('(11)');
    test.todo('(12)');
    test.todo('(13)');
  });
});
