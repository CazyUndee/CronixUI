import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Accordion from '../components/Accordion';

describe('Accordion', () => {
  it('renders all section titles', () => {
    render(
      <Accordion>
        <Accordion.Item title="Section 1">Content 1</Accordion.Item>
        <Accordion.Item title="Section 2">Content 2</Accordion.Item>
        <Accordion.Item title="Section 3">Content 3</Accordion.Item>
      </Accordion>
    );
    expect(screen.getByText('Section 1')).toBeInTheDocument();
    expect(screen.getByText('Section 2')).toBeInTheDocument();
    expect(screen.getByText('Section 3')).toBeInTheDocument();
  });

  it('expands a section on click (adds open class)', () => {
    const { container } = render(
      <Accordion>
        <Accordion.Item title="Section 1">Content 1</Accordion.Item>
      </Accordion>
    );
    const item = container.querySelector('.cn-accordion-item');
    expect(item).not.toHaveClass('cn-accordion-open');
    fireEvent.click(screen.getByText('Section 1'));
    expect(item).toHaveClass('cn-accordion-open');
  });

  it('toggles open/closed on repeated clicks', () => {
    const { container } = render(
      <Accordion>
        <Accordion.Item title="Section 1">Content 1</Accordion.Item>
      </Accordion>
    );
    const item = container.querySelector('.cn-accordion-item');
    fireEvent.click(screen.getByText('Section 1'));
    expect(item).toHaveClass('cn-accordion-open');
    fireEvent.click(screen.getByText('Section 1'));
    expect(item).not.toHaveClass('cn-accordion-open');
  });

  it('supports multiple open sections', () => {
    const { container } = render(
      <Accordion allowMultiple>
        <Accordion.Item title="Section 1">Content 1</Accordion.Item>
        <Accordion.Item title="Section 2">Content 2</Accordion.Item>
      </Accordion>
    );
    const items = container.querySelectorAll('.cn-accordion-item');
    fireEvent.click(screen.getByText('Section 1'));
    fireEvent.click(screen.getByText('Section 2'));
    expect(items[0]).toHaveClass('cn-accordion-open');
    expect(items[1]).toHaveClass('cn-accordion-open');
  });

  it('closes first when opening second (single mode)', () => {
    const { container } = render(
      <Accordion>
        <Accordion.Item title="Section 1">Content 1</Accordion.Item>
        <Accordion.Item title="Section 2">Content 2</Accordion.Item>
      </Accordion>
    );
    const items = container.querySelectorAll('.cn-accordion-item');
    fireEvent.click(screen.getByText('Section 1'));
    expect(items[0]).toHaveClass('cn-accordion-open');
    fireEvent.click(screen.getByText('Section 2'));
    expect(items[0]).not.toHaveClass('cn-accordion-open');
    expect(items[1]).toHaveClass('cn-accordion-open');
  });

  it('applies className', () => {
    const { container } = render(
      <Accordion className="custom">
        <Accordion.Item title="Test">Content</Accordion.Item>
      </Accordion>
    );
    expect(container.firstChild).toHaveClass('custom');
  });
});
