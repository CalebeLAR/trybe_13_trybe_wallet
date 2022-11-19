import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

// constantes para os testes
const stringTest = 'test@gmail.com';

// testes
describe('testes para a página de login', () => {
  test('(1) a pagina de login deve ser carregada na rota "/"', () => {
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
    test('(4) deve ser renderizado um botão com o texto "Entrar", que inicilamente deve estar desabilitado', () => {
      renderWithRouterAndRedux(<App />);
      const btnEntrar = screen.getByRole('button', { name: 'Entrar' });
      expect(btnEntrar).toBeInTheDocument();
      expect(btnEntrar).toBeDisabled();
      expect(btnEntrar).toBeVisible();
    });

    test('(5) o botão "Entrar" so pode ficar habilitado, depois de serem corretamente preenchidos os campos password e email', () => {
      renderWithRouterAndRedux(<App />);
      // constantes para pegar os elementos da pagina
      const roleButton = ['button', { name: 'Entrar' }];
      const email = 'email';
      const password = 'password';

      // logando com email invalido e senha invalidos
      userEvent.type(screen.getByLabelText(email), 'email sem arroba e sem ponto com');
      userEvent.type(screen.getByLabelText(password), 'sinco'); // (com menos de 6 digitos)
      expect(screen.getByRole(...roleButton)).toBeDisabled();

      // logando com email e senha válidos
      userEvent.type(screen.getByLabelText(email), 'email@valido.com');
      userEvent.type(screen.getByLabelText(password), 'seisdigitos'); // (com mais de 6 digitos)
      expect(screen.getByRole(...roleButton)).toBeEnabled();
    });
    test('(6) o botão "Entrar" deve direcionar para a página wallet, carregada na rota "/carteira"', async () => {
      const { history } = renderWithRouterAndRedux(<App />);
      // constantes para pegar os elementos da pagina
      const roleButton = ['button', { name: 'Entrar' }];
      const email = 'email';
      const password = 'password';

      // logando com email e senha válidos
      userEvent.type(screen.getByLabelText(email), 'email@valido.com');
      userEvent.type(screen.getByLabelText(password), 'seisdigitos'); // (com mais de 6 digitos)
      expect(screen.getByRole(...roleButton)).toBeEnabled();

      // antes de clicar no botão a URL da pagina é "/"
      expect(history.location.pathname).toBe('/');

      // depois de clicar no botão a pagina é redirecionada para a wallet, na URL "/carteira"
      userEvent.click(screen.getByRole(...roleButton));
      expect(await screen.findByRole('heading', { name: 'TRYBE WALLET', level: 3 })).toBeInTheDocument();
      expect(history.location.pathname).toBe('/carteira');
    });
  });
});
