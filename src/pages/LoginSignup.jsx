
import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { connect } from 'react-redux'
import { onLogin, onSignup } from '../store/actions/app.actions.js'
import { TextField} from '@material-ui/core'

export class _LoginSignUp extends Component {

    state = {
        userInfo: {
            fullname: '',
            username: '',
            password: ''
        },
        credentials: {
            username: '',
            password: ''
        },
        pageMode: null
    }

    componentDidMount() {
        const { loggedinUser } = this.props
        if (loggedinUser) this.props.history.push('/board')
        const pageMode = this.props.location.pathname === '/login' ? 'login' : 'signup'
        this.setState({ pageMode })
    }

    componentDidUpdate() {
        const { loggedInUser } = this.props
        if (loggedInUser) this.props.history.push('/board')
    }

    validate = (values) => {
        const errors = {}
        if (!values.username) {
            errors.username = 'Required'
        } else if (values.username.length < 6) {
            errors.username = 'Please use at least 6 characters'
        }
        if (values.password.length < 6) {
            errors.password = 'Password too short'
        }
        if (!values.fullname) {
            errors.fullname = 'Required'
        } else if (values.fullname.length < 6) {
            errors.fullname = 'Please use at least 6 characters'
        }
        return errors
    }

    onSubmit = (values) => {
        const { pageMode } = this.state
        const { onLogin, onSignup } = this.props
        pageMode === 'login' ? onLogin(values) : onSignup(values)
    }

    styledField = (props) => {
        return  <TextField {...props} variant="outlined" color={'primary'} />
    }

    render() {
        const { pageMode, credentials, userInfo } = this.state
        const { loginErr } = this.props
        if (!pageMode) return ''
        return (<>
            {pageMode === 'login' && <section className="login-signup flex column align-center">
                <h1>Login</h1>
                <Formik initialValues={credentials} onSubmit={this.onSubmit} >
                    <Form className="flex column">
                        <Field type="username" label="Username" name="username" as={this.styledField} />
                        <ErrorMessage name="username" component="div" />
                        <Field type="password" label="Password" name="password" as={this.styledField} />
                        <ErrorMessage name="password" component="div" as={this.styledField} />
                        {loginErr && <p>{loginErr}</p>}
                        <button type="submit" className="primary-btn">Login</button>
                    </Form>
                </Formik>
            </section>}
            {pageMode === 'signup' &&
                <section className="login-signup flex column align-center full">
                    <h1>Signup</h1>
                    <Formik initialValues={userInfo} validateOnChange={false} validateOnBlur={false} validate={this.validate} onSubmit={this.onSubmit}>
                        <Form className="flex column">
                            <Field type="fullname" label="Fullname" name="fullname" as={this.styledField} />
                            <ErrorMessage name="fullname" component="p" />
                            <Field type="username" label="Username" name="username" as={this.styledField} />
                            <ErrorMessage name="username" component="p" />
                            <Field type="password" label="Password" name="password" as={this.styledField} />
                            <ErrorMessage name="password" component="p" />
                            <button type="submit" className="primary-btn">Signup</button>
                        </Form>
                    </Formik>
                </section>}
        </>
        )
    }
}

function mapStateToProps(state) {
    return {
        loggedInUser: state.appModule.loggedInUser,
        loginErr: state.appModule.loginErr
    }
}


const mapDispatchToProps = {
    onLogin,
    onSignup,
}

export const LoginSignUp = connect(mapStateToProps, mapDispatchToProps)(_LoginSignUp)