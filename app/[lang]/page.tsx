import { redirect } from 'next/navigation';
import { ReactElement } from 'react';

export default function RootPage(): ReactElement {
  redirect('/home');
}
