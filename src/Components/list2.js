import React, {Component} from 'react';
import $ from "jquery";
import '../index.css';

class list2 extends Component{
    constructor(){
        super();
        this.state = {
            siswa : [
                {nis: "100", nama: "Musthofa", alamat: "Surabaya"},
                {nis: "101", nama: "Nurul", alamat: "Malang"},
                {nis: "102", nama: "Misbah", alamat: "Pasuruan"}, 
            ],
            nis: "",
            nama: "",
            alamat: "",
            action: ""
        }
    }

    // FUNCTION
    bind = (e) => {
        this.setState({[e.target.name]: e.target.value});
        /* fungsi ini digunakan untuk memasukkan data dari elemen input 
            ke variable state. 
            Contoh ketika input nis diisi, maka secara otomatis variabel nis 
            pada state bernilai sesuai dengan inputan 
        */  
    }

    SaveSiswa = (e) => {
        e.preventDefault();
        // temp digunakan untuk menyimpan sementara data array siswa  
        let temp = this.state.siswa;

        if(this.state.action === "insert") {
            //  temp akan ditambahkan dg data siswa yang baru  
            //  sesuai dengan data yang dimasukkan pada form  
            temp.push({
                nis: this.state.nis,
                nama: this.state.nama,
                alamat: this.state.alamat
            });
        }else if (this.state.action === "update") {
            // mencari index data yg akan diubah
            let index = temp.findIndex(item => item.nis === this.state.nis);

            //mengubah data array sesuai dg data yg dimasukkan
            temp[index].nama = this.state.nama;
            temp[index].alamat = this.state.alamat;
        }

        // array siwa diupdate dg nilai data temp
        this.setState({siswa: temp});

        //menutup modal
        $('#modal').modal('hide');
    }

    Add = () => {
        // mengosongkan nilai nis, nama, dan alamat pd saaat tombol add ditekan
        this.setState({
            nis: "",
            nama: "",
            alamat: "",
            action: "insert"
        });
    }

    Edit = (item) => {
        this.setState({
            nis: item.nis,
            nama: item.nama,
            alamat: item.alamat,
            action: "update"
        });
    }

    Drop = (index) => {
        // temp digunakan u/ menyimpan sementara data array siswa 
        let temp = this.state.siswa;

        // menghapus data pd index yg dihapus
        temp.splice(index,1);

        // array siswa diupdate dg nilai data temp
        this.setState({siswa: temp});
    }

    render(){
        return(
            <div className="container">
                <div className="section_title text-center wow bounce animated" data-wow-duration="700ms">
                    <h2> Daftar Nama Siswa </h2>
                </div>
                {/* generate link */}
                <ul className="list-group">
                    {this.state.siswa.map((item, index) => {
                        return(
                            <li className="list-group-item" key={index}>
                                <h5 className="text-info">{item.nama}</h5>
                                <h6>NIS: {item.nis}</h6>
                                <h6>Alamat: {item.alamat}</h6>

                                <button className="btn btn-sm btn-primary m-1" 
                                        onClick={() => this.Edit(item)}  
                                        data-toggle="modal" data-target="#modal">  
                                            Edit  
                                </button>  


                                <button className="btn btn-sm btn-danger m-1"
                                        onClick={() => this.Drop(index)}>
                                            Hapus
                                </button>
                            </li>
                        );
                    })}
                </ul>

                <button className="btn btn-sm btn-success m-3" onClick={this.Add}
                        data-toggle="modal" data-target="#modal">
                            Tambah Data
                </button>

                {/* Elemen Form Modal */}
                <div className="modal fade" id="modal">
                    <div className="modal-dialog">
                        <div className="modal-content">                
                                <div className="sec-title text-center">
                                    <h2> Form Siswa </h2>
                                </div>

                            <form onSubmit={this.SaveSiswa}>
                                <div className="modal-body">
                                    NIS
                                    <input type="text" name="nis" className="form-control" onChange={this.bind}
                                        value={this.state.nis} />
                                    Nama
                                    <input type="text" name="nama" className="form-control" onChange={this.bind}
                                        value={this.state.nama} />
                                    Alamat
                                    <input type="text" name="alamat" className="form-control" onChange={this.bind}
                                        value={this.state.alamat} />
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
        );
    }
}

export default list2;