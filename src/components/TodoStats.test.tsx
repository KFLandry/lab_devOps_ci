import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TodoStats } from './TodoStats';

describe('TodoStats', () => {
  it('should display active and completed counts', () => {
    render(<TodoStats activeCount={5} completedCount={3} />);

    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText(/active/i)).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText(/completed/i)).toBeInTheDocument();
  });

  it('should display zero counts correctly', () => {
    render(<TodoStats activeCount={0} completedCount={0} />);

    expect(screen.getAllByText('0')).toHaveLength(2);
  });

  it('should apply correct styling to active count', () => {
    render(<TodoStats activeCount={5} completedCount={3} />);

    const activeCount = screen.getByText('5');
    expect(activeCount).toHaveClass('text-cyan-400');
    expect(activeCount).toHaveClass('font-semibold');
  });

  it('should apply correct styling to completed count', () => {
    render(<TodoStats activeCount={5} completedCount={3} />);

    const completedCount = screen.getByText('3');
    expect(completedCount).toHaveClass('text-green-400');
    expect(completedCount).toHaveClass('font-semibold');
  });

  it('should handle large numbers correctly', () => {
    render(<TodoStats activeCount={999} completedCount={1234} />);

    expect(screen.getByText('999')).toBeInTheDocument();
    expect(screen.getByText('1234')).toBeInTheDocument();
  });
});
