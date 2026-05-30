import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { describe, expect, it, vi } from 'vitest';
import { HeroSection } from './HeroSection';

vi.mock('framer-motion', () => ({
  motion: {
    div: 'div',
    section: 'section',
    h1: 'h1',
    p: 'p',
  },
}));

describe('HeroSection', () => {
  it('renders the hero heading and content', () => {
    render(<HeroSection />);

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /elevate your contribution story/i,
      })
    ).toBeInTheDocument();
    expect(screen.getByText(/isometric/i).textContent).toMatch(/isometric/i);
  });
});

describe('HeroSection responsive breakpoints', () => {
  const renderAtViewport = (width: number) => {
    window.innerWidth = width;
    window.dispatchEvent(new Event('resize'));

    return render(<HeroSection />);
  };

  it.each([
    { width: 375, label: 'mobile' },
    { width: 768, label: 'tablet' },
    { width: 1280, label: 'desktop' },
  ])('renders full typography and high contrast background values at $label width', ({ width }) => {
    const { container } = renderAtViewport(width);

    const hero = container.firstElementChild;
    const heading = screen.getByRole('heading', {
      level: 1,
      name: /elevate your contribution story/i,
    });

    expect(hero?.className).toContain('bg-[radial-gradient');
    expect(heading.tagName).toBe('H1');
    expect(heading.className).toContain('text-5xl');
    expect(heading.className).toContain('md:text-8xl');
    expect(heading.className).toContain('from-green-500');
    expect(heading.className).toContain('to-purple-600');
    expect(screen.getByText(/generate high-fidelity, 3d isometric monoliths/i).className).toContain(
      'text-gray-600'
    );
    expect(screen.getByPlaceholderText(/enter github username/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /copy link/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /watch dashboard/i })).toBeInTheDocument();
  });
});
