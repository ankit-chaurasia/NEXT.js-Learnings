import path from 'path';
import fs from 'fs/promises';

const ProductDetail = (props) => {
  const { loadedProduct } = props;
  if (!loadedProduct) {
    return <p>Loading...</p>;
  }
  const { title, description } = loadedProduct;
  return (
    <>
      <h1>{title}</h1>
      <p>{description}</p>
    </>
  );
};

const getData = async () => {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  return JSON.parse(jsonData);
};

export async function getStaticProps(context) {
  const { params } = context;
  const productId = params.pid;
  const data = await getData();
  const product = data.products.find((product) => product.id === productId);
  if (!product) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      loadedProduct: product,
    },
  };
}

export async function getStaticPaths() {
  const data = await getData();
  const ids = data.products.map((product) => product.id);
  const pathsWithParams = ids.map((pid) => ({
    params: { pid },
  }));
  return {
    paths: pathsWithParams,
    fallback: true,
  };
}

export default ProductDetail;
