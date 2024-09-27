import Header from "@/app/components/Header/Header";

export default function ProductPage({params}) {

  const productId = params.id

  // useEffect(() => {
  //   fetch(`/getProduct`)
  // }, [params.id])
  

  return (
    <div>
      <Header />
      {productId}
    </div>
  );
}