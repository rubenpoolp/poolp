import useAddProfilePic from "@api/profilePics/addProfilePics.hook";
import useGetProfilePics from "@api/profilePics/getProfilePics.hook";
import assets from "@assets/index";
import MyHeader from "@components/headers/MyHeader";
import MyScreen from "@components/MyScreen";
import MyImage from "@components/natives/MyImage";
import MyText from "@components/natives/MyText";
import ProfilePictureItem from "@components/ProfilePictureItem";
import { useAuth } from "@context/Auth";
import { useIsLoading } from "@context/IsLoading";
import { supabase } from "@utils/supabase";
import upload from "@utils/upload";
import * as Crypto from "expo-crypto";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, View } from "react-native";

interface ProfilePictureProps {}

const ProfilePicture = ({}: ProfilePictureProps) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [pictures, setPictures] = useState<string[]>([]);
  const addProfilePic = useAddProfilePic(user?.id);
  const { data: profilePics } = useGetProfilePics(user?.id);
  const { setIsLoading } = useIsLoading();

  console.log("profilePics", profilePics);
  useEffect(() => {
    setPictures(profilePics || []);
  }, [profilePics]);

  const onAdd = async (uri: string) => {
    try {
      setIsLoading(true);
      const UUID = Crypto.randomUUID();
      const url = `${user?.id}/${UUID}`;
      const { data, error } = await upload(url, uri);
      if (error) {
        throw error;
      }
      if (!data?.path) throw new Error("No path returned from upload");

      const newPictures = [...pictures, data?.path];
      await addProfilePic.mutateAsync({ urls: newPictures });
      setPictures(newPictures);
    } catch (error) {
      Alert.alert(
        "Error",
        "An error occurred while adding your picture, please retry",
      );
      console.warn("error on Add", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async (url: string) => {
    console.log("url", url);
    try {
      setIsLoading(true);
      await supabase.storage.from("profilePics").remove([url]);
      const newPictures = pictures.filter((p) => p !== url);
      await addProfilePic.mutateAsync({
        urls: newPictures,
      });
      setPictures(newPictures);
    } catch (error) {
      Alert.alert(
        "Error",
        "An error occurred while deleting your picture, please retry",
      );
      console.warn("error on Delete", error);
    } finally {
      setIsLoading(false);
    }
  };

  console.log("pictures", pictures);
  return (
    <MyScreen padding>
      <MyHeader canGoBack>
        <MyImage img={assets.logoCropped} containerStyle="h-10 w-20" />
      </MyHeader>

      <View className="flex-1 w-full" style={{ gap: 80 }}>
        <MyText className="text-3xl font-semibold mb-5">
          {t("profile.editPictures")}
        </MyText>

        <View className=" space-y-4 w-full items-center">
          <ProfilePictureItem
            onAdd={onAdd}
            onDelete={onDelete}
            picture={pictures[0]}
          />
          <View className="flex-row w-full justify-evenly">
            <ProfilePictureItem
              onAdd={onAdd}
              onDelete={onDelete}
              picture={pictures[1]}
            />
            <ProfilePictureItem
              onAdd={onAdd}
              onDelete={onDelete}
              picture={pictures[2]}
            />
          </View>
        </View>
      </View>
    </MyScreen>
  );
};

export default ProfilePicture;
