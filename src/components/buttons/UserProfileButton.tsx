import { UserProfilePics } from "@/types/story";
import UserProfileModal from "@components/modals/UserProfileModal";
import MyPressable from "@components/natives/MyPressable";
import React, { useState } from "react";

type UserProfileButtonProps = {
  children: React.ReactNode;
  userProfilePics: UserProfilePics;
  disabled?: boolean;
};

const UserProfileButton = ({
  children,
  userProfilePics,
  disabled = false,
}: UserProfileButtonProps) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <MyPressable
        onPress={() => !disabled && setIsVisible(true)}
        className="flex-1 z-20"
        opacity={0.9}
        delayPressIn={1000}
        disabled={disabled}
      >
        {children}
      </MyPressable>
      <UserProfileModal
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
        userProfilePics={userProfilePics}
      />
    </>
  );
};

export default UserProfileButton;
