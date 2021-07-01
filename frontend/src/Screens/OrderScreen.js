import './screens.css';

/*not used*/
/*
function OrderScreen(props) {
  const [ordors, setOrdors] = useState(null);
  const data =[];
  useEffect(() => {
    axios.get(`http://localhost:8000/api/orders/list`)
      .then(res => {
        setOrdors(res.data)
        console.log(res.data);
        for (const [i, usuario] of res.data.entries()) {
          if(usuario.product.length !== 0){
            data.push(usuario);
            // setOrdors(usuario);
            // console.log(usuario);
          }
        }
      })
  }, []);
  console.log(data);
  return <div>


}
/}
export default OrderScreen;*/