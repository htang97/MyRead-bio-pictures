import { Container, Row, Col} from 'react-bootstrap';
import { setAlert } from '../actions/alert';
import React from 'react';
import GoogleBtn from '../external-logins/GoogleBtn';
import FacebookLogin from 'react-facebook-login';
import "./ExtensionPopUp.css";
import { login, register, loadUser } from '../actions/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'; 

function ExtensionPopUp({ 
    login, 
    isAuthenticated, 
    register, 
    loadUser, 
    setAlert,
    auth: { user } 
  }){

    async function handleGoogleSubmit(g) {
        console.log('inside handleGoogleSubmit');
        console.log("in app: ", g);
        await login(g.getEmail(), g.getId());
      }
        
      async function handleFacebookSubmit(fb) {
        console.log('inside handleFacebookSubmit');
        console.log('in app: ', fb);
        //set email and password
        await login(fb.email, fb.id);
      }

    const responseFacebook = (response) => {
        console.log(response);
        // Login failed
        if (response.status === "unknown") {
          alert("Facebook authentication failed!");
        //   setLogin(false);
          return false;
        }
        
        console.log('FACEBOOK login successful: ', response)
        handleFacebookSubmit(response); //this is the problem child rn
      };


    return(
        <div style ={{background:"whiteSmoke", height:"100vh"}}>
            <Container>
            <Row className="align-items-center text-center justify-content-center" style={{paddingTop:"5rem"}}>
               
            <h1 className="ext-h1" style={{paddingBottom:"1rem"}}>MyRead</h1>
            <p>Click below to log into MyRead via facebook or google</p>
            <Row className="justify-content-center">
                <Col className="col-sm-auto">
                <FacebookLogin
                appId="324834482819869"
                autoLoad={false}
                fields="first_name,last_name,email,picture,id"
                scope="public_profile,email"
                callback={responseFacebook}
                icon="fa-facebook"
                textButton="Authenticate with Facebook"
                size="small"
                cssClass="btnFacebook"
                />
                </Col>
                <Col className="col-sm-auto">
                <GoogleBtn 
                handleGoogleSubmit={handleGoogleSubmit} 
                /> 
                </Col>
                </Row>
                </Row>
                </Container>
        </div>
    )
}

ExtensionPopUp.propTypes = {
    login: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth,
});

export default connect(mapStateToProps, {
    login,
    register,
    loadUser,
    setAlert,
})(ExtensionPopUp);
