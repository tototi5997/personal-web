import { useCallback } from "react";
import { useTranslation } from "react-i18next";

enum LangeType {
  ZN = "zh-CN",
  EN = "en",
}

const useI18n = () => {
  const { t, i18n } = useTranslation();
  const curLang = i18n.language;

  const changeLang = useCallback(
    (lang?: LangeType) => {
      if (lang) {
        i18n.changeLanguage(lang);
      } else {
        i18n.changeLanguage(curLang === LangeType.ZN ? LangeType.EN : LangeType.ZN);
      }
    },
    [curLang, i18n]
  );

  return { t, curLang, changeLang };
};

export default useI18n;
