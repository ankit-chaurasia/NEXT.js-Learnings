import { useEffect, useState } from 'react';
import useSWR from 'swr';

const LastSalesPage = (props) => {
  const [sales, setSales] = useState(props.sales);
  // const [isLoading, setIsLoading] = useState(false);

  // const { data, error } = useSWR(
  //   'https://nextjs-learnings-default-rtdb.firebaseio.com/sales.json'
  // );
  const { data, error } = useSWR(
    'https://nextjs-learnings-default-rtdb.firebaseio.com/sales.json',
    (url) => fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    if (data) {
      const transformSales = [];
      for (const key in data) {
        transformSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }
      setSales(transformSales);
    }
  }, [data]);

  // useEffect(() => {
  //   setIsLoading(true);
  //   fetch('https://nextjs-learnings-default-rtdb.firebaseio.com/sales.json')
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const transformSales = [];
  //       for (const key in data) {
  //         transformSales.push({
  //           id: key,
  //           username: data[key].username,
  //           volume: data[key].volume,
  //         });
  //       }
  //       setSales(transformSales);
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // }, []);

  // if (isLoading) {
  //   return <p>Loading...</p>;
  // }
  if (error) {
    return <p>Failed to load</p>;
  }
  if (!data && !sales) {
    return <p>Loading...!!!</p>;
  }
  return (
    <ul>
      {sales?.map((sale) => (
        <li key={sale.id}>
          {sale.username} - {sale.volume}
        </li>
      ))}
    </ul>
  );
};

export async function getStaticProps() {
  const response = await fetch(
    'https://nextjs-learnings-default-rtdb.firebaseio.com/sales.json'
  );
  const data = await response.json();
  const transformSales = [];
  for (const key in data) {
    transformSales.push({
      id: key,
      username: data[key].username,
      volume: data[key].volume,
    });
  }
  return {
    props: { sales: transformSales, revalidate: 10 },
  };
}

export default LastSalesPage;
