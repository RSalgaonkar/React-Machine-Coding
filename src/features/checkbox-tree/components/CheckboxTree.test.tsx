import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import TreeShowcase from './TreeShowcase';

describe('Checkbox Tree feature', () => {
  it('renders heading and allows selecting a node', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <TreeShowcase />
      </MemoryRouter>
    );

    expect(screen.getByText('Advanced Checkbox Tree')).toBeInTheDocument();

    const reactCheckbox = screen.getByRole('checkbox', { name: /react/i });
    await user.click(reactCheckbox);

    expect(reactCheckbox).toBeChecked();
    expect(screen.getByText('Selected items')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /react ×/i })).toBeInTheDocument();
  });

  it('filters nodes from the search box', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <TreeShowcase />
      </MemoryRouter>
    );

    const searchInput = screen.getByLabelText('Search tree nodes');
    await user.type(searchInput, 'docker');

    expect(screen.getByText('Docker')).toBeInTheDocument();
  });
});