import { MIN_PICTURES } from "@config/config";
import MyOnboardingLayout from "@pages/onboarding/MyOnboardingLayout";
import resetTo from "@utils/resetTo";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import ProfilePictureContent from "./ProfilePictureContent";

interface OnboardingProfilePictureProps {
  navigation: any;
  route: any;
}

const OnboardingProfilePicture = ({
  navigation,
  route,
}: OnboardingProfilePictureProps) => {
  const { user, nextScreen } = route.params;
  const { t } = useTranslation();
  const [isPicturesValid, setIsPicturesValid] = useState(false);
  const { canGoBack = true } = route.params;

  const handleNext = () => {
    if (nextScreen === "HomeStack") {
      resetTo(navigation, "HomeStack");
      return;
    }
    navigation.navigate(nextScreen, { user });
  };

  return (
    <MyOnboardingLayout
      canGoBack={canGoBack}
      onNextPress={handleNext}
      disableNextButton={!isPicturesValid}
    >
      <ProfilePictureContent
        title={t("profile.addPictures")}
        minPictures={MIN_PICTURES}
        setIsPicturesValid={(value: boolean) => setIsPicturesValid(value)}
      />
    </MyOnboardingLayout>
  );
};

export default OnboardingProfilePicture;
