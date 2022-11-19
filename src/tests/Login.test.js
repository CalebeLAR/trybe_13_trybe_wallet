import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('testes para a página de login', () => {
  test.todo('a rota inicial deve ser a rota "/"');
  describe('testes para verificar a renderização do elementos na tela', () => {
    test.todo('deve ser renderizado um imput do tipo email com uma label contendo o texto "email"');
    test.todo('deve ser renderizado um imput do tipo password com uma label contendo o texto "password"');
    test.todo('deve ser renderizado um botão do tipo button com o texto "Entrar"');
    test.todo('deve ser renderizado um botão do tipo button com o texto "Entrar"');
    test.todo('o botão deve direcionar para a página de carteira, com a url "/carteira"');
  });
});
