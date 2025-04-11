import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Filter from '../Components/Filter'; 

const mockCategories = [
    { name: 'Smartphones', slug: 'smartphones' },
    { name: 'Laptops', slug: 'laptops' },
  ];
  
const onCategoryChange = jest.fn();
const onSortChange = jest.fn();

const setup = () => {
  render(
    <Filter
      categories={mockCategories}
      onCategoryChange={onCategoryChange}
      onSortChange={onSortChange}
      sortOption=""
    />
  );
};

test('renders category and sort dropdown', () => {
  setup();
  expect(screen.getByLabelText(/Filter by Category/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Sort by/i)).toBeInTheDocument();
});

test('calls onCategoryChange when category is selected', () => {
    const onCategoryChange = jest.fn();
    render(
      <Filter
        categories={[{ name: 'Laptops', slug: 'laptops' }]}
        onCategoryChange={onCategoryChange}
        onSortChange={jest.fn()}
        sortOption=""
      />
    );
   fireEvent.change(screen.getByLabelText(/Filter by Category/i), {
      target: { value: 'laptops' },
    });
  
    expect(onCategoryChange).toHaveBeenCalledWith('laptops');
  });
  
test('calls onSortChange when sorting is selected', () => {
  setup();
  fireEvent.change(screen.getByLabelText(/Sort By/i), {
    target: { value: 'price-asc' },
  });
  expect(onSortChange).toHaveBeenCalledWith('price-asc');
});
