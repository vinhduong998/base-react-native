import {useAppDispatch, useAppSelector} from "configs/store.config";
import {GlobalPopupHelper} from "helpers/index";
import {GoogleSignin, statusCodes} from "@react-native-google-signin/google-signin";
import {IOS_CLIENT_ID_GOOGLE, WEB_CLIENT_ID_GOOGLE} from "constants/system.constant";
import {loginWithAppleAccount, loginWithGoogleAccount} from "store/reducer/user.reducer.store";
import {languages} from "../languages";
import {Device} from "ui/device.ui";
import appleAuth from "@invertase/react-native-apple-authentication";

export const useLogin = () => {
    const dispatch = useAppDispatch();
    const isAuthenticated = useAppSelector(state => state.user.isAuthenticated);

    const loginGoogle = async (onConfirmGet) => {
        try {
            GlobalPopupHelper.showLoading(false);
            GoogleSignin.configure({
                webClientId: WEB_CLIENT_ID_GOOGLE,
                iosClientId: IOS_CLIENT_ID_GOOGLE,
                offlineAccess: true
            });
            await GoogleSignin.signOut();
            await GoogleSignin.hasPlayServices();
            GlobalPopupHelper.admobGlobalRef.current?.setIgnoreOneTimeAppOpenAd();
            const {idToken} = await GoogleSignin.signIn();
            console.log("idToken", idToken);
            const res: any = await dispatch(loginWithGoogleAccount({user_token: idToken}));
            if (res.payload?.data) {
                onConfirmGet();
            }
            GlobalPopupHelper.hideLoading();
        } catch (error: any) {
            GlobalPopupHelper.hideLoading();
            console.log(JSON.stringify(error), "error");
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                //doToastError(trans("login_loginCanceled"));
            } else {
                GlobalPopupHelper.alert({
                    type: "error",
                    message: languages.somethingWentWrong
                });
            }
        }
    };

    const loginApple = async (onConfirmGet) => {
        GlobalPopupHelper.showLoading();
        try {
            GlobalPopupHelper.admobGlobalRef.current?.setIgnoreOneTimeAppOpenAd();
            const appleAuthRequestResponse = await appleAuth.performRequest({
                requestedOperation: appleAuth.Operation.LOGIN,
                requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME]
            });
            // Get User status Signup
            const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);
            // onCredentialRevoked returns a function that will remove the event listener. useEffect will call this function when the component unmounts
            if (credentialState === appleAuth.State.AUTHORIZED) {
                let {identityToken, fullName} = appleAuthRequestResponse;

                if (identityToken) {
                    // if user is authenticated dispatch to server
                    const res: any = await dispatch(loginWithAppleAccount({
                        user_token: identityToken,
                        full_name: fullName?.nickname || `${fullName?.givenName || ""} ${fullName?.familyName || ""}`.trim()
                    }));
                    GlobalPopupHelper.hideLoading();
                    if (res.payload.data) {
                        onConfirmGet();
                    }
                } else {
                    GlobalPopupHelper.hideLoading();
                }
            } else {
                GlobalPopupHelper.hideLoading();
            }
        } catch (err) {
            GlobalPopupHelper.hideLoading();
        }
        return;
    };


    const checkRole = async (title: string, content?: string, callback?: Function) => {
        if (!isAuthenticated) {
            const options = Device.isIos ? [{
                title: languages.premiumScreen.loginGoogle,
                onPress: () => {
                    loginGoogle(() => {
                        callback?.();
                    });
                }
            }, {
                title: languages.premiumScreen.loginApple,
                onPress: () => {
                    loginApple(() => {
                        callback?.();
                    });
                }
            }] : [{
                title: languages.premiumScreen.loginGoogle,
                onPress: () => {
                    loginGoogle(() => {
                        callback?.();
                    });
                }
            }];
            GlobalPopupHelper.actionSheetRef.current?.show({
                title: title,
                message: content,
                options,
                bottomTitle: languages.cancel
            });
        } else {
            callback?.()
        }
    };


    return {loginGoogle, loginApple, checkRole};
};
