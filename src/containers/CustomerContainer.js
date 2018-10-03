
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import AppFrame from '../components/AppFrame';
import { getCustomerByDni } from '../selectors/customers';
import { Route } from 'react-router-dom'
import CustomerEdit from '../components/CustomerEdit';
import CustomerData from '../components/CustomerData';
import { withRouter} from 'react-router-dom';
import { fetchCustomers } from '../actions/fetchCustomers';
import { updateCustomer } from '../actions/updateCustomer';
import { deleteCustomer } from '../actions/deleteCustomer';



class CustomerContainer extends Component {

    componentDidMount() {
        if(!this.props.customer) {
            this.props.fetchCustomers();
        }
    }
    

    handleSubmit = values => {
        console.log(JSON.stringify(values));

        const { id } = values;
        return this.props.updateCustomer(id, values);
    }

    handleOnBack = () => {
        this.props.history.goBack();
    }

    handleOnSubmitSuccess = () => {
        this.handleOnBack();
    }

    handleOnDelete = id => {
        this.props.deleteCustomer(id).then(v => this.handleOnBack());
    }


    renderCustomerControl = (isEdit, isDelete) => {
        const CustomerControl = isEdit ? CustomerEdit : CustomerData;
        return <CustomerControl {...this.props.customer} 
                        onSubmit={this.handleSubmit}
                        onSubmitSuccess={this.handleOnSubmitSuccess} 
                        onBack={this.handleOnBack}
                        isDeleteAllow={!!isDelete}
                        onDelete={this.handleOnDelete}  /> 
    }

    renderBody = () => (
        <Route path="/customers/:dni/edit" children={
            ( { match: isEdit } ) => (
                <Route path="/customers/:dni/del" children={
                    ( { match: isDelete } ) => (
                        this.renderCustomerControl(isEdit, isDelete))
                } />)
        } />
    )

    //<p>Datos del cliente  "{this.props.customer.name}" </p>
    render() {
        return (
            <div>
                <AppFrame
                    header={`Cliente ${this.props.dni}`}
                    body={this.renderBody()} >
                </AppFrame>
            </div>
        );
    }
}


CustomerContainer.propTypes = {
    dni: PropTypes.string.isRequired,
    customer: PropTypes.object,
    fetchCustomers: PropTypes.func.isRequired,
    updateCustomer: PropTypes.func.isRequired,
    deleteCustomer: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => ({
    customer: getCustomerByDni(state, props)
});

export default withRouter(connect(mapStateToProps, {
    fetchCustomers,
    updateCustomer,
    deleteCustomer
}) (CustomerContainer));

