import React, { Component, Fragment } from 'react';
import {
    StyleSheet,
    Image,
    View,
    TouchableOpacity,
    Text,
    ScrollView,
    StatusBar,
    BackHandler,
    LogBox
} from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen';
import { FloatingTitleTextInputField } from './floating_title_text_input_field';
// Class
class CreateAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            emailID: '',
            password: '',
            isShownWarning: false,
            errors: {}
        }
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }
    UNSAFE_componentWillMount() {
        console.log("Will mount");
        this.setState({ isShownWarning: false })
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    componentWillUnmount() {
        console.log("Will Unmount");
        this.focusListner.remove();
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    handleBackButtonClick = () => {
        return true;
    }
    componentDidMount() {
        this.setState({ isShownWarning: false })
        this.focusListner = this.props.navigation.addListener('didFoucus', () => {
            console.log("Is focused");
            this.setState({
                isShownWarning: false
            })
            BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        });
    }
    _updateMasterState = (attrName, value) => {
        this.setState({ [attrName]: value });
    }
    singupBtnPressed() {
        this.setState({ isShownWarning: true })
        if (this.state.emailID && this.state.password && this.state.userName)
            this.props.navigation.navigate("SignIn")
        else this._validation()
    }
    _validation = () => {
        let userName = this.state.userName, emailID = this.state.emailID, password = this.state.password, errors = {}
        if (!userName)
            errors.userName = "❌   User name cannot be blank. Please enter a user name"
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
        LogBox.ignoreAllLogs()
        const { navigate } = this.props.navigation;
        return (
            <Fragment>
                <StatusBar barStyle="dark-content" />
                {/* <SafeAreaProvider> */}
                {/* <SafeAreaView> */}
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
                            <View style={styles.alignCenter}>
                                <Text style={styles.defaultBoldTxt}>Create your Account</Text>
                            </View>
                            <View style={styles.TxtInputView}>
                                <View style={styles.floatingTxtInputView}>
                                    <FloatingTitleTextInputField
                                        attrName='userName'
                                        title='User Name*'
                                        value={this.state.userName}
                                        updateMasterState={this._updateMasterState}
                                    />
                                </View>
                                <Image
                                    source={require('../assets/images/User.png')}
                                    style={styles.inputFieldIcon}
                                />
                            </View>
                            {this.state.isShownWarning && !this.state.userName ? <Text style={styles.warningTxt}>{this.state.errors.userName}</Text> : null}
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
                            <View style={styles.rowDirection}>
                                <TouchableOpacity>
                                    <Image
                                        source={require('../assets/images/checkbox-checked.png')}
                                        style={styles.smallIcon}
                                    />
                                </TouchableOpacity>
                                <Text style={styles.smallTxt}> I read and agree to <Text style={styles.smallGreenTxt} onPress={() => navigate('PrivacyAndPolicy')}>Terms & Conditions</Text></Text>
                            </View>
                            <TouchableOpacity
                                style={styles.defaultBtnStyle}
                                onPress={() => this.singupBtnPressed()}
                            >
                                <Text style={styles.defaultBtnTxt}>Sign Up</Text>
                            </TouchableOpacity>
                            <View style={styles.alignCenter}>
                                <Text style={styles.alreadyHaveTxt}>Already have an account? </Text>
                                <TouchableOpacity style={styles.linkView} onPress={() => navigate('SignIn')}>
                                    <Text style={styles.link}>Login</Text>
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
    defaultBoldTxt: {
        fontSize: hp(2.3),
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
    rowDirection: {
        flexDirection: 'row',
        marginTop: hp(1),
        alignItems: 'center'
    },
    smallIcon: {
        height: hp(2.3),
        width: hp(2.3),
        resizeMode: 'contain',
        tintColor: '#42D0FB'
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
        marginTop: hp(2.5)
    },
    linkView: {
        marginTop: hp(2.5),
        borderBottomColor: "#7bdcf7",
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
export default CreateAccount;