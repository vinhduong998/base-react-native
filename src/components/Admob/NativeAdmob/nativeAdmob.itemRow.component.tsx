import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";

import TextBase from "components/Base/text.base";
import {useAppDispatch, useAppSelector} from "configs/store.config";
import {EnumTheme} from "constants/system.constant";
import {GlobalPopupHelper} from "helpers/index";
import {logEventAnalytics, sendEventToAppsflyer, useNativeAds, useRandomApp, useSystem} from "helpers/system.helper";
import {TypedEcosystem} from "models/ecosystem.model";
import {Linking, Platform, Pressable, View} from "react-native";
import NativeAdView, {
  AdBadge,
  CallToActionView,
  HeadlineView,
  IconView,
  NativeAd,
  TaglineView
} from "react-native-admob-native-ads";
import FastImage from "react-native-fast-image";
import {setFirstInstall} from "store/reducer/system.reducer.store";
import {FontSizes, MHS, MVS, VS} from "ui/sizes.ui";
import {RootColor} from "ui/theme";
import { EnumAnalyticEvent } from "constants/analytics.constant";

export default function NativeAdmobItemRowComponent() {
    const {theme} = useSystem();
    const nativeAdViewRef = useRef<NativeAdView>(null);
    // const { idAds } = props
    const {nativeAdsId, use_native_ads, native_ads_list, switchAdsId} = useNativeAds();
    const [data, setData] = useState<NativeAd | null>(null);
    const themeText = useAppSelector(state => state.system.theme);
    const isPremium = useAppSelector(state => state.system.isPremium);
    const dispatch = useAppDispatch();
    const [clicked, setClicked] = useState(false)
    const {randomAppAds} = useRandomApp()
    const refDataAdsEcosystem = useRef<TypedEcosystem>(randomAppAds())

    useEffect(() => {
        if (nativeAdsId && use_native_ads) {
            setTimeout(() => {
                nativeAdViewRef.current?.loadAd();
            }, 0);
        }
    }, [nativeAdsId, use_native_ads]);

    //////////////

    const onAdFailedToLoad = (error) => {
        if (!(error.code == 0 && error.currencyCode == "USD")) {
            logEventAnalytics(EnumAnalyticEvent.NativeAdsFailedToLoad + "itemList", {
                //@ts-ignore
                code: error?.code,
                message: error?.message,
                currencyCode: error?.currencyCode
            });
            console.log(EnumAnalyticEvent.NativeAdsFailedToLoad + "itemList");
            console.log("Call switchAdsId itemList");
            switchAdsId();
        }
    }

    const onNativeAdLoaded = useCallback((data) => {
        logEventAnalytics(EnumAnalyticEvent.onNativeAdsLoaded + "itemList");
        console.log(EnumAnalyticEvent.onNativeAdsLoaded + "itemList");
        setData(data);
    }, []);

    const onAdClickedCurrent = useCallback(() => {
        sendEventToAppsflyer("user_clicked_ads", {})
        GlobalPopupHelper.admobGlobalRef.current?.setIgnoreOneTimeAppOpenAd();
        logEventAnalytics(EnumAnalyticEvent.NativeAdsClicked + "itemList");
        console.log(EnumAnalyticEvent.NativeAdsClicked + "itemList");
        setClicked(true)
    }, [native_ads_list]);

    const onAdImpression = useCallback(() => {
        logEventAnalytics(EnumAnalyticEvent.NativeAdsImpression + "itemList");
        console.log(EnumAnalyticEvent.NativeAdsImpression + "itemList");
    }, []);

    const onAdOpened = useCallback(() => {
        logEventAnalytics(EnumAnalyticEvent.NativeAdsOpened + "itemList");
        console.log(EnumAnalyticEvent.NativeAdsOpened + "itemList");
    }, []);

    const onAdLeftApplication = useCallback(() => {
        logEventAnalytics(EnumAnalyticEvent.NativeAdsLeftApplication + "itemList");
        console.log(EnumAnalyticEvent.NativeAdsLeftApplication + "itemList");
    }, []);

    const onAdClosed = useCallback(() => {
        logEventAnalytics(EnumAnalyticEvent.NativeAdsClosed + "itemList");
        console.log(EnumAnalyticEvent.NativeAdsClosed + "itemList");
    }, []);

    const onAdLoaded = useCallback(() => {
        logEventAnalytics(EnumAnalyticEvent.NativeAdsLoaded + "itemList");
        console.log(EnumAnalyticEvent.NativeAdsLoaded + "itemList");
        setTimeout(() => dispatch(setFirstInstall({})), 500);
    }, []);

    //////////////

    const EcosystemAds = useMemo(() => {
        return (
            <Pressable
                onPress={() => {
                    logEventAnalytics(EnumAnalyticEvent.EcosystemAdsClick + "_" + refDataAdsEcosystem.current.name)
                    GlobalPopupHelper.admobGlobalRef.current?.setIgnoreOneTimeAppOpenAd();
                    Linking.openURL(Platform.select({
                        android: refDataAdsEcosystem.current?.link?.android,
                        default: refDataAdsEcosystem.current?.link?.ios
                    }));
                }}
                style={{
                    paddingHorizontal: MHS._16,
                    paddingVertical: MHS._5,
                    flexDirection: "row",
                    backgroundColor: `${theme.btnInactive}20`,
                    borderRadius: MHS._10,
                    alignItems: "center"
                }}>
                <FastImage
                    source={{uri: refDataAdsEcosystem.current?.logo}}
                    style={{
                        width: MVS._60, height: MVS._60, borderRadius: MHS._5
                    }}
                    resizeMode={"contain"}
                />
                <View style={{
                    flex: 1,
                    alignItems: "flex-start",
                    justifyContent: "space-around",
                    paddingHorizontal: MHS._5
                }}>
                    <TextBase title={refDataAdsEcosystem.current?.name} numberOfLines={2} style={{
                        fontSize: 14,
                        fontWeight: "700",
                        color: themeText == EnumTheme.Dark ? "#F3F3F3" : "#474747"
                    }}/>
                    <TextBase
                        title={refDataAdsEcosystem.current?.feature?.[Math.floor(Math.random() * (refDataAdsEcosystem.current?.feature?.length || 0))] || ""}
                        numberOfLines={2}
                        style={{fontSize: 12, color: themeText == EnumTheme.Dark ? "#F3F3F3" : "#474747"}}/>
                </View>
                <View
                    style={{
                        width: MHS._70,
                        paddingVertical: MHS._12,
                        paddingHorizontal: MHS._16,
                        backgroundColor: "#006484",
                        justifyContent: "center",
                        alignItems: "center",
                        elevation: 10,
                        borderRadius: MHS._5
                    }}

                >
                    <TextBase title={"Install"} numberOfLines={2} style={{fontSize: 12, color: theme.textLight}}
                              fontWeight={"bold"}/>
                </View>
            </Pressable>
        );
    }, []);

    if (isPremium) {
        return null;
    }

    return (
        <>
            {
                nativeAdsId ? (
                    <NativeAdView
                        onAdFailedToLoad={onAdFailedToLoad}
                        onAdClicked={onAdClickedCurrent}
                        onNativeAdLoaded={onNativeAdLoaded}
                        onAdImpression={onAdImpression}
                        onAdOpened={onAdOpened}
                        onAdLeftApplication={onAdLeftApplication}
                        onAdClosed={onAdClosed}
                        onAdLoaded={onAdLoaded}
                        adUnitID={nativeAdsId}
                        ref={nativeAdViewRef}
                        style={{marginTop: VS._10}}
                    >
                        {
                            !clicked && data ?
                                <View style={{
                                    paddingHorizontal: MHS._16,
                                    paddingVertical: MHS._5,
                                    flexDirection: "row",
                                    backgroundColor: `${theme.btnInactive}20`,
                                    borderRadius: MHS._10
                                }}>
                                    <AdBadge
                                        style={{backgroundColor: RootColor.MainColor, borderColor: RootColor.MainColor}}
                                        textStyle={{color: "#FFF", textAlign: "center"}}/>

                                    {data?.icon ? <IconView source={{uri: data?.icon}}
                                                            style={{
                                                                width: MVS._60,
                                                                height: MVS._60,
                                                                borderRadius: MHS._5
                                                            }}/> : null}
                                    <View style={{
                                        flex: 1,
                                        alignItems: "flex-start",
                                        justifyContent: "space-around",
                                        paddingHorizontal: MHS._5
                                    }}>
                                        {data?.headline ? <HeadlineView numberOfLines={2} style={{
                                            fontSize: FontSizes._14,
                                            fontWeight: "700",
                                            color: themeText == EnumTheme.Dark ? "#F3F3F3" : "#474747"
                                        }}/> : null}
                                        {/*<View style={{ flexDirection: "row" }}>*/}
                                        {/*	{data?.rating ? <StarRatingView iconSet="MaterialIcons" /> : null}*/}
                                        {/*	<View style={{ marginLeft: MHS._4 }}>*/}
                                        {/*		<AdBadge style={{ backgroundColor: '#006484' }} textStyle={{ color: "#FFF", textAlign: "center" }} />*/}
                                        {/*	</View>*/}
                                        {/*</View>*/}
                                        {data?.tagline ?
                                            <TaglineView numberOfLines={2} style={{
                                                fontSize: FontSizes._10,
                                                color: themeText == EnumTheme.Dark ? "#F3F3F3" : "#474747"
                                            }}/>
                                            : null
                                        }
                                    </View>
                                    {data?.callToAction ?
                                        <CallToActionView
                                            // @ts-ignore
                                            buttonAndroidStyle={{
                                                borderRadius: MHS._5,
                                                backgroundColor: "#006484"
                                            }}
                                            textStyle={{
                                                color: "#FFF",
                                                fontSize: MHS._12,
                                                fontWeight: "600"
                                            }}
                                            style={{
                                                width: MHS._70,
                                                paddingVertical: MHS._20,
                                                paddingHorizontal: MHS._16,
                                                backgroundColor: "#006484",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                elevation: 10,
                                                borderRadius: MHS._5
                                            }}

                                        /> : null
                                    }

                                </View>
                                : null
                        }
                    </NativeAdView>
                ) : null
            }
            {(clicked || !data) ? <View style={{marginTop: nativeAdsId ? 0 : VS._10}}>
                {EcosystemAds}
            </View> : null}
        </>

    );
}

