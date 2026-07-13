import { render, screen } from '@testing-library/react';

import ImageWithBorder from './ImageWithBorder';

jest.mock('next/image');

describe('ImageWithBorder', () => {
  it('should render without crashing with valid props', () => {
    render(<ImageWithBorder image="/image.png" width={400} height={700} borderWidth={8} alt="Image description" />);
    expect(screen.getByAltText('Image description')).toBeInTheDocument();
  });
  it('should apply correct width and height to the container', () => {
    const { container } = render(
      <ImageWithBorder image="/image.png" width={400} height={700} borderWidth={8} alt="Image description" />
    );

    const outerBox = container.querySelector('div');
    expect(outerBox).toHaveStyle({ width: '400px', height: '700px' });
  });
  it('should render the image with correct src', () => {
    render(<ImageWithBorder image="/image.png" width={400} height={700} borderWidth={8} alt="Image description" />);

    const image = screen.getByAltText('Image description');
    expect(image).toHaveAttribute('src', '/image.png');
  });
  it('shoud apply correct value for the border width', () => {
    const { container } = render(
      <ImageWithBorder image="/image.png" width={400} height={700} borderWidth={8} alt="Image description" />
    );
    const boxes = container.querySelectorAll('div');
    const borderBox = boxes[1];
    expect(borderBox).toHaveStyle({ width: '8px' });
  });

  it('should render image in fill mode when width and height are not provided', () => {
    render(<ImageWithBorder image="/image.png" alt="Fill image" />);

    const image = screen.getByAltText('Fill image');

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/image.png');
  });

  it('should use default borderWidth when it is not provided', () => {
    const { container } = render(
      <ImageWithBorder image="/image.png" width={400} height={700} alt="Image description" />
    );

    const borderBox = container.querySelectorAll('div')[1];

    expect(borderBox).toHaveStyle({
      width: '8px'
    });
  });
});
