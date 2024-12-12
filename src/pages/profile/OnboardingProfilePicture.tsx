import MyOnboardingLayout from "@pages/onboarding/MyOnboardingLayout";
import { useTranslation } from "react-i18next";
import ProfilePictureContent from "./ProfilePictureContent";

const OnboardingProfilePicture = ({navigation, route}: {navigation: any, route: any}) => {
  const { user, nextScreen } = route.params;
  const { t } = useTranslation();

  const handleNext = () => {
    navigation.navigate(nextScreen, { user });
  };

  return (
    <MyOnboardingLayout onNextPress={handleNext}>
      <ProfilePictureContent title={t("profile.addPictures")} />
    </MyOnboardingLayout>
  )
}

export default OnboardingProfilePicture;