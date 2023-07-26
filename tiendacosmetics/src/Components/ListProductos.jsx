import React,{useState,useEffect} from 'react'
import { Button, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter }from 'reactstrap';

const ListProductos = ({productos, productoCarr,setProductoCarr}) => {
    //console.log(productos);
    const [modalEditar, setModalEditar] = useState (false);

    const [prodSeleccionado,setProdSeleccionado] = useState({
        id: '',
        cant: ''
    });

    const  seleccionarProducto = (item) => {
        const id=item.id;
        const nombre=item.nombre;
        const precio=item.precio;
        const stock = item.stock;
        const cant = 1;
        if(!productoCarr.length){
            setProductoCarr([...productoCarr,{id,nombre,precio,stock,cant}]);
            //setTotal(total+ (precio*cant));
            //console.log(total);
        }else{
            const result = productoCarr.filter(x=>x.id === id) 
            
            console.log(result)
            if(result.length){
                var idR;
                var cantR;
                result.map((item)=>(
                     idR=item.id,
                    cantR=item.cantidad
                ))
                setProdSeleccionado({id:idR,cant:cantR})

                //console.log(act)
                
                //const prodAct = productoCarr;
                //prodAct.map(prod =>{
                  //  if(prod.id === prodSeleccionado.id){
                    //    prod.id = prodSeleccionado.id;
                      //  prod.cant = prodSeleccionado.cantidad;
                    //}
                    //set
                //})
                
                //const cant = cant;
                //const prodS = {id:id, cantidad:cant}
                //console.log(prodS)
                alert("EL PRODUCTO YA EXISTE EN TU CARRITO")
                //setModalEditar(true);
                //setProductoCarr();

            }else{
                setProductoCarr([...productoCarr,{id,nombre,precio,stock,cant}])
                //setTotal(total+ (precio*cant));
            }
            //console.log(result)
        }
    }
    const actualizar=()=>{
    }
    //console.log(productoCarr)
    console.log(prodSeleccionado);

    const handleChange=e=>{
        const {name, value}=e.target;
        setProdSeleccionado((prevState)=>({
          ...prevState,
          [name]: value
        })); 
    }

  return (
    <>
        <h4 style={{padding:"20px", marginLeft:"520px"}}>Productos en existencia</h4>
        <div className="container">
                <div className="row">
                    {productos.map((item) => (
                    <div key={item.id} className="col-lg-3 col-md-6 col-sm-12 mb-4">
                        <div className="card" style={{ width: "220px", height:"460px" }}>
                            <img className="card-img-top" src={item.imagen} alt="productos" />
                        <div className="card-body">
                            <h6 className="card-title">{item.nombre}</h6>
                            <hr />
                            <p className="card-text">$ {item.precio}</p>
                            <hr />
                            <p className="card-text">Disponibles: {item.stock}</p>
                        </div>
                        {item.stock == 0 ?
                        <button style={{width:"100%"}} onClick={()=> seleccionarProducto(item)}  className="btn btn-primary" disabled>Agregar al carrito</button>
                        :
                        <div className='card-footer'>
                            <button style={{width:"100%"}} onClick={()=> seleccionarProducto(item)}  className="btn btn-primary" >Agregar al carrito</button>
                        </div>
                        }
                        </div>
                        
                    </div>
                    ))}
                </div>
        </div>

            <Modal style={{width:"180px"}} isOpen={modalEditar}>
                <ModalBody style={{width:"150px"}}>
                    <FormGroup>
                        <label> Cantidad:  </label>
                        <input className='form-control' id="cantidad" name="cantidad" type="text" value={prodSeleccionado && prodSeleccionado.cant} onChange={handleChange} required/>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={()=> setModalEditar(false)} >Guardar</Button>
                </ModalFooter>
            </Modal>
    </>
  )
}

export default ListProductos
