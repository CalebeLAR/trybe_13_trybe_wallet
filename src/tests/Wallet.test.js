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
});
