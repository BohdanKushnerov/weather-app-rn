export const getWeatherNameBcg = (weather: string) => {
  console.log("weather", weather)

  // console.log(weather.trim() === "Clear")
  switch (weather.trim().toLowerCase()) {
    // ===== Snow ======
    case "blowing snow":
    case "light snow":
    case "light snow showers":
    case "patchy light snow":
    case "patchy light snow in area with thunder":
    case "patchy moderate snow":
    case "patchy snow nearby":
      return "https://lh3.googleusercontent.com/pw/ABLVV87GEu71aPFEcx9mAFLg1Rjg4_0n9lRyFEokynCc21aifdZ7HHf_B2-zlVwmvlFoueiNzAW86WomWzyDUEszFr6gIY4qPc1gtuvo0omhjpz75eAHtatBAAIb8Sg7vOrfzXTy5y7hLH09XUEJXG9pZTE=w426-h641-s-no-gm?authuser=0";

    // ===== Heavy snow ======
    case "heavy snow":
    case "moderate or heavy snow":
    case "moderate or heavy snow showers":
    case "moderate or heavy snow in area with thunder":
    case "patchy heavy snow":
      return "https://lh3.googleusercontent.com/pw/ABLVV84jMU-eAG1GlFEy5TZjAS-Xc3Y-Vcnt-olfciSyObiOeSL-HVwDZFp2sJaBeYcaBle8Nub6x3lkXN_sA8bF6XIIS7QQelehOhjYLN2noHGJEVqAGkIen5heA1Ac1mkdha1CcWPI3aVZSaUsngrl_bQ=w427-h641-s-no-gm?authuser=0";

    // ===== Pellets ======
    case "ice pellets":
    case "light showers of ice pellets":
    case "moderate or heavy showers of ice pellets":
    case "moderate showers of ice pellets":
      return "https://lh3.googleusercontent.com/pw/ABLVV87aOUWk2NAe710zp0i5uqHDNpwSrMeZ22IGaqYHWoyrzyaMe1RrFh6gu8D1lBFmtCz70vs1CxZFjjI0Ef9mKoUlr7S573CoceJdncdzeCFqCJ_HfFet-a5K5MboteX8LWss9Hi3m_wVS14Ho3-Wpyw=w841-h641-s-no-gm?authuser=0";

    // ===== Sleet ======
    case "light sleet":
    case "light sleet showers":
    case "moderate or heavy sleet":
    case "moderate or heavy sleet showers":
    case "patchy sleet nearby":
      return "https://lh3.googleusercontent.com/pw/ABLVV85v80n2cSTd6vOWdZkEUP5Ni_VdhvqhYy4lTXZBlDb6S-Sw6Kny-u-YUQvOr8P-of2-DmEoZ4yvmjIPC9sxJNmuxDwfh7oqOPi58lTTASEwDWhti65qsPzCvPDiUkHhM6BUicD_n0KqMBGOk0xqIn8=w427-h641-s-no-gm?authuser=0";

    // ===== Rain ======
    case "light rain":
    case "light rain shower":
    case "moderate or heavy rain":
    case "moderate or heavy rain shower":
    case "moderate rain":
    case "moderate rain at times":
    case "moderate rain shower":
    case "patchy light rain":
    case "patchy rain nearby":
    case "torrential rain shower":
      return "https://lh3.googleusercontent.com/pw/ABLVV85B7fbRv1EP8M57wl9aeZJLqCTDhHWA-DNoNuu_B1U5snhjs8eWdk1MTNB_4HWKRUB8W13MqZSFPYNl6_XQmCaaOTMQmiJ8G4Xw7UHytRI95XCWt_4mabHCf_JSSzjiecuh30nQo0V_WghvlyuYq5E=w427-h641-s-no-gm?authuser=0";

    // ===== Rain other ======
    case "heavy rain":
    case "heavy rain at times":
      return "https://lh3.googleusercontent.com/pw/ABLVV86HuIH4PuuwW7RYGKYrunteU96tmURshpZwX6G46rtm8LvEHiLCV9BiDdehNtQXchgUDIOSXzcMxwfe0M78LdjrzjoBrb9vv45_nWMKlZ33CEOIvXaB0lra6FeQorsjcjcx8vhm3NU_Z_vUFQYjtHw=w962-h641-s-no-gm?authuser=0";

    case "light freezing rain":
    case "moderate or heavy freezing rain":
    case "patchy freezing rain nearby":
      return "https://lh3.googleusercontent.com/pw/ABLVV86R7nsOfMpRv5aF4kHP_r7x_88yv1pbTFCEae5ECM1Jrj2z7xZeLphbLtzL_deI8Ff5qfpOSqUJ1nn0spFEfsrFw_lL48BUc8o8S2-krWngDftIV7ObpIqpLryOoXF5rhZYLx5dXriMoQcfAtK_kjs=w428-h641-s-no-gm?authuser=0";

    case "moderate or heavy rain in area with thunder":
    case "patchy light rain in area with thunder":
      return "https://lh3.googleusercontent.com/pw/ABLVV87-nev4-w9YRROV7j8SWS7FE7OLYCgH7ZDZq91JfnvusXsTEqrAVDteweRZbT1O8qWLBLDDnB_-btWkuCt3KN3OWeiwECOwwiiqnG0vEEL7lCeEiT0AS_vutchOWGEWA76hZ7Mb-lGJBmksLUbt0PI=w962-h641-s-no-gm?authuser=0";

    // ===== Drizzle ======
    case "freezing drizzle":
    case "heavy freezing drizzle":
    case "light drizzle":
    case "patchy freezing drizzle nearby":
    case "patchy light drizzle":
      return "https://lh3.googleusercontent.com/pw/ABLVV86g17tTZ1bq-ykjBKFIQqEwt8Pj7e17a2wnQ6eauRcwVKQVBKeUqwQ9E5pGfqpLrTJWVpJ0eSn6mGbrSkcJvxXK7SLdshN9B9F4upm5Tf8U77awNBfHqOvcc8eAtu31roQJ1Rr1BtHPCooH2lDAti8=w427-h641-s-no-gm?authuser=0";

    // ===== other ======
    case "partly cloudy":
      return "https://lh3.googleusercontent.com/pw/ABLVV86RUXDs5yAJpoMvfdkMOPl5WP1AMoF30UfbUt52Tdm0EIOkqToYWB6XtwVqz4BPsccVCwF7eAfiJ3UpWKAodcbVGZNm4DJ_lbsQd5NETPoP1ABnPkUdUr1O8QF3mgVuJFiOwM3mdOYmTlYY-zqJ7yY=w962-h641-s-no-gm?authuser=0";

    case "cloudy":
      return "https://lh3.googleusercontent.com/pw/ABLVV85Uk1PMeDMfWwD9uP1N6peJVdWY0v7XqWdhXE8bLZYrn605s8rf9ekyQFoHB3d7QXpQ6RWS1itE5ENTr1vPANPjoLWOy-t-jnW19fo0TislAXBnDnr1pH3DW3pdX5Ctmg-y88juBJrLnf4W5xhZSiM=w481-h641-s-no-gm?authuser=0";

    case "blizzard": // метель
      return "https://lh3.googleusercontent.com/pw/ABLVV84jhhNNuGM3gcK2JM-hqvd0GbxiAkZRfVKQi6S3YXTU1Zjjyh9aPG-OWz_GuzEIN741FA9Met3GAWI_OQd0Zwc-65AAZesUIE9VZ0rwfALlu_CF4cMTdeyt8lV4r2xaz8XkuX9OeGuDodH1YewhVmc=w962-h641-s-no-gm?authuser=1";

    case "clear":
      return "https://lh3.googleusercontent.com/pw/ABLVV87f8oI_S1Td9FBlGojPGuKEDSDl7AjGYER_hBz1xNv_gC68Zb6XvQPlxaJ0bKlMWJuGTRQXv8h22Ag0emz_NydUZsoRv2LX1bfLqxceuBQXIWTzrj3FgKbFxyvWYY4Hjm3ya6b3tMuiidbvk7c3Gas=w458-h641-s-no-gm?authuser=0";

    case "fog":
    case "freezing fog":
      return "https://lh3.googleusercontent.com/pw/ABLVV84Tj24mw2L5ld1C_iftG2pcayna8F3aomyjU7tlDuSVC83nTfp3_9boHhHkMWtFk3_-7hwkR5YiDRpQK3twJc5AjE1kqhJ86EMawAv4AqrxOwNU-N0QE5ilWuxObny7U7O2M-4777fDeFEd4kS2w_o=w427-h641-s-no-gm?authuser=0";

    case "mist":
      return "https://lh3.googleusercontent.com/pw/ABLVV86bf1-7Q6O6zNjN7F_83fS9WgmVRbEA_IFrdlw_apAn0GNUE4HLDnqM9NSIsCwgMm8-d-4yQsQkIY8G9BNCphHFOyK-sr09HzK5opT6ktSM2w6Nv1M01FohSg_Wt12NSX4hKBfgbmp4gCYsy6G_vUg=w513-h641-s-no-gm?authuser=0";

    case "overcast":
      return "https://lh3.googleusercontent.com/pw/ABLVV86Vynt1i_ZZ_OosGbwTCea0TFghE-JmVPqUvwSsxlwgZEFH7d8Qnsgs96yFEuOFM9TNTDtmRbALFiP0oAtDCq-P-nRypyadtW91OjG6KHMBLowiGAk1Ntvsg_k6uXJN5RqAM2-ls50mJQ_jFtSB004=w499-h641-s-no-gm?authuser=0";

    case "thundery outbreaks in nearby":
      return "https://lh3.googleusercontent.com/pw/ABLVV87jRd0lKjfEjmIb_nwnKwSxDvKFsJLysMOYRYJfHhdRxOwxfesY9WO868pHln05d8IbfEPku4-ezLEMs8ivEuUR-v6gNEGIht15_719oZEg8qk0l70p3WyrrVCbmHalq8oSxSIaiw8znxbzXC-PV9k=w427-h641-s-no-gm?authuser=0";

    case "sunny":
      return "https://lh3.googleusercontent.com/pw/ABLVV87_Coqjqrm8VpUrcbA7jxo2h6cIQ15DqiiWO5aHixCcJJBUM3lrqs1ib3fTlEyoAVlg4Hug5R8Yc5n8go0AM5xb1DbCeid27at99-_O3hOMzBfacM2WFeh3aA8CQb3J1zgqTmOWTDEiV2EFU5Uz8cg=w481-h641-s-no-gm?authuser=0";

    default:
      return "https://lh3.googleusercontent.com/pw/ABLVV844_x-1wBU4Ao_mAxcs3nL6F84RSCs-3ztuMcl3evp_sELUt0kMWW01gU5HVyWxJfR5OhurdnYSzNx2WAlup2JdeX7i3elIG5Yxl4rrI_am9k9kBqG47SRoGTrkTneDV0s6LNI_KS99rc_H-Zyuh-4=w499-h641-s-no-gm?authuser=1";
  }
};
