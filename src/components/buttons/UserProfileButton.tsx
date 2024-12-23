import { UserProfilePics } from "@/types/story";
import UserProfileModal from "@components/modals/UserProfileModal";
import MyPressable from "@components/natives/MyPressable";
import React, { useState } from "react";

type UserProfileButtonProps = {
  children: React.ReactNode;
  className?: string;
  userProfilePics: UserProfilePics;
};

const UserProfileButton = ({
  children,
  userProfilePics,
}: UserProfileButtonProps) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <MyPressable
        onPress={() => setIsVisible(true)}
        className="flex-1 z-20"
        opacity={0.9}
        delayPressIn={150}
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
