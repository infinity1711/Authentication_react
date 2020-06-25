import React from 'react'
import { Redirect } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'
export default class Dashboard extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            userName: '',
            products: [
                {
                    id: 'P1',
                    name: 'Product 1',
                    rate: '5700',
                    quality: 1
                },
                {
                    id: 'P2',
                    name: 'Product 2',
                    rate: '7000',
                    quality: 3
                },
                {
                    id: 'P3',
                    name: 'Product 3',
                    rate: '3900',
                    quality: 2
                },
                {
                    id: 'P4',
                    name: 'Product 4',
                    rate: '9200',
                    quality: 1
                },
            ],
            popupShow: false,
            pid: '',
            pname: '',
            prate: '',
            pquality: ''
        }
    }

    componentDidMount() {
        console.log(this.props)
        if (!this.props.userData.email) { return <Redirect to='/login' /> }
        let userName = this.props.userData.email
        userName = userName.split('@')[0]
        this.setState({ userName: userName })
    }


    delete = (idx) => {
        let products = this.state.products;
        products.splice(idx, 1)
        console.log(products)
        this.setState({ products: products })
    }

    showPopup = () => {
        this.setState({ popupShow: true })
    }

    handleClose = () => {
        this.setState({ popupShow: false })
    }

    handleChange = (event) => {
        let { name, value } = event.target
        this.setState({ [name]: value })
    }

    addProcuct = () => {
        let obj = {
            id: this.state.pid,
            name: this.state.pname,
            rate: this.state.prate,
            quality: this.state.pquality
        }
        let products = this.state.products;
        products.push(obj)
        console.log(products)
        this.setState({ products: products })
        this.handleClose()
    }
    
    render() {
        return (
            <>
                <h3>Welcome {this.state.userName}</h3>

                <h4 className="margin-30">Products
                <button className="btn btn-link float-right" onClick={this.showPopup}>Add Product</button>
                </h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th>PID</th>
                            <th>Name</th>
                            <th>Rate</th>
                            <th>Quality</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.products.map((product, i) =>
                            (<>
                                <tr>
                                </tr>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.rate}</td>
                                <td>{product.quality}</td>
                                <td>
                                    <button className="btn btn-link" onClick={() => { this.delete(i) }}>Delete</button>
                                </td>
                            </>)
                        )}
                    </tbody>
                </table>


                <Modal show={this.state.popupShow} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Product Id</p>
                        <input type="text" className="form-control form-group" name="pid" onChange={this.handleChange} />
                        <p>Product Name</p>
                        <input type="text" className="form-control form-group" name="pname" onChange={this.handleChange} />
                        <p>Product Rate</p>
                        <input type="number" className="form-control form-group" name="prate" onChange={this.handleChange} />
                        <p>Product Quality</p>
                        <input type="number" className="form-control form-group" name="pquality" onChange={this.handleChange} />
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn brn-secondary" onClick={this.handleClose}>
                            Close
                        </button>
                        <button className="btn btn-primary" onClick={this.addProcuct}>
                            Add
                        </button>
                    </Modal.Footer>
                </Modal>
            </>
        )

    }
}