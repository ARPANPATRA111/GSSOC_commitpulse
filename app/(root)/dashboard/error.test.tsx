import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ErrorPage from './error';

import type { ReactNode } from 'react';

vi.mock('next/link', () => ({
  default: ({ children, href }: { children: ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

describe('Dashboard Error Page', () => {
  it('renders the API limit emoji for API limit reached errors', () => {
    render(<ErrorPage error={new Error('API limit reached')} reset={vi.fn()} />);

    expect(screen.getByText('⏳')).toBeInTheDocument();
  });

  it('renders the not found emoji for User not found errors', () => {
    render(<ErrorPage error={new Error('User not found')} reset={vi.fn()} />);

    expect(screen.getByText('🕵️‍♂️')).toBeInTheDocument();
  });

  it('renders the generic error emoji for other errors', () => {
    render(<ErrorPage error={new Error('Something went wrong')} reset={vi.fn()} />);

    expect(screen.getByText('⚠️')).toBeInTheDocument();
  });
});
