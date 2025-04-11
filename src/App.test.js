import { render, screen } from '@testing-library/react';
import App from './App';

test('renders product list heading', () => {
  render(<App />);
  const linkElement = screen.getByText(/loding product/i); 
  expect(linkElement).toBeInTheDocument();
});

