import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

// constantes para os testes
const stringTest = 'test@gmail.com';

// testes
describe('testes para a página de login', () => {
  test('(1) a rota inicial deve ser a rota "/"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    expect(history.location.pathname).toBe('/');
  });
  describe('testes para os inputs', () => {
    beforeEach(() => {
      renderWithRouterAndRedux(<App />);
    });
    test('(2) deve ser renderizado um input do tipo email e ao digitar nele, deve ser mostrado o que foi digitado', () => {
      // expect para encontrar o input
      const inputEmail = screen.getByLabelText('email');
      expect(inputEmail).toHaveAttribute('type', 'email');
      expect(inputEmail).toBeInTheDocument();
      expect(inputEmail).toBeVisible();

      // expect para a digitação do input
      userEvent.type(inputEmail, stringTest);
      expect(inputEmail).toHaveValue(stringTest);
    });
    test('(3) deve ser renderizado um input do tipo password, que guarda o valor que foi digitado nele', () => {
      // expect para encontrar o input
      const inputPassword = screen.getByLabelText('password');
      expect(inputPassword).toBeInTheDocument();
      expect(inputPassword).toHaveAttribute('type', 'password');
      expect(inputPassword).toBeVisible();

      // expect para a digitação do input
      userEvent.type(inputPassword, stringTest);
      expect(inputPassword).toHaveValue(stringTest);
    });
  });
  describe('testes para o botão', () => {
    test('(4) deve ser renderizado um botão com o texto "Entrar"', () => {
      renderWithRouterAndRedux(<App />);
      const btnEntrar = screen.getByRole('button', { name: 'Entrar' });
      expect(btnEntrar).toBeInTheDocument();
      expect(btnEntrar).toBeVisible();
    });
  });
});
