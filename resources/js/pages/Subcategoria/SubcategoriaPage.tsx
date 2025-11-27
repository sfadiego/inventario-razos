import { useParams } from 'react-router-dom';

export default function SubcategoriaPage() {
  const { id } = useParams();
  const categoriaId = id ? Number(id) : 0;
  console.log(categoriaId)
  return <div>SubcategoriaPage</div>;
}
