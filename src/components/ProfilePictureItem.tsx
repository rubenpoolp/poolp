import colors from "@config/colors";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { supabase } from "@utils/supabase";
import * as ImagePicker from "expo-image-picker";
import { Plus, X } from "phosphor-react-native";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Linking, View } from "react-native";
import MyImage from "./natives/MyImage";
import MyPressable from "./natives/MyPressable";

interface ProfilePictureItemProps {
  picture?: string;
  onDelete?: (url: string) => void;
  onAdd?: (uri: string) => void;
}

const ProfilePictureItem = ({
  picture,
  onDelete,
  onAdd,
}: ProfilePictureItemProps) => {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined,
  );
  const { t } = useTranslation();
  const { showActionSheetWithOptions } = useActionSheet();

  useEffect(() => {
    if (!picture) {
      setSelectedImage(undefined);
      return;
    }

    const publicUrl = supabase.storage.from("profilePics").getPublicUrl(picture)
      .data.publicUrl;
    setSelectedImage(publicUrl);
  }, [picture]);

  const handleImageSelection = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        t("alerts.photoAccessNeeded.title"),
        t("alerts.photoAccessNeeded.message"),
        [
          { text: t("actions.maybeLater"), style: "cancel" },
          {
            text: t("actions.sureThing"),
            onPress: () => Linking.openSettings(),
          },
        ],
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      if (onAdd) {
        onAdd(result.assets[0].uri);
      }
    }
  };

  const handleCameraSelection = async () => {};

  const handleDelete = () => {
    if (onDelete && picture) {
      onDelete(picture);
    }
  };

  const onPress = () => {
    handleImageSelection();
    // const options = [
    //   t("actions.camera"),
    //   t("actions.gallery"),
    //   t("actions.cancel"),
    // ];
    // const cancelButtonIndex = 2;

    // showActionSheetWithOptions(
    //   {
    //     options,
    //     cancelButtonIndex,
    //   },
    //   (selectedIndex?: number) => {
    //     switch (selectedIndex) {
    //       case 0:
    //         handleCameraSelection();
    //         break;
    //       case 1:
    //         handleImageSelection();
    //         break;
    //       case cancelButtonIndex:
    //         break;
    //     }
    //   },
    // );
  };

  return (
    <View className="relative w-32 h-40 border-4 border-gray-300 border-dotted rounded-lg">
      {selectedImage && <MyImage img={selectedImage} resizeMode="cover" />}
      <View className="absolute -bottom-4 left-0 right-0 flex items-center">
        {selectedImage ? (
          <MyPressable
            onPress={handleDelete}
            hapticImpactStyle="medium"
            className="bg-light border h-7 w-7 rounded-full justify-center items-center"
          >
            <X color={colors.gray[500]} size={16} weight="bold" />
          </MyPressable>
        ) : (
          <MyPressable
            onPress={onPress}
            hapticImpactStyle="medium"
            className="bg-purple-100 border border-light h-7 w-7 rounded-full justify-center items-center"
          >
            <Plus color={colors.light} size={16} weight="bold" />
          </MyPressable>
        )}
      </View>
    </View>
  );
};

export default ProfilePictureItem;
