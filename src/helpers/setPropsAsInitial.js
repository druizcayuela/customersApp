//Generar un High Order Component
import React, { Component } from 'react';

export const setPropsAsInitial = WrappedComponent => (
    class extends Component {
        render() {
            return <WrappedComponent {...this.props} 
                        initialValues={this.props} 
                        enableReinitialize  />
        }
    }
);