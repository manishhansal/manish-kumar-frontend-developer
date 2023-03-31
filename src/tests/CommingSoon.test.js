import React from 'react';
import { render, screen } from '@testing-library/react';
import ComingSoon from '../pages/ComingSoon';

describe('ComingSoon', () => {
  it('renders the "Coming Soon" heading', () => {
    render(<ComingSoon />);
    const headingElement = screen.getByRole('heading', { level: 2, name: /coming soon/i });
    expect(headingElement).toBeInTheDocument();
  });
});
