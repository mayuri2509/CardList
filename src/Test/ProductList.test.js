import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import ProductList from '../Components/ProductList';
 
beforeEach(() => {
  global.fetch = jest.fn((url) => {
    if (url.includes('/products/categories')) {
      return Promise.resolve({
        json: () => Promise.resolve(['smartphones', 'laptops']),
      });
    }
    if (url.includes('/products')) {
      return Promise.resolve({
        json: () =>
          Promise.resolve({
            products: [
              {
                id: 1,
                title: 'iPhone 9',
                category: 'smartphones',
                price: 549,
                rating: 4.69,
                thumbnail: 'https://dummyjson.com/image/iphone.jpg',
                description: 'An apple mobile which is nothing like apple',
              },
              {
                id: 2,
                title: 'MacBook Pro',
                category: 'laptops',
                price: 1749,
                rating: 4.57,
                thumbnail: 'https://dummyjson.com/image/macbook.jpg',
                description: 'MacBook Pro 2021 with mini-LED display',
              },
            ],
          }),
      });
    }
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

test('renders ProductList with products and categories', async () => {
  render(<ProductList />);
  expect(screen.getByText(/loding product/i)).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText('iPhone 9')).toBeInTheDocument();
    expect(screen.getByText('MacBook Pro')).toBeInTheDocument();
  });
//   expect(screen.getByRole('button', { name:/1/i })).toBeInTheDocument();
//   expect(screen.getByRole('option', { name: 'smartphones' })).toBeInTheDocument();
//   expect(screen.getByRole('option', { name: 'laptops' })).toBeInTheDocument();
});

test('filters products by category when selected', async () => {
    render(<ProductList />);
    await waitFor(() => screen.getByText('iPhone 9'));
    const categoryDropdown = screen.getByLabelText(/category/i);
    fireEvent.change(categoryDropdown, { target: { value: 'smartphones' } });
  
    await waitFor(() => {
      expect(screen.getByText('iPhone 9')).toBeInTheDocument();
      expect(screen.queryByText('MacBook Pro')).toBeInTheDocument(); 
    });
  });
  
test('sorts products by price descending when selected', async () => {
  render(<ProductList />);
  await waitFor(() => screen.getByText('iPhone 9'));

  fireEvent.change(screen.getByLabelText(/Sort By/i), {
    target: { value: 'price-desc' },
  });

  await waitFor(() => {
    const items = screen.getAllByRole('heading', { level: 3 });
    expect(items[0]).toHaveTextContent('MacBook Pro');
    expect(items[1]).toHaveTextContent('iPhone 9');
  });
});
