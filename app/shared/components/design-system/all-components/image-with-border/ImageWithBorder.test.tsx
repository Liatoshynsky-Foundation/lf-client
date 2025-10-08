import { render, screen } from '@testing-library/react';
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  }
}));
import ImageWithBorder from './ImageWithBorder';

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
});
