import React from "react";
import $ from "jquery";

class Cart extends React.Component{
    constructor() {
        super()
        this.state = {
            cart: [],  // untuk menyimpan list cart
            user: "",  // untuk menyimpan nama user
            total: 0,   // untuk menyimpan total belanja
            selectedItem: null 
        }
    }

    initCart = () => {
        // memanggil data cart pd localStorage
        let tempCart = []
        if(localStorage.getItem("cart") !== null) {
            tempCart = JSON.parse(localStorage.getItem("cart"))
        }

        // memanggil data user pd localStorage
        let userName = localStorage.getItem("user")

        // kalkulasi total harga
        let totalHarga = 0;
        tempCart.map(item => {
            totalHarga += (item.harga * item.jumlahBeli)
        })

        // memasukkan data cart, user, dan total harga pd state
        this.setState({
            cart: tempCart,
            user: userName,
            total: totalHarga
        })
    }

    componentDidMount(){
        this.initCart()
    }

    saveKeranjang = (e) => {
        e.preventDefault();

        let tempCart = this.state.cart;

        // knp pake findIndex ??
        if(this.state.action === "update"){
            let index = tempCart.findIndex(item => item.isbn === this.state.isbn);
            tempCart[index].jumlahBeli = this.state.jumlahBeli;
        }

        this.setState({cart: tempCart});

        // simpan data perubahan pd localStorage
        localStorage.setItem("cart", JSON.stringify(tempCart))

        this.initCart();

        $('#modal_cart').modal('hide');
    }

    componentDidMount(){
        this.initCart()
    }

    edit = (item) => {
        $("#modal_cart").modal("show")
        this.setState({
            isbn: item.isbn,
            jumlahBeli: item.jumlahBeli,
            action: "update",
            selectedItem: item
        })
    }

    hapus = (item) => {
        if(window.confirm("Apakah anda ingin menghapus data keranjang belanja ini ?")) {
            let tempCart = this.state.cart

            let index = tempCart.indexOf(item)

            tempCart.splice(index,1)

            this.setState({cart: tempCart})

            // simpan perubahan data pd localStorage
            localStorage.setItem("cart", JSON.stringify(tempCart))
        }
    }

    componentDidMount(){
        this.initCart()
    }

    render(){
        return(
            <div className="container">
                <div className="card col-12 mt-2">
                    <div className="card-header bg-primary text-white">
                        <h4>Data Keranjang Belanja</h4>
                    </div>

                    <div className="card-body">
                        <h5 className="text-primary">
                            Nama User: { this.state.user }
                        </h5>

                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Nama Item</th>
                                    <th>Harga</th>
                                    <th>Qty</th>
                                    <th>Total Harga</th>
                                    <th>Menu</th>
                                </tr>
                            </thead>

                            <tbody>
                                { this.state.cart.map ( (item, index) => (
                                    <tr key={index}>
                                        <td>{item.judul}</td>
                                        <td>Rp {item.harga}</td>
                                        <td>{item.jumlahBeli}</td>
                                        <td>
                                            Rp { item.harga * item.jumlahBeli }
                                        </td>

                                        <td>
                                            <button className="btn btn-primary m-1"
                                                onClick={() => this.edit(item)} 
                                                data-toggle="modal" data-target="#modal_cart">
                                                Edit
                                            </button>

                                            <button className="btn btn-danger m-1"
                                                onClick={() => this.hapus(item)} >
                                                Hapus
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <h4 className="text-danger">
                            Total Harga: Rp {this.state.total}
                        </h4>
                    </div>
                </div>

                    <div className="modal fade" id="modal_cart">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header bg-warning text-white">
                                    <h5>Form Keranjang Belanja</h5>
                                </div>

                                <form onSubmit={ev => this.saveKeranjang(ev)}>
                                    Jumlah Beli
                                    <input type="number" className="form-control mb-2"
                                        value= {this.state.jumlahBeli}
                                        onChange= {ev => this.setState({jumlahBeli: ev.target.value})}
                                        required
                                    />

                                    <button className="btn btn-info btn-block">
                                        Simpan
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
            </div>
        )
    }
}

export default Cart;