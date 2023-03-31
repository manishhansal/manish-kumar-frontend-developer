import { render, screen, fireEvent } from '@testing-library/react';
import Capsules from '../components/Capsules';

describe('Capsules', () => {
  it('renders Capsules component', async () => {
    render(<Capsules />);
    const title = await screen.findByText(/Capsules/i);
    expect(title).toBeInTheDocument();
  });

  it('displays capsules on initial render', async () => {
    render(<Capsules />);
    const capsules = await screen.findAllByRole('article');
    expect(capsules.length).toBeGreaterThan(0);
  });

  it('displays correct number of capsules per page', async () => {
    render(<Capsules />);
    const capsules = await screen.findAllByRole('article');
    expect(capsules.length).toBe(6);
  });

  it('displays popup when capsule is clicked', async () => {
    render(<Capsules />);
    const capsule = await screen.findByText(/C101/i);
    fireEvent.click(capsule);
    const popup = await screen.findByRole('dialog');
    expect(popup).toBeInTheDocument();
  });

  it('filters capsules by status', async () => {
    render(<Capsules />);
    const searchInput = screen.getByPlaceholderText(/Search by status/i);
    fireEvent.change(searchInput, { target: { value: 'unknown' } });
    fireEvent.click(screen.getByText(/Search/i));
    const capsules = await screen.findAllByRole('article');
    expect(capsules.length).toBeGreaterThan(0);
    capsules.forEach((capsule) => {
      expect(capsule).toHaveTextContent(/unknown/i);
    });
  });

  it('filters capsules by original launch', async () => {
    render(<Capsules />);
    const searchInput = screen.getByPlaceholderText(/Search by original lunch/i);
    fireEvent.change(searchInput, { target: { value: '2010' } });
    fireEvent.click(screen.getByText(/Search/i));
    const capsules = await screen.findAllByRole('article');
    expect(capsules.length).toBeGreaterThan(0);
    capsules.forEach((capsule) => {
      expect(capsule).toHaveTextContent(/2010/i);
    });
  });

  it('filters capsules by type', async () => {
    render(<Capsules />);
    const searchInput = screen.getByPlaceholderText(/Search by type/i);
    fireEvent.change(searchInput, { target: { value: 'dragon' } });
    fireEvent.click(screen.getByText(/Search/i));
    const capsules = await screen.findAllByRole('article');
    expect(capsules.length).toBeGreaterThan(0);
    capsules.forEach((capsule) => {
      expect(capsule).toHaveTextContent(/dragon/i);
    });
  });

  it('shows correct number of capsules on pagination click', async () => {
    render(<Capsules />);
    fireEvent.click(screen.getByText(/2/i));
    const capsules = await screen.findAllByRole('article');
    expect(capsules.length).toBeLessThanOrEqual(6);
  });
});
