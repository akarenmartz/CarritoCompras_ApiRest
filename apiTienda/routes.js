const express = require('express')
const routes = express.Router()

routes.get('/', (req, res)=> {
    req.getConnection((err, conn)=> {
        if(err) return res.send(err)

        conn.query('SELECT * FROM tblproductos', (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.get('/venta', (req, res)=> {
    req.getConnection((err, conn)=> {
        if(err) return res.send(err)

        conn.query('SELECT * FROM tblventa', (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.post('/', (req, res)=> {
    req.getConnection((err, conn)=> {
        if(err) return res.send(err)

        conn.query('insert into tblventa set idVenta=DEFAULT, fecha=NOW(), ?', [req.body], (err, rows)=>{
           if(err) return res.send(err)

            res.send('Producto insertado')
        })
    })
})

routes.delete('/:id', (req, res)=> {
    req.getConnection((err, conn)=> {
        if(err) return res.send(err)

        conn.query('DELETE FROM tblproductos WHERE id = ?', [req.params.id], (err, rows)=>{
           if(err) return res.send(err)

            res.send('libro eliminado')
        })
    })
})

routes.put('/:id', (req, res)=> {
    req.getConnection((err, conn)=> {
        if(err) return res.send(err)

        conn.query('UPDATE tblproductos set ? WHERE id = ?', [req.body, req.params.id], (err, rows)=>{
           if(err) return res.send(err)

            res.send('Producto actualizado')
        })
    })
})


module.exports = routes
