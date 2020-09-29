import React, { Component, Fragment } from 'react';
import {
    StyleSheet,
    Image,
    View,
    TouchableOpacity,
    Text,
    ScrollView,
    StatusBar,
} from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen';
import { FloatingTitleTextInputField } from './floating_title_text_input_field';
// class
class SignIn extends Component {
    state = {
        emailID: '',
        password: '',
        isShowWarning: false
    }
    _updateMasterState = (attrName, value) => {
        this.setState({ [attrName]: value });
    }
    signinBtnPressed() {
        this.setState({ isShownWarning: true })
        if (this.state.emailID && this.state.password)
            this.props.navigation.navigate("TabView")
        else this._validation()
    }
    _validation = () => {
        let emailID = this.state.emailID, password = this.state.password, errors = {}
        if (!emailID)
            errors.emailID = "❌   Email id cannot be blank. Please enter a valid email id"
        // else if (typeof emailID !== 'undefined')
        //     var pattern = new RegExp(
        //         /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
        //     );
        //     if (!pattern.test(emailID))
        //         console.log(`Hello ${emailID}`)
        //         errors.emailID = "❌  Please enter a valid email id"
        //         this.setState({errors})
        if (!password)
            errors.password = "❌   Password cannot be blank. Please enter correct password"
        this.setState({ errors })
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <Fragment>
                <StatusBar barStyle="dark-content" />
                <View style={styles.mainScreen}>
                    <View style={styles.adjustScreen}>
                        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                                <Image
                                    source={require('../assets/images/back.png')}
                                    style={styles.backIcon}
                                />
                            </TouchableOpacity>
                            <View style={styles.hsIconView}>
                                <Image
                                    source={require('../assets/images/logo.png')}
                                    style={styles.introImage}
                                />
                            </View>
                            <View style={styles.alignCenterCol}>
                                <Text style={styles.biggerBoldTxt}>Hello</Text>
                                <Text style={styles.defaultBoldTxt}>Sign in to your Account</Text>
                            </View>
                            <View style={styles.TxtInputViewTwo}>
                                <View style={styles.floatingTxtInputView}>
                                    <FloatingTitleTextInputField
                                        attrName='emailID'
                                        title='Email ID*'
                                        value={this.state.emailID}
                                        updateMasterState={this._updateMasterState}
                                    />
                                </View>
                                <Image
                                    source={require('../assets/images/mail.png')}
                                    style={styles.inputFieldIcon}
                                />
                            </View>
                            {this.state.isShownWarning && !this.state.emailID ? <Text style={styles.warningTxt}>{this.state.errors.emailID}</Text> : null}
                            <View style={styles.TxtInputViewTwo}>
                                <View style={styles.floatingTxtInputView}>
                                    <FloatingTitleTextInputField
                                        attrName='password'
                                        title='Password*'
                                        value={this.state.password}
                                        updateMasterState={this._updateMasterState}
                                    />
                                </View>
                                <Image
                                    source={require('../assets/images/eye-open.png')}
                                    style={styles.inputFieldIcon}
                                />
                            </View>
                            {this.state.isShownWarning && !this.state.password ? <Text style={styles.warningTxt}>{this.state.errors.password}</Text> : null}
                            <TouchableOpacity style={styles.aliRight}>
                                <Text style={styles.smallGreenTxt}>Forgot Password?</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.defaultBtnStyle}
                                onPress = {()=> this.signinBtnPressed()}
                            >
                                <Text style={styles.defaultBtnTxt}>Sign In</Text>
                            </TouchableOpacity>
                            <View style={styles.alignCenter}>
                                <Text style={styles.alreadyHaveTxt}>Don't have an account? </Text>
                                <TouchableOpacity style={styles.linkView} onPress={() => navigate("CreateAccount")}>
                                    <Text style={styles.link}>Register Now</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </Fragment>
        );
    }
}
const styles = StyleSheet.create({
    mainScreen: {
        height: '100%',
        width: '100%',
        backgroundColor: '#fff',
        alignItems: 'center'
    },
    adjustScreen: {
        height: '100%',
        width: '90%',
    },
    scrollView: {
        height: '100%',
        width: '100%'
    },
    backIcon: {
        marginTop: hp(4.5),
        height: hp(4.5),
        width: hp(4.5),
        resizeMode: 'contain',
    },
    hsIconView: {
        height: hp(10),
        width: wp(75),
        // backgroundColor: '#ff0',
        marginTop: hp(2),
        alignSelf: 'center'
    },
    introImage: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain'
    },
    alignCenter: {
        alignSelf: 'center',
        flexDirection: 'row'
    },
    alignCenterCol: {
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: hp(3)
    },
    defaultBoldTxt: {
        fontSize: hp(2.3),
        fontWeight: 'bold'
    },
    biggerBoldTxt: {
        fontSize: hp(3.8),
        fontWeight: 'bold'
    },
    TxtInputView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: "#9Ca4ab",
        borderBottomWidth: hp(0.1),
        marginTop: hp(8)
    },
    floatingTxtInputView: {
        width: '88%',
    },
    inputFieldIcon: {
        height: hp(2.7),
        width: hp(2.7),
        resizeMode: 'contain',
        marginBottom: hp(0),
        tintColor: '#42D0FB'
    },
    TxtInputViewTwo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: "#9Ca4ab",
        borderBottomWidth: hp(0.1),
        marginTop: hp(3)
    },
    aliRight: {
        flexDirection: 'row',
        marginTop: hp(1),
        alignSelf: 'flex-end'
    },
    smallIcon: {
        height: hp(2.3),
        width: hp(2.3),
        resizeMode: 'contain'
    },
    smallTxt: {
        fontSize: hp(2),
        color: '#9Ca4ab'
    },
    smallGreenTxt: {
        fontSize: hp(2),
        color: "#75E54E"
    },
    defaultBtnStyle: {
        backgroundColor: '#42D0FB',
        width: wp(90),
        height: hp(6.5),
        borderRadius: hp(0.8),
        marginTop: hp(12),
        alignItems: 'center',
        justifyContent: 'center'
    },
    defaultBtnTxt: {
        fontSize: hp(2.3),
        color: '#fff',
        fontWeight: 'bold'
    },
    alreadyHaveTxt: {
        fontSize: hp(2.3),
        marginTop: hp(2)
    },
    linkView: {
        marginTop: hp(2),
        borderBottomColor: "#bccbff",
        borderBottomWidth: hp(0.2),
    },
    link: {
        color: '#42D0FB',
        fontSize: hp(2.3),
        opacity: 1,
        fontWeight: '700'
    },
    warningTxt: {
        color: '#F15932',
        marginTop: hp(0.7),
        fontSize: hp(1.5),
        left: wp(1)
    }
});
export default SignIn;