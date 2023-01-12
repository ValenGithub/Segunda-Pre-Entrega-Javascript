// Array para el carrito de compras
const carrito = []

// Ordenar productos de menor a mayor
const ordenarMenorMayor = () => {
    cubiertas.sort((a, b) => a.precio - b.precio)
    mostrarListaOrdenada()
};

// Ordenar productos de mayor a menor
const ordenarMayorMenor = () => {
    cubiertas.sort((a, b) => b.precio - a.precio)
    mostrarListaOrdenada()
};

const mostrarListaOrdenada = () => {
    const listaDeProductos = cubiertas.map(cubiertas => {
        return '- '+cubiertas.medida+" "+cubiertas.modelo+' $'+cubiertas.precio
    })
    alert('Lista de cubiertas:'+'\n\n'+listaDeProductos.join('\n'))
    comprarProductos(listaDeProductos)
};

const comprarProductos = (listaDeProductos) => {
    let cubiertaMedida = ''
    let cubiertaCantidad= 0
    let otroProducto = false

    do {
        cubiertaMedida = prompt('¿Qué cubierta desea comprar?'+'\n\n'+listaDeProductos.join('\n'))
        cubiertaCantidad = parseInt(prompt('¿Cuántas queres comprar?'))

        const cubierta = cubiertas.find(cubierta => cubierta.medida === cubiertaMedida)

        if (cubierta) {
            agregarAlCarrito(cubierta, cubierta.id, cubiertaCantidad)
        } else {
            alert('La cubierta no se encuentra en el catálogo!')
        }

        otroProducto = confirm('Desea agregar otro producto?')
    } while (otroProducto);

    confirmarCompra()
};

const agregarAlCarrito = (cubierta, productoId, cubiertaCantidad) => {
    const productoRepetido = carrito.find(cubierta => cubierta.id === productoId)
    if (!productoRepetido) {
        cubierta.cantidad += cubiertaCantidad
        carrito.push(cubierta)
    } else {
        productoRepetido.cantidad += cubiertaCantidad
    }
};

const eliminarProductoCarrito = (nombreProductoAEliminar) => {
    carrito.forEach((producto, index) => {
        if (producto.modelo === nombreProductoAEliminar) {
            if (producto.cantidad > 1) {
                producto.cantidad--
            } else {
                carrito.splice(index, 1)
            }
        }
    })
    confirmarCompra()
};

const confirmarCompra = () => {
    const listaProductos = carrito.map(producto => {
        return '- '+producto.modelo+' | Cantidad: '+producto.cantidad
    })

    const isCheckout = confirm('Checkout: '
        +'\n\n'+listaProductos.join('\n')
        +'\n\nPara continuar presione "Aceptar" sino "Cancelar" para eliminar un producto del carrito'
    )

    if (isCheckout) {
        finalizarCompra(listaProductos)
    } else {
        const nombreProductoAEliminar = prompt('Ingrese el nombre del producto a eliminar:')
        eliminarProductoCarrito(nombreProductoAEliminar)
    }
};

const finalizarCompra = (listaProductos) => {
    const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0)
    const precioTotal = carrito.reduce((acc, item) => acc + (item.cantidad * item.precio), 0)
    alert('Detalle de su compra: '
        +'\n\n'+listaProductos.join('\n')
        +'\n\nTotal de productos: '+cantidadTotal
        +'\n\nEl total de su compra es: '+precioTotal
        +'\n\nGracias por su compra!'
    )
};

const comprar = () => {
    const productosBaratos = confirm('¿Querés ordenar la lista de productos del mas barato al mas caro?')

    if (productosBaratos) {
        ordenarMenorMayor()
    } else {
        ordenarMayorMenor()
    }
};


comprar()