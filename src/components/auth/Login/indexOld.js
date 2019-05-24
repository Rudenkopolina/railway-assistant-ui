import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { IconButton, Button, Paper, Divider } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import InputAdornment from '@material-ui/core/InputAdornment';
import Email from '@material-ui/icons/Email';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Snackbar from '@material-ui/core/Snackbar';

import { login } from '../../../redux/actions/auth';
import UrlRestoringService from '../../../services/url_restoring_service';
import './styles.css';


class Login extends React.Component {

	state = {
		email: '',
		password: '',
		showPassword: false,
		openError: false,
		messageError: 'Ошибка'
	}

	componentDidUpdate({ auth: prevAuth }) {
		const { auth, history } = this.props;

		if (prevAuth.pending && !auth.pending) {
			if (!auth.user) {
				console.log('failed');
			} else {
				history.push(UrlRestoringService.getUrl() || '/');
			}
		}
	}

	handleClickShowPassword = () => {
		this.setState(state => ({ showPassword: !state.showPassword }));
	};

	handleChange = prop => event => {
		this.setState({ [prop]: event.target.value });
	};

	goRegister = () => {
		const { history, register } = this.props;
		history.push(register);
	}

	loginUser = () => {
		const { email, password } = this.state;
		this.props.login(email, password);
	}

	handleCloseError = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		this.setState({ openError: false });
	}

	enterLogin = e => {
		if (e.keyCode === 13) {
			e.preventDefault();
			this.loginUser();
		}
	}

	render() {
		const { auth, register } = this.props;

		if (auth.user) {
			return <Redirect to={UrlRestoringService.getUrl() || '/'} ></Redirect>;
		}

		return (
			<div className='login-form'>
				<Paper className='paper'>
					<TextField
						className='input-form'
						id='input-with-icon-textfield'
						label='Email'
						variant='outlined'
						onChange={this.handleChange('email')}
						onKeyDown={this.enterLogin}
						InputProps={{
							startAdornment: (
								<InputAdornment position='start'>
									<Email color='primary' />
								</InputAdornment>
							),
						}}
					/>
					<TextField
						id='outlined-adornment-password'
						className='input-form'
						variant='outlined'
						type={this.state.showPassword ? 'text' : 'password'}
						label='Пароль'
						value={this.state.password}
						onChange={this.handleChange('password')}
						onKeyDown={this.enterLogin}
						InputProps={{
							endAdornment: (
								<InputAdornment position='end'>
									<IconButton
										color='primary'
										aria-label='Toggle password visibility'
										onClick={this.handleClickShowPassword}
									>
										{this.state.showPassword ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							),
						}}
					/>
					<Button size='large' variant='contained' color='primary' className='button-form' onClick={this.loginUser}>
						Войти
          			</Button>
				</Paper>
				{register && 
					<Fragment>
						<Divider className='divider' />
						<Button size='small' className='link-button' onClick={this.goRegister}>Зарегистрировать пользователя</Button>
					</Fragment>
				}
				<Snackbar
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'center',
					}}
					open={this.state.openError}
					autoHideDuration={60}
					variant="error"
					className='error-snachbar'
					// className={classes.margin}
					message={this.state.messageError}
					action={[
						<IconButton
							key="close"
							aria-label="Close"
							color="inherit"
							onClick={this.handleCloseError}
						>
							<CloseIcon />
						</IconButton>,
					]}
				/>
			</div>

		);
	}
}

const mapStateToProps = ({ auth }) => ({ auth });

const mapDispatchToProps = dispatch => ({
	login: (email, password) => dispatch(login(email, password))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
