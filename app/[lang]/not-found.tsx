import Link from 'next/link';

export default async function CustomNotFoundPage() {
  return<>
    <section style={{ marginBottom: '20px' }}>
            Сторінка ще недоступна цією мовою
    </section>
    <Link href={'/'} passHref style={{
      color: 'yellow',
      fontWeight: 'bold',
      textDecoration: 'underline',
    }}>
            Повернутись на головну
    </Link>
  </>;
}