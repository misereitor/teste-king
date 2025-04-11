import Link from 'next/link';

export default function NaoAutorizado() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Você não tem permissão para acessar esta página.</h1>
      <p>
        Por favor, faça login para continuar{' '}
        <Link className="text-blue-800" href={'/'}>
          clique aqui
        </Link>{' '}
        para fazer login.
      </p>
    </div>
  );
}
