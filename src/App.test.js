import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

const observeMock = jest.fn();
const unobserveMock = jest.fn();
const disconnectMock = jest.fn();

window.IntersectionObserver = jest.fn(() => ({
  observe: observeMock,
  unobserve: unobserveMock,
  disconnect: disconnectMock,
}));

// test('renders header', () => {
//   render(<App />, { wrapper: MemoryRouter });
//   const headerElement = screen.getByRole('banner');
//   expect(headerElement).toBeInTheDocument();
// });

// test('renders footer', () => {
//   render(<App />, { wrapper: MemoryRouter });
//   const footerElement = screen.getByRole('contentinfo');
//   expect(footerElement).toBeInTheDocument();
// });

// test('renders homepage by default', () => {
//   render(<App />, { wrapper: MemoryRouter });
//   const homepageElement = screen.getByTestId('homepage');
//   expect(homepageElement).toBeInTheDocument();
// });

// test('renders capsules page', () => {
//   render(<App />, { wrapper: MemoryRouter });
//   const capsulesLink = screen.getByRole('link', { name: 'Capsules' });
//   fireEvent.click(capsulesLink);
//   const capsulesPageElement = screen.getByTestId('capsules');
//   expect(capsulesPageElement).toBeInTheDocument();
// });

// test('renders coming soon page', () => {
//   render(<App />, { wrapper: MemoryRouter });
//   const comingSoonLink = screen.getByRole('link', { name: 'Coming Soon' });
//   fireEvent.click(comingSoonLink);
//   const comingSoonPageElement = screen.getByTestId('coming-soon');
//   expect(comingSoonPageElement).toBeInTheDocument();
// });
