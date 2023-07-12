import {IconClose} from "assets/svgIcons";
import {useAppDispatch, useAppSelector} from "configs/store.config";
import {cacheListVideo} from "helpers/file.helper";
import {GlobalPopupHelper} from "helpers/index";
import {opacity} from "helpers/string.helper";
import {DEFAULT_ECOSYSTEM, logEventAnalytics, useDisplayAds} from 'helpers/system.helper';
import {TypedEcosystem} from "models/ecosystem.model";
import React, {forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState} from 'react';
import {ActivityIndicator, AppState, AppStateStatus, Linking, Pressable, StyleSheet} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import mobileAds, {MaxAdContentRating, useRewardedAd} from 'react-native-google-mobile-ads';
import Video from 'react-native-video';
import {switchAdsId} from "store/reducer/system.reducer.store";
import {Device} from "ui/device.ui";
import {HS, MHS} from "ui/sizes.ui";
import {EnumAnalyticEvent} from "constants/analytics.constant";

export interface TypedAdsRef {
    showAds: (cb: Function) => void
}

const AdsRewardAdmobComponent = (_, ref: React.Ref<TypedAdsRef>) => {
    const callback = useRef<any>();
    const adsEarned = useRef<boolean>(false);
    const {rewardAdsId} = useDisplayAds()
    const appState = useRef(AppState.currentState);
    const refVideo = useRef<any>();
    const needShowAds = useRef(false)
    const refDoneVideo = useRef(false)
    const refDoneAds = useRef(false)
    const [isReadyToLoadAdmob, setIsReadyToLoadAdmob] = useState(false)
    const [showVideoLocal, setShowVideoLocal] = useState(false)
    const [showExitsBtn, setShowExitsBtn] = useState(false)
    const dispatch = useAppDispatch()
    const refTimeoutShowExitBtn = useRef<NodeJS.Timer>()
    const ecosystem = useAppSelector(state => state.system.ecosystem)
    const [videoAds, setVideoAds] = useState<TypedEcosystem[]>([])
    const refSourceVideo = useRef<any>()

    useEffect(() => {
        const listVideoAvailable = ecosystem.filter(i => !!i.video)
        const listAvailable = listVideoAvailable.length > 0 ? listVideoAvailable : [DEFAULT_ECOSYSTEM]
        setVideoAds(listAvailable)

        refSourceVideo.current = listAvailable?.[0]

        cacheVideoEcoSystem(listAvailable)
    }, [ecosystem])

    const cacheVideoEcoSystem = async (listVideoAvailable) => {
        if (listVideoAvailable.length === 0) {
            return;
        }
        try {
            console.log("start cache video");
            const list = await cacheListVideo(listVideoAvailable)
            setVideoAds(list)
            console.log("cache video done");
        } catch (error) {
            console.log("cache video error", error);
        }

    }

    const rewardedAds = useRewardedAd(rewardAdsId, {
        requestNonPersonalizedAdsOnly: true,
    })
    const canShowAds = useRef(true)
    const timeoutOpenRewardedAds = useRef<NodeJS.Timer>()

    //Hàm này siêu cần cho ads
    useEffect(() => {
        mobileAds()
            .setRequestConfiguration({
                // Update all future requests suitable for parental guidance
                maxAdContentRating: MaxAdContentRating.PG,

                // Indicates that you want your content treated as child-directed for purposes of COPPA.
                tagForChildDirectedTreatment: true,

                // Indicates that you want the ad request to be handled in a
                // manner suitable for users under the age of consent.
                tagForUnderAgeOfConsent: true
            })
            .then(() => {
                mobileAds()
                    .initialize()
                    .then(adapterStatuses => {
                        setIsReadyToLoadAdmob(true);
                    })
                    .catch((error: any) => {
                        console.log(error);
                    });
            })
            .catch((error: any) => {
                console.log(error);
            });

    }, []);

    const handleAppStateChange = useCallback((nextAppState: AppStateStatus) => {
        if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
            canShowAds.current = true
            if (rewardedAds.isLoaded && needShowAds.current) {
                timeoutOpenRewardedAds.current = setTimeout(() => {
                    try {
                        console.log("show2");
                        if (refTimeoutShowExitBtn.current) {
                            clearTimeout(refTimeoutShowExitBtn.current)
                        }
                        refDoneVideo.current = false
                        rewardedAds.show()
                    } catch (error) {
                        console.log("error 2");
                    }
                }, 300);
            }
        }

        if (
            nextAppState.match(/inactive|background/) &&
            appState.current === 'active'
        ) {
            canShowAds.current = false
            clearTimeout(timeoutOpenRewardedAds.current)
        }

        appState.current = nextAppState;
    }, [rewardedAds]);

    const callLoadAds = useCallback(() => {
        if (isReadyToLoadAdmob) {
            if (rewardedAds.isLoaded) {
                adsEarned.current = false
                if (needShowAds.current) {
                    clearTimeout(timeoutOpenRewardedAds.current)
                    timeoutOpenRewardedAds.current = setTimeout(() => {
                        if (canShowAds.current) {
                            try {
                                console.log("show1");
                                BackgroundTimer.runBackgroundTimer(() => {
                                        setShowVideoLocal(false)
                                        setTimeout(() => BackgroundTimer.stopBackgroundTimer(), 0)
                                    },
                                    1000);
                                if (refTimeoutShowExitBtn.current) {
                                    clearTimeout(refTimeoutShowExitBtn.current)
                                }
                                refDoneVideo.current = false
                                rewardedAds.show()
                            } catch (error) {
                                console.log("error 1");
                            }
                        }
                    }, 0);
                }
            } else {
                setShowVideoLocal(true)
                console.log("call load reward")
                rewardedAds.load()
            }
        }
    }, [isReadyToLoadAdmob, rewardedAds.isLoaded])

    useEffect(() => {
        console.log(rewardedAds.isLoaded, "rewardedAds.isLoaded")
        console.log(needShowAds.current, "needShowAds.current")
        if (rewardedAds.isLoaded && needShowAds.current) {
            refDoneAds.current = true;
            if (refDoneVideo.current) {
                clearTimeout(timeoutOpenRewardedAds.current)
                timeoutOpenRewardedAds.current = setTimeout(() => {
                    console.log(canShowAds.current, "canShowAds.current")
                    if (canShowAds.current) {
                        try {
                            console.log("show1");
                            BackgroundTimer.runBackgroundTimer(() => {
                                    setShowVideoLocal(false)
                                    setTimeout(() => BackgroundTimer.stopBackgroundTimer(), 0)
                                },
                                1000);
                            if (refTimeoutShowExitBtn.current) {
                                clearTimeout(refTimeoutShowExitBtn.current)
                            }
                            refDoneVideo.current = false
                            rewardedAds.show()
                        } catch (error) {
                            console.log("error 1");
                        }
                    }
                }, 0);
            }
        }
    }, [rewardedAds.isLoaded])

    useEffect(() => {
        const subscription = AppState.addEventListener('change', handleAppStateChange);

        return () => {
            subscription.remove();
        };
    }, [rewardedAds])

    useEffect(() => {
        if (rewardedAds.isEarnedReward) {
            adsEarned.current = true
        }
    }, [rewardedAds.isEarnedReward])

    useEffect(() => {
        if (adsEarned.current && rewardedAds.isClosed) {
            needShowAds.current = false
            refDoneAds.current = false
            callback.current?.()
        }
    }, [rewardedAds.isClosed])

    useEffect(() => {
        if (rewardedAds.isAdImpression) {
            logEventAnalytics(EnumAnalyticEvent.RewardAdsImpression)
            console.log(EnumAnalyticEvent.RewardAdsImpression)
        }
    }, [rewardedAds.isAdImpression])

    useEffect(() => {
        if (rewardedAds.error && !rewardedAds.showFail) {
            console.log("Call switchAdsId reward")
            dispatch(switchAdsId("reward"))
            logEventAnalytics(EnumAnalyticEvent.RewardAdsLoadFail, {
                //@ts-ignore
                code: rewardedAds.error?.code,
                message: rewardedAds.error?.message
            })
            console.log(EnumAnalyticEvent.RewardAdsLoadFail)
        }

        if (rewardedAds.error && rewardedAds.showFail) {
            logEventAnalytics(EnumAnalyticEvent.RewardAdsShowFail, {
                //@ts-ignore
                code: rewardedAds.error?.code,
                message: rewardedAds.error?.message
            })
            console.log(EnumAnalyticEvent.RewardAdsShowFail)
        }
    }, [rewardedAds.error, rewardedAds.showFail])

    useImperativeHandle(ref, () => ({
        showAds: (cb) => {
            callback.current = cb
            GlobalPopupHelper.admobGlobalRef.current?.setIgnoreOneTimeAppOpenAd();
            console.log("show reward ads", rewardedAds.isLoaded);
            logEventAnalytics(EnumAnalyticEvent.RewardAdsCallShow)
            needShowAds.current = true;
            refSourceVideo.current = videoAds[Math.floor(Math.random() * videoAds.length)]
            setShowExitsBtn(false)
            callLoadAds()
        }
    }), [isReadyToLoadAdmob, videoAds])

    const onEnd = useCallback(() => {
        refDoneVideo.current = true;
        if (refDoneAds.current) {
            console.log("alo")
            clearTimeout(timeoutOpenRewardedAds.current)
            timeoutOpenRewardedAds.current = setTimeout(() => {
                console.log(canShowAds.current, "canShowAds.current")
                if (canShowAds.current) {
                    try {
                        console.log("show1");
                        BackgroundTimer.runBackgroundTimer(() => {
                                setShowVideoLocal(false)
                                setTimeout(() => BackgroundTimer.stopBackgroundTimer(), 0)
                            },
                            1000);
                        if (refTimeoutShowExitBtn.current) {
                            clearTimeout(refTimeoutShowExitBtn.current)
                        }
                        refDoneVideo.current = false
                        rewardedAds.show()
                    } catch (error) {
                        console.log("error 1");
                    }
                }
            }, 0);
        } else {
            refTimeoutShowExitBtn.current = setTimeout(() => {
                setShowExitsBtn(true)
            }, 10000)
        }
    }, [rewardedAds])


    const onPress = () => {
        logEventAnalytics(EnumAnalyticEvent.EcosystemRewardAdsClick + "_" + refSourceVideo.current?.name)

        Linking.openURL(refSourceVideo.current?.link?.android)
        BackgroundTimer.runBackgroundTimer(() => {
            setShowVideoLocal(false)
            setTimeout(() => BackgroundTimer.stopBackgroundTimer(), 0)
        }, 500);
        needShowAds.current = false
        refDoneVideo.current = false
        refDoneAds.current = false
        callback.current?.()
    }

    const onClose = useCallback(() => {
        setShowVideoLocal(false)
        needShowAds.current = false
        refDoneVideo.current = false
        refDoneAds.current = false
        callback.current?.()
    }, [])

    if (showVideoLocal) {
        return (
            <Pressable style={styles.container} onPress={onPress}>
                <Video
                    source={refSourceVideo.current?.video ? {uri: refSourceVideo.current?.video} : require("assets/videos/law.mp4")}
                    ref={refVideo}
                    paused={false}
                    onEnd={onEnd}
                    style={styles.video}
                    resizeMode={"contain"}/>
                {showExitsBtn ?
                    <Pressable style={styles.btnClose} onPress={onClose}>
                        <IconClose size={MHS._16} color={"#ffffff"}/>
                    </Pressable>
                    :
                    <ActivityIndicator size={"small"} color={"#ffffff"} style={styles.indi}/>
                }

            </Pressable>
        )
    } else {
        return null
    }

}

const styles = StyleSheet.create({
    container: {
        width: Device.width,
        height: Device.heightSafeWithStatus,
        position: 'absolute',
        top: 0,
        left: 0,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'black'
    },
    video: {
        width: Device.width,
        flex: 1
    },
    indi: {
        position: 'absolute',
        top: Device.heightStatusBar * 1.2,
        right: HS._20,
    },
    btnClose: {
        position: 'absolute',
        top: Device.heightStatusBar * 1.2,
        right: HS._20,
        backgroundColor: opacity("#FFFFFF", 0.2),
        padding: MHS._4,
        borderRadius: MHS._28
    }
})

export default forwardRef(AdsRewardAdmobComponent);
