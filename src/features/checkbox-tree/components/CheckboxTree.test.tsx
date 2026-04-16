import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { checkboxTreeData } from '../data/treeData';
import CheckboxTree from './CheckboxTree';

describe('CheckboxTree', () => {
  it('renders title and allows selecting a node', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        {/* <CheckboxTree data={checkboxTreeData} title="Test Tree" /> */}
      </MemoryRouter>
    );

    expect(screen.getByText('Test Tree')).toBeInTheDocument();

    const reactCheckbox = screen.getByLabelText('React');
    await user.click(reactCheckbox);

    expect(reactCheckbox).toBeChecked();
    expect(screen.getByText('Selected Skills')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /remove react/i })).toBeInTheDocument();
  });

  it('filters nodes from the search box', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        {/* <CheckboxTree data={checkboxTreeData} /> */}
      </MemoryRouter>
    );

    const searchInput = screen.getByLabelText('Search tree nodes');
    await user.type(searchInput, 'docker');

    expect(screen.getByText('Docker')).toBeInTheDocument();
  });
});