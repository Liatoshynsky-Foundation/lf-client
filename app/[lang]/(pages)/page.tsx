import { redirect } from 'next/navigation';
import { ReactElement } from 'react';

export default function AboutUs(): ReactElement {
  redirect('/about-us');
}
