import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../components/Footer';

describe('Footer Component', () => {
  it('renders a footer element', () => {
    render(<Footer />);
    const footerElement = screen.getByRole('contentinfo');
    expect(footerElement).toBeInTheDocument();
  });

  it('renders a navigation element', () => {
    render(<Footer />);
    const navigationElement = screen.getByRole('navigation');
    expect(navigationElement).toBeInTheDocument();
  });

  it('renders 7 links within the navigation element', () => {
    render(<Footer />);
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(7);
  });

  it('has a link to Twitter', () => {
    render(<Footer />);
    const twitterLink = screen.getByRole('link', { name: /twitter/i });
    expect(twitterLink).toHaveAttribute('href', '/');
  });

  it('has a link to YouTube', () => {
    render(<Footer />);
    const youtubeLink = screen.getByRole('link', { name: /youtube/i });
    expect(youtubeLink).toHaveAttribute('href', '/');
  });

  it('has a link to Instagram', () => {
    render(<Footer />);
    const instagramLink = screen.getByRole('link', { name: /instagram/i });
    expect(instagramLink).toHaveAttribute('href', '/');
  });

  it('has a link to Flickr', () => {
    render(<Footer />);
    const flickrLink = screen.getByRole('link', { name: /flickr/i });
    expect(flickrLink).toHaveAttribute('href', '/');
  });

  it('has a link to LinkedIn', () => {
    render(<Footer />);
    const linkedinLink = screen.getByRole('link', { name: /linkedin/i });
    expect(linkedinLink).toHaveAttribute('href', '/');
  });

  it('has a link to Privacy Policy', () => {
    render(<Footer />);
    const privacyPolicyLink = screen.getByRole('link', { name: /privacy policy/i });
    expect(privacyPolicyLink).toHaveAttribute('href', '/');
  });

  it('has a link to Suppliers', () => {
    render(<Footer />);
    const suppliersLink = screen.getByRole('link', { name: /suppliers/i });
    expect(suppliersLink).toHaveAttribute('href', '/');
  });
});
