import React, {Component} from 'react';
import $ from "jquery";

class List extends Component{
    constructor(){
        super();
        this.state = {
            petugas: [
                {nip: "100", jeneng: "Budi", piket: "Senin"},
                {nip: "101", jeneng: "Ahmad", piket: "Rabu"},
                {nip: "108", jeneng: "sis", piket: "Kamis"},
            ],
            nip: "",
            jeneng: "",
            piket: "",
            action: ""
        }
    }

    bind = (e) => {
        this.setState({[e.target.name]: e.target.value});

        /* fungsi ini digunakan untuk memasukkan data dari elemen input 
            ke variable state. Contoh ketika input nis diisi, 
            maka secara otomatis variabel nis 
            pada state bernilai sesuai dengan inputan 
        */  
    }

    SavePetugas = (e) => {
        e.preventDefault();

        // temp digunakan u/ menyimpan data sementara data array petugas
        let temp = this.state.petugas;

        if(this.state.action === "insert") {
            // temp akan ditambahkan dengan data petugas yang baru  
            // sesuai dengan data yang dimasukkan pada form  
            temp.push({
                nip: this.state.nip,
                jeneng: this.state.jeneng,
                piket: this.state.piket
            });
        }else if(this.state.action === "update") {
            // mencari index data yg akan diubah
            let index = temp.findIndex(item => item.nip === this.state.nip);

            // mengubah data array sesuai dg masukan pada form
            temp[index].jeneng = this.state.jeneng;
            temp[index].piket = this.state.piket;
        }

        // array petugas diupdate dg nilai temp
        this.setState({petugas: temp});

        // menutup modal
        $('#modal').modal('hide');
    }

    Tambah = () => {
        // mengosongkan nilai nip, jeneng, alamat pd saat tombol add ditekan
        this.setState({
            nip: "",
            jeneng: "",
            piket: "",
            action: "insert"
        });
    }

    Edit = (item) => {
        this.setState({
            nip: item.nip,
            jeneng: item.jeneng,
            piket: item.piket,
            action: "update"
        });
    }

    Hapus = (index) => {
        // temp digunakan u/ menyimpan sementara data array petugas
        let temp = this.state.petugas;

        // menghapus data pada index yg dihapus
        temp.splice(index,1);

        // array petugas diupdate dg nilai data temp
        this.setState({petugas: temp});
    }

    render(){
        return(
            <div className="container">
                <div className="section_title text-center wow bounce animated" data-wow-duration="700ms">
                    <h2> Daftar Nama Petugas </h2>
                </div>

                {/* GENERATE LIST */}
                <ul className="list-group">
                    { this.state.petugas.map( (item, index) => {
                        return(
                            <li className="list-group-item" key={index}>
                                <h5 className="text-info"> {item.jeneng} </h5>
                                <h6> NIP : {item.nip} </h6>
                                <h6>Piket: {item.piket} </h6>

                                <button className="btn btn-sm btn-primary m-1"
                                    onClick={() => this.Edit(item)}
                                    data-toggle="modal" data-target="#modal">
                                        Edit
                                </button>

                                <button className="btn btn-sm btn-danger m-1"
                                    onClick={() => this.Hapus(index)} >
                                        Hapus
                                </button>
                            </li>
                        );
                    }) }
                </ul>

                <button className="btn btn-sm btn-success m-3"
                    onClick={this.Tambah}
                    data-toggle="modal" data-target="#modal">
                        Tambah Data
                </button>

                {/* Elemen From Modal */}
                <div className="modal fade" id="modal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header bg-success text-white">
                                <h5>Form Data Petugas</h5>
                            </div>

                            <form onSubmit={this.SavePetugas}>
                                <div className="modal-body">
                                    NIP
                                    <input type="text" className="form-control" 
                                        name="nip" onChange= {this.bind}
                                        value={this.state.nip}
                                    />
                                    Nama
                                    <input type="text" className="form-control" 
                                        name="jeneng" onChange= {this.bind}
                                        value={this.state.jeneng}
                                    />
                                    Jadwal Piket
                                    <input type="text" className="form-control" 
                                        name="piket" onChange= {this.bind}
                                        value={this.state.piket}
                                    />
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-primary">
                                        Simpan
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default List;