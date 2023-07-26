import React,{useState} from 'react';
import { FaCheck } from "react-icons/fa";
import  emailjs from 'emailjs-com';
import Nota from '../Pages/Nota';
import { Button, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter }from 'reactstrap';

const ListaCarrito = ({ productoCarr,setProductoCarr,total,setTotal, setListUpdated}) => {
    const [modalEditar, setModalEditar] = useState (false);
    const [modalEmail, setModalEmail] = useState (false);
    const [cantidad,setCantidad]= useState(0)

    const [prodSeleccionado,setProdSeleccionado]= useState ({
        id:'',
        nombre:'',
        precio:'',
        stock:'',
        cant:''
    })

    const vaciar = () => {
        setProductoCarr([]);
        setTotal(0)
        //console.log(productoCarr)
    }
    const obtenerProd = (item)=>{
        setProdSeleccionado(item);
        setModalEditar(true);
    }
    //console.log(prodSeleccionado)
    
    const enviarEmail = (e)=> {
        const requestInit = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({total:total})
        }
        fetch('http://localhost:3000/api', requestInit)
        .then(res => res.text())
        .then(res => console.log(res))
        const productoAct = productoCarr;
        productoAct.forEach(element => {
            const stock = element.stock-element.cant;
            const id = element.id;
            console.log(id,stock);

            const requestInit = {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({stock})
            }
            fetch('http://localhost:3000/api/' + id, requestInit)
            .then(res => res.text())
            .then(res => console.log(res))
            setListUpdated(true)
        });
        e.preventDefault();
        emailjs.sendForm('service_tvpz8xp','template_2yy9yiq',e.target,'9VT9nyndy2rmAxEHL').then(res=>{
            alert("Se ha enviado un correo");
            //console.log(res);
        })
        
        setModalEmail(false);
        vaciar();
    }

    const handleChange=e=>{
        
        const {name, value}=e.target;
        const cantidad = e.target.value;
        //console.log(cantidad);
        //console.log(prodSeleccionado.stock);
        //console.log(prodSeleccionado.cant);
        if(cantidad > prodSeleccionado.stock){
            alert('La cantidad es mayor al Stock')
        }
        else{
            setProdSeleccionado((prevState)=>({
                ...prevState,
                [name]: value
              }));
        }

    }
    //console.log(prodSeleccionado)

    const actualizarCant = ()=>{
        const id=prodSeleccionado.id;
        console.log(cantidad)
        if(prodSeleccionado.cant == 0){
            setProductoCarr(productoCarr.filter(item=>item.id !== id));

            total =total - (prodSeleccionado.precio * prodSeleccionado.cant);
            
            setModalEditar(false);
        }else{
        var prodActualizar = productoCarr;
        prodActualizar.map(prod=>{
            if(prod.id===prodSeleccionado.id){
                    prod.id=prodSeleccionado.id;
                    prod.nombre=prodSeleccionado.nombre;
                    prod.precio=prodSeleccionado.precio;
                    prod.stock=prodSeleccionado.stock;
                    prod.cant=prodSeleccionado.cant  
            }
        });
        
        setProductoCarr(prodActualizar);
        const result = productoCarr.filter(x=>x.id === id) 
        console.log(result)
        setModalEditar(false);
    }
    }
    const act = ()=>{
        const requestInit = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({total:total})
        }
        fetch('http://localhost:3000/api', requestInit)
        .then(res => res.text())
        .then(res => console.log(res))

        const productoAct = productoCarr;
        productoAct.forEach(element => {
            const stock = element.stock-element.cant;
            const id = element.id;
            console.log(id,stock);

            const requestInit = {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({stock})
            }
            fetch('http://localhost:3000/api/' + id, requestInit)
            .then(res => res.text())
            .then(res => console.log(res))
            setListUpdated(true)
        });

    }
    //console.log(cantidad);
    //console.log(productoCarr)
    const eliminar = (item)=>{
        const id = item.id;
        console.log(item.precio);
        console.log(item.cant);
        //console.log(id);
        setProductoCarr(productoCarr.filter(item=>item.id !== id));

        total =total - (item.precio * item.cant);
    }

    
  return (
    <>
        {!productoCarr.length ?
        <div class="alert alert-success" style={{width:"500px" , marginTop:"30px", marginLeft:"480px"}}>
            <h3>No hay poductos</h3>
        </div>
        :
        <div className='container'>
            <div className='row' style={{padding:"15px"}} >
                <div className='col-10'>
                    <h3 >Lista del carrito</h3>
                </div>
                <div className='col-2'>
                    <button type='button' style={{fontSize:"12px"}} className='btn btn-secondary' onClick={()=> vaciar()}>Vaciar Carrito</button>
                </div> 
            </div>
        
    
      <table class="table" style={{width:"1050px", marginTop:"30px", marginLeft:"50px"}}>
        <thead>
            <tr>
            <th scope="col">Descripción</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Precio</th>
            <th scope="col">Total</th>
            <th scope="col">------</th>
            </tr>
        </thead>
        <tbody>
            {productoCarr.map((item) => {
                total += item.cant * item.precio 
                return( 
                <tr key = {item.id}>
                    <td width="40%">{item.nombre}</td>
                    <td width="20%"><input type="number" name='cantidad'  id='cantidad' value={item.cant} onClick={()=>obtenerProd(item)} readOnly/></td>
                    <td width="10%">${item.precio}</td>
                    <td width="15%">{item.precio * item.cant}</td>
                    <td width="15%"><button class="btn btn-danger" type='button' onClick={()=> eliminar(item)}>Eliminar</button></td>
                </tr>);
                })}
                <tr>
                    <td colSpan="3" align='right'><h3>Total</h3></td>
                    <td align='left'><h3>${total}</h3></td>
                </tr>
            </tbody>
                <tr><td colSpan="5" align='right'><button type='button' style={{ fontSize:"20px"}} class="btn btn-primary" onClick={()=> setModalEmail(true)} >Adquirir</button></td></tr>
            
            
        </table>
        </div>
        
        }
                <Modal style={{width:"480px"}}  isOpen={modalEmail}>
                <form onSubmit={enviarEmail}>
                <ModalBody style={{width:"450px"}}>
                    <FormGroup>
                        <label> Nombre:  </label>
                        <input id="nombre" name="nombre" class="form-control" type="text" placeholder="Por favor escribe tu nombre" required/>
                    </FormGroup>
                    <FormGroup>
                        <label> Correo electronico:  </label>
                        <input id="email" name="email" class="form-control" type="email" placeholder="Por favor escribe tu correo" required/>
                        <small id="emailHelp" class="form-text text-muted">Nota: se enviaran a este correo</small>
                    </FormGroup>
                    <FormGroup>
                        <label> Productos Adquiridos:  </label>
                        <textarea type="text" className="form-control" value={ productoCarr.map((item)=> (item.nombre))} id="mensaje" name="mensaje" readOnly></textarea> <br />
                        <label> Total a Pagar:  </label>
                        <input type="text" className="form-control" id="total"  value={ total } name="total" readOnly/>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <button type="submit" className="btn btn-primary">Enviar nota</button>
                    <Button color="danger" onClick={()=> setModalEmail(false)} >Cancelar</Button>
                </ModalFooter>
                </form>
            </Modal>

            <Modal style={{width:"180px"}} isOpen={modalEditar}>
                <ModalBody style={{width:"150px"}}>
                    <FormGroup>
                        <input className='form-control' id="id" name="id" type="hidden" value={prodSeleccionado && prodSeleccionado.id} onChange={handleChange}/>
                        <input className='form-control' id="nombre" name="nombre" type="hidden" value={prodSeleccionado && prodSeleccionado.nombre} onChange={handleChange}/>
                        <input className='form-control' id="precio" name="precio" type="hidden" value={prodSeleccionado && prodSeleccionado.precio} onChange={handleChange}/>
                        <label> Disponibles:  </label>
                        <input className='form-control' id="stock" name="stock"  value={prodSeleccionado && prodSeleccionado.stock} onChange={handleChange} readOnly/>
                        <label> Cantidad:  </label>
                        <input className='form-control' id="cant" name="cant"  value={prodSeleccionado && prodSeleccionado.cant} onChange={handleChange} required/>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={()=> actualizarCant()} >Guardar</Button>
                </ModalFooter>
            </Modal>
            
        
    </>
  )

}

export default ListaCarrito
